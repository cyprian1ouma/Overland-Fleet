$(document).ready(function(){
  const currentmenu=$("#report")
  setactivemenu(currentmenu)

  // statements tab
  const 
  statementclientsfield = $('#statementclients'),
  fromfield = $('#startstatement'),
  tofield = $('#endstatement'),
  statetementstable = $('#statementstable'),
  statementnotifications = $('#statementnotifications'),
  statementcurrency=$("#statementcurrency"),

  // view invoice tab
  startdatefield = $('#startdate'),
  enddatefield = $('#enddate'),
  applyfilterbutton = $('#filterinvoice'),
  filternotifications = $('#filternotifications'),
  invoicestablenotifications = $('#invoicesnotifications'),
  savedinvoicestable = $('#savedinvoicestable'),

  //View Tracker
  trackerstartdate=$("#trackerstart"),
  trackerenddate=$("#trackerend"),
  filtertrackerbutton=$("#filtertracker"),
  trackerstatusfield=$("#trackerstatus"),
  filteralldates=$("#filteralldates"),
  trackertable=$("#trackertable"),
  trackerfilternotifications=$("#trackerfilternotifications"),

  inputfield=$('input'),
  selectfield = $('select')

  // Hide all errors when a input field is typed in
  inputfield.on("input",()=>{
    statementnotifications.html(""),
    creditnotesnotifications.html(""),
    printnotifications.html("")
      
  })

  inputfield.on("change",()=>{
    statementnotifications.html(""),
    creditnotesnotifications.html(""),
    printnotifications.html("")
      
  })
  
  selectfield.on("change",()=>{
    inputfield.trigger("input")
  })

  filteralldates.prop("checked",true)
  togglefilterdatedisabledstatus()

  function togglefilterdatedisabledstatus(){
        const status=filteralldates.prop("checked")
        trackerstartdate.prop("disabled",status)
        trackerenddate.prop("disabled",status)
    }

  filteralldates.on("click",()=>{
      togglefilterdatedisabledstatus()
    })

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


  setDatePicker(fromfield,true,false)
  getserverdate().done(() =>{
    fromfield.val(formatDate(serverdate))
  })

  setDatePicker(tofield,true,false)
  getserverdate().done(() =>{
    tofield.val(formatDate(serverdate))
  })

  // view invoices tab
  setDatePicker(startdatefield,true,false)
  setDatePicker(enddatefield,true,false)
  getserverdate().done(() => {
      startdatefield.val(formatDate(serverdate))
  })
  getserverdate().done(() =>{
      enddatefield.val(formatDate(serverdate))
  })


  // view Trackers tab
  setDatePicker(trackerstartdate,true,false)
  setDatePicker(trackerenddate,true,false)
  getserverdate().done(() => {
      trackerstartdate.val(formatDate(serverdate))
  })
  getserverdate().done(() =>{
      trackerenddate.val(formatDate(serverdate))
  })

  // populate the clients field
  getstatementclients(statementclientsfield, 'Choose');
  function getstatementclients(obj, option = 'all') {
      // console.log("getstatementclients() called"); 
      // const dfd = $.Deferred()
      $.getJSON(
          "../controllers/receivablesoperations.php",
          {
              getstatementclients:true
          },
          (data) => {
              // console.log("Client data:", data)
              let results = option === 'all'? "<option value='0'>&lt;All&gt;</option>" : "<option value=''> &lt;Choose&gt;</option>"
              data.forEach((client) => {
                results += `<option value='${client.clientid}'>${client.clientname}</option>`
              });
  
              obj.html(results);
              // dfd.resolve()
          }
      )
      // return dfd.promise()
  }

  // generate statement button
  const generatestatementbutton = $('#generatestatement')
  getallcurrencies(statementcurrency,'choose')

  generatestatementbutton.on('click', function(){
      const clientname = statementclientsfield.find('option:selected').text(),
      clientsfield = statementclientsfield.val(),
      datefrom = fromfield.val(),
      dateto = tofield.val(),
      clientid = statementclientsfield.val(),
      currencyid=statementcurrency.val()

      let errors = ''

      if(clientsfield == ""){
          errors = "Please Select a Client"
          statementclientsfield.focus()
      }
      else if(datefrom == ""){
          errors = "Please Select the Statement Start Date"
          fromfield.focus()
      }else if(tofield == ""){
          errors = "Please Select the Statement End Date"
          tofield.focus()
      }

      if(!errors){
          $.getJSON(
              "../controllers/receivablesoperations.php",
              {
                  getstatement: true,
                  clientid,
                  datefrom,
                  dateto,
                  statementcurrency:currencyid
              },
              (data) => {
                  let results = ""
                  if(data && data.length > 0) {
                      data.forEach((client, i) => {
                        results += `<tr data-clientid='${client.clientid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${client.transactdate}</td>`
                        results += `<td>${client.Ref}</td>`
                        results += `<td>${client.naration}</td>`
                        results += `<td>${$.number(client.amount)}</td>`
                        // results += `<td>${client.amountdue}</td>`
                        results += `<tr>`
                      })
                  }else {
                    results += `<tr><td colspan="10" class="text-danger text-center"><strong>No Transactions For ${clientname}.</strong></td></tr>`
                  }
                statetementstable.find("tbody").html(results)
              }
            )
      }else {
        statementnotifications.html(showAlert("info", errors));
      }
  })
 
  

  // Print button logic
  const printstatementbutton = $('#printstatement') 

    printstatementbutton.on("click", () => {
      const clientid = statementclientsfield.val();
      const startdate = fromfield.val();
      const enddate = tofield.val();
      const currencyid=statementcurrency.val();
      
      
      // Validate inputs
      if (!clientid || !currencyid) {
          alert('Please select client, Currency');
          return;
      }
      
      console.log(clientid, startdate, enddate, currencyid);
      window.open(`../views/reports/transactionstatements.php?clientid=${clientid}&startdate=${startdate}&enddate=${enddate}`, "_blank");
    });

  
  // window.open(`../views/reports/transactionstatements.php?clientid=${clientid}`, "_blank");
  
  // view the invoices saved
  getallinvoices()
  function getallinvoices(){
    $.getJSON(
      "../controllers/invoiceoperations.php",
      {
        getallinvoices:true
      },
      (data) => {
        let results = ""
        data.forEach((invoice, i) => {
          results += `<tr data-invoiceid='${invoice.invoiceid}'>`
          results += `<td>${Number(i + 1)}</td>`
          results += `<td>${invoice.invoiceno}</td>`
          results += `<td>${invoice.invoicedate}</td>`
          results += `<td>${invoice.clientname}</td>`
          // results += `<td>${invoice.deliveryorderno}</td>`
          results += `<td>${$.number(invoice.amount)}</td>`
          results += `<td>` // Actions
          results += `<a href="#" class="deleteinvoice"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a> `
          results += `<a href="#" class="printinvoice"><i class="fal fa-print fa-lg fa-fw text-info"></i></a>`
          results += `</td></tr>`;
        });
          
          
          savedinvoicestable.find("tbody").html(results,10) 
          // makedatatable(savedinvoicestable,results,25) 
        }
    ) 
  }

  applyfilterbutton.on('click', function(e) {
    e.preventDefault();
    getfilteredinvoices();
  })

  const invoicedclientsidfield=$("#invoicedclients"),
    invoicecurrenyfield=$("#invoicecurreny"),
    invoicestatusfield=$("#invoicestatus"),
    invoicealldatescheckbox=$("#invoicealldates")

  getinvoicedclients(invoicedclientsidfield,'choose')
  getallcurrencies(invoicecurrenyfield,'choose')
 

  // disable the invoice date field

  invoicealldatescheckbox.prop("checked", true)
  startdatefield.prop("disabled", true)
  enddatefield.prop("disabled", true)

  invoicealldatescheckbox.on("click", function () {
    const isChecked = $(this).prop("checked")
      startdatefield.prop("disabled", isChecked)
      enddatefield.prop("disabled", isChecked)
  })
  

  function getinvoicedclients(obj, option = 'all'){
    $.getJSON(
      '../controllers/reportoperations.php',
      {
        getinvoicedclient:true
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

  function getfilteredinvoices() {
    const startdate = startdatefield.val(),
    enddate = enddatefield.val(),
    clientid= invoicedclientsidfield.val(),
    invoicecurrency= invoicecurrenyfield.val(),
    invoicestatus=invoicestatusfield.val(),
    ischecked = invoicealldatescheckbox.prop("checked") ? 1 : 0   

    let errors = "";

    if(clientid==""){
      errors="Please choose the client"
      invoicedclientsidfield.focus()
    }
    else if (startdate == "") {
      errors = "Please Select Start Date";
      startdatefield.focus();
    } else if (enddate == "") {
      errors = "Please Select End Date";
      enddatefield.focus();
    }

    if (errors == "") {
      
      $.getJSON(
        "../controllers/invoiceoperations.php",
        {
          getfilteredinvoices: true,
          clientid:clientid,
          startdate: startdate,  
          enddate: enddate,
          invoicecurrency:invoicecurrency,  
          invoicestatus:invoicestatus,
          ischecked:ischecked
        },
        (data) => {
          let results = "";

          if (data.length > 0) {
            data.forEach((invoice, i) => {
              results += `<tr data-invoiceid='${invoice.invoiceid}'>`
              results += `<td>${Number(i + 1)}</td>`
              results += `<td> #${invoice.invoiceno}</td>`
              results += `<td>${invoice.invoicedate}</td>`
              results += `<td>${invoice.clientname}</td>`
              // results += `<td>${invoice.deliveryorderno}</td>`
              results += `<td>${$.number(invoice.amount)}</td>`
              results += `<td>` // Actions
              results += `<a href="#" class="deleteinvoice"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a> `
              results += `<a href="#" class="printinvoice"><i class="fal fa-print fa-lg fa-fw text-info"></i></a>`
              results += `</td></tr>`;
            });

          } else {
            filternotifications.html(showAlert("info",`Sorry there is no invoice for either client chosen or the date rage`))
            invoicedclientsidfield.focus()
            setTimeout(()=>{
              filternotifications.html("")
            },4000)

          }

          savedinvoicestable.find("tbody").html(results)
          // makedatatable(savedinvoicestable,results,25) 
        }
      )
    } else {
      filternotifications.html(showAlert("info", errors))
    }
  }

  // Print invoice
  const invoicebankdetailsconfirmationmodal=$("#invoicebankdetailsconfirmation"),
   addbankdetailsbutton=$("#addbankdetailsbutton"),
   printinoicebuttion = $("#printinoicebuttion"),
   invoicebankdetailsmodal=$("#invoicebankdetailsmodal"),
   invoicebankusddetail=$("#invoicebankusddetail"),
   invoicekashbankdetail=$("#invoicekashbankdetail"),
   attachbanksdetailsbutton =$("#attachbanksdetails")


  savedinvoicestable.on('click', '.printinvoice', function () {
      const invoiceid = $(this).closest('tr').data('invoiceid');
      console.log(invoiceid);
      

      invoicebankdetailsconfirmationmodal.modal("show");

      addbankdetailsbutton.off("click").on("click", function () {

          invoicebankdetailsconfirmationmodal.modal("hide")
          invoicebankdetailsmodal.modal("show")
      })

      attachbanksdetailsbutton.off("click").on("click", function () {
        let bankstatus = null;
    
        const usd = invoicebankusddetail.is(":checked");
        const ksh = invoicekashbankdetail.is(":checked");
    
        if (usd && ksh) {
            bankstatus = 2 
        } else if (usd) {
            bankstatus = 1
        } else if (ksh) {
            bankstatus = 0
        }
    
        invoicebankdetailsmodal.modal("hide");
    
        // Open invoice with correct bank status
        window.open(`../views/reports/invoicestatement.php?invoiceid=${invoiceid}&bankstatus=${bankstatus}`, "_blank");
    
        // Uncheck boxes
        setTimeout(()=> {
            invoicebankusddetail.prop("checked", false)
            invoicekashbankdetail.prop("checked", false)
        }, 500)
    })

      printinoicebuttion.off("click").on("click", function () {
          invoicebankdetailsconfirmationmodal.modal("hide");

          // Print without bank details
          window.open(`../views/reports/invoicestatement.php?invoiceid=${invoiceid}`, "_blank")
      })
  })
  

  // delete invoice
 savedinvoicestable.on("click", ".deleteinvoice", function(){
    const parent = $(this).closest("tr"),
    invoiceid = parent.data('invoiceid'),
    invoiceno = parent.find("td").eq(1).text();

    bootbox.dialog({
      title: "Delete Invoice",
      message: `Are you sure you want to delete <strong>${invoiceno}</strong> from the system? <i class='fal fa-question-circle fa-2x text-primary'></i>`,
      buttons: {
        success: {
          label: "No, Keep",
          className: "btn-success btn-sm",
          callback: function(){
            $('.bootbox').modal('hide');
          }
        },
        danger: {
          label: "Yes, Delete",
          className: "btn-danger btn-sm",
          callback: function(){
            invoicestablenotifications.html(showAlert("Processing", "Processing. Please wait...", 1));
            $.post(
                      "../controllers/reportoperations.php",
                      {
                        deleteinvoice: true,
                        invoiceid: invoiceid
                      },
                    (data)=>{
                      if (isJSON(data)){
                        data=JSON.parse(data)
                        if (data.status=="success"){
                          invoicestablenotifications.html(showAlert("success", `Invoice No <strong>${invoiceno}</strong> deleted successfully.`));
                          getallinvoices()
                          setTimeout(() => {
                              invoicestablenotifications.html("")
                          }, 2000);
                        }else if (data.status=="exists"){
                          invoicestablenotifications.html(showAlert("exists", `Invoice Already paid, delete Associated receipt first`));
                        }else{
                          invoicestablenotifications.html(showAlert("danger", `An error occurred ${data}`));
                        }
                      }
                    }
                )
            }
        }
      }
    });
});


  // view credit notes tab
  const startcreditfield = $('#startcredit'),
  endcreditfield = $('#endcredit'),
  filtercreditnotebutton = $('#filtercreditnote'),
  creditclientsfield =$('#creditclients'),
  creditnotesnotifications = $('#viewcreditnotesnotifications'),
  savedcreditnotestable = $('#savedcreditnotestable'),
  selectallcreditnotes = $('#selectallcreditnotes'),
  printnotifications = $('#printnotifications'),
  printallcreditnotesbutton = $('#printallcreditnotes')

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
  getclients(creditclientsfield, 'Choose')

  function getclients(obj, option = 'all'){
    $.getJSON(
      '../controllers/allocationoperations.php',
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

  // get the creditnotes
  filtercreditnotebutton.on('click', function(){
    const startdate = startcreditfield.val(),
    enddate = endcreditfield.val(),
    clientname = creditclientsfield.find('option:selected').text(),
    clientid = creditclientsfield.val()

    let errors = ""

    if(startdate == ""){
      errors = 'Please Select Credit Note Start Date'
      startcreditfield.focus()
    }else if(enddate==""){
      errors = 'Please Select Credit Note End Date'
      endcreditfield.focus()
    }else if(clientid ==""){
      errors = "Please Select the Credit Note Client"
      creditclientsfield.focus()
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

  filtertrackerbutton.on('click', function(){
      const startdate=filteralldates.prop("checked")?'01-Jan-2022':trackerstartdate.val()
      const enddate=filteralldates.prop("checked")?'31-Dec-2100':trackerenddate.val()
      const status = trackerstatusfield.val()

      console.log(status);
      

      let errors=""
      // check for blank fields
      if(startdate===""){
          errors="Please select start date"
          trackerstartdate.focus()
      }else if(enddate===""){
          errors="Please select end date"
          trackerenddate.focus()
      }

      if(errors==""){
          $.getJSON(
              "../controllers/reportoperations.php",
              {
                  filtertracker:true,
                  startdate,
                  enddate,
                  status 
              },
              (data)=>{
                  let results=""
                  if (data && data.length > 0) {
                    data.forEach((tracker, i) => {
                        results += `<tr data-allocationid='${tracker.allocationid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        // results += `<td><input type="checkbox" class="selectedcheckbox"></td>`
                        results += `<td>${tracker.trucknumber}</td>`
                        results += `<td>${formatDate(tracker.dateout)}</td>`
                        results += `<td>${tracker.destination}</td>`
                        results += `<td>${tracker.clientname}</td>`
                        results += `<td>${tracker.containernumber}</td>`
                        results += `<td>${tracker.deportname?tracker.deportname:" "}</td>`
                        results += `<td>${tracker.cargodeliverystatus?tracker.cargodeliverystatus:" "}</td>`
                        results += `<td>${tracker.returndeportstatus?tracker.returndeportstatus:" "}</td>`
                        results += `<td>${tracker.qurantee?tracker.qurantee:""}</td>`
                        results += `<td>${tracker.deliveryinterchange?tracker.deliveryinterchange:""}</td>`
                        results += `<td>${tracker.invoiced}</td>`
                        results += `<td>${tracker.chequestatus}</td>`
                        results += `<td>${tracker.clientinterchange?tracker.clientinterchange:""}</td>`
                        results += `<td>${tracker.comments}</td>`
                        results += `<td style="text-align: center;"><a href="#" class="addreporttrackerrecords"><i class="fas fa-plus-circle fa-lg fa-fw text-primary"></i></a>`
                        results += `</tr>`
                })
          } else {
            trackerfilternotifications.html(showAlert("info", 'No Transactions found'))  
            // results += `<tr><td colspan="10" class="text-danger text-center"><strong>No Transactions For ${clientname}.</strong></td></tr>`
          }
          trackertable.find("tbody").html(results)
        }
      )
    }else{
      trackerfilternotifications.html(showAlert("info", errors))
    }

  })


  // invoice tracker Details
  const reporttrackertmodal= $("#reporttrackertmodal"),
    reporttrcakernotifications = $("#reporttrcakernotifications"),
    containerdeportstatusidfield = $("#containerdeportstatusid"),
    containerdeportnamefield = $("#containerdeportname"),
    addcontainerdeportnamebutton= $("#addcontainerdeportname"),
    containerdeportothernamefield = $("#containerdeportothername"),
    deliverystatusfield = $("#deliverystatus"),
    containerreturndeportfield = $("#containerreturndeport"),
    guaranteestatusfeild = $("#guaranteestatus"),
    driverinterchangecollectionfeld = $("#driverinterchangecollection"),
    clinetinterchangereturnfield = $("#clinetinterchangereturn"),
    savereporttrackerbutton = $("#savereporttracker"),
    saveotherdeportnamebutton = $("#saveotherdeportname"),
    containerdeportotheridfield = $("#containerdeportotherid"),
    closereporttrackerbutton = $("#closereporttracker")
    
    // populate the container deport field
    getcontainerdeport(containerdeportnamefield,'choose')
    function getcontainerdeport(obj,option='all'){
      $.getJSON(
          "../controllers/reportoperations.php",
          {
              getcontainerdeport:true
          },
          (data)=>{
              let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
              data.forEach((deport)=>{
                  results+=`<option value='${deport.deportid}'>${deport.deportname}</option>`
              })
              obj.html(results)
          }
      )
    }

  addcontainerdeportnamebutton.on("click",()=>{
    containerdeportothernamefield.show()
    containerdeportnamefield.prop("disabled",true)
    saveotherdeportnamebutton.show()
  })

  getinterchangestatus(trackerstatusfield,'choose')
  getinterchangestatus(driverinterchangecollectionfeld,'choose')
  
  
  function getinterchangestatus(obj){
    $.getJSON(
        "../controllers/reportoperations.php",
        { getinterchangestatus: true },
        (data) => {
            let results = "";
            data.forEach((row) => {
                results += `<option value="${row.deliveryinterchange}">${row.deliveryinterchange}</option>`;
            });
            obj.append(results)
        }
    )
}

  saveotherdeportnamebutton.on("click",()=>{
    const deportid = containerdeportotheridfield.val(),
      otherdeportname=containerdeportothernamefield.val()

    let errors=""
    if(otherdeportname==""){
      errors="Please input the other container deport name"
      containerdeportothernamefield.focus()
    }
      if(errors==""){
        $.post(
          "../controllers/reportoperations.php",
          {
            savecontainerdeportname:true,
            deportid,
            otherdeportname
          },
          (data)=>{
            if(isJSON(data)){
              data=JSON.parse(data)
              if(data.status=="success"){
                reporttrcakernotifications.html(showAlert("success", "Other container deport name saved successfully."))
                // repopulate the container deport field
                getcontainerdeport(containerdeportnamefield,'choose')
                setTimeout(()=>{
                  reporttrcakernotifications.html("")
                  containerdeportothernamefield.hide()
                  containerdeportnamefield.prop("disabled",false)
                  saveotherdeportnamebutton.hide()
                },2000)
              }
            }else{
              reporttrcakernotifications.html(showAlert("danger", `Sorry an error occured ${data}`))
            }
          }
        )
      }else{
        reporttrcakernotifications.html(showAlert("info", errors))
      }
  })

  // show the modal
  trackertable.on("click", ".addreporttrackerrecords", function(){
      const $row=$(this).closest("tr"),
        allocationid = $row.data('allocationid')
        console.log(allocationid);

        $.getJSON(
          "../controllers/reportoperations.php",
            {
              getreporttrackerdetails:true,
              allocationid
            },
            (data)=>{

            //   data=data[0]
            //   if(data==''){
              
            //   containerdeportstatusidfield.val(0),
            //   containerdeportnamefield.prop("disabled",false),
            //   deliverystatusfield.prop("disabled",false),
            //   containerreturndeportfield.prop("disabled",false),
            //   guaranteestatusfeild.prop("disabled",false),
            //   driverinterchangecollectionfeld.prop("disabled",false),
            //   clinetinterchangereturnfield.prop("disabled",false)
            // }else{
              
            //   containerdeportstatusidfield.val(data.statusid),
            //   containerdeportnamefield.val(data.containerdeportid).prop("disabled", true)
            //   deliverystatusfield.val(data.cargodeliverystatus).prop("disabled", true)
            //   containerreturndeportfield.val(data.returndeportstatus).prop("disabled", true)
            //   guaranteestatusfeild.val(data.qurantee).prop("disabled", true)
            //   driverinterchangecollectionfeld.val(data.deliveryinterchange).prop("disable",true),
            //   clinetinterchangereturnfield.val(data.clientinterchange).prop("disabled", true)
            // }

            // after console.log(data);
            data = data[0];

              // If no data at all
              if (!data) {

                containerdeportstatusidfield.val(0);

                containerdeportnamefield.val("").prop("disabled", false);
                deliverystatusfield.val("").prop("disabled", false);
                containerreturndeportfield.val("").prop("disabled", false);
                guaranteestatusfeild.val("").prop("disabled", false);
                driverinterchangecollectionfeld.val("").prop("disabled", false);
                clinetinterchangereturnfield.val("").prop("disabled", false);

              } else {

                // container depot id
                containerdeportstatusidfield.val(data.statusid || 0);
                containerdeportnamefield .val(data.containerdeportid || "").prop("disabled", data.containerdeportid ? true : false);
                deliverystatusfield.val(data.cargodeliverystatus || "").prop("disabled", data.cargodeliverystatus ? true : false);
                containerreturndeportfield.val(data.returndeportstatus || "").prop("disabled", data.returndeportstatus ? true : false);
                guaranteestatusfeild.val(data.qurantee || "").prop("disabled", data.qurantee ? true : false);
                driverinterchangecollectionfeld.val(data.deliveryinterchange || "").prop("disabled", data.deliveryinterchange ? true : false);
                clinetinterchangereturnfield.val(data.clientinterchange || "").prop("disabled", data.clientinterchange ? true : false);

              }


          }


         )
        reporttrackertmodal.modal("show")

        savereporttrackerbutton.off("click").on("click", ()=>{
          const containerdeportstatusid=containerdeportstatusidfield.val(),
            containerdeportid= containerdeportnamefield.val(),
            deliverystatus=deliverystatusfield.val(),
            containerreturnstatus=containerreturndeportfield.val(),
            guaranteestatus=guaranteestatusfeild.val(),
            driverinterchangecollection=driverinterchangecollectionfeld.val(),
            clinetinterchangereturn=clinetinterchangereturnfield.val()

          let errors=""

          if(containerdeportid==""){
            errors="Please select the container Deport"
            containerdeportnamefield.focus()
          }else if(deliverystatus==""){
            errors="Please input the delivery status"
            deliverystatusfield.focus()
          }
          //  if(containerdeportstatusid > 0){
          //    containerdeportstatusid=containerdeportstatusidfield.val()
          // }
          // else if(containerreturnstatus==""){
          //   errors="Please input the container return status"
          //   containerreturndeportfield.focus()
          // }else if(guaranteestatus==""){
          //   errors="Please input the guarantee status"
          //   guaranteestatusfeild.focus()
          // }else if(driverinterchangecollection==""){
          //   errors="Please input the interchange collection status"
          //   driverinterchangecollectionfeld.focus()
          // }else if(clinetinterchangereturn==""){
          //   errors="Please input the interchange return status"
          //   clinetinterchangereturnfield.focus()
          // }

          if(errors==""){
            $.post(
              "../controllers/reportoperations.php",
              {
                savecontainerdeliverystatus:true,
                containerdeportstatusid,
                allocationid,
                containerdeportid,
                deliverystatus,
                containerreturnstatus,
                guaranteestatus,
                driverinterchangecollection,
                clinetinterchangereturn
              },
              (data)=>{ 
                if(isJSON(data)){
                  data=JSON.parse(data)
                  if(data.status=="success"){
                    reporttrcakernotifications.html(showAlert("success", "Tracker record saved successfully."))
                    setTimeout(()=>{
                      reporttrackertmodal.modal("hide")
                      reporttrcakernotifications.html("")
                      clearreporttrackerfields()
                    },2000)
                  }
                }else{
                  reporttrcakernotifications.html(showAlert("danger", `Sorry an error occured ${data}`))
                }
              }
            )
          }else{
            reporttrcakernotifications.html(showAlert("info", errors))
          }
        })
      }
  )

  
  // clear field
  function clearreporttrackerfields(){
      containerdeportstatusidfield.val(0),
      containerdeportnamefield.val("").prop("disable",true)
      deliverystatusfield.val(""),
      containerreturndeportfield.val(""),
      guaranteestatusfeild.val(""),
      driverinterchangecollectionfeld.val(""),
      clinetinterchangereturnfield.val("")
  }

  closereporttrackerbutton.on("click",()=>{
      // reporttrackertmodal.modal("hide")
      clearreporttrackerfields()
  })

  //  // get allocation details
  // trackertable.on("click",".addreporttrackerrecords",()=>{
  //   const $row=$(this).closest("tr"),
  //       allocationid = $row.data('allocationid')
  //       // console.log(allocationid);
  //       // reporttrackertmodal.modal("show")
        
  // })
  //  function getreporttrackerdetails(allocationid){

  //  }
   
    const exportlist=$("#exportlist")
    
    exportlist.on("click",()=>{
        const tableid="tracker"
        const documentname=`tracker_schedule`
        const sheetname="tracker_list"
        exporttable(tableid,sheetname,documentname)
    })
      
})