$(document).ready(function(){
    const currentmenu=$("#allocation")
    setactivemenu(currentmenu)
    
    const// populate the ui table
        allocatedvehiclestable = $('#allocatedvehiclestable'),
        allocatedvehiclesnotificationstable = $('#allocatedvehiclesnotificationstable'),
        // allocation modal
        allocatedvehicletofield = $('#allocatedvehicleto'),
        allocatedvehiclefromfield = $('#allocatedvehiclefrom'),
        addexpensestab = $('#addexpenses-tab'),
        expensescard = $('#expensescard'),
        expensestabfooter = $('#expensestabfooter'),
    
        // save the allocated expenses modal
        allocateexpensebutton=$('#allocateexpensebutton'),
        expensenotifications=$('#expensenotifications'),
        // expenseid= $('#expenseid'),
        ordernumberfield = $('#deliveryordernumber'),
        expensetrucknofield=$('#expensetruckno'),
        expensenamefield =$('#expensename'),
        expenseamountfield=$('#expenseamount'),
        expensemodal = $('#expensemodal'),
        editbutton = $('#edit'),
        deletebutton = $('.deleterow'),



        // save and refresh buttons
        allocationvehiclesrefreshbutton=$('#allocationvehiclesrefreshbutton'),
        refreshallocationbutton = $('#refreshallocation'),

        addallocationvehicle=$("#addallocationvehicle"),
        allocatevehiclemodal=$("#allocatevehiclemodal"),
        
        //notifications
        allocationnotifications = $("#allocationnotifications"),
        
        allocationsid=$('#allocationid'),
        deliveryordernumberfield=$('#deliveryordernumber1'),
        trucknofield=$("#truckno"),
        trailernofield =$('#trailerno'),
        deliverytypefield=$('#deliverytype'),
        
        //Drivers Pop up
        driveridfield=$('#driverid'),
        routefield =$('#route'),
        destinationfield =$('#destination'),
        kilometersfield =$('#kilometers'),
        
        
        // other details card
        dateoutfield=$("#dateout"),  
        stddaysfield =$('#stddays'),
        expecteddateinfield =$('#expecteddatein'),

        // status container
        checkedfield = $('#statuscheckbox'),
        unallocateddriversfield = $('#unallocateddrivers'),
        driverstatusfield = $('#driverstatus'),
        unallocatedvehiclesfield = $('#unallocatedvehicles'),
        vehiclestatusfield = $('#vehiclestatus'),
        statusnotifications = $('#statusnotifications'),

        
        // allocation containers
        allocationcontainer = $('#allocationcontainer'),
        otherscontainer = $('#otherscontainer'),
        statuscontainer = $('#statuscontainer'),
        particularscontainer = $('#particularscontainer'),
        

        // Particulars card
        clientidfield=$('#clientid'),
        particularfield =$('#particular'),
        containeridfield = $('#containerid'),
        containernumberfield = $('#containernumber'),
        othersfield = $('#others'),
        amountfield =$('#amount'),
        currencyfield =$('#currency'),
        exchangeratefield =$('#exchangerate'),
        remarksfield =$('#remarks'), 
        statusremarkscontainer = $('#statusremarkscontainer'),
        statusremarksfield = $('#statusremarks'),
        saveallocatedvehicle = $('#saveallocatedvehicle'),
        modalclosebutton = $('#modalclosebutton'),
        
        // other necessary fields
        inputfield=$('input'),
        selectfield = $('select')

    // Hide all errors when a input field is typed in
    inputfield.on("input",()=>{
    allocationnotifications.html(""),
    expensenotifications.html(""),
    addexpensenotifications.html(""),
    statusnotifications.html(""),
    filternotifications.html("")
    })

    inputfield.on("change",()=>{
        filternotifications.html("")
    })

    selectfield.on("change",()=>{
        inputfield.trigger("input")
    })

    

    //Add Allocations modal
    addallocationvehicle.on("click",()=>{
        
        allocatevehiclemodal.modal("show")
        //hide statuscontainer
        allocationcontainer.show()
        otherscontainer.show()
        particularscontainer.show()
        statuscontainer.hide()
        statusremarkscontainer.hide()
    })

    // coins expense modal show
    allocatedvehiclestable.on('click', ".addexpense",function(){
        const allocation=$(this).closest('tr'),
            row=allocation.find('td'),
            trucknumber = row.eq(2).text(),
            orderno=row.eq(1).text(),
            allocationid=allocation.data("allocationid")
            // console.log(orderno)
            // console.log(allocationid)
        // const trucknumber = $(this).closest('tr').find( 'td').eq(2).text()
        // console.log(trucknumber)
        $('#expensemodal').fadeIn(10);
        expensemodal.modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        })
        expensescard.show()
        addexpensestab.show()
        expensestabfooter.show()
        expensetrucknofield.val(trucknumber)
        ordernumberfield.val(orderno).attr("data-allocationid",allocationid)
    })
    
    trucknofield.prop('disabled', false)

    // validation and saving the  allocation modal
    saveallocatedvehicle.on('click', function(){
        statusnotifications.hide()
        const
        // Allocation Card
        allocationid= allocationsid.val(),
        truckno = trucknofield.val(),
        trailerno = trailernofield.val(),
        driversname = driveridfield.val(),
        route = routefield.val(),
        destination = destinationfield.val(),
        kilometers = kilometersfield.val(),
        deliverytype=deliverytypefield.val(),

        // other details card
        dateout = dateoutfield.val(),
        stddays = stddaysfield.val(),
        expecteddatein = expecteddateinfield.val(),
        
        // particulars card
        clientname = clientidfield.val(),
        particular = particularfield.val(),
        containername = containeridfield.val(),
        containernumber = containernumberfield.val(),
        others = othersfield.val(),
        amount = amountfield.val(),
        currency = currencyfield.val(),
        exchangerate = exchangeratefield.val(),
        remarks = remarksfield.val(),

        // status card
        newdriverid = unallocateddriversfield.val(),
        driverstatus = driverstatusfield.val(),
        newvehicleid = unallocatedvehiclesfield.val(),
        truckstatus = vehiclestatusfield.val(),
        statusremarks = statusremarksfield.val(),
        updated = checkedfield.prop('checked')?1:0


        let errors = ''
        if(deliverytype==""){
            errors = "Please Choose the Delivery Type"
            deliverytypefield.focus()
        }
        else if(truckno==""){
            errors = "Please Choose a Truck Number"
            trucknofield.focus()
        }else if(driversname == ""){
            errors = "Please Select the Drivers Name"
            driveridfield.focus()
        }else if(route == ""){
            errors = "Please Select the Truck Route"
            routefield.focus()
        }else if(destination== ""){
            errors = "Please Select the Truck Travel Destination"
            destinationfield.focus()
        }else if(kilometers == ""){
            errors = "Please Select the Truck Travel Distance"
            kilometersfield.focus()
        }else if(dateout== ""){
            errors = "Please Choose the Date Out"
            dateoutfield.focus()
        }
        else if(clientname == ""){
            errors = "Please Select the Truck Client"
            clientidfield.focus()
        }else if(particular == ""){
            errors = "Please Provide Particulars"
            particularfield.focus()
        }else if(containername == ""){
            errors = "Please Select the Truck Container"
            containeridfield.focus()
        }else if(containernumber == ""){
            errors = "Please Provide The Truck Container Number"
            containernumberfield.focus()
        }
        else if(amount == ""){
            errors = "Please Provide the Amount"
            amountfield.focus()
        }else if(currency == ""){
            errors = "Please choose the Currency"
            currencyfield.focus()
        }else if(exchangerate == ""){
            errors = "Please Provide the exchange rate acording to the Currency"
            exchangeratefield.focus()
        }
        // else if(remarks == ""){
        //     errors = "Please Provide the Trucks Condition when leaving"
        //     remarksfield.focus()
        // }
        if(errors == ""){
            //do something
            $.post(
                "../controllers/allocationoperations.php",
                {
                    saveallocatedvehicle:true,
                    // Allocated vehicles Card
                    allocationid,
                    deliverytype,
                    truckno,
                    driversname,
                    route,
                    destination,
                    kilometers,


                    // other details card
                    dateout,
                    // stddays,
                    expecteddatein,

                    //particulars card    
                    clientname,
                    particular,
                    containername,
                    containernumber,
                    others,
                    amount,
                    currency,
                    exchangerate,
                    remarks,

                    // status card
                    newdriverid,
                    driverstatus,
                    newvehicleid,
                    truckstatus,
                    statusremarks,
                    updated
                },
                (data)=>{
                    console.log(data)
                    if(isJSON(data)){
                        data = JSON.parse(data)
                        // console.log(data)
                        if(data.status == "success"){
                            allocationnotifications.html(showAlert("success",`Truck Allocation Saved Successfully. Delivery.No <strong>${data.deliveryno}</strong> `))
                            clearallocationdetail()
                            loadallocatedvehicles()
                            setTimeout(()=>{
                                allocatevehiclemodal.modal("hide")
                                allocationnotifications.html("")
                            },2000)
                        }
                        else if(data=="exists"){
                            allocationnotifications.html(showAlert("info",`Sorry, The Truck <strong>${trailerno}</strong>has already been Allocated`))
                        }
                    }else{
                        allocationnotifications.html(showAlert("danger",`Sorry an error occured ${data}`))
                    }
                }

            )
        }else{
            allocationnotifications.html(showAlert("info", errors))
        }
    })
    
    // function clear notifications
    function clearallocationdetail(){
        allocationsid.val(0),
        trucknofield.val(""),
        trailernofield.val(""),
        driveridfield.val(""),
        routefield.val(""),
        destinationfield.val(""),
        kilometersfield.val(""),
        deliverytypefield.val(""),

        // particulars card
        clientidfield.val(""),
        particularfield.val(""),
        containeridfield.val(""),
        containernumberfield.val(""),
        othersfield.val(""),
        amountfield.val(""),
        currencyfield.val(""),
        exchangeratefield.val(""),
        remarksfield.val("")

    }

    modalclosebutton.on('click', ()=>{
        clearallocationdetail()
    })

    const allocatedvehicleexpensetable = $('#allocatedvehicleexpensetable'),
        expensenameDropdownfield = $('#expensename'),
        totaldivfield=$('#totalamount'),
        totalamount1 = $('#totalamount1')


        // allocate expenses
        allocateexpensebutton.on('click', function() {
            const allocatedexpensename = expensenameDropdownfield.val();
            const allocatedexpenseamount = expenseamountfield.val();
            totalamount1.closest('.col-md-6').hide();
            deletebutton.show();
            
        
            let errors = '';
            if (allocatedexpensename == "") {
                errors = "Please choose an expense from the options.";
                expensenameDropdownfield.focus();
            } else if (allocatedexpenseamount == "") {
                errors = "Please assign an expense amount.";
                expenseamountfield.focus();
            }
            
        
            if (errors !== "") {
                expensenotifications.html(showAlert("info", errors));
            } else {
                let rowCount = allocatedvehicleexpensetable.find("tbody tr").length + 1;
        
                allocatedvehicleexpensetable.find("tbody").append(`
                    <tr>
                        <td>${rowCount}</td>
                        <td>${allocatedexpensename}</td>
                        <td>${expensenameDropdownfield.find('option:selected').text()}</td>
                        <td contenteditable='true'>${allocatedexpenseamount}</td>
                        <td><a href="#" class="delete" id="deleterow"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td>
                    </tr>
                `);
                
                let total = 0;
                allocatedvehicleexpensetable.find('tbody tr').each(function() {
                    total += Number($(this).find('td').eq(3).text().replace(",", ""));
                });
                totaldivfield.closest('.col-md-6').show();
                totaldivfield.html(total);
            }
        });
        
        // adding an expense to populate the dropdown list
        const addexpensenotifications = $('#addexpensenotifications'), 
            expenseidfield= $('#expenseid'),
            allocatedexpensenamefield = $('#allocatedexpensename'),
            saveallocatedexpensenamebutton = $('#saveallocatedexpensename')

        saveallocatedexpensenamebutton.on('click', function(){
            // hide the save button
            expensestabfooter.hide();

            const allocatedexpensename = allocatedexpensenamefield.val(),
            addexpenseid = expenseidfield.val()
           
            // console.log(allocatedexpensename)
            let errors=''
            if(allocatedexpensename == ""){
                errors='Please Provide an Expense Name'
                allocatedexpensenamefield.focus()
            }
            if(errors == ""){
                $.post(
                    "../controllers/allocationoperations.php",
                    {
                        saveallocationexpenses:true,
                        addexpenseid,
                        allocatedexpensename
                    },
                    (data)=>{
                        if(isJSON(data)){
                            data = JSON.parse(data)
                            // console.log(data)
                            if(data.status == "success"){
                                if (addexpenseid==0){
                                    // from table
                                    addexpensenotifications.html(showAlert("success", `The Expense <strong>${allocatedexpensename}</strong> has been allocated successfully`))
                                }
                                else{
                                    addexpensenotifications.html(showAlert("success", `The Expense <strong>${allocatedexpensename}</strong> updated successfully`))
                                }
                                addexpensenotifications.html(showAlert("success",`The Allocated Expense <strong>${allocatedexpensename}</strong> was Added Successfully!`))
                                getallocatedvehiclesastable()
                            }
                            else if(data=="exists"){
                                addexpensenotifications.html(showAlert("info",`Sorry, The Expense <strong>${allocatedexpensename}</strong>has already been Allocated`))
                            }
                        
                        }else{
                            addexpensenotifications.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
    
                )
            }else{
                addexpensenotifications.html(showAlert("info", errors))
            }
        })
        // save the allocated expenses to the allocated vehicle
        const saveallocatedexpensebutton = $('#saveallocatedexpense')

        saveallocatedexpensebutton.on('click', function() {
            const allocationid=deliveryordernumberfield.data("allocationid")
            let allexpenses = [];
            allocatedvehicleexpensetable.find('tbody tr').each(function() {
                let row = $(this);
                let anexpense = {
                    allocatedexpensename: row.find('td').eq(1).text(),
                    allocatedexpenseamount: parseInt(row.find('td').eq(3).text().replace(",", "")) 
                };
                allexpenses.push(anexpense);
            });
        
            // console.log("Sending expenses:", allexpenses);
        
            $.post(
                "../controllers/allocationoperations.php",
                {
                    saveallocatedexpense: true,
                    allocationid,
                    expenses: JSON.stringify(allexpenses)
                },
                (data) => {
                    // console.log("Server response:", data);
        
                    if (isJSON(data)) {
                        data = JSON.parse(data);
                        if (data.status == "success") {
                            expensenotifications.html(showAlert("success", `Allocated expenses saved successfully.`));
                            
                        } else if (data == "exists") {
                            expensenotifications.html(showAlert("info", `Expense already allocated.`));
                        } else {
                            expensenotifications.html(showAlert("danger", `An error occurred: ${data}`));
                        }
                    } else {
                        expensenotifications.html(showAlert("danger", `An error occurred: ${data}`));
                    }
                }
            )
        });
        
        
        
        
        // refresh all expense fields
        const refreshexpensesbutton = $('#refreshexpenses'),
        allocationstatusfield = $('#allocationstatus')

        refreshexpensesbutton.on('click', function(){
            expensenameDropdownfield.val("") 
            expenseamountfield.val("")
            allocatedexpensenamefield.val("")
        })
   
        
       

        function clearallocationfilteroptions(){
            allocatedvehiclefromfield.val(formatDate(serverdate))
            allocatedvehicletofield.val(formatDate(serverdate))
        }

        clearallocationfilteroptions()
    
            
        clearallocationfields()
        function clearallocationfields(){
            // console.log(allocationid);
            trucknofield.val("")
            trailernofield.val("")
            driveridfield.val("")
            routefield.val("")
            destinationfield.val("")
            kilometersfield.val("")
    
            // other details cardateoutfield.val("")
            stddaysfield.val("")
            expecteddateinfield.val()
    
            // particulars carclientsfield.val(""),
            particularfield.val("")
            containeridfield.val("")
            containernumberfield.val("")
            othersfield.val("")
            amountfield.val("")
            currencyfield.val("")
            exchangeratefield.val("")
            remarksfield.val("")
        }

        const filternotifications = $('#filternotifications')
        // allocations close button clear all fields
        refreshallocationbutton.on('click', function(){
          clearallocationfields()
        })

        getfilteredallocation()

        function getfilteredallocation() {
            const startdate = allocatedvehiclefromfield.val(),
            enddate = allocatedvehicletofield.val(),
            status=allocationstatusfield.val()

            let errors = "";

            if (startdate == "") {
            errors = "Please Select Start Date";
            allocatedvehiclefromfield.focus();
            } else if (enddate == "") {
            errors = "Please Select End Date";
            allocatedvehicletofield.focus();
            }

            if (errors == "") {
            // Use the provided formatDate function to convert the dates to the correct format
            const formattedStartDate = formatDate(startdate);
            const formattedEndDate = formatDate(enddate);

            // console.log("Formatted Start Date: ", formattedStartDate);
            // console.log("Formatted End Date: ", formattedEndDate);

            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getfilteredallocation: true,
                    startdate: formattedStartDate,  
                    enddate: formattedEndDate,
                    allocationstatus: status      
                },
                (data) => {
                    let results = ""
                    data.forEach((allocatedvehicle, i) => {
                        results += `<tr data-allocationid='${allocatedvehicle.allocationid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${allocatedvehicle.deliveryorderno}</td>`
                        results += `<td>${allocatedvehicle.trucknumber}</td>`
                        results += `<td>${allocatedvehicle.drivername}</td>`
                        results += `<td>${allocatedvehicle.clientname}</td>`
                        results += `<td>${allocatedvehicle.destination}</td>`
                        results += `<td>${formatDate(allocatedvehicle.dateout)}</td>`
                        results += `<td>${formatDate(allocatedvehicle.expecteddatein)}</td>`
                        results += `<td>${formatDate(allocatedvehicle.actualdate) ||''}</td>`
                        results += `<td>${allocatedvehicle.containername}</td>`
                        results += `<td>${allocatedvehicle.containernumber}</td>`
                        results += `<td><a class="addexpense" id="addexpensebutton"><i class="fal fa-coins fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="viewexpenses" id="viewexpensebutton"><i class="fal fa-eye fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="editallocatedvehicle"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="printdeliverynote"><i class="fal fa-print fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="deleteallocatedvehicle"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td>`
                        results += `</tr>`
                    })

                    // allocatedvehiclestable.find("tbody").html(results) 
                    makedatatable(allocatedvehiclestable,results,25)
                }
            )
            } else {
            filternotifications.html(showAlert("info", errors))
            }
        }

        allocationvehiclesrefreshbutton.on('click', function(){
            getfilteredallocation()
        })

                    
                    
    
        setDatePicker(dateoutfield,true,false)
        setDatePicker(expecteddateinfield)
        setDatePicker(allocatedvehiclefromfield,true,false)
        setDatePicker(allocatedvehicletofield,true,false)
    
        getserverdate().done(() => {
            let serverDate = formatDate(serverdate)
            dateoutfield.val(serverDate)
        
            let newDate = new Date(serverDate)
        
            // Add 2 days to the newDate
            newDate.setDate(newDate.getDate() + 2)
        
            // Set the expected date
            expecteddateinfield.val(formatDate(newDate))
        })

        getserverdate().done(()=>{
            allocatedvehiclefromfield.val(formatDate(serverdate))
        })
        getserverdate().done(()=>{
            allocatedvehicletofield.val(formatDate(serverdate))
        })
    
        //Populate Clients' Names
        getclients(clientidfield,'Choose')
    
        //Populate the Containers Names
        getallocationcontainers(containeridfield, 'Choose')
    
        // populate Allocation currencies
        getallocationcurrencies(currencyfield, 'Choose')
       
        // get allocated expenses
        getallexpenses(expensenamefield, 'Choose')

        // get the expected date in for the truck return
        function calculateExpectedDate() {
            const startdate = new Date(dateoutfield.val());
            const daysValue = Number(stddaysfield.val());
        
            if (isNaN(startdate.getTime())) {
                expecteddateinfield.val('');
                return;
            }
        
            const addDays = (!isNaN(daysValue) && daysValue > 0) ? daysValue : 2;
        
            const expecteddate = new Date(startdate);
            expecteddate.setDate(startdate.getDate() + addDays);
        
            expecteddateinfield.val(formatDate(expecteddate));
        }
        
        stddaysfield.on('input', calculateExpectedDate);
        dateoutfield.on('change', calculateExpectedDate);
                
           
        // getavailablevehicles(trucknofield,'choose')
        
        trucknofield.on('change', function(){
            vehicleid=$(this).val()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    gettrailernumber:true,
                    vehicleid
                },
                (data)=>{
                    data=data[0]
                    trailernofield.val(data.trailerno)
                }
            )
        })
    
       
       getallvehicles(trucknofield,'Choose') 

        function getallvehicles(obj,option='all'){
            const dfd = $.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getallvehicles:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((vehicles)=>{
                        results+=`<option value='${vehicles.vehicleid}'>${vehicles.trucknumber}</option>`
                    })
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }

        // get available vehicles
        function getavailablevehicles(obj,option='all'){
            const dfd = $.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getavailabletruck:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((vehicles)=>{
                        results+=`<option value='${vehicles.vehicleid}'>${vehicles.trucknumber}</option>`
                    })
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }
 
        function getunallocatedvehicles(obj,option='all'){
            const dfd = $.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getunallocatedvehicles:true
                },
                (data)=>{
                    console.log(data)
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((unallocatedvehicle)=>{
                        results+=`<option value='${unallocatedvehicle.vehicleid}'>${unallocatedvehicle.trucknumber}</option>`
                    })
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }  


        // get avaiable drivers
        function getavaiabledrivers(obj,option='all'){
            const dfd = $.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getavaiabledrivers:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((drivers)=>{
                        results+=`<option value='${drivers.driverid}'>${drivers.driversname}</option>`
                    })
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }

        // get unallocated drivers
        // getunallocateddrivers(unallocateddriversfield, 'Choose')
        function getunallocateddrivers(obj,option='all'){
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getunallocateddrivers:true
                },
                (data)=>{
                    console.log(data)
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((unallocateddrivers)=>{
                        results+=`<option value='${unallocateddrivers.driverid}'>${unallocateddrivers.firstname} ${unallocateddrivers.lastname}</option>`
                    })
                    obj.html(results)
                }
            )
        }  
        
        // get all drivers
        getdrivers(driveridfield, 'Choose')
        function getdrivers(obj,option='all'){
            const dfd=$.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getdrivers:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((drivers)=>{
                        results+=`<option value='${drivers.driverid}'>${drivers.firstname} ${drivers.lastname}</option>`
                    })
                    // console.log(results)
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }
    
        function getclients(obj,option='all'){
            const dfd = $.Deferred()
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getclients:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((clients)=>{
                        results+=`<option value='${clients.clientid}'>${clients.clientname}</option>`
                    })
                    obj.html(results)
                    dfd.resolve()
                }
            )
            return dfd.promise()
        }
    
        function getallocationcurrencies(obj,option='all'){
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getallocationcurrencies:true
                },
                (data)=>{ 
                    let selectedId = 1
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((currencies)=>{
                         let isSelected = currencies.currencyid == selectedId ? 'selected' : ''
                         results += `<option value='${currencies.currencyid}' ${isSelected}>${currencies.currencyname}</option>`
                        // results+=`<option value='${currencies.currencyid}'>${currencies.currencyname}</option>`
                    })
                    obj.html(results)

                    if(selectedId==1){
                        exchangeratefield.val(1)
                    }
                }

            )
        }
    
        function getallocationcontainers(obj,option='all'){
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getallocationcontainers:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((containers)=>{
                        results+=`<option value='${containers.containerid}'>${containers.containername}</option>`
                    })
                    obj.html(results)
                }
            )
        }
    
        function getallexpenses(obj,option='all'){
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    getallexpenses:true
                },
                (data)=>{
                    let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((expenses)=>{
                        results+=`<option value='${expenses.expenseid}'>${expenses.allocatedexpensename}</option>`
                    })
                    obj.html(results)
                }
            )
        }
        // populate the allocation table with values from allocatedvehicles table
        // from database table
        loadallocatedvehicles()
        function loadallocatedvehicles(){
            $.getJSON(
                "../controllers/allocationoperations.php",
                {
                    loadallocatedvehicles:true
                },
                (data) => {
                    let results = ""
                    data.forEach((allocatedvehicle, i) => {
                        results += `<tr data-allocationid='${allocatedvehicle.allocationid}'>`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${allocatedvehicle.deliveryorderno}</td>`
                        results += `<td>${allocatedvehicle.trucknumber}</td>`
                        results += `<td>${allocatedvehicle.drivername}</td>`
                        results += `<td>${allocatedvehicle.clientname}</td>`
                        results += `<td>${allocatedvehicle.destination}</td>`
                        results += `<td>${formatDate(allocatedvehicle.dateout)}</td>`
                        results += `<td>${formatDate(allocatedvehicle.expecteddatein)}</td>`
                        results += `<td>${allocatedvehicle.actualdate ? allocatedvehicle.actualdate:''}</td>`
                        // results += `<td>${allocatedvehicle.actualdate ? allocatedvehicle.actualdate : 'N/A'}</td>`
                        results += `<td>${allocatedvehicle.containername}</td>`
                        results += `<td>${allocatedvehicle.containernumber}</td>`
                        results += `<td><a class="addexpense" id="addexpensebutton"><i class="fal fa-coins fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="viewexpenses" id="viewexpensebutton"><i class="fal fa-eye fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="editallocatedvehicle"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="printdeliverynote"><i class="fal fa-print fa-lg fa-fw"></i></a></td>`
                        results += `<td><a class="deleteallocatedvehicle"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td>`
                        results += `</tr>`
                    })

                    // allocatedvehiclestable.find("tbody").html(results,10)
                    makedatatable(allocatedvehiclestable,results,25)
                    
                    
                }
            )
           
        }

        // allocation vehicle recievables
        const allocationreceivablemodal=$('#allocationreceivable'),
            recievableidfield=$("#recievableid"),
            receivableallocationnofield=$('#receivableallocationno'),
            receivabletrucknofield=$('#receivabletruckno'),
            receivabledrivernamefield=$('#receivabledrivername'),
            receivabledateoutfield=$('#receivabledateout'),
            receivableexpecteddateinfield=$('#receivableexpecteddatein'),
            receivableoverduedaysfield=$('#receivableoverduedays'),
            recievablesactualdateinfield=$('#recievablesactualdatein'),
            saveallocationrecievablebutton=$('#saveallocationrecievable'),
            allocationreceivablenotifications=$('#allocationreceivablenotifications')

        // show the date
        setDatePicker(recievablesactualdateinfield)
        getserverdate().done(()=>{
            recievablesactualdateinfield.val(formatDate(serverdate))
        })

        // show the modal
        allocatedvehiclestable.on('click', '.viewexpenses', function() {
        
        
            const allocation = $(this).closest('tr').find('td'),
                allocationno = allocation.eq(1).text(),
                trucknumber = allocation.eq(2).text(),
                drivername = allocation.eq(3).text(),
                dateout = allocation.eq(6).text(),
                expecteddatein = allocation.eq(7).text(),
                allocationid = $(this).closest('tr').data("allocationid"),
                overduedate = (expecteddatein - dateout)

            recievableidfield.val(allocationid)
            receivableallocationnofield.val(allocationno).prop('disabled', true)
            receivabletrucknofield.val(trucknumber).prop('disabled', true)
            receivabledrivernamefield.val(drivername).prop('disabled', true)
            receivabledateoutfield.val(dateout).prop('disabled', true)
            receivableexpecteddateinfield.val(expecteddatein).prop('disabled', true)
            receivableoverduedaysfield.val(overduedate).prop('disabled', true)
            
            // showing the modal
            // disable actual on return
            allocationreceivablemodal.modal("show")
        })

        // save allocation receivables
        saveallocationrecievablebutton.on('click', function(){
            const  allocationid=recievableidfield.val(),
                allocationno=receivableallocationnofield.val(),
                actualdatein=recievablesactualdateinfield.val()
            let errors=''
            if(actualdatein==""){
                errors="Please provide the Actual Date In"
                recievablesactualdateinfield.focus()
            }
            if(errors==""){
                $.post(
                    "../controllers/allocationoperations.php",
                    {
                        savevehiclerecieved:true,
                        allocationid:allocationid,
                        actualdate:actualdatein,
                        revceivablestatus: 'Received'
                    },
                    (data)=>{
                        if(isJSON(data)){
                            data=JSON.parse(data)
                            if(data.status=="success"){
                                allocationreceivablenotifications.html(showAlert("success", `The Actual Date In for Delivery No <strong>${allocationno}</strong> has been saved successfully`))
                                loadallocatedvehicles()
                                setTimeout(()=>{
                                    allocationreceivablemodal.modal("hide")
                                    allocationreceivablenotifications.html("")
                                    clearallocationreceivablefields()
                                },2000)
                            }
                        }else{
                            allocationreceivablenotifications.html(showAlert("danger", `An error occured ${data}`))
                        }
                    }
                )
            }else{
                allocationreceivablenotifications.html(showAlert("info", errors))
            }
        })

        // clear allocation receivable fields
        function clearallocationreceivablefields(){
            recievableidfield.val("")
            receivableallocationnofield.val("")
            receivabletrucknofield.val("")
            receivabledrivernamefield.val("")
            receivabledateoutfield.val("")
            receivableexpecteddateinfield.val("")
            receivableoverduedaysfield.val("")
            recievablesactualdateinfield.val("")
        }

        
      

       // view expenses modal show with details
        // allocatedvehiclestable.on('click', ".viewexpenses", function() {
        //     const allocation = $(this).closest('tr'),
        //         row = allocation.find('td'),
        //         orderno = row.eq(2).text(),
        //         trucknumber = row.eq(3).text(),
        //         allocationid = allocation.data("allocationid");
                

        //     totalamount1.closest('.col-md-6').show();
        //     totaldivfield.closest('.col-md-6').hide();

        //     $('#expensemodal').slideDown(1000);
        //     expensemodal.modal({
        //         show: true,
        //         backdrop:'static',
        //         keyboard: false
        //     });
        //     expensetrucknofield.val(trucknumber);
        //     deliveryordernumberfield.val(orderno).data("allocationid", allocationid);
 
        //     expensescard.hide();
        //     addexpensestab.hide();
        //     expensestabfooter.hide();
        //     deletebutton.hide();
        //     editbutton.hide();

        //     // Populate the view expenses table
        //     $.getJSON(
        //         "../controllers/allocationoperations.php",
        //         {
        //             getallocatedexpenses: true,
        //             allocationid
        //         },
        //         (data) => {
        //             let results = "";
        //             data.forEach((allocatedexpense, i) => {
        //                 results += `<tr data-allocationid='${allocatedexpense.allocationid}'>`;
        //                 results += `<td>${Number(i + 1)}</td>`;
        //                 results += `<td>${allocatedexpense.expenseid}</td>`;
        //                 results += `<td>${allocatedexpense.expensename}</td>`;
        //                 results += `<td contenteditable='true' >${allocatedexpense.amount}</td>`;
        //                 results += `<td><a href="#" class="delete" id="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`;
        //             });
        //             allocatedvehicleexpensetable.find("tbody").html(results);

        //             let total = 0;
        //             allocatedvehicleexpensetable.find('tbody tr').each(function() {
        //                 const amountText = $(this).find('td').eq(3).text().replace(",", "");
        //                 total += Number(amountText);
        //             });

        //             // Format total amount with commas if needed
        //             const formattedTotal = total.toLocaleString();
        //             totalamount1.html(formattedTotal);
        //         }
        //     )
        // })

        // Edit Allocated vehicle
        allocatedvehiclestable.on("click", ".editallocatedvehicle", function(){
            statuscontainer.show()
            trucknofield.prop('disabled', false)
            unallocateddriversfield.val('').prop('disabled', true)
            unallocatedvehiclesfield.val('').prop('disabled', true)
            driverstatusfield.val("Not Available").prop('disabled', true)
            vehiclestatusfield.val("Allocated").prop('disabled', true)

            statusremarkscontainer.show()
            // allocatedvehiclesnotificationstable.html("")
 
            const parent =$(this).closest('tr'),
                allocationid=parent.attr("data-allocationid"),
                vehicleid=parent.find('td').eq(2).text()
                allocationsid.val(allocationid)

            
            // console.log(allocationid);
                $.getJSON(
                    "../controllers/allocationoperations.php",
                    {
                        getallocatedvehiclesdetails:true,
                        allocationid
                    },
                    (data)=>{
                        data=data[0]
                        console.log(data)
                        // allocationidfield.val(data.id)
                        deliveryordernumberfield.val(data.deliveryorderno)
                        //get all vehicles
                        getallvehicles(trucknofield).done(()=>{
                            trucknofield.val(data.vehicleid)
                        })
                       
                        //  get all drivers()
                        getdrivers(driveridfield).done(()=>{
                            driveridfield.val(data.driverid)
                        })
                        // get all clients
                        getclients(clientidfield).done(()=>{
                            clientidfield.val(data.clientid)
                        })
                        // clientidfield.val(data.clientid)
                        trailernofield.val(data.trailerno)
                        routefield.val(data.route)
                        destinationfield.val(data.destination)
                        kilometersfield.val(data.kilometers)
                        dateoutfield.val(formatDate(data.dateout))
                        stddaysfield.val(data.stddays)
                        expecteddateinfield.val(formatDate(data.expecteddatein))
                        particularfield.val(data.particular)
                        containeridfield.val(data.containerid)
                        containernumberfield.val(data.containernumber)
                        othersfield.val(data.others)
                        amountfield.val(data.amount)
                        currencyfield.val(data.currency)
                        exchangeratefield.val(data.exchangerate)
                        remarksfield.val(data.remarks)
                        allocatevehiclemodal.modal("show")
                    }   
                    
                   
                ) 
                 
        })

        //print delivery note    
        // allocatedvehiclestable.on('click', '.printdeliverynote', function () {
        //     const $row = $(this).closest('tr'),
        //     allocationid=$row.attr("data-allocationid"),
        //     clientname = $row.find('td').eq(4).text().trim(),
        //     deliveryorderno = $row.find('td').eq(1).text().trim(),
        //     truckno = $row.find('td').eq(2).text().trim(),
        //     date = $row.find('td').eq(6).text().trim()
        
        //     // Get values from database
        //     $.getJSON(
        //         '../controllers/allocationoperations.php',
        //         {
        //             getcompanydetails:true,
        //             getallocatedvehiclesdetails: true,
        //             allocationid
        //         },
        //         (data) => {
        //             data = data[0];
        //             console.log(data);
                    
        //             const address = data.address,
        //                 telephone = data.telephone,
        //                 particular = data.particular,
        //                 driver = data.drivername,
        //                 route = data.route,
        //                 remarks = data.remarks;

        //                 // company details
        //                 const companyname = data.companyname,
        //                 companyaddress = data.postaladdress,
        //                 companymobile1 = data.tel1,
        //                 companymobile2 = data.tel2,
        //                 companyemail = data.email
            
        //             // Absolute path to logo image
        //             const logoPath = "http://localhost/fleet/images/tlogo.png";
            
        //             // print the document
        //             const newWin = window.open('');
        //             newWin.document.write(`
        //                 <html>
        //                 <head>
        //                     <?php require_once("header.txt")?>
        //                     <title>Delivery Note</title>
        //                     <style>
        //                         body { font-family: Arial, sans-serif; margin: 20px; }
        //                         .header {margin-bottom: 30px; }
        //                         .header img { max-height: 80px; float: left; margin-right: 20px; }
        //                         table { width: 100%; border-collapse: collapse; margin-top: 20px; margin-bottom: 40px;}
        //                         th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        //                         .signature p { margin: 20px 0; font-size: 16px; }
        //                         .underline { display: inline-block; border-bottom: 1px solid #000; width: 200px; height: 1em; margin-left: 10px; }
        //                     </style>
        //                 </head>
        //                 <body>
        //                     <div class="header">
        //                         <h3 style="text-align: left; margin-left: 90px">${companyname}</h3>
        //                         <img id="logo" src="${logoPath}" alt="Company Logo" style="max-height: 100px; margin-top: 10px; float: left; margin-right: 20px;">
        //                         <div style="text-align:right">
        //                             <div class="company-info"  style="margin: 0; padding: 0;">
        //                                 <p style = "margin: 0">Nrb</p>
        //                                 <p style = "margin: 0">${companyaddress}</p>
        //                                 <p style = "margin: 0">Tel: ${companymobile1}</p>
        //                                  <p style = "margin: 0">Tel: ${companymobile2}</p>
        //                                 <p style = "margin: 0">${companyemail}</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <h4 style="text-decoration: underline; text-align: center; margin-right: 150px;">DELIVERY NOTE</h4>
        //                     <!-- Content goes here -->
        //                     <div style="display: flex; justify-content: space-between;">
        //                         <div class="company-info">
        //                             <p><strong>Client Name:</strong> ${clientname}</p>
        //                             <p><strong>Address:</strong> ${address}</p>
        //                             <p><strong>Telephone:</strong> ${telephone}</p>
        //                         </div>
        //                         <div class="company-info">
        //                             <p><strong>Delivery No:</strong> ${deliveryorderno}</p>
        //                             <p><strong>Truck No:</strong> ${truckno}</p>
        //                             <p><strong>Date:</strong> ${date}</p>
        //                         </div>
        //                     </div>
            
        //                     <table>
        //                         <tr>
        //                             <th>Particulars</th>
        //                             <th>Quantity</th>
        //                         </tr>
        //                         <tr>
        //                             <td>${particular}</td>
        //                             <td>${particular}</td>
        //                         </tr>
        //                     </table>
            
        //                     <div class="company-info">
        //                         <p><strong>Driver:</strong> ${driver}</p>
        //                         <p><strong>Route:</strong> ${route}</p>
        //                         <p><strong>Remarks:</strong> ${remarks}</p>
        //                     </div>
            
        //                     <div style="display: flex; justify-content: space-between;">
        //                         <div class="signature">
        //                             <p><strong>Received By:</strong> <span class="underline"></span></p>
        //                             <p><strong>Signature:</strong> <span class="underline"></span></p>
        //                         </div>
        //                         <div class="signature">
        //                             <p><strong>Date:</strong> <span class="underline"></span></p>
        //                         </div>
        //                     </div>
        //                 </body>
        //                 </html>
        //             `);
            
        //             const logo = newWin.document.getElementById('logo');
            
        //             // Wait for the logo image to load before printing
        //             logo.onload = function() {
        //                 newWin.document.close();  // Close the document to ensure it is fully loaded
        //                 newWin.print();  // Trigger print once image is loaded
        //             }
        //         }
        //     );
            
            
        // })

        //print delivery note   
        allocatedvehiclestable.on('click', '.printdeliverynote', function () {
            const $row = $(this).closest('tr');
            const allocationid = $row.attr("data-allocationid");
            const clientname = $row.find('td').eq(4).text().trim();
            const deliveryorderno = $row.find('td').eq(1).text().trim();
            const truckno = $row.find('td').eq(2).text().trim();
            const date = $row.find('td').eq(6).text().trim();

            // Open a new window for the print layout
            const newWin = window.open('', '_blank'); 

            // Make the AJAX request to get company and allocation details
            $.getJSON(
                '../controllers/allocationoperations.php', 
                {
                    getcompanydetails: true,
                    getallocatedvehiclesdetails: true,
                    allocationid
                },
                (data) => {
                    // Get the company and allocation data from the response
                    const company = data.company;
                    const allocation = data.allocation;

                    // Define the absolute path for the logo
                    const logoPath = `http://localhost/fleet/images/tlogo.png`;

                    // Write the HTML content to the new window for printing
                    newWin.document.write(`
                        <html>
                        <head>
                            <title>Delivery Note</title>
                            <style>
                                body { font-family: Arial, sans-serif; margin: 20px; }
                                .header img { max-height: 80px; float: left; margin-right: 20px; }
                                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                                .underline { border-bottom: 1px solid #000; width: 200px; display: inline-block; }
                            </style>
                        </head>
                        <body>
                            <!-- Company Header -->
                            <div class="header">
                                <img id="logo" src="${logoPath}" alt="Company Logo" style="max-height: 100px; margin-top: 10px; float: left; margin-right: 10px;">
                                <h3 style="text-align: left; margin-left: 90px">${company.companyname}</h3>
                                <div style="text-align:right">
                                    <div class="company-info"  style="margin: 0; padding: 0;">
                                        <p style = "margin: 0">Nrb</p>
                                        <p style = "margin: 0">${company.postaladdress}</p>
                                        <p style = "margin: 0">Tel: ${company.tel1}</p>
                                        <p style = "margin: 0">Tel: ${company.tel2}</p>
                                        <p style = "margin: 0">${company.email}</p>
                                    </div>
                                </div>
                            </div>

                            <h4 style="text-decoration: underline; text-align: center; margin-right: 10px;">DELIVERY NOTE</h4>
                            <!-- Content goes here -->
                            <div style="display: flex; justify-content: space-between;">
                                <div class="company-info">
                                    <p><strong>Client Name:</strong> ${clientname}</p>
                                    <p><strong>Address:</strong> ${allocation.address}</p>
                                    <p><strong>Telephone:</strong> ${allocation.telephone}</p>
                                </div>
                                <div class="company-info">
                                    <p><strong>Delivery No:</strong> ${deliveryorderno}</p>
                                    <p><strong>Truck No:</strong> ${truckno}</p>
                                    <p><strong>Date:</strong> ${date}</p>
                                </div>
                            </div>
                        
                            <!-- Vehicle and Delivery Details -->
                            <table>
                                <tr>
                                    <th>Particulars</th>
                                    <th>Quantity</th>
                                </tr>
                                <tr>
                                    <td>${allocation.particular}</td>
                                    <td>${allocation.particular}</td>
                                </tr>
                            </table>

                            <!-- Driver and Remarks -->
                            <div class="company-info">
                                <p><strong>Driver:</strong> ${allocation.drivername}</p>
                                <p><strong>Route:</strong> ${allocation.route}</p>
                                <p><strong>Remarks:</strong> ${allocation.remarks}</p>
                            </div>

                            <!-- Signatures -->
                            <div style="display: flex; justify-content: space-between;">
                                <div class="signature">
                                    <p><strong>Received By:</strong> <span class="underline"></span></p>
                                    <p><strong>Signature:</strong> <span class="underline"></span></p>
                                </div>
                                <div class="signature">
                                    <p><strong>Date:</strong> <span class="underline"></span></p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `);


                    const logo = newWin.document.getElementById('logo');
                
                    // Wait for the logo image to load before printing
                    logo.onload = function() {
                    newWin.document.close();  // Close the document to ensure it is fully loaded
                        newWin.print();  // Trigger print once image is loaded
                    }
                }
            );
        });


        // delete allocated vehicle
        allocatedvehiclestable.on("click", ".deleteallocatedvehicle", function(){
            const parent=$(this).closest("tr"),
            allocationid=parent.attr("data-allocationid"),
            trucknumber=parent.find("td").eq(2).text()
    
            bootbox.dialog({
                title: "Delete Allocated Vehicle",
                message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete <span class='font-weight-bold'>${trucknumber}</span> from the system.`,
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
                            allocatedvehiclesnotificationstable.html(showAlert("Processing", "Processing. Please wait...",1))
                            $.post(
                                "../controllers/allocationoperations.php",
                                {
                                    deleteallocatedvehicle:true,
                                    allocationid
                                },
                                (data)=>{
                                    if(isJSON(data)){
                                        data=JSON.parse(data)
                                        if (data.status=="success"){
                                            allocatedvehiclesnotificationstable.html(showAlert("success",`Vehicle Reg No <strong>${trucknumber}</strong> deleted successfully.`))
                                            loadallocatedvehicles()            
                                        }
                                    }
                                    else{
                                        allocatedvehiclesnotificationstable.html(showAlert("danger", `Sorry an error occured ${data}`))
                                    }
                                }
                            )
                            .fail(() => {
                                allocatedvehiclesnotificationstable.html(showAlert("danger", "Request failed. Please try again."));
                            });
                        }
                    }
                }
            })
        })

       
        checkedfield.on('change', function(){
            // const updated = checkedfield.val()
            if($(this).is(':checked')){
                statusnotifications.show()
                getunallocateddrivers(unallocateddriversfield, 'Choose')
                getunallocatedvehicles(unallocatedvehiclesfield, 'Choose')
                // const updated = 
                trucknofield.prop('disabled', true)
                unallocateddriversfield.val('').prop('disabled', false)
                unallocatedvehiclesfield.val('').prop('disabled', false)
                vehiclestatusfield.val("Available").prop('disabled', false)
                driverstatusfield.val("Available").prop('disabled', false)
                driveridfield.prop('disabled', true)
                clientidfield.prop('disabled', true)              
                routefield.prop('disabled', true)
                destinationfield.prop('disabled', true)
                kilometersfield.prop('disabled', true)
                dateoutfield.prop('disabled', true)
                stddaysfield.prop('disabled', true)
                particularfield.prop('disabled', true)
                containeridfield.prop('disabled', true)
                containernumberfield.prop('disabled', true)
                othersfield.prop('disabled', true) 
                amountfield.prop('disabled', true)
                currencyfield.prop('disabled', true)
                exchangeratefield.prop('disabled', true)
                remarksfield.prop('disabled', true)
                // updated=1

            }else{ 
                statusnotifications.hide()
                trucknofield.prop('disabled', false)
                unallocateddriversfield.val('').prop('disabled', true)
                unallocatedvehiclesfield.val('').prop('disabled', true)
                vehiclestatusfield.val("Allocated").prop('disabled', true)
                driverstatusfield.val("Not Available").prop('disabled', true)
                driveridfield.prop('disabled', false) 
                clientidfield.prop('disabled', false) 
                routefield.prop('disabled', false)
                destinationfield.prop('disabled', false)
                kilometersfield.prop('disabled', false)
                dateoutfield.prop('disabled', false)
                stddaysfield.prop('disabled', false)
                particularfield.prop('disabled', false)
                containeridfield.prop('disabled', false)
                containernumberfield.prop('disabled', false)
                othersfield.prop('disabled', false) 
                amountfield.prop('disabled', false)
                currencyfield.prop('disabled', false)
                exchangeratefield.prop('disabled', false)
                remarksfield.prop('disabled', false)
                // updated=0
            }

        })  

    });
    

   



