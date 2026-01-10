$(document).ready(function(){
    const currentmenu=$("#creditnote")
    setactivemenu(currentmenu)

    const creditclientsfield = $('#chooseclient'),
      invoiceclientphonenofield = $('#invoiceclientphoneno'),
      invoiceclientaddressfield = $('#invoiceclientaddress'),
      invoiceddatefield = $('#invoiceddate')

      const inputfield=$('input'),
        selectfield = $('select')

      selectfield.on("change",()=>{
        inputfield.trigger("input")
      })
        // disable the fields
      invoiceclientphonenofield.prop('disabled', true)
      invoiceclientaddressfield.prop('disabled', true)
      invoiceddatefield.prop('disabled', true)

   

    getinvoicedclients(creditclientsfield, 'Choose')
    function getinvoicedclients(obj, option = 'all') {
        $.getJSON(
            "../controllers/creditnoteoperations.php",
            {
                getinvoicedclients:true
            },
            (data) => {
                
                let results = option === 'all'? "<option value='0'>&lt;All&gt;</option>" : "<option value=''> &lt;Choose&gt;</option>"
                data.forEach((client) => {
                    results += `<option value='${client.clientid}'>${client.clientname}</option>`
                });
    
                obj.html(results);
                
            }
        )
    }

    // creditnote table
    const creditnotenotifications = $('#creditnotenotifications'),
    creditnotetable = $('#creditnotetable'),
   
    savecreditnotebutton = $('#savecreditnote')

    // client creditnote logic
    creditclientsfield.on('change', function(){
        const clientname = creditclientsfield.find('option:selected').text(),
        clientid = creditclientsfield.val()

        $.getJSON(
            "../controllers/creditnoteoperations.php",
            {
                getcreditnotes: true,
                clientid
            },
            (data) => {
                // console.log(data);
                

                // // populate the fields
                invoiceclientphonenofield.val(data[0].telephone)
                invoiceclientaddressfield.val(data[0].address)
                invoiceddatefield.val(formatDate(data[0].invoicedate))

                // populate the credit note table
                let results = ""
                if (data.length > 0) {
                    data.forEach((invoice, i) => {
                        results += `<tr data-invoiceid='${invoice.invoiceid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${invoice.invoiceid}</td>`
                        results += `<td>${invoice.invoiceno}</td>`
                        results += `<td>${invoice.invoicedate}</td>`
                        results += `<td>${invoice.amount}</td>`
                        results += `<td contenteditable="true">${invoice.cramount}</td>`
                        results += `<td>${invoice.currencyname}</td>`  
                        results += `<td><input type="checkbox" class="selectedcredittax"></td></tr>`;
                        results += `</tr>`; 
                    });
                } else {
                    results += `<tr><td colspan='6' style='color: red; text-align: center;'>No Results Found for ${clientname} <i class="fas fa-fw fa-sm fa-ban"></i></td></tr>`;
                }
                // creditnotetable.find("tbody").html(results)
                makedatatable(creditnotetable,results,25)
            }
        )
    })

    savecreditnotebutton.on('click', function(){
        const clientname = creditclientsfield.find('option:selected').text(),
        clientid = creditclientsfield.find('option:selected').val(),
        creditinvoiceitems = [] 

        let errors = ''

        if(clientid == ''){
            errors = 'Please Select A Client'
            creditclientsfield.focus()
        }

        creditnotetable.find('tbody tr').each(function(){
            const $row = $(this).closest('tr'),
            invoiceid =  $row.find('td').eq(1).text(),
            amount = $row.find('td').eq(5).text().replace(",", ""),
            currency = $row.find('td').eq(6).text(),
            creditamounttax = $row.find('td').eq(7).find('.selectedcredittax'),
            tax = creditamounttax.is(':checked') ? 1 : 0
            

            if(amount == 0){
                errors = `Please Input Credit Amount for <strong>${clientname}</strong>`
            }else if(amount > 0){
                creditinvoiceitems.push({
                    "invoiceid": invoiceid,
                    "amount": amount,
                    "currency": currency,
                    "tax": tax
                })
            }
            else {
                errors = "Missing Credit Amount Input in row";
                creditnotenotifications.html(showAlert("danger", errors));
                return false; // Exit loop
            }
        })

        if(!errors) {
            $.post(
                "../controllers/creditnoteoperations.php",
                {
                    savecreditnote:true,
                    clientid,
                    creditinvoiceitems: JSON.stringify(creditinvoiceitems)
                },
                (data) => {
                    // let notification 
                    console.log(data)
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status === "success") {
                            // notification=`Credit Note was saved successfully`
                            creditnotenotifications.html(showAlert("success","Success the Credit Note was saved successfully"))
                            setTimeout(()=>{
                                creditnotenotifications.html("")
                            },2000)
                        }else if (data.status == "exists") {
                            creditnotenotifications.html(showAlert("info", `Sorry, the <strong>Credit Note </strong>already exists in the system`))
                        }
                    }else {
                        creditnotenotifications.html(showAlert("danger", `Sorry an error has occurred ${data}`))
                    }
                }
            )
        }else {
            creditnotenotifications.html(showAlert("info", errors))
        }
    })

    // view credit note details
    // convert number to words
    function numberToWords(n) {
        const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
        const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const thousands = ["", "Thousand", "Million", "Billion"];

        if (n === 0) return "Zero";

        let words = '';
        let i = 0;

        while (n > 0) {
        if (n % 1000 !== 0) {
            words = convertChunk(n % 1000) + thousands[i] + " " + words;
        }
        n = Math.floor(n / 1000);
        i++;
        }

        return words.trim();

        function convertChunk(n) {
        let chunk = '';
        if (n >= 100) {
            chunk += ones[Math.floor(n / 100)] + " Hundred ";
            n %= 100;
        }
        if (n >= 20) {
            chunk += tens[Math.floor(n / 10)] + " ";
            n %= 10;
        }
        if (n > 0) {
            chunk += ones[n] + " ";
        }
        return chunk.trim() + " ";
        }
    }

    const startcreditfield = $('#startcredit'),
        endcreditfield = $('#endcredit'),
        filtercreditnotebutton = $('#filtercreditnote'),
        creditnotesnotifications = $('#viewcreditnotesnotifications'),
        savedcreditnotestable = $('#savedcreditnotestable'),
        selectallcreditnotes = $('#selectallcreditnotes'),
        printnotifications = $('#printnotifications'),
        printallcreditnotesbutton = $('#printallcreditnotes'),
        viewcreditclientsfield = $('#creditclients')

    // get the current date from the server
    setDatePicker(startcreditfield),
    setDatePicker(endcreditfield)

    getserverdate().done(function(){
        startcreditfield.val(formatDate(serverdate))
    })

    getserverdate().done(function(){
        endcreditfield.val(formatDate(serverdate))
    })

    // get all clients in the select
    getclients(viewcreditclientsfield, 'Choose')

    function getclients(obj, option = 'all'){
        $.getJSON(
        '../controllers/creditnoteoperations.php',
        {
            getclients:true
        },
        (data)=>{
            let results = option === 'all'? "<option value='0'>&lt;All&gt;</option>" : "<option value=''> &lt;Choose&gt;</option>"
            data.forEach((client) => {
            results += `<option value='${client.clientid}'>${client.clientname}</option>`
            });

            obj.html(results);
        }
        )
    }

    filtercreditnotebutton.on('click', function(){
        const startdate = startcreditfield.val(),
        enddate = endcreditfield.val(),
        clientname = viewcreditclientsfield.find('option:selected').text(),
        clientid = viewcreditclientsfield.val()
    
        let errors = ""
    
        if(startdate == ""){
          errors = 'Please Select Credit Note Start Date'
          startcreditfield.focus()
        }else if(enddate==""){
          errors = 'Please Select Credit Note End Date'
          endcreditfield.focus()
        }else if(clientid ==""){
          errors = "Please Select the Credit Note Client"
          viewcreditclientsfield.focus()
        }
    
        if(!errors){
            $.getJSON(
              '../controllers/reportoperations.php',
              {
                getcreditnotedetails:true,
                clientid
              },
              (data) => {
                let results = ""
    
                if (data && data.length > 0) {
                    data.forEach((client, i) => {
                        results += `<tr data-creditnoteid='${client.creditnoteid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td><input type="checkbox" class="selectedcheckbox"></td>`
                        results += `<td>${client.creditnoteno}</td>`
                        results += `<td>${client.dateadded}</td>`
                        results += `<td>${client.clientname}</td>`
                        results += `<td>${client.amount}</td>`
                        results += `<td>${client.username}</td>`
                        results += `<td>&nbsp;</td>`
                        results += `<td>&nbsp;</td>`
                        results += `<td>&nbsp;</td>`
                        results += `<td style="text-align: center;"><a href="#" class="cancelcreditnote"><i class="fas fa-times fa-lg fa-fw text-danger"></i></a>`
                        results += `<tr>`
                    })
                } else {
                    results += `<tr><td colspan="10" class="text-danger text-center"><strong>No Transactions For ${clientname}.</strong></td></tr>`
                }
                savedcreditnotestable.find("tbody").html(results)
                // makedatatable(savedcreditnotestable,results,25)
          }
            )
        }else{
          creditnotesnotifications.html(showAlert("info", errors))
        }
      })
    
      // select and print creditnotes
      selectallcreditnotes.on('click', function() {
        const isChecked = $(this).prop('checked');
        savedcreditnotestable.find('tbody .selectedcheckbox').prop('checked', isChecked);
    
        if (isChecked) {
            printallcreditnotesbutton.on('click', function() {
              const clientid = creditclientsfield.val()
              let creditNotes = []
    
              savedcreditnotestable.find('tbody .selectedcheckbox:checked').each(function() {
                const $row = $(this).closest('tr'),
                creditnoteno = $row.find('td').eq(2).text().trim(),
                date = $row.find('td').eq(3).text().trim(),
                amount = $row.find('td').eq(5).text()
                // username = $row.find('td').eq(6).text()
    
                creditNotes.push(
                  { "creditnoteno":creditnoteno,
                    "date":date, 
                    "amount":amount
                  }
                )
              });
              $.getJSON(
                '../controllers/reportoperations.php',
                {
                  getcompanydetails: true,
                  getcreditnoteprintdetails:true,
                  clientid
                },
                (data)=>{
                  const company = data.company;
                  const creditnote = data.creditnote;
    
                  data = data[0]
                  if (creditNotes.length > 0) {
                    const logoPath = "http://localhost/fleet/images/tlogo.png";
        
                    const newWin = window.open('');
                    newWin.document.write(`
                      <html>
                        <head>
                          <title>Client Credit Notes</title>
                            <style>
                              body { font-family: Arial, sans-serif; margin: 20px; font-size: 8px; }
                              h2 { text-align: right; margin: 0; }
                              .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
                              .company-info { display: flex; flex-direction: column; flex: 1 1 auto; }
                              .company-box { display: flex; border: 1px solid #000; padding: 5px; align-items: flex-start; }
                              .company-box img { max-height: 60px; margin-right: 10px; }
                              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                              .signature { margin-top: 20px; }
                              .underline { display: inline-block; border-bottom: 1px solid #000; width: 200px; height: 1em; margin-left: 10px; }
                            </style>
                        </head>
                        <body>
                          <h2>CREDIT NOTES</h2>
                          <div class="header">
                            <div class="company-info">
                              <div class="company-box">
                                <img id="logo" src="${logoPath}" alt="Company Logo">
                                <div>
                                    <h3 style="margin:0;">${company.companyname}</h3>
                                    <p style="margin:0;">Nrb</p>
                                    <p style = "margin: 0">${company.postaladdress}</p>
                                    <p style = "margin: 0">Tel: ${company.tel1}</p>
                                    <p style = "margin: 0">Tel: ${company.tel2}</p>
                                    <p style = "margin: 0">${company.email}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style="border:1px solid #000; padding:5px; height:90px; margin-top: 0;vertical-align:top;">
                            <p style="margin:0; line-height:1.5;"><strong>Client Name:</strong> ${creditnote.clientname}</p>
                            <p style="margin:0; line-height:1.5;"><strong>Address:</strong> ${creditnote.address}</p>
                            <p style="margin:0; line-height:1.5;"><strong>Telephone:</strong> ${creditnote.telephone}</p>
                          </div>
                          <h3 style="margin:0; text-align: center; text-decoration: underline; margin-top: 20px; margin-bottom: 20px;">CREDIT NOTES</h3>
                        <!-- Reused style block for table and signatures -->
                        <style>
                          table { width: 100%; border-collapse: collapse; margin-top: 1px; margin-bottom: 20px; }
                          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                          .signature p { margin: 20px 0; font-size: 8px; }
                          .underline { display: inline-block; border-bottom: 1px solid #000; width: 200px; height: 1em; margin-left: 10px; }
                        </style>
                          <table>
                            <tr>
                              <th>CreditNote No</th>
                              <th>Particulars</th>
                              <th>Date</th>
                              <th>Qty</th>
                              <th>Amount</th>
                              <th>Rate</th>
                            </tr>
                    `);
        
                            creditNotes.forEach(note => {
                              newWin.document.write(`
                                <tr style="vertical-align:top; height:100px;">
                                  <td>${note.creditnoteno}</td>
                                  <td>${creditnote.particular}</td>
                                  <td>${note.date}</td>
                                  <td>1</td>
                                  <td>${note.amount}</td>
                                  <td>${creditnote.rate}</td>
                                </tr>
                                `);
                            });
        
                          newWin.document.write(`
                            <tr style="margin-top: 20px;">
                              <td colspan="5" style="text-align: right;"><strong>Sub Total:</strong></td>
                              <td>${creditNotes.reduce((total, note) => total + parseFloat(note.amount), 0).toFixed(2)}</td>
                            </tr>
    
                            <tr>
                              <td colspan="5" style="text-align: right;"><strong>VAT Total:</strong></td>
                              <td>0.00</td>
                            </tr>
                            <tr>
                              <td colspan="5" style="text-align: right;"><strong>Total Value:</strong></td>
                              <td>${creditNotes.reduce((total, note) => total + parseFloat(note.amount), 0).toFixed(2)}</td>
                            </tr>
                          </table>
                      <p><strong>Amount in Words: ${numberToWords(creditNotes.reduce((total, note) => total + parseFloat(note.amount), 0))} ${creditnote.currency} ONLY</strong></p>
                      <p><strong>Declaration:</strong></p>
                      <p>This credit note serves to rectify an overcharge on your account of <strong>${creditnote.invoiceno}</strong>.<p>
                      <p>We apologize for any inconvenience caused and assure you that all particulars are true and correct.</p>
                      <div class="signature">
                        <p><strong>Authorized By:</strong> <span class="underline"></span></p>
                        <p><strong>Signature:</strong> <span class="underline"></span></p>
                        <p><strong>Date:</strong> <span class="underline"></span></p>
                      </div>
                      <hr style="margin: 40px 0;">
                    </body>
                    </html>
                    `);
        
                    const logo = newWin.document.getElementById('logo');
                    logo.onload = function() {
                      newWin.document.close();
                      newWin.print();
                    };
                  } else {
                    printnotifications.html(showAlert("info", 'No credit notes selected.'));
                  }
                }
              ) 
          });
        } else {
          printnotifications.html(showAlert("info", 'Please select the "Select All" checkbox.'));
        }
      });
      // Function to convert numbers to words
      function convertNumberToWords(amount) {
        return amount;
      }
    
      // delete credit Note
      savedcreditnotestable.on("click", ".cancelcreditnote", function(){
        const $row=$(this).closest("tr"),
        creditnoteid = $row.data('creditnoteid'),
        creditnoteno=$row.find("td").eq(2).text()
    
        bootbox.dialog({
          title: "Cancel Credit Note",
          message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete <span class='font-weight-bold'>${creditnoteno}</span> from the system.`,
          buttons: {
            success: {
              label: "No, Keep",
              className: "btn-success btn-sm",
              callback: function(){
                $('.bootbox').modal('hide');
              }
            },
            danger: {
              label: "Yes, Cancel",
              className: "btn-danger btn-sm",
              callback: function(){
                printnotifications.html(showAlert("Processing", "Processing. Please wait...",1))
                  $.post(
                    "../controllers/reportoperations.php",
                    {
                      cancelcreditnote:true,
                      creditnoteid
                    },
                    (data)=>{
                      if(isJSON(data)){
                        data=JSON.parse(data)
                        if (data.status=="success"){
                          printnotifications.html(showAlert("success",`Credit Note No <strong>${creditnoteno}</strong> deleted successfully.`))
                          getcreditnotedetails()
                        }
                      }else{
                        printnotifications.html(showAlert("danger", `Sorry an error occured ${data}`))
                      }
                    }
                  )
                  .fail(() => {
                    printnotifications.html(showAlert("danger", "Request failed. Please try again."));
                  });
              }
            }
          }
        })
      })
    
      




})