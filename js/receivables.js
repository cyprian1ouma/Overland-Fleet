$(document).ready(function(){
    const currentmenu=$("#receivables")
    setactivemenu(currentmenu)
    // payments tab
    const paidinvoicestable = $('#paidinvoicestable'),
    clientidhidden =$('#clientid'),
    clientslistview1 = $('#clientslist3'),
    clientidfield1 = $('#lblclientid1'),
    clientnamefield1 = $('#lblclientname1'),
    balancedue1dfield = $('#lblbalancedue1'),
    oldestcharge1field = $('#lbloldestcharge1'),
    inputfield = $('#input'),
    selectfield = $('#select')

    // Hide all errors when a input field is typed in
    inputfield.on("input",()=>{
        paymentnotifications.html(""),
        payinvoicesnotifications.html(""),
        invoicenotifications.html(""),
        receiptnotifications.html("")
        
    })

     inputfield.on("change",()=>{
        paymentnotifications.html(""),
        payinvoicesnotifications.html(""),
        invoicenotifications.html(""),
        receiptnotifications.html("")
        
    })


    
    selectfield.on("change",()=>{
        inputfield.trigger("input")
    })

    let selectedClients1= [];

    function setupClientList(clientslistview1, clientNames) {
        clientslistview1.empty()
        clientNames.forEach((clientData, index) => {
            let clientItem = $('<li>')
                .data("clientid", clientData.clientid) 
                .text(`${index + 1}. ${clientData.clientname}`)
            clientItem.on('click', function() {
                $(this).toggleClass('selected')
                
                if ($(this).hasClass('selected')) {
                    selectedClients1.push({
                        clientId: clientData.clientid,
                        clientName: clientData.clientname
                    })
                } else {
                    selectedClients1 = selectedClients1.filter(client => client.clientId !== clientData.clientid)
                }
            })

            clientslistview1.append(clientItem)
        })
    }

    // payments tab
    getallinvoicedclients1()
    function getallinvoicedclients1() {
        $.getJSON(
            "../controllers/receivablesoperations.php", 
            { 
                getallinvoicedclients: true
            }, 
            (data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setupClientList(clientslistview1, data)
                } else {
                    console.error('No client data received')
                }
            }
        );
    }

    clientslistview1.on("click", "li", function() {
        const selectedclientid = $(this).data("clientid")
        //  console.log(selectedclientid);
         
        clientidhidden.val(selectedclientid)
        $.getJSON(
            "../controllers/receivablesoperations.php",
            {
                getallinvoicedclientsdetails: true,
                selectedclientid: selectedclientid  
            },
            (data) => {
           
                if (data.length > 0) {
                    let results = ""
                    let clientDetails = data[0]

                    clientidfield1.text(clientDetails.clientid)
                    clientnamefield1.text(clientDetails.clientname)
                    balancedue1dfield.text(clientDetails.amountdue)

                    data.forEach((client, i) => {
                        results += `<tr data-clientid='${client.clientid}' data-invoiceid ='${client.invoiceid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${client.invoicedate}</td>`
                        results += `<td>${client.invoiceno}</td>`
                        results += `<td>${client.invoiceamount}</td>`
                        results += `<td>${client.amountpaid}</td>`
                        results += `<td>${client.amountdue}</td>`
                        results += `<td>${client.payment}</td>`
                        results += `<td><input type="checkbox" class="selectedcheckbox"></td>`;
                        results += `</tr>`
                    });
                    clientidfield1.val(data.clientid)



                    paidinvoicestable.find("tbody").html(results)
                    if(results){
                        paymentnotifications.html("")
                    }else if(results == ""){
                        paymentnotifications.html(showAlert("info","No invoiced client details found."))
                    }
                } else {
                    paymentnotifications.html(showAlert("info","No invoiced client details found."))
                }
            }
        )

    })

    jQuery('#searchbynames1').on('keyup', function() {
        var searchValue = $(this).val().toLowerCase();
        $('#clientslist3 li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
    })
    jQuery('ul').css('cursor', 'pointer');




    // transactions tab
    const
    clientslistview = $('#clientslist4'),
    clientidfield= $('#lblclientid'),
    clientnamefield = $('#lblclientname'),
    balanceduefield = $('#lblbalancedue'),
    oldestchargefield = $('#lbloldestcharge'),
    startdatefield = $('#from'),
    enddatefield = $('#to'),
    filterbutton = $('#filter'),
    allbutton = $('#all'),
    invoicenotifications = $('#invoicenotifications'),
    invoicetable = $('#viewinvoicestable1'),
    paymentmodal = $('#paymentsmodal')

    // getalltransactionclients
    getalltransactionclients()
    function getalltransactionclients(){
        $.getJSON(
            "../controllers/receivablesoperations.php",
            {
                getalltransactionclients:true
            },
            (data)=>{
                let results = ''
                data.forEach(client => {
                    results += `<li data-clientid="${client.clientid}">${client.clientname}</li>`
                })
                clientslistview.html(results)

            }
        )
    }

  
    setDatePicker(startdatefield,true,false)
    getserverdate().done(()=>{
        startdatefield.val(formatDate(serverdate))
    });

    setDatePicker(enddatefield,true,false)
    getserverdate().done(()=>{
        enddatefield.val(formatDate(serverdate))
    });

    //refresh button
    const invoicerefreshbutton = $('#invoicerefresh')

    invoicerefreshbutton.on("click", function(){
        startdatefield.val(""),
        enddatefield.val(""),
        invoicetable.find("tbody").html(""),
        invoicenotifications.html("")
    })

    clientslistview.on("click", "li", function() { 
        const clientid = $(this).data('clientid');
        clientidfield.val(clientid);
        const datefrom = startdatefield.val(),
        dateto = enddatefield.val()

        console.log("clientid: ", clientidfield)

        allbutton.prop('checked', true)

        let errors = ''

        if(datefrom == ""){
            errors = 'Please Select the Start Date for the Transaction'
            startdatefield.focus()
        }else if(dateto == ""){
            errors = 'Please Select the End Date for the Transaction'
            enddatefield.focus()
        }

        if (!errors) {
            $.getJSON(
                "../controllers/receivablesoperations.php",
                {
                    getstatement: true,
                    clientid,
                    datefrom,
                    dateto,
                },
                (data) => {
                    console.log(data);
    
                    if (data.length > 0) {
                        let results = "";
                        let clientDetails = data[0];
    
                       
                        clientidfield.text(clientDetails.clientid);
                        clientnamefield.text(clientDetails.clientname);
                        balanceduefield.text(clientDetails.amountdue);
    
                        // Iterate through the data and populate the invoice table
                        data.forEach((client, i) => {
                            results += `<tr data-clientid='${client.clientid}'>`;
                            results += `<td>${i + 1}</td>`;
                            results += `<td>${client.transactdate}</td>`;
                            results += `<td>${client.Ref}</td>`;
                            results += `<td>${client.naration}</td>`;
                            results += `<td>&nbsp;</td>`;
                            results += `<td>${client.amount}</td>`;
                            results += `<td>&nbsp;</td>`;

                            results += `</tr>`;
                        });
    
                        // invoicetable.find("tbody").html(results);  
                        makedatatable(invoicetable, results,25)
                    } else {
                        console.log("No invoiced client details found.");
                        invoicetable.find("tbody").html('<tr><td colspan="5">No data available</td></tr>'); // Display message if no data
                    }
                }
            );
        } else {
            console.log("Client ID is missing.");
        }
    });
    // filter transactions
    filterbutton.on('click', function(){
        const clientid = clientidfield.val(),
        datefrom = startdatefield.val(),
        dateto = enddatefield.val();
        
        //uncheck the all button for specific searching 
        allbutton.prop('checked', false);  // Uncheck the "All" checkbox
    
        let errors = '';
    
        // Validate dates
        if (datefrom == "") {
            errors = 'Please Select the Start Date for the Transaction';
            startdatefield.focus();
        } else if (dateto == "") {
            errors = 'Please Select the End Date for the Transaction';
            enddatefield.focus();
        }
    
        // If no validation errors
        if (!errors) {
            $.getJSON(
                "../controllers/receivablesoperations.php",
                {
                    getstatement: true,
                    clientid,
                    datefrom,
                    dateto,
                },
                (data) => {
                    console.log(data); // Log the response for debugging
    
                    if (data.length > 0) {
                        let results = "";
                        let clientDetails = data[0];  // Assuming the first item contains client details
    
                        // Update client details on the UI
                        clientidfield.text(clientDetails.clientid);
                        clientnamefield.text(clientDetails.clientname);
                        balanceduefield.text(clientDetails.amountdue);
    
                        // Iterate through the data and populate the invoice table
                        data.forEach((client, i) => {
                            results += `<tr data-clientid='${client.clientid}'>`;
                            results += `<td>${i + 1}</td>`;
                            results += `<td>${client.transactdate}</td>`;
                            results += `<td>${client.Ref}</td>`;
                            results += `<td>${client.naration}</td>`;
                            results += `<td>&nbsp;</td>`;  // Placeholder for an extra column
                            results += `<td>${client.amount}</td>`;
                            results += `<td>&nbsp;</td>`;  // Placeholder for an extra column
                            results += `</tr>`;
                        });
    
                        // Insert the results into the table
                        invoicetable.find("tbody").html(results);
                    } else {
                        console.log("No invoiced client details found.");
                        invoicetable.find("tbody").html('<tr><td colspan="7">No data available</td></tr>');  // Message if no data
                    }
                }
            );
        } else {
            invoicenotifications.html(showAlert("info", errors));  // Show validation error if any
        }
    });
    
   
       
    

    jQuery('#clientslist4').hover(
        function() {
            jQuery(this).css('color', 'green');
        },
        function() {
            jQuery(this).css('color', '');
        }
    );
    

    // search by names transaction tab input
    jQuery('#searchbynames').on('keyup', function() {
        var searchValue = $(this).val().toLowerCase();
        $('#clientslist4 li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
    })

     

    // get all invoices in the payments tab to view
   

    const paymentid = $('#paymentid'), 
    paymentdatefield = $('#paymentdate'),
    descriptionfield = $('#description'),
    amountfield = $('#amount'),
    amountpaidfield =$('#amountpaid'),
    balancefield = $('#balance'),
    commentsfield = $('#comments'),
    savepaymentbutton = $('#savepayment'),
    refreshbutton = $('#refreshpaymentfields')

    setDatePicker(paymentdatefield,true,false)
    getserverdate().done(()=>{
        paymentdatefield.val(formatDate(serverdate))
    });

    // populate the amount and description
    invoicetable.find("tbody").on("click", '.payinvoice', function(){
        // const selectedclientid = $(this).data("clientid");  // Get the client ID from the clicked <li> element
        // console.log("Client ID:", selectedclientid);  // Log the client ID for debugging 
        const selectedclientid=$(this).closest("tr").attr("data-clientid")
        $.getJSON(
           "../controllers/receivablesoperations.php",
            {
                getallinvoicedclientsdetails: true,
                selectedclientid: selectedclientid
            },
            (data)=>{
                const dfd = $.Deferred()
                data=data[0]
                descriptionfield.val(data.invoiceno)
                amountfield.val(data.amount)
                paymentmodal.modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
                dfd.resolve()
            }
        )  
        return dfd.promise()  
    })

    // payments tab logic
    // get all invoices and pay them
    // getallinvoices()
    // function getallinvoices(){

    //     $.getJSON(
    //         "../controllers/receivablesoperations.php",
    //         {
    //             getallinvoices:true
    //         },
    //         (data) => {
    //             console.log(data)
    //             let results = ""
    //             data.forEach((client, i) => {
    //                 results += `<tr data-invoiceid='${client.invoiceid}'>`                      
    //                 results += `<td>${Number(i + 1)}</td>`
    //                 results += `<td>${client.clientid}</td>`
    //                 results += `<td>${client.invoicedate}</td>`
    //                 results += `<td>${client.invoiceno}</td>`
    //                 results += `<td>${client.amount}</td>`
    //                 results += `<td>&nbsp;</td>`
    //                 // results += `<td>&nbsp;</td>`
    //                 results += `<td>&nbsp;</td>`
    //                 results += `</tr>`
    //             });
    //             clientidfield.val(data.clientid)
    //             paidinvoicestable.find("tbody").html(results,10)  
    //         }
    //     ) 
    // }

    // populate the paydate field with the currentdate
    const paydatefield = $('#paydate')
    setDatePicker(paydatefield,true,false)
    getserverdate().done(() =>{
        paydatefield.val(formatDate(serverdate))
    })

    // populate the payment currency with all currencies
    const paycurrencyfield = $('#paycurrency')
    getallcurrencies(paycurrencyfield, 'Choose')
    function getallcurrencies(obj,option='all'){
        $.getJSON(
            "../controllers/invoiceoperations.php",
            {
                getallcurrencies:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((currency)=>{
                    results+=`<option value='${currency.currencyid}'>${currency.currencyname}</option>`
                })
                obj.html(results)
            }
        )
    }

   // pay for invoices
    const paymentnotifications = $('#paymentnotifications'),
        modeofpaymentfield = $('#modeofpayment'),
        referencefield = $('#reference'),
        paymentcurrencyfield = $('#paycurrency'),
        exchangeratefield = $('#exchangerate'),
        printreceiptcheckbox = $('#printreceipt'),
        addpaymentbutton = $('#addpayment'),
        manualpaycheckbox = $('#manualpay'),
        manualamountfield = $('#manualamount'),
        distributeamountbutton = $('#distributeamount')


        addpaymentbutton.prop('disabled', true)
        addpaymentbutton.attr('title', 'Please distribute amount before adding payment').css({ cursor: 'pointer', opacity: '0.6', fontSize: '12px'});

    distributeamountbutton.on("click", () => {
        const amountpaid = Number(manualamountfield.val());
    
        let balance = amountpaid;
    
        if (amountpaid > 0) {
    
            manualpaycheckbox.prop('checked', true);
    
            paidinvoicestable.find("tbody tr").each(function () {
                const row = $(this)
    
                if (balance > 0) {
                    const amountpayable = Number(
                        row.find("td").eq(5).text().replace(",", "")
                    )
                    const checkbox = row.find("input[type='checkbox']")
    
                    if (balance >= amountpayable) {
                        checkbox.prop('checked', true)
                        row.find("td").eq(6).text(amountpayable)
                        balance -= amountpayable
                    } else {
                        checkbox.prop('checked', true)
                        row.find("td").eq(6).text(balance)
                        balance = 0
                    }
                }
            })

            addpaymentbutton.prop('disabled', false)
            addpaymentbutton.attr('title', '').css({ cursor: 'pointer', opacity: '1'});
            setTimeout(()=>{
                addpaymentbutton.prop('disabled', true)
            },5000)
    
        } else {
            paymentnotifications.html(showAlert("info", "Please provide a valid amount to distribute."))
            manualamountfield.focus()
        }
    })
        

    // manualamountfield.on("keypress", function(e) {
    //     if (e.which == 13) {
    //         manualpaycheckbox.prop('checked', true)
    //         let balance = Number($(this).val())
    //         paidinvoicestable.find("tbody tr").each(function() {
    //             const row = $(this);
    //             const amountpayable = Number(row.find("td").eq(5).text().replace(",", ""))
    //             const checkbox = row.find("input[type='checkbox']")
    //             if (balance >= amountpayable) {
    //                 checkbox.prop('checked', true)
    //                 row.find("td").eq(6).text(amountpayable)
                   
    //                 balance -= amountpayable
    //             } else {
    //                 checkbox.prop('checked', true)
    //                 row.find("td").eq(6).text(balance)
    //                 balance = 0; 
    //             }
    
    //             if (balance <= 0) return false
    //         })
    //     }
    // })

    
    addpaymentbutton.on('click', function() {
        manualpaycheckbox.prop('checked', false)
        const clientid = clientidhidden.val(),
            modeofpayment = modeofpaymentfield.val(),
            reference = sanitizestring(referencefield.val()),
            paycurrency = paymentcurrencyfield.val(),
            exchangerate = exchangeratefield.val(),
            receiptdate = paydatefield.val(),
            manualamount = paidinvoicestable.find("td").eq(6).text().replace(",", ""),
            paiditems = [];

        let errors = '';
    
        // Iterating over rows in the table and collecting data
        paidinvoicestable.find('tbody tr').each(function() {
            const $row = $(this).closest('tr'),
            selectedcheckbox = $row.find('.selectedcheckbox')
            if (selectedcheckbox.is(':checked')) {
                const clientid = $row.data('clientid'),
                invoiceno = $row.find('td').eq(2).text(),
                amount = $row.find('td').eq(6).text().replace(",", ""),
                invoiceid = $row.data('invoiceid');
        
                // Push each paid item to the array
                paiditems.push({ "clientid":clientid,"invoiceno": invoiceno, "amount": amount, "invoiceid": invoiceid });
                console.log(invoiceno);
                console.log(invoiceid);
                

            }
           
        })
        
        // Make sure we have selected invoices before proceeding
        if (paiditems.length === 0) {
            errors = 'Please Select a Client'
        } else if (modeofpayment === "") {
            errors = 'Please Provide the Mode of Payment.';
            modeofpaymentfield.focus();
        }else if (paidinvoicestable.find("tbody tr").length === 0) {
            errors = 'No Invoices to Pay for the Selected Client.';
            modeofpaymentfield.focus();
        }
        else if (paycurrency === "") {
            errors = 'Please Provide the Currency to Use.';
            paycurrencyfield.focus();
        } else if (manualamount === 0) {
            errors = 'Please Provide the Amount you want to pay.';
            manualamountfield.focus();
        } else if (exchangerate === "") {
            errors = 'Please Provide the Currency Exchange Rate.';
            exchangeratefield.focus();
        }
    
        if (!errors) {
            $.post(
                "../controllers/receivablesoperations.php",
                {
                    savereceipts: true,
                    clientid:clientid,
                    receiptdate,
                    modeofpayment,
                    reference,
                    paycurrency,
                    exchangerate,
                    paiditems: JSON.stringify(paiditems) 
                },
                (data) => {
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status === "success") {
                            paymentnotifications.html(showAlert("success", "Success! The Invoices/Invoice were paid successfully"))
                            setTimeout(()=>{
                                paymentnotifications.html("")
                                if(printreceiptcheckbox.is(':checked')){
                                    window.open(`../reports/receipt.php?receiptid=${data.receiptid}`, '_blank');
                                }
                                // location.reload()
                            },2000)
                        } else if (data.status === "exists") {
                            paymentnotifications.html(showAlert("info", "Sorry, the invoices have already been paid"))
                        }
                    } else {
                        paymentnotifications.html(showAlert("danger", `Sorry, an error has occurred: ${data}`))
                    }
                    
                }
            )
        } else {
            paymentnotifications.html(showAlert("info", errors))
        }
    })

    // view receipts tab
    const receiptnotifications = $('#receiptnotifications'),
    receiptid = $('#receiptid'),
    receiptstable = $('#receiptstable'),
    receiptstartdate = $('#receiptstartdate'),
    receiptenddate = $('#receiptenddate'),
    generatereceiptbutton = $('#generatereceipt')

    setDatePicker(receiptstartdate,true,false)
    getserverdate().done(()=>{
        receiptstartdate.val(formatDate(serverdate))
    })

    setDatePicker(receiptenddate,true,false)
    getserverdate().done(()=>{
        receiptenddate.val(formatDate(serverdate))
    })

    // payment mode of payment field
    function getpaymentmethods(obj,option='all'){
        dfd=$.Deferred()
        $.getJSON(
            "../controllers/settingsoperations.php",
            {
                getpaymentmethods:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                // check if object is an array of objects
                 data.forEach((paymentmode)=>{
                    results+=`<option value='${paymentmode.paymentmodeid}' data-requiresref='${paymentmode.requiresref}'>${paymentmode.paymentmodename}</option>`
                })
    
                if(Array.isArray(obj)){
                    obj.forEach(element=>{
                        element.html(results)
                    }) 
                }else{
                    obj.html(results)
                }           
                dfd.resolve()
            }
        )     
        return dfd.promise()
    }

    // getall receipts
    getallreceipts()
    getpaymentmethods(modeofpaymentfield,'choose')
    const  modeofpayment = modeofpaymentfield.find('option:selected').text()
    function getallreceipts(){
        $.getJSON(
            "../controllers/receivablesoperations.php",
            {
                getallreceipts: true
            },
            (data)=>{
                // console.log(data)
                let results = ""
                data.forEach((receipt, i) => {
                    results += `<tr data-receiptid='${receipt.receiptid}'>`                      
                    results += `<td>${Number(i + 1)}</td>`
                    results += `<td>${receipt.receiptno}</td>`
                    results += `<td>${receipt.receiptdate}</td>`
                    results += `<td>${receipt.clientname}</td>`
                    results += `<td>${modeofpayment}</td>`
                    results += `<td>${receipt.reference}</td>`
                    results += `<td>${receipt.currencyname}</td>`
                    results += `<td>${receipt.amount}</td>`
                    results += `<td><a href="#" class="deletereceipt"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                    results += `</tr>`
                });
                receiptstable.find("tbody").html(results,10)  
            }
        )
    }
       
    // get filtered receipts
    generatereceiptbutton.on('click', function(){
        const startdate = receiptstartdate.val(),
        enddate = receiptenddate.val(),
        modeofpayment = modeofpaymentfield.find('option:selected').text()

        let errors = ''

        if(startdate == ""){
            errors = 'Please Input the Receipt Starting Date'
            receiptstartdate.focus()
        }else if(enddate == ""){
            errors = 'Please Input the Receipt Ending Date'
            receiptenddate.focus()
        }

        if(!errors){
            // Use the provided formatDate function to convert the dates to the correct format
            const formattedStartDate = formatDate(startdate);
            const formattedEndDate = formatDate(enddate);
    
             $.getJSON(
                "../controllers/receivablesoperations.php",
              {
                getfilteredreceipts: true,
                startdate:formattedStartDate,
                enddate:formattedEndDate
              },
              (data) => {
                  let results = ""
                  data.forEach((receipt, i) => {
                    results += `<tr data-receiptid='${receipt.receiptid}'>`                      
                    results += `<td>${Number(i + 1)}</td>`
                    results += `<td>${receipt.receiptno}</td>`
                    results += `<td>${receipt.receiptdate}</td>`
                    results += `<td>${receipt.clientname}</td>`
                    results += `<td>${modeofpayment}</td>`
                    results += `<td>${receipt.reference}</td>`
                    results += `<td>${receipt.currencyname}</td>`
                    results += `<td>${receipt.amount}</td>`
                    results += `<td><a href="#" class="deletereceipt"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                    results += `</tr>`
                });
                receiptstable.find("tbody").html(results,10)  
              }
            )

        }else{
            receiptnotifications.html(showAlert('info', errors))
        }
    })

    //cancel receipt
    receiptstable.on("click", ".deletereceipt", function(){
        const parent=$(this).closest("tr"),
        receiptid = parent.data('receiptid'),
        receiptno=parent.find("td").eq(1).text()

        bootbox.dialog({
        title: "Delete Receipt",
        message: `Are you sure you want to delete<strong>${receiptno}</strong>from the system.<i class='fal fa-fw fa-question-circle fa-1x text-primary'></i>`,
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
                receiptnotifications.html(showAlert("Processing", "Processing. Please wait...",1))
                $.post(
                    "../controllers/receivablesoperations.php",
                {
                    deletereceipt:true,
                    receiptid:receiptid
                },
                (data)=>{
                    if(isJSON(data)){
                    data=JSON.parse(data)
                    if (data.status=="success"){
                        receiptnotifications.html(showAlert("success",`Receipt No <strong>${receiptno}</strong> deleted successfully.`))
                        getallreceipts()
                    }
                    }
                    else{
                    receiptnotifications.html(showAlert("danger", `Sorry an error occured ${data}`))
                    }
                }
                )
               
            }
            }
        }
        })
    })


    


    



    

    // savetenantpaymentbutton.on("click",()=>{
    //     const tenantid=tenantidfield.val(),
    //         payments=[],
    //         paymentmodeid=openpayablepaymentmethod.val(),
    //         referenceno=sanitizestring(paymentreferencenofield.val()),
    //         overpayment=overpaymentfield.val(),
    //         narration=sanitizestring(paymentnarrationfield.val()),
    //         paymentmodename=openpayablepaymentmethod.find("option:selected").text()
    //     let errors=""

    //     // populate paid invoices
    //     tenantopenpayablestable.find("tbody tr").each(function(){
    //         const row=$(this),
    //             col=row.find("td"),
    //             invoiceid=row.attr("data-id"),
    //             amount=Number(col.eq(5).text().replace(",",""))
    //         if(amount>0){
    //             payments.push({"invoiceid":invoiceid,"amount":amount})
    //         }
    //     })

    //     // check for blank fields
    //     if(payments.length==0){
    //         errors="Please ensure at least an invoice has been paid"
    //         amountpaidfield.focus()
    //     }else if(paymentmodeid==""){
    //         errors="Please select payment method"
    //         openpayablepaymentmethod.focus()
    //     }else if(openpayablepaymentmethod.find("option:selected").attr("data-requiresref")==1 && referenceno==""){
    //         errors=`Please provide reference number for <strong>${paymentmodename}</strong>`
    //         paymentreferencenofield.focus()
    //     }

    //     if(errors==""){
    //         //  save the payment
    //         const invoiceditems=JSON.stringify(payments)
    //         $.post(
    //             "../controllers/tenantoperations.php",
    //             {
    //                 savetenantreceipt:true,
    //                 tenantid,
    //                 paymentmodeid,
    //                 referenceno,
    //                 overpayment,
    //                 invoiceditems
    //             },
    //             (data)=>{
    //                 if(isJSON(data)){
    //                     data=JSON.parse(data)
    //                     if(data.status=="exists"){
    //                         paymentnotifications.html(showAlert("info",`Sorry <strong>${paymentmodename}</strong> reference number <strong>${referenceno}</strong> already in use`))
    //                     }else if(data.status=="success"){
    //                         paymentnotifications.html(showAlert("success",`Tenant payment erecived successfully. Receipt no: <strong>${data.receiptno}</strong>`))
    //                         // refresh open receivables
    //                         gettenantopenpayables(tenantid)
    //                         //  clear fields
    //                         clearpaymentfields()
    //                     }
    //                 }else{
    //                     paymentnotifications.html(showAlert("danger",`Sorry an error occurred ${data}`))
    //                 }
    //             }
    //         )
    //     }else{
    //         paymentnotifications.html(showAlert("info",errors))
    //     }
    // })

    


    

    // save payment
    // savepaymentbutton.on('click', function() {
    //     const 
    //     paymentdate = paymentdatefield.val(),
    //     amountpaid = amountpaidfield.val(),
    //     modeofpayment = modeofpaymentfield.val(),
    //     balance = balancefield.val(),
    //     comments = commentsfield.val(),
    //     description = descriptionfield.val();  // Added description
    
    //     let errors = '';  // Initialize errors as an empty string
    
    //     // Append errors if any field is missing
    //     if(amountpaid == "") {
    //         errors += "Enter the <strong>Invoice Amount to Pay</strong><br>";
    //     }
    //     if(modeofpayment == "") {
    //         errors += "Choose how you want to pay for the Invoice<br>";
    //     }
    //     if(paymentdate == "") {
    //         errors += "Enter the <strong>Payment Date</strong><br>";
    //     }
    
    //     if(errors != "") {
    //         paymentnotifications.html(showAlert("info", errors));  // Show all errors
    //         // Focus on the first empty field
    //         if(amountpaid == "") {
    //             amountpaidfield.focus();
    //         } else if(modeofpayment == "") {
    //             modeofpaymentfield.focus();
    //         } else if(paymentdate == "") {
    //             paymentdatefield.focus();
    //         }
    //     } else {
    //         // Validate amountpaid as a number
    //         if(isNaN(parseFloat(amountpaid))) {
    //             paymentnotifications.html(showAlert("danger", "Invalid amount paid. Please enter a valid number."));
    //             amountpaidfield.focus();
    //         } else {
    //             $.post(
    //                 "../controllers/receivablesoperations.php",
    //                 {
    //                     savepayment:true,
    //                     paymentid:paymentid.val(),
    //                     paymentdate,
    //                     amountpaid,
    //                     modeofpayment,
    //                     balance,
    //                     comments
    //                 },
    //                 (data) => {
    //                     console.log("Server response:", data);
    //                     if (isJSON(data)) {
    //                         data = JSON.parse(data);
    //                         if (data.status == "success") {
    //                             paymentnotifications.html(showAlert("success", `<strong>${description}</strong> was Paid Successfully`));
    //                         } else if (data == "exists") {
    //                             paymentnotifications.html(showAlert("info", `The Payment Has Already been Paid`));
    //                         } else {
    //                             paymentnotifications.html(showAlert("danger", `An error occurred: ${data}`));
    //                         }
    //                     } else {
    //                         paymentnotifications.html(showAlert("danger", `Sorry an error occurred: ${data}`));
    //                     }
    //                 }
    //             );
    //         }
    //     }
    // });


   // Initialize total
    // let total = 0;

    // const payforinvoicesbutton = $('#payforinvoices');
    // payforinvoicesbutton.hide(); // Hide button initially

    // Checkbox change handler to recalculate total when a checkbox is checked/unchecked
    // paymultipleinvoicestable.on('change', '.selectedinvoice', function() {
    //     const $row = $(this).closest("tr"),
    //         clientid = $row.data('clientid'),
    //         rawAmount = $row.find('td').eq(4).text().replace(",", "");

    //     // Convert amount to number (with validation)
    //     const amount = Number(rawAmount);
    //     if (isNaN(amount)) {
    //         console.error("Invalid amount format:", rawAmount);
    //         return;
    //     }

    //     // Check if the selected invoice is checked
    //     const isSelectChecked = $row.find('.selectedinvoice').is(':checked');

    //     if (isSelectChecked) {
    //         // Show the pay for invoice button
    //         payforinvoicesbutton.show();
    //         total += amount; // Add amount to total when selected
    //     } else {
    //         total -= amount; // Subtract amount from total when unchecked
    //     }

    //     // Update the total amount display
    //     $('#total').text(`Total: ${total.toFixed(2)}`);
    // });

    // declare the variables to post
    const payinvoicesnotifications = $('#payinvoicesnotifications')

    // Payment button logic: when the user clicks to pay
    // payforinvoicesbutton.on('click', function() {
    //     // const clientid = clientid.val()
    //     // clientname= clientnamefield.val(),
    //     // invoiceno = invoicenofield.val()

    //     const selectedInvoices = [];
    //     let errors = ''

    //     // Iterate through each row and check if the checkbox is checked
    //     paymultipleinvoicestable.find('tbody tr').each(function() {
    //         const $row = $(this),
    //         selectedinvoice = $row.find('.selectedinvoice');

    //         // If the selectedinvoice is checked
    //         if (selectedinvoice.is(':checked')) {
    //             const clientid = $row.data('clientid'),
    //             invoicedate = $row.find('td').eq(1).text(),
    //             clientname = $row.find('td').eq(2).text(),
    //             invoiceno = $row.find('td').eq(3).text(),
    //             amount = parseInt($row.find('td').eq(4).text().replace(",", ""));  // Get amount from the row

    //             // Add the invoice details to selectedInvoices
    //             selectedInvoices.push({
    //                 "clientid": clientid,
    //                 "invoicedate":invoicedate,
    //                 "clientname":clientname,
    //                 "invoiceno":invoiceno,
    //                 "amount": amount
    //             });
    //         }

    //         // get a modal to save the information

    //     });

    //     // Validate at least one delivery order is selected
    //     if(selectedInvoices.length === 0) {
    //         errors = "Please select at least one Invoice to pay";
    //         payinvoicesnotifications.html(showAlert("info", errors));
    //         return;
    //     }
    //     if(!errors) {
    //         if (selectedInvoices.length > 0 && total > 0) {
    //             // Proceed to payment logic
    //             console.log("Selected Invoices:", selectedInvoices);
    //             console.log("Total Amount to Pay:", total);

    //             // Send the payment request
    //             $.post(
    //                  "../controllers/receivablesoperations.php",
    //                 {
    //                     savemultiplepayments: true,
    //                     selectedInvoices:JSON.stringify(selectedInvoices), // Send all selected invoices
    //                     total: total
    //                 },
    //                 (data) => {
    //                     // let notification 
    //                     console.log(data)
    //                     if(isJSON(data)){
    //                         data=JSON.parse(data)
    //                         if(data.status === "success") {
    //                             // Extract the invoicenumbers and join them into a string
    //                         const invoicenumbers = selectedInvoices.map(invoice => invoice.invoiceno).join(', ');
    //                         payinvoicesnotifications.html(showAlert("success", `Success! The following invoices were paid successfully: <strong>${invoicenumbers}</strong>`));
    //                         }else if (data.status == "exists") {
    //                             payinvoicesnotifications.html(showAlert("info", `Sorry :(, the <strong>Invoice</strong>already exists in the system`))
    //                         }
    //                     }else {
    //                         payinvoicesnotifications.html(showAlert("danger", `Sorry :( an error has occurred ${data}`))
    //                     }
    //                 }
    //             )
            
    //         }
    //     }
    // });


    

   
   

  
    // jQuery("input[type='radio']").click(function() { 
    //     var radioValue = $("input[name='cursor']:checked").val(); 
        
    //     if(radioValue) { 
    //         $("#block").css("cursor", radioValue ); 
    // }}); 
    



    
    // distribute payments
    // distributepaymentbutton.on("click",()=>{
    //     const amountpaid=Number(amountpaidfield.val())
        
    //     let balance=amountpaid,
    //         totalpaid=0
    //     if(amountpaid>0){
    //         tenantopenpayablestable.find("tbody tr").each(function(){
    //             // reset value of the field
    //             const row=$(this)
    //             row.find("td").eq(5).text("0")

    //             if(balance>0){
    //                 const amountcharged=Number(row.find("td").eq(4).text().replace(",",""))
    //                 if(balance>amountcharged){
    //                     row.find("td").eq(5).text($.number(amountcharged))
    //                     balance-=amountcharged
    //                     totalpaid+=amountcharged
    //                 }else{
    //                     row.find("td").eq(5).text($.number(balance))
    //                     totalpaid+=balance
    //                     balance=0
    //                 }
    //             }
    //         }) 
    //         // display overpayment if any 
    //         openpayablespaid.html($.number(totalpaid))
    //         overpaymentfield.val(balance>0?$.number(balance):"0.00")
    //     }else{
    //         paymentnotifications.html(showAlert("info","Please provide correct amount to be distributed"))
    //         amountpaidfield.focus()
    //     }
    // })
    




    
    
    
   
})