$(document).ready(function(){
    const currentmenu=$("#communication")
    setactivemenu(currentmenu)

    // populate the invoice ui table
    const   
    invoicenotifications = $('#invoicenotifications'),
    invoiceid = $('#invoiceid'),
    clientidfield = $('#clientname'),
    clientaddressfield = $('#clientaddress'),
    invoicedatefield = $('#invoicedate'),
    currencyfield =$('#currency'),
    ratefield =$('#rate'),
    oldinvoicenofield = $('#oldinvoiceno'),

    invoicingtable = $('#invoicingtable'),
    totalinvoiceamountfield = $('#totalinvoiceamount'),
    selectdeliveryorderfield = $('#selectdeliveryorder'),
    invoicenotificationstable = $('#invoicenotificationstable'),
    saveinvoicebutton = $('#saveinvoice'),
    taxmodal = $('#taxmodal'),

    inputfield=$('input'),
    selectfield = $('select')

     // Hide all errors when a input field is typed in
    inputfield.on("input",()=>{
        invoicenotifications.html(""),
        invoicenotificationstable.html(""),
        creditnotenotifications.html("")
        
    })

    inputfield.on("change",()=>{
        invoicenotifications.html(""),
        invoicenotificationstable.html(""),
        creditnotenotifications.html("")
        
    })
    
    selectfield.on("change",()=>{
        inputfield.trigger("input")
    })

    function formatDate(value) {
        let date = new Date(value);
        const day = ("0" + date.getDate()).slice(-2); 
        const month = ("0" + (date.getMonth() + 1)).slice(-2);  
        const year = date.getFullYear();
        return year + '-' + month + '-' + day
    }

    // set date picker
    setDatePicker(invoicedatefield,true,false)
    getserverdate().done(()=>{
        invoicedatefield.val(formatDate(serverdate))
    });

    // getalldeliveryorders()
    // getclients(clientidfield, 'Choose')
    getclientstoinvoice(clientidfield, 'Choose')

    function getclients(obj,option='all'){
        // const dfd = $.Deferred()
        $.getJSON(
            "../controllers/invoiceoperations.php",
            {
                getclients:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((clients)=>{
                    results+=`<option value='${clients.clientid}'>${clients.clientname}</option>`
                })
                obj.html(results)
                // dfd.resolve()
            }
        )
        // return dfd.promise()
    }

    function getclientstoinvoice(obj,option='all'){
        // const dfd = $.Deferred()
        $.getJSON(
            "../controllers/invoiceoperations.php",
            {
                getclientstoinvoice:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((clients)=>{
                    results+=`<option value='${clients.clientid}'>${clients.clientname}</option>`
                })
                obj.html(results)
                // dfd.resolve()
            }
        )
        // return dfd.promise()
    }

    

    clientidfield.on('change', function(){
        const clientname = clientidfield.find('option:selected').text(),
        clientid = $(this).val()
        $.getJSON(
            "../controllers/invoiceoperations.php",
            {
                getalldeliveryorders: true,
                clientid
            },
            (data) => {
                if (data && data.length > 0) {
                    clientaddressfield.val(data[0].address)
                    currencyfield.html(`
                        <option value="">&lt;Choose&gt;</option>
                        <option value="${data[0].currencyid}" selected>
                            ${data[0].currencyname}
                        </option>`
                    )
                    
                    ratefield.val(data[0].exchangerate)

                    ratefield.prop("disabled",true)
                    currencyfield.prop("disabled",true)                   
                    
                } else {
                    clientaddressfield.val('No Address Found')
                }
                
                let results = ""
                
                if (data && data.length > 0) {
                    data.forEach((deliveryorder, i) => {
                        results += `<tr data-clientid='${deliveryorder.clientid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td><input type="checkbox" class="selectdeliveryorder"></td>`
                        results += `<td>${deliveryorder.deliveryorderno}</td>`
                        results += `<td>${deliveryorder.dateout}</td>`
                        results += `<td>${deliveryorder.destination}</td>`
                        results += `<td>${deliveryorder.containernumber}</td>`
                        results += `<td>${deliveryorder.exchangerate}</td>`
                        results += `<td>${deliveryorder.currencyname}</td>`
                        results += `<td>${$.number(deliveryorder.amount)}</td>` 
                        results += `<td><input type="checkbox" class="taxdeliveryorder">&nbsp;</td>`
                        // results += `<td><a href="#" class="editdeliveryorder"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                        // results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                    })
                } else {
                    results += `<tr><td colspan="10" class="text-danger text-center"><strong>No Delivery Orders For ${clientname}.</strong></td></tr>`
                }
              
                
                // invoicingtable.find("tbody").html(results)
                makedatatable(invoicingtable,results,25)

                //update total amount when checkboxes are clicked
                invoicingtable.on('click', ".selectdeliveryorder", function() {
                    let totalAmount = 0;
                    invoicingtable.find(".selectdeliveryorder:checked").each(function() {
                        const row = $(this).closest('tr');
                        const amount = row.find('td').eq(8).text().replace(",", "");
                        totalAmount += Number(amount);
                    })
                    
                    totalinvoiceamountfield.closest('.col-md-6').show();
                    totalinvoiceamountfield.html(totalAmount);
                })
            }
        )
    })

  
    // Initialize variables
    let deliveryorders = [];
    
    // Checkbox handling code
    invoicingtable.find('tbody').on('change', '.selectdeliveryorder, .taxdeliveryorder', function() {
        const $row = $(this).closest('tr'),
            clientid = $row.data('clientid'),
            deliveryorderno = $row.find('td').eq(2).text().trim(),
            rawAmount = $row.find('td').eq(8).text().replace(/,/g, "").trim()

            const amount = parseFloat(rawAmount)
            if (isNaN(amount)) {
                console.error("Invalid amount format:", rawAmount);
                return;
            }
    
        // Build the data
        const orderData = {
            clientid: clientidfield.val(),
            deliveryorderno: deliveryorderno,
            amount: amount,
            clientaddress: clientaddressfield.val(),
            invoicedate: invoicedatefield.val(),
            istaxed: $row.find('.taxdeliveryorder').is(':checked')
        };
    
        // Read checkbox states
        const isSelectChecked = $row.find('.selectdeliveryorder').is(':checked');
        const isTaxChecked = $row.find('.taxdeliveryorder').is(':checked');
    
        // Handle tax modal (only when both are checked)
        if (isSelectChecked && isTaxChecked) {
            $('#taxModal').modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            });
        }
    
        // Handle adding or removing orders
        if (isSelectChecked) {
            // Check if already exists (avoid duplicates)
            const exists = deliveryorders.some(order => 
                order.clientid === orderData.clientid && order.deliveryorderno === orderData.deliveryorderno
            );
    
            if (!exists) {
                deliveryorders.push(orderData);
            } else {
                // Update the existing one if tax status changed
                deliveryorders = deliveryorders.map(order => 
                    order.clientid === orderData.clientid && order.deliveryorderno === orderData.deliveryorderno
                        ? orderData
                        : order
                );
            }
        } else {
            // Remove if unchecked
            deliveryorders = deliveryorders.filter(order => 
                order.clientid !== orderData.clientid || order.deliveryorderno !== orderData.deliveryorderno
            )
        }
        totalAmount = deliveryorders.reduce((sum, order) => sum + order.amount, 0);
        document.getElementById('totalinvoiceamountDisplay').textContent = totalAmount.toLocaleString();
    })
    
    
    // getallcurrencies(currencyfield, 'choose')
    // getallcurrencies(currencyfield, 'choose')
    
  
    
    saveinvoicebutton.on('click', function(){
        const clientid = clientidfield.val(),
             clientname = clientidfield.find('option:selected').text(),
            invoicedate = invoicedatefield.val(),
            currency = currencyfield.val(),
            rate = ratefield.val(),
            oldinvoiceno = oldinvoicenofield.val(),
            invoiceditems = []

            console.log(currency);
            console.log(rate);
            console.log(oldinvoiceno);
            
        // Validate and convert date
        if (isNaN(new Date(invoicedate).getTime())) {
            alert("Invalid date format. Use YYYY-MM-DD");
            return;
        }
    
        const formattedDate = new Date(invoicedate).toISOString().split('T')[0]
        let errors = ''
        if(clientid == ""){
            errors = "Please Provide a Client Name"
            clientidfield.focus()
        }
        else if(oldinvoiceno == ""){
            errors = "Please Input the Old Invoice Number"
            oldinvoicenofield.focus()
        }
        
        // else if(currency == ""){
        //     errors = "Please Select the Invoice Currency"
        //     currencyfield.focus()
        // }else if(rate == ""){
        //     errors = "Please Input rate of Currency"
        //     ratefield.focus()
        // }
        
        if(deliveryorders.length === 0){ 
            errors = "Select at least one Delivery Order to Pay"
        }
    
        // Collect delivery orders with amounts and tax status into a single array
        invoicingtable.find('tbody .selectdeliveryorder').each(function() {
            const $row = $(this).closest('tr'),
                deliveryorderno = $row.find('td').eq(2).text().trim(),
                selectCheckbox = $row.find('td').eq(1).find('.selectdeliveryorder'),
                taxCheckbox = $row.find('td').eq(9).find('.taxdeliveryorder'),
                tax = taxCheckbox.is(':checked') ? 1 : 0,
                // amount = $row.find('td').eq(8).text().replace(",", "")
                amount = $row.find('td').eq(8).text().replace(/,/g, "").trim()

    
            // Validate deliveryorderno
            if(deliveryorderno) {
                // Only include delivery orders where the "select" checkbox is checked
                if(selectCheckbox.is(':checked')) {
                    invoiceditems.push({"deliveryorderno": deliveryorderno,"amount": amount,"tax": tax})
                }
            } else {
                errors = "Missing delivery order number in row";
                invoicenotificationstable.html(showAlert("danger", errors));
                return false; 
            }
        })
    
        
        if(invoiceditems.length === 0) {
            errors = "Please select at least one delivery order to pay"
            invoicenotificationstable.html(showAlert("info", errors))
            return;
        }
    
        if(!errors) {
            $.post(
                "../controllers/invoiceoperations.php",
                {
                    saveinvoices: true,
                    clientid,
                    invoicedate: formattedDate,
                    oldinvoiceno,
                    // currency,
                    // rate,
                    invoiceditems: JSON.stringify(invoiceditems) 
                },
                (data) => {
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status === "success") {
                            invoicenotificationstable.html(showAlert("success",`Success <strong>${clientname}</strong> has been Successfully Invoiced`))
                            setTimeout(()=>{
                                invoicenotificationstable.html("")
                            },2000)
                        }else if (data.status == "exists") {
                            invoicenotificationstable.html(showAlert("info", `Sorry, the <strong>Delivery Order </strong>already exists in the system`))
                        }
                    }else {
                        invoicenotificationstable.html(showAlert("danger", `Sorry an error has occurred ${data}`))
                    }
                }
            )
        }else {
            invoicenotificationstable.html(showAlert("info", errors))
        }
    })
    
    const creditclientsfield = $('#chooseclient'),
        invoiceclientphonenofield = $('#invoiceclientphoneno'),
        invoiceclientaddressfield = $('#invoiceclientaddress'),
        invoiceddatefield = $('#invoiceddate')

        // disable the fields
    invoiceclientphonenofield.prop('disabled', true)
    invoiceclientaddressfield.prop('disabled', true)
    invoiceddatefield.prop('disabled', true)

    // getcreditclients(creditclientsfield, 'Choose')

    function getcreditclients(obj, option = 'all') {
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getstatementclients:true
            },
            (data) => {
                
                let results = option === 'all'? "<option value='0'>&lt;All&gt;</option>" : "<option value=''> &lt;Choose&gt;</option>"
                data.forEach((client) => {
                    results += `<option value='${client.clientid}'>${client.clientname}</option>`
                });
    
                obj.html(results);
                
            }
        )
        // return dfd.promise()
    }

    getinvoicedclients(creditclientsfield, 'Choose')
    function getinvoicedclients(obj, option = 'all') {
        $.getJSON(
            "../controllers/invoiceoperations.php",
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
            "../controllers/invoiceoperations.php",
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
                "../controllers/invoiceoperations.php",
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

    // view invoice tab
    const startdatefield = $('#startdate'),
        enddatefield = $('#enddate'),
        applyfilterbutton = $('#filterinvoice'),
        filternotifications = $('#filternotifications'),
        invoicestablenotifications = $('#invoicesnotifications'),
        savedinvoicestable = $('#savedinvoicestable'),
         invoicedclientsidfield=$("#invoicedclients"),
        invoicecurrenyfield=$("#invoicecurreny"),
        invoicestatusfield=$("#invoicestatus"),
        invoicealldatescheckbox=$("#invoicealldates")
    
    
        
    // set date pickers

    setDatePicker(startdatefield,true,false)
    setDatePicker(enddatefield,true,false)
    getserverdate().done(() => {
        startdatefield.val(formatDate(serverdate))
    })
    getserverdate().done(() =>{
        enddatefield.val(formatDate(serverdate))
    })

    getinvoicedclients(invoicedclientsidfield,'choose')
    getallcurrencies(invoicecurrenyfield,'choose')

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

    applyfilterbutton.on('click', function(e) {
        e.preventDefault();
        getfilteredinvoices();
    })

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
        invoiceno = parent.find("td").eq(1).text()

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
        })
    })

})
    
    



     
    



    
  
    
   




    
    


   
    
    
    
    

