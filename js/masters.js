$(document).ready(function(){
    const currentmenu=$("#masters")
    setactivemenu(currentmenu)
    // getloggedinuser()

    const vehiclestable=$("#vehiclestable"),
        vehicleidfield=$("#vehicleid"),
        vehiclesmodal =$("#vehiclesmodal"),
        addnewvehiclebutton=$("#addnewvehicle"),
        trucknumberfield=$("#trucknumber"),
        trailernofield=$("#trailerno"),
        vehiclemodelfield=$("#vehiclemodel"),
        yearofmanufacturefield=$("#yearofmanufacture"),
        vehiclecolorfield=$("#vehiclecolor"),
        vehicletypefield=$("#vehicletype"),
        vehiclesnotifications=$("#vehiclesnotifications"),
        savevehiclebutton=$("#savevehiclebutton"),
        vehiclenotificationstable=$("#vehiclenotificationstable"),

        //For Clients
        clientsmodal=$("#clientsmodal"),
        addnewclientbutton=$("#addnewclient"),
        clientidfield=$("#clientid"),
        clientstable=$("#clientstable"),
        clientnamefield=$("#clientname"),
        clientaddressfield=$("#clientaddress"),
        clienttelephonefield=$("#clienttelephone"),
        clientcontactfield=$("#clientcontact"),
        clientnotifications=$("#clientnotifications"),
        saveclientbutton=$("#saveclientbutton"),
        clientnotificaticationstable=$("#clientnotificaticationstable"),

        //For Drivers
        driverstable=$("#driverstable"),
        driversmodal=$("#driversmodal"),
        addnewdriverbutton=$("#addnewdriver"),
        driveridfield=$("#driverid"),
        driverfirstnamefield=$("#driverfirstname"),
        driverlastnamefield=$("#driverlastname"),
        driveridtypefield=$("#identificationtype"),
        driveridnofield=$("#identificationnumber"),
        drivertelephonefield=$("#drivertelephone"),
        driverresidencefield=$("#residence"),
        savedriverbutton=$("#savedriverbutton"),
        drivernotifications=$("#drivernotifications"),
        drivernotificationstable=$("#drivernotificationstable")

        //Add New Vehicle 
    addnewvehiclebutton.on("click",()=>{
    vehiclesnotifications.html("") //Clear the Message
    vehiclesmodal.modal("show")
   })

    //Add New Clients
    addnewclientbutton.on("click",()=>{
    clientnotifications.html("") 
    clientsmodal.modal("show")
   })

   addnewdriverbutton.on("click",()=>{
    driversmodal.modal("show")
   })

  // populating the vehicle type field
  getvehicletype(vehicletypefield,'Choose')
  populateyears(yearofmanufacturefield) 

  //Get All Vehicles
  getallvehicles()

  //Get all Clients
  getclients()

  //Populate ID fields
  getidtypes(driveridtypefield,'Choose')

  //Load Drivers
  getdrivers()

    // adding the validation on the vehicles
  savevehiclebutton.on("click",()=>{
        const vehicleid=vehicleidfield.val(),
            trucknumber=trucknumberfield.val(),
            trailerno=trailernofield.val(),
            model=vehiclemodelfield.val(),
            yom=yearofmanufacturefield.val(),
            color=vehiclecolorfield.val(),
            vehicletype=vehicletypefield.val()

        let errors=""
        if(trucknumber==""){
            errors="Please enter Truck Number"
            trucknumberfield.focus()
        }else if(trailerno==""){
            errors="Please enter the Trailer Number"
            trailernofield.focus()
        }else if(model==""){
            errors="Please enter the Truck model"
            vehiclemodelfield.focus()
        }else if(yom==""){
            errors="Please choose the Year of Maufacture"
            yearofmanufacturefield.focus()
        }else if(color==""){
            errors="Please enter the vehicle color"
            vehiclecolorfield.focus()
        }else if(vehicletype==""){
            errors="Please input the Type of Vehicle"
            vehicletypefield.focus()
        }
        if (errors==""){

            $.post(
                "../controllers/mastersoperations.php",
                {
                    savevehicles:true,
                    vehicleid:vehicleid,
                    trucknumber:trucknumber,
                    trailerno:trailerno,
                    model:model,
                    manufacturedyear:yom,
                    color:color,
                    vehicletype:vehicletype
                },
                (data) => {
                    if (isJSON(data)) {
                        data = JSON.parse(data)
                        if (data.status == "success") {
                            if (vehicleid==0){
                                vehiclesnotifications.html(showAlert("success", `The truck <strong>${trucknumber}</strong> has been saved successfully`))
                            }else{
                                vehiclesnotifications.html(showAlert("success", `The truck <strong>${trucknumber}</strong> updated successfully`))
                            }
                            //Clear Fields
                            clearvehiclefields()
                            populateyears(yearofmanufacturefield) 
                            trucknumberfield.focus()

                            //Load Vehicles
                            getallvehicles()

                            // hide modal and clear notifications
                            setTimeout(()=>{
                                vehiclesmodal.modal("hide")
                                vehiclesnotifications.html("")
                            },2000)
                         
                        }
                    } else {
                        vehiclesnotifications.html(showAlert("danger", `Sorry an error occured ${data}`))
                    }
                }
            )
        }else{
            vehiclesnotifications.html(showAlert("info",errors))
        }
    })

    function getallvehicles(){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getallvehicles:true
            },
            (data) => {
                let results = ""
                data.forEach((vehicle, i) => {
                    results += `<tr data-id='${vehicle.vehicleid}'>`
                    results += `<td>${Number(i + 1)}</td>`
                    results += `<td>${vehicle.trucknumber}</td>`
                    results += `<td>${vehicle.trailerno}</td>`
                    results += `<td>${vehicle.model}</td>`
                    results += `<td>${vehicle.manufacturedyear}</td>`
                    results += `<td>${vehicle.color}</td>`
                    results += `<td>${vehicle.description}</td>`
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                })
                makedatatable(vehiclestable,results,25)
                // vehiclestable.find("tbody").html(results,10)
            }
        )
    }

    function getvehicletype(obj,option='all'){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getvehicletype:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((vehicletype)=>{
                    results+=`<option value='${vehicletype.vehicletypeid}'>${vehicletype.description}</option>`
                })
                obj.html(results)
            }
        )
    }

    function getidtypes(obj,option='all'){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getidtypes:true
            },
            (data)=>{
                let results=option=='all'?"<option value=0>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</otion>"
                data.forEach((idtype)=>{
                    results+=`<option value='${idtype.typeid}'>${idtype.description}</option>`
                })
                obj.html(results)
            }
        )
    }

    saveclientbutton.on("click",()=>{
        const clientid=clientidfield.val(),
              clientname=clientnamefield.val(),
              clientaddress=clientaddressfield.val(),
              clienttelephone=clienttelephonefield.val(),
              clientcontact=clientcontactfield.val()

              let errors=""
              if(clientname==""){
                errors="Please enter Client Name"
                clientnamefield.focus()
              }else if(clientaddress==""){
                errors="Please enter address"
                clientaddressfield.focus()
              }else if(clienttelephone==""){
                errors="Please Enter telephone"
                clienttelephonefield.focus()
              }else if(clientcontact==""){
                errors="Please enter Contact details"
                clientcontactfield.focus()
              }

              if (errors==""){
                $.post(
                    "../controllers/mastersoperations.php",
                    {
                        saveclients:true,
                        clientid:clientid,
                        clientname:clientname,
                        address:clientaddress,
                        telephone:clienttelephone,
                        contactperson:clientcontact
                    },
                    (data) => {
                        if (isJSON(data)){
                            data = JSON.parse(data)
                            if (data.status =="success"){
                                if(clientid==0){
                                    clientnotifications.html(showAlert("success", `Client successfully added`))
                                }else{
                                    clientnotifications.html(showAlert("success", `Client Details successfully updated`))   
                                }

                                clearclientsfields()
                                clientnamefield.focus()
                                
                                //Load Clients
                                getclients() 
                                
                                // hide modal and clear notifications
                                setTimeout(()=>{
                                    clientsmodal.modal("hide")
                                    clientnotifications.html("")
                                },2000)

                            }                      
                        } else {
                            clientnotifications.html(showAlert("danger", `Sorry an error occurred ${data}`))
                        }
                    }
                )
              } else {
                clientnotifications.html(showAlert("info", errors))
              }
    })

    savedriverbutton.on("click",()=>{
        const driverid=driveridfield.val(),
               driverfirstname=driverfirstnamefield.val(),
               driverlastname=driverlastnamefield.val(),
               driveridtype=driveridtypefield.val(),
               driveridno=driveridnofield.val(),
               drivertelephone=drivertelephonefield.val(),
               driverresidence=driverresidencefield.val()
               
            let errors=""
            if (driverfirstname==""){
                errors="Please enter first name"
                driverfirstnamefield.focus()
            }else if (driverlastname==""){
                errors="Please enter last name"
                driverlastnamefield.focus()
            }else if (driveridtype==0){
                errors="Please Select id type"
                driveridtypefield.focus()
            }else if (driveridno==""){
                errors="Please Enter Identity no"
                driveridnofield.focus()
            }else if(drivertelephone==""){
                errors="Please enter telephone"
                drivertelephonefield.focus()
            }else if(driverresidence==""){
                errors="Please enter drivers' residence"
                driverresidencefield.focus()
            }
            if (errors==""){
                $.post(
                    "../controllers/mastersoperations.php",
                    {
                        savedrivers:true,
                        driverid:driverid,
                        firstname:driverfirstname,
                        lastname:driverlastname,
                        idtype:driveridtype,
                        identityno:driveridno,
                        telephoneno:drivertelephone,
                        residence:driverresidence
                    },
                    (data)=>{
                        if (isJSON(data)){
                            data=JSON.parse(data)
                            if (data.status=="success"){
                                if (driverid==0){
                                    drivernotifications.html(showAlert("success",`Driver successfully added`))
                                }else{
                                    drivernotifications.html(showAlert("success", `Driver details successfully updated`))
                                }
                                cleardriversfields()
                                driverfirstnamefield.focus()

                                //Load Drivers
                                getdrivers()

                                // hide modal and clear notifications
                                setTimeout(()=>{
                                    driversmodal.modal("hide")
                                    drivernotifications.html("")
                                },2000)
                            }
                        }else{
                            drivernotifications.html(showAlert("danger", `An error occurred ${data}`))
                        }
                    }
                )
            }else{
                drivernotifications.html(showAlert("info",errors))
            }              
    })


    function getclients(){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getclients:true
            },
            (data) => {
                let results = ""
                data.forEach((client, i) => {
                    results += `<tr data-id = '${client.clientid}'>`
                    results += `<td>${Number(i + 1)} </td>`
                    results += `<td>${client.clientname}</td>`
                    results += `<td>${client.address}</td>`
                    results += `<td>${client.telephone}</td>`
                    results += `<td>${client.contactperson}</td>`
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`                   
                })
                    // clientstable.find("tbody").html(results, 10)
                    makedatatable(clientstable,results,25)
            }
        )
    }

    function getdrivers(){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getdrivers:true
            },
            (data) => {
                let results = ""
                data.forEach((driver, i) => {
                    results += `<tr data-id = '${driver.driverid}'>`
                    results += `<td>${Number(i + 1)}</td>`
                    results += `<td>${driver.firstname+' '+driver.lastname}</td>`
                    results += `<td>${driver.identityno}</td>`
                    results += `<td>${driver.telephoneno}</td>`
                    results += `<td>${driver.residence}</td>`
                    results += `<td><a href="#" class="edit"><i class="fal fa-edit fa-lg fa-fw"<i/></a></td>`
                    results += `<td><a href="#" class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                })
                    // driverstable.find("tbody").html(results, 10)
                    makedatatable(driverstable,results,25)

            }
        )
    }

    //delete vehicles from the grid
    vehiclestable.on("click", ".delete", function(){
        vehiclenotificationstable.html("")
        const parent=$(this).closest("tr")
        const vehicleid=parent.attr("data-id")
        const trucknumber=parent.find("td").eq(1).text()

        bootbox.dialog({
            title: "Delete Vehicle",
            message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete <span class='font-weight-bold'>${trucknumber}</span> from the system.`,
            buttons: {
                success: {
                    label: "No, Keep",
                    classname: "btn-success btn-sm",
                    callback: function(){
                        $('.bootbox').modal('hide');
                    }
                },
                danger: {
                    label: "Yes, Delete",
                    classname: "btn-danger btn-sm",
                    callback: function(){
                        vehiclenotificationstable.html(showAlert("Processing", "Processing. Please wait...",1))
                        $.post(
                            "../controllers/mastersoperations.php",
                            {
                                deletevehicle:true,
                                vehicleid
                            },
                            (data)=>{
                                if(isJSON(data)){
                                    data=JSON.parse(data)
                                    if (data.status=="success"){
                                        vehiclenotificationstable.html(showAlert("success",`Vehicle Reg No <strong>${trucknumber}</strong> deleted successfully.`))
                                        getallvehicles()

                                        // clear the notifications
                                        setTimeout(()=>{
                                            vehiclenotificationstable.html("")
                                        },2000)
                                    }
                                }
                                else{
                                    vehiclenotificationstable.html(showAlert("danger", `Sorry an error occured ${data}`))
                                }
                            }
                        )
                    }
                }
            }
        })
    })

    //Edit Vehicle
    vehiclestable.on("click", ".edit", function(){
        vehiclenotificationstable.html("")
        const vehicleid=$(this).closest("tr").attr("data-id")
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getvehicledetails:true,
                vehicleid
            },
            (data)=>{
                data=data[0]
                vehicleidfield.val(data.vehicleid)
                trucknumberfield.val(data.trucknumber)
                trailernofield.val(data.trailerno)
                vehiclemodelfield.val(data.model)
                yearofmanufacturefield.val(data.manufacturedyear)
                vehiclecolorfield.val(data.color)
                vehicletypefield.val(data.vehicletype)
                vehiclesmodal.modal("show")
            }            
        )     
    })

    //Edit Client
    clientstable.on("click",".edit", function(){
        clientnotifications.html("")
        const clientid=$(this).closest("tr").attr("data-id")
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getclientdetails:true,
                clientid
            },
            (data)=>{
                data=data[0]
                clientidfield.val(data.clientid)
                clientnamefield.val(data.clientname)
                clientaddressfield.val(data.address)
                clienttelephonefield.val(data.telephone)
                clientcontactfield.val(data.contactperson)
                clientsmodal.modal("show")
            }
        )
    })

    driverstable.on("click",".edit",function(){
        drivernotifications.html("")
        const driverid=$(this).closest("tr").attr("data-id")
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getdriverdetails:true,
                driverid
            },
            (data)=>{
                data=data[0]
                driveridfield.val(data.driverid)
                driverfirstnamefield.val(data.firstname)
                driverlastnamefield.val(data.lastname)
                driveridtypefield.val(data.idtype)
                driveridnofield.val(data.identityno)
                drivertelephonefield.val(data.telephoneno)
                driverresidencefield.val(data.residence)
                driversmodal.modal("show")                
            }
        )
    })

    //Delete Client
    clientstable.on("click", ".delete", function(){
        clientnotifications.html("")
        const parent=$(this).closest("tr")
        const clientid=parent.attr("data-id")
        const clientname=parent.find("td").eq(1).text()

        bootbox.dialog({
            title: "Delete Client",
            message:`<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete <span class='font-weight-bold'>${clientname}</span> from the system.`,
            buttons:{
                success: {
                    label : "No, Keep",
                    classname : "btn-sucess btn-sm",
                    callback : function(){
                        $('.bootbox').modal("hide");
                    }
                },
                danger:{
                    label:"Yes, Delete",
                    classname: "btn-danger btn-sm",
                    callback: function(){
                        clientnotificaticationstable.html(showAlert("Processing", "Processing. Please wait...",1))
                        $.post(
                            "../controllers/mastersoperations.php",
                            {
                                deleteclient:true,
                                clientid
                            },
                            (data)=>{
                                if(isJSON(data)){
                                    data=JSON.parse(data)
                                    if (data.status=="success"){
                                        clientnotificaticationstable.html(showAlert("success", `<strong>${clientname}<strong/> deleted successfully`))
                                        getclients()

                                        // clear the notifications
                                        setTimeout(()=>{
                                            clientnotificaticationstable.html("")
                                        },2000)
                                    }
                                }
                                else{
                                    clientnotificaticationstable.html(showAlert("danger",`Sorry an error occurred ${data}`))
                                }              
                            }
                        )
                    }
                }
            }
        })
    })
 
    //Delete Driver
    driverstable.on("click",".delete",function(){
        const parent=$(this).closest("tr")
        const driverid=parent.attr("data-id")
        const drivername=parent.find("td").eq(1).text()

        bootbox.dialog({
            title:"Delete driver",
            message:`<i class='fal fa-question-cirle fa-2x fa-fw text-primary'></i>Are you sure you want to delete <span class='font-weight-bold'>${drivername}</span> from the system.`,
            buttons:{
                success:{
                    label:"No, Keep",
                    classname:"btn-success btn-sm",
                    callback: function(){
                        $('.bootbox').modal("hide");
                    }
                },
                danger:{
                    label:"Yes, Delete",
                    classname:"btn-danger btn-sm",
                    callback: function(){
                        drivernotificationstable.html(showAlert("Processing","Processing. Please wait...",1))
                        $.post(
                            "../controllers/mastersoperations.php",
                            {
                                deletedriver:true,
                                driverid
                            },
                            (data)=>{
                                if(isJSON(data)){
                                    data=JSON.parse(data)
                                    if(data.status=="success"){
                                        drivernotificationstable.html(showAlert("success", `<strong>${drivername}</strong> deleted successfully`))
                                        getdrivers()
                                        // clear the notifications
                                        setTimeout(()=>{
                                            drivernotificationstable.html("")
                                        },2000)
                                    }
                                }
                                else{
                                    drivernotificationstable.html(showAlert("danher",`An error occurred ${data}`))
                                }
                            }
                        )
                    }
                }
            }
        })
    })

    // chageable items
    const addnewchargeableitem=$("#addnewchargeitem"),
        chargeableitemsmodal=$("#chargeableitemsmodal")

        const voteheadidfield=$("#chargeableitemid")
        const voteheaddescriptionfield=$("#chargeableitemdescription")
        const voteheadonetimechargefield=$("#onetimecharge")
        const voteheaddefaultvaluefield=$("#chargeableitemdefaultamount")
        const voteheadrefundablefield=$("#refundable")
        const voteheadpercentagefield=$("#percentage")
        const voteheadisadepositfield=$("#isadeposit")
        const voteheadhascommissionfield=$("#hascommission")
        const voteheadvisiblefield=$("#chargesvisible")
        const voteheadpercentageitemfield=$("#percentageitem")
        const savevoteheadbutton=$("#savevotehead")
        const voteheaddetailsnotifications=$("#voteheaddetailsnotifications")
        const voteheadstable=$("#voteheadstable")
        const voteheadnotification=$("#voteheadnotification")


    addnewchargeableitem.on("click",()=>{
    //     checkoruserprivilege('1x001').done(function(allowed){
    //         if(allowed==1){
            chargeableitemsmodal.modal("show")
            voteheaddetailsnotifications.html("")
            voteheaddescriptionfield.focus()
            voteheadpercentageitemfield.val("")
        //     }else{
        //         voteheadnotification.html(showAlert("danger",`Sorry You dont have the <strong>Privillages</strong> to add Chargeable Items`))
        //     }
        // })
    })

    getvoteheadsastable()

    savevoteheadbutton.on("click",()=>{
        const itemid=voteheadidfield.val(), 
            itemdescription=voteheaddescriptionfield.val(), 
            
            amount=Number(voteheaddefaultvaluefield.val()),
            // refundable=voteheadrefundablefield.prop("checked")?1:0,
            // percentage=voteheadpercentagefield.prop("checked")?1:0,
            // isadeposit=voteheadisadepositfield.prop("checked")?1:0,
            // hascommission= voteheadhascommissionfield.prop("checked")?1:0,   
            // percentageitemid=voteheadpercentageitemfield.val(),
            visible = voteheadvisiblefield.prop("checked")?1:0,
            recurring=voteheadonetimechargefield.val()

        let errors=""

        // check for blank fields
        if(itemdescription==""){
            errors="Please provide votehead description"
            voteheaddescriptionfield.focus()
        }
        // else if(recurring==""){
        //     errors="Please select votehead frequency"
        //     voteheadonetimechargefield.focus()
        // }
        else if(amount<0){
            errors="Please provide correct default amount"
            voteheaddefaultvaluefield.focus()
        }
        // else if(percentage==1 && percentageitemid==""){
        //     errors="Please select item percentage is based on"
        //     voteheadpercentageitemfield.focus()
        // }

        if(errors==""){
            // recurring=onetime==0?0:1 // field set up as one-time charge by default
            voteheaddetailsnotifications.html(showAlert("processing","Processing. Please wait ...",1))
            $.post(
                "../controllers/mastersoperations.php",
                {
                    savevotehead:true,
                    itemid,
                    itemdescription,
                    // recurring,
                    amount,
                    // refundable,
                    // percentage,
                    // isadeposit,
                    // hascommission,
                    visible,
                    // percentageitemid
                },
                (data)=>{
                    if(data=="success"){
                        getvoteheadsastable()
                        voteheaddetailsnotifications.html(showAlert("success",`Votehead saved successfully`))
                        // Clear fields
                        clearvoteheadfields()
                        voteheaddescriptionfield.focus()
                        // Refresh list
                     
                        // refresh percentage items list
                        getvoteheads(voteheadpercentageitemfield, 'choose')

                        // hide the modal and clear notifications
                        timeawaits(chargeableitemsmodal,voteheaddetailsnotifications)
                    }else if(data=="exists"){
                        voteheaddetailsnotifications.html(showAlert("info",`Sorry, votehead description already exists`))
                        voteheaddescriptionfield.focus()
                    }else{
                        voteheaddetailsnotifications.html(showAlert("danger",`Sorry an error occured! ${data}`,1))
                    }
                }
            )
        }else{
            voteheaddetailsnotifications.html(showAlert("info",errors))
        }
    })
   
    function clearvoteheadfields(){
        voteheadidfield.val("0")
        voteheaddescriptionfield.val("")
        voteheadonetimechargefield.val("")
        voteheaddefaultvaluefield.val("")
        // voteheadrefundablefield.prop("checked",false)
        // voteheadpercentagefield.prop("checked",false)
        // voteheadisadepositfield.prop("checked",false)
        // voteheadhascommissionfield.prop("checked",false)
        voteheadvisiblefield.prop("checked",false)
        // voteheadpercentageitemfield.val("")
    }


    function getvoteheadsastable(){
        $.getJSON(
            "../controllers/mastersoperations.php",
            {
                getvoteheads:true
            },
            (data)=>{
                let results=""
                data.forEach((item,i)=>{
                    results+=`<tr data-id='${item.itemid}'>`
                    results+=`<td>${Number(i+1)}</td>`
                    results+=`<td>${item.itemname}</td>`
                    // results+=`<td class='text-center'>${item.recurring==1?"<i class='fas fa-check-circle fa-lg fa-fw text-success'></i>":"<i class='fas fa-times-circle fa-lg fa-fw text-danger'></i>"}</td>`
                    // results+=`<td>${$.number(item.amount)}</td>`
                    results+=`<td>${formatDate(item.dateadded)}</td>`
                    results+=`<td>${item.addedbyname}</td>`
                    // add edit and elete buttons
                    results+=`<td><a class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
                })
                // console.log(results)
                // voteheadstable.find("tbody").html(results)
                makedatatable(voteheadstable,results,25)
            }
        )
    }

    // Delete votehead
    voteheadstable.on("click",".delete",function(){
        const parent=$(this).closest("tr")
        const voteid=parent.attr("data-id")
        const itemname=parent.find("td").eq(1).text() 
        // checkoruserprivilege('1x001').done(function(allowed){ 
        //     // console.log(allowed);
        //     if(allowed==1){
                bootbox.dialog({
                    title: "Delete Votehead",
                    message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete the votehead <strong>${itemname}</strong>.`,
                    buttons: {
                        success: {
                            label: "No, Keep",
                            className: "btn-success btn-sm",
                            callback: function() {
                                $('.bootbox').modal('hide');
                            }
                        },
                        danger: {
                            label: "Yes, Delete",
                            className: "btn-danger btn-sm",
                            callback: function() {
                                //console.log(parent)
                                voteheadnotification.html(showAlert("processing","Processing. Please wait ...",1))
                                $.post(
                                    "../controllers/mastersoperations.php",
                                    {
                                        deletevotehead:true,
                                        voteid
                                    },
                                    (data)=>{
                                        data=data.trim()
                                        getblocksastable()
                                        if(data=="success"){
                                            voteheadnotification.html(showAlert("success",`Votehead name <strong>${itemname}</strong> deleted successfully.`))
                                            // console.log("Heloollo");
                                            // hide notifications
                                            clearnotificationsdetails(voteheadnotification)
                                            
                                        }else{
                                            voteheadnotification.html(showAlert("danger",`Sorry an error occured ${data}`))
                                        }
                                    }
                                )
                            }
                        }
                    }
                })

            // }else{
            //     voteheadnotification.html(showAlert("danger",`Sorry You dont have <strong>Privilege</strong> to delete Chargeable Items`))
            // }
        // })
    })

    // Edit votehead
    voteheadstable.on("click",".edit",function(){ 
        const voteid=$(this).closest("tr").attr("data-id")
        // checkoruserprivilege('1x001','1002').done(function(allowed){
        //     if(allowed==1){
                $.getJSON(
                    "../controllers/mastersoperations.php",
                    {
                        voteheaddetails:true,
                        voteid
                    },
                    (data)=>{
                        
                        data=data[0]
                        console.log(data);
                        
                        voteheadidfield.val(voteid)
                        voteheaddescriptionfield.val(data.itemname)
                        voteheadonetimechargefield.val(data.recurring)
                        voteheaddefaultvaluefield.val(data.amount)
                        // voteheadrefundablefield.prop("checked",data.refundable==1?true:false) 
                        // voteheadpercentagefield.prop("checked",data.percentage==1?true:false)
                        // voteheadisadepositfield.prop("checked",data.percentage==1?true:false)
                        // voteheadhascommissionfield.prop("checked",data.percentage==1?true:false)
                        voteheadvisiblefield.prop("checked",data.percentage==1?true:false)
                        // voteheadpercentageitemfield.val(data.percentageitemid)
                        chargeableitemsmodal.modal("show")
                        voteheaddetailsnotifications.html("")
                        
                        if(data.percentage==1){
                            voteheadpercentageitemfield.prop("disabled",false)
                        }
                    }
                )
        //     }else{
        //         voteheadnotification.html(showAlert("danger",`Sorry You dont have <strong>Privilege</strong> to Edit Chargeable Items`)) 
        //     }
        // })
        
    })

    function clearvehiclefields(){
        trucknumberfield.val("")
        trailernofield.val("")
        vehiclemodelfield.val("")
        yearofmanufacturefield.val("")
        vehiclecolorfield.val("")
        vehicletypefield.val("")
        //vehiclesnotifications.html("")
    }

    function clearclientsfields(){
        clientnamefield.val("")
        clientaddressfield.val("")
        clienttelephonefield.val("")
        clientcontactfield.val("")
        //clientnotifications.html("")       
    }

    function cleardriversfields(){
        driverfirstnamefield.val("")
        driverlastnamefield.val("")
        driveridtypefield.val(0)
        driveridnofield.val("")
        drivertelephonefield.val("")
        driverresidencefield.val("")
    }
})