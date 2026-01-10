$(document).ready(function(){
    const currentmenu=$("#users")
    setactivemenu(currentmenu)
    setactivemenu(currentmenu)

    const userdetailstab=$("#userdetails"),
        roledetailstab=$("#roledetails"),
        userprivileges=$("#userprivileges"),
        roleprivileges=$("#roleprivileges"),  
        userslist=$("#userslist"),
        userroleslist=$("#userroleslist"),
        useridfield=$("#userid"),
        usernamefield=$("#username"),
        passwordfield=$("#password"),
        confirmpasswordfiel=$("#confirmpassword"),
        firstnamefield=$("#firstname"),
        middlenamefield=$("#middlename"),
        lastnamefield=$("#lastname"),
        emailfield=$("#email"),
        mobilefield=$("#mobile"),
        changestatusbutton=$("#changestatusbutton"),
        systemadminbutton=$("#systemadmin"),
        changepasswordonlogonbutton=$("#changepasswordonlogon"),
        accountactivefield=$("#accountactive"),
        saveuserbutton=$("#saveuser"),
        errordiv=$("#errordiv"),
        clearuserbutton=$("#clearuser"),
        userroleerrors=$("#userroleerrors"),
        filterprivileges=$("#filterprivileges"),
        filterroleprivileges=$("#filterroleprivileges"),
        selectalluserprivileges=$("#selectalluserprivileges"),
        selectallroleprivileges=$("#selectallroleprivileges"),
        resetpasswordbutton=$("#changepasswordbutton"),
        specialpermissionsmodal=$("#specialpermissionsmodal"),
        specialpermissionsbutton=$("#specialpermissions"),
        requisitionprivilegestable=$("#requisitionprivilegestable"),
        purchaseorderprivilegestable=$("#purchaseorderprivilegestable"),
        loadsignaturebutton=$("#signaturedocument"),
        signaturepreview=$("#signaturepreview"),
        attachmenterror=$("#attachmenterror"),
        inputfield = $('input'),
        selectfield = $('select')

        inputfield.on('input', function(){
            errordiv.html("")
        })
       
    // get system modules
    // getSystemModules()
    // set logged in user
    getloggedinuser()
    
    // hide roles tab details by default
    // get all objects
    $.getJSON(
        "../controllers/useroperations.php",
        {
            getobjects:true
        },
        function(data){
            var results="<div class='card containergroup mt-2 mb-2'><div class='card-header'><h5>Privileges</h5></div><div class='card-body scrollableprivilege'><table class='table table-sm table-borderless'>"
            for(var i=0;i<data.length;i++){
                results+="<tr data-module='"+data[i].module+"'><td><input type='checkbox' id='"+data[i].id+"' class='checkoption'>&nbsp;&nbsp;"
                results+=data[i].description+"</td></tr>"
            }
            results+="</table> </div> </div>"
            userprivileges.html(results)
            roleprivileges.html(results)
        }
    )

    $('#nav-tab a').click(function (link) {
        selection=link.currentTarget.innerText
        if (selection=="Users"){
            userdetailstab.show()
            roledetailstab.hide()
        }else{
            userdetailstab.hide()
            roledetailstab.show() 
        }
    })

    userslist.on("change",function(){
        const selectedOption = userslist.find("option:selected");
        const userid = selectedOption.data("id"); 
        console.log(userid)
        const username = selectedOption.text();
        
        // console.log("Selected UserID:", userid); // logs the selected userid
        // console.log("Selected Username:", username); // logs the selected username

        errordiv.html("")
        // get user assigned companies
        getuseassignedcompanies(userid)
        // get users details
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getusersdetails:true,
                userid:userid
            },
            (data)=>{
                useridfield.val(data[0].userid)
                usernamefield.val(data[0].username)
                firstnamefield.val(data[0].firstname)
                middlenamefield.val(data[0].middlename)
                lastnamefield.val(data[0].lastname)
                mobilefield.val(data[0].mobile)
                emailfield.val(data[0].email)
                passwordfield.prop("disabled",true)
                confirmpasswordfiel.prop("disabled",true)
                // load users signature if set
                if(data[0].signature!=""){
                    signaturepreview.prop("src",data[0].signature)
                }
                // check status and change the caption od change status button as approriate
                if(data[0].accountactive==1){
                    changestatusbutton.html( `<i class="fal fa-user-slash fa-lg fa-fw"></i> Disable` )
                    accountactivefield.val(1)
                }else{
                    changestatusbutton.html( `<i class="fal fa-user-check fa-lg fa-fw"></i> Enable` )
                    accountactivefield.val(0)
                }
                if(data[0].systemadmin==1){
                    systemadminbutton.prop("checked",true)
                }else{
                    systemadminbutton.prop("checked",false)
                }
                if(data[0].changepaswordonlogon==1){
                    changepasswordonlogonbutton.prop("checked",true)
                }else{
                    changepasswordonlogonbutton.prop("checked",false)
                }
            }
        ) 
        // get users privileges
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getuserprivileges:true,
                userid
            },
            function(data){
                //remove all checks based on class 
                $(".checkoption").prop("checked",false)
                for(var i=0;i<data.length;i++){
                    // locate the object on the list
                    if(data[i].allowed==1){
                        //$("#"+data[i].objectid).prop("checked",true)
                        $("#userprivileges").find(".checkoption").each(function(){
                            if($(this).prop("id")==data[i].objectid){
                                $(this).prop("checked",true)
                                //data.push({id: id, valid:1})
                            }
                        })
                    }
                }
            }
        )
    })
    // save user
    saveuserbutton.on("click",function(){
        // check for blank fields
        const userid = $("#userid").val();
        const username=usernamefield.val(),
            password=passwordfield.val(),
            confirmpassword=confirmpasswordfiel.val(),
            firstname=firstnamefield.val(),
            middlename=middlenamefield.val(),
            lastname=lastnamefield.val(),
            mobile=mobilefield.val(),
            email=emailfield.val(),
            systemadmin=systemadminbutton.prop("checked")?1:0,
            accountactive=accountactivefield.val()==1?1:0,
            changepasswordonlogon=changepasswordonlogonbutton.prop("checked")?1:0;
            let errors='';
            let data=[];
        if(username==""){
            errors="Please provide a <strong>USERNAME</strong>"
            usernamefield.focus()
        }else if(firstname==""){
            errors="Please provide <strong>FIRST NAME</strong></p>"
            firstnamefield.focus()
        }else if(middlename==""){
            errors="Please provide <strong>MIDDLE NAME</strong></p>"
            middlenamefield.focus()
        }else if (password=="" && !passwordfield.prop("disabled")){
            errors="Please provide a <strong>PASSWORD</strong></p>"
            passwordfield.focus()
        }else if(email==""){
            errors="Please provide <strong>EMAIL ADDRESS</strong></p>"
            emailfield.focus()
        }else if(mobile==""){
            errors="Please provide <strong>MOBILE NUMBER</strong></p>"
            mobilefield.focus()
        }else if(password!=confirmpassword && !passwordfield.prop("disabled")){ 
            // check if password entries match
            errors="<strong>PASSWORD</strong> entries do not match</p>"
        }

        /* get the privileges set */
        $("#userprivileges").find(".checkoption").each(function(){
            if($(this).prop("checked")){
                id=$(this).prop("id")
                data.push({id:id, valid:1})
            }
        })
        TableData=JSON.stringify(data)

        if(errors==""){ 
            // save the user  
            errordiv.html(showAlert("processing",`Processing... please wait`))

            console.log("TableData to send:", TableData);
            console.log("TableData stringified:", JSON.stringify(data));
            console.log("Privileges data:", data);

            // Also check if any privileges are actually selected
            let privilegeCount = 0;
            $("#userprivileges").find(".checkoption").each(function(){
                if($(this).prop("checked")){
                    privilegeCount++;
                }
            });
            console.log("Number of privileges selected:", privilegeCount);
            $.post(
                "../controllers/useroperations.php",
                {
                    saveuser: true,
                    userid: userid,
                    username: username,
                    password: password,
                    firstname: firstname,
                    middlename: middlename, 
                    lastname: lastname,
                    email: email,
                    mobile: mobile,
                    systemadmin: systemadmin,
                    changepasswordonlogon: changepasswordonlogon,
                    accountactive: accountactive,
                    TableData: TableData,
                    institutionid: 1 
                },
                (data) => {
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if (data.status == "success") {
                            errordiv.html(showAlert("success", `User <strong>${username}</strong> has been added Successfully!`));
                            clearUserForm()
                            getUsers()
                            setTimeout(()=>{
                                errordiv.html("")
                            },3000)
                        }else if(data.status == "exists"){
                            errordiv.html(showAlert("Info", `Sorry, It seems the data already exists`));
                        }
                    }else{
                        errordiv.html(showAlert("danger", `Sorry, an error has occurred: ${data}`))
                    }
                }
            );
        }else{
            errordiv.html(showAlert('info', errors))
        }
    })

   

    clearuserbutton.on("click", clearUserForm)
    
    function clearUserForm(){
        useridfield.val(0)
        usernamefield.val("")
        passwordfield.val("")
        confirmpasswordfiel.val("")
        firstnamefield.val("")
        middlenamefield.val("")
        lastnamefield.val("")
        mobilefield.val("")
        emailfield.val("")
        systemadminbutton.prop("checked",0)
        accountactivefield.val(1)
        changepasswordonlogonbutton.prop("checked",1)
        // reset all issued privileges
        $(".checkoption").prop("checked",false)
        passwordfield.prop("disabled",false)
        confirmpasswordfiel.prop("disabled",false)
        usernamefield.focus()
    }

    getUsers(userslist, 'Choose')
    function getUsers(obj, option = 'all'){
        // get users list
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getuserslist:true
            },
            (data)=>{
                let results = option === 'all'? "<option value='0'>&lt;All&gt;</option>" : "<option value=''> &lt;Choose&gt;</option>"
                data.forEach((user) => {
                  results += `<option value='${user.userid}' data-id='${user.userid}'>${user.firstname} ${user.middlename} ${user.lastname}</option>`                  
                })
        
                obj.html(results)
              }
        )
    }

    // function getSystemModules(){
    //     var results="<label class='btn btn-secondary btn-sm active  privilegefilter' data-id='all'><input type='radio' name='options'>All Privileges</label>"
    //     $.getJSON(
    //         "../controllers/settingoperations.php",
    //         {
    //             getsystemmodules:true
    //         },
    //         function(data){
    //             for(var i=0;i<data.length;i++){
    //                 results+="<label class='btn btn-secondary btn-sm privilegefilter' data-id='"+data[i].module+"'><input type='radio' name='options'><span class='text-capitalize'>"+data[i].module+"</span></label>"
    //             }
    //             filterprivileges.html(results)
    //             filterroleprivileges.html(results)
    //         }
    //     )
    // }
    
    //listen to filter user privileges
    
    
    filterprivileges.on("click",".privilegefilter",function(){
        var module=$(this).attr("data-id")
        filterprivileges.find(".privilegefilter").removeClass("active")
        // make the selected button active
        $(this).addClass("active")
        //console.log(module)
        userprivileges.find("tr").each(function(){
            if(module=="all"){
                // show the row
                $(this).show()
            }else{
                //console.log($(this).attr("data-module"))
                if($(this).attr("data-module")==module){
                    // show the module
                    $(this).show()
                }else{
                    // hide the module
                    $(this).hide()
                }
            }
        })
    })

    // listen to filter role privileges
    filterroleprivileges.on("click",".privilegefilter",function(){
        var module=$(this).attr("data-id")
        filterroleprivileges.find(".privilegefilter").removeClass("active")
        // make the selected button active
        $(this).addClass("active")
        //console.log(module)
        roleprivileges.find("tr").each(function(){
            if(module=="all"){
                // show the row
                $(this).show()
            }else{
                //console.log($(this).attr("data-module"))
                if($(this).attr("data-module")==module){
                    // show the module
                    $(this).show()
                }else{
                    // hide the module
                    $(this).hide()
                }
            }
        })
    })
    
    // select or diselect all user privileges
    selectalluserprivileges.on("click",function(){
        //console.log(selectalluserprivileges.prop("checked"))
        userprivileges.find("tr").each(function(){
            if($(this).is(":visible")){
                if(selectalluserprivileges.prop("checked")){
                    $(this).find("input:checkbox:first").prop("checked",true)
                }else{
                    $(this).find("input:checkbox:first").prop("checked",false)
                }
            }
        })
    })

    //listen to select or deselect all role privileges
    selectallroleprivileges.on("click",function(){
        //console.log(selectalluserprivileges.prop("checked"))
        roleprivileges.find("tr").each(function(){
            if($(this).is(":visible")){
                if(selectallroleprivileges.prop("checked")){
                    $(this).find("input:checkbox:first").prop("checked",true)
                }else{
                    $(this).find("input:checkbox:first").prop("checked",false)
                }
            }
        })
    })

    // listen to enable or Disable user account button
    changestatusbutton.on("click",function(){
        const activity1 = "disable",
        activity2 = "enable",
        username = userslist.find('option:selected').text()
        // console.log("username", username)

        const userid=userslist.val()
        // console.log("userid", userid)

        // check if a user is selected
        if(userid!=""){
            if(changestatusbutton.html()=="Disable Account"){
                activity1
                // show dialog box to confirm disable
                bootbox.prompt({
                    title: "Why do you want to disable the account?", 
                    centerVertical: true,
                    callback: function(result){ 
                        //console.log(result); 
                        $.post(
                            "../controllers/useroperations.php",
                            {
                                changeaccountstatus:true,
                                activity:activity1,
                                id:userid,
                                reason:result
                            },
                            (data)=>{
                               if(isJSON(data)){
                                    data = JSON.parse(data)
                                    if(data.status == "success"){
                                        errordiv.html(showAlert("success", `<strong> ${username}</strong> account has been <strong>Disabled</strong> successfully.`))
                                    }
                                }else{
                                    errordiv.html(showAlert("danger",`Sorry an error occured ${data}`))
                                }
                                // clear the form
                                clearUserForm()
                                userslist.val("")
                            }
                        )
                    }
                })
            }else{
                activity2
                $.post(
                    "../controllers/useroperations.php",
                    {
                        changeaccountstatus:true,
                        activity:activity2,
                        id:userid,
                        reason:""
                    },
                    (data)=>{
                        if(isJSON(data)){
                            data = JSON.parse(data)
                            if(data.status == "success"){
                                errordiv.html(showAlert("success", `<strong> ${username}'s</strong> account has been <strong>Enabled</strong> successfully.`))
                            }
                        }else if(data.status == "activity2"){
                            errordiv.html(showAlert("info",`Sorry, ${username} is already Enabled`))
                        }else{
                            errordiv.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                        // clear the form
                        clearUserForm()
                        userslist.val("")
                    }
                )
            }
        }else{
            // prompt to select user
            errordiv.html(showAlert('info', 'Please select a User first.'))
            userslist.focus()
        }
    })

    // listen to reset password button
    resetpasswordbutton.on("click",function(){
        userid=userslist.val()
        bootbox.prompt({
            title: "Please type a RESET password", 
            centerVertical: true,
            inputType: 'password',
            callback: function(result){ 
                //console.log(result); 
                $.post(
                    "../controllers/useroperations.php",
                    {
                        resetuserpassword:true,
                        password:result,
                        id:userid
                    },
                    function(data){
                        data=$.trim(data)
                        if(data=="success"){
                            results="<div class='alert alert-success' role='alert'><i class='fas fa-check-circle fa-lg'></i> User's password has been <strong>RESET</strong> successfully.</div>"
                        }else{
                            results="<div class='alert alert-danger' role='alert'><i class='fas fa-times-circle fa-lg'></i> "+data+"</div>"
                        }
                        errordiv.html(results)
                        // clear the form
                        clearUserForm()
                        userslist.val("")
                    }
                )
            }
        })
    })

    // Show special permissions modal 
    specialpermissionsbutton.on("click",function(){
        // get requisition privileges
        userid=userslist.val()
        if(userid!=0){
            populaterequsitionprivileges()
            populatepurchaseorderprivileges()
            specialpermissionsmodal.modal("show")
            errordiv.html("")
        }else{
            // display errors
            errordiv.html(showAlert("info","Please select a user first"))
            userslist.focus()
        } 
    })

    function populaterequsitionprivileges(){ 
        var results="<thead><th>&nbsp;</th>",
        // Array to hold requisition privileges that will be iterated through each department 
        columns=[],
        userid=userslist.val()
        // get the requisition privileges
        $.getJSON(
            "../controllers/materialoperations.php",
            {
                getrequisitionapprovallevel:true
            },
            function(data){
               for(var i=0;i<data.length;i++){
                   results+=`<th data-id='${data[i].id}' class='text-center'>${data[i].description}</th>`
                   columns.push(data[i].id)
               }
               results+='</thead>'
            }
        ).then( function(){
            // get departments
            results+='<tbody><tr><td>&nbsp;</td>'
            
            // add check boxes that select approval level for all departments below it
            for(i=0;i<columns.length;i++){
                results+=`<td align="center"><input type='checkbox' class='selectalldepartments' data-id=${columns[i]}>` 
            }
            results+='</tr>'

            $.getJSON(
                "../controllers/departmentoperations.php",
                {
                    getdepartments:true
                },
                function(data){
                    for(var i=0;i<data.length;i++){
                        results+=  `<tr><td data-id='${data[i].id}'>${data[i].departmentname}</td>`
                        // add checkboxes for all requisition privileges 
                        for(j=0;j<columns.length;j++){
                            results+=`<td  align="center"><input type='checkbox' class='requisitionprivilege' data-departmentid=${data[i].id} data-approvallevelid=${columns[j]}></td>`
                        }
                        results+=`</tr>`
                    }
                    results+=`</tbody>`
                    requisitionprivilegestable.html(results)
                }
            ).then( function(){
                // get set user privileges
                $.getJSON(
                    "../controllers/useroperations.php",
                    {
                        getuserrequisitionapprovalprivileges:true,
                        userid
                    },
                    function(data){
                        for(var i=0;i<data.length;i++){
                            // loop through checkboxes and match department and privilegeid to check the box if privilege is applicable
                            requisitionprivilegestable.find("input.requisitionprivilege").each(function(){
                                var $this=$(this),
                                    departmentid=$this.attr("data-departmentid"),
                                    approvallevelid=$this.attr("data-approvallevelid")
                                if(departmentid==data[i].departmentid && approvallevelid==data[i].approvallevelid){
                                    $this.prop("checked",true)
                                }
                            })
                        }
                    }
                )
            })
        })
    }

    // check and uncheck all departments when a select all checkbox for a privilege is clicked
    requisitionprivilegestable.on("click",".selectalldepartments",function(){
        var $this=$(this),
            id=$this.attr("data-id")
        if($this.prop("checked")){
            requisitionprivilegestable.find("input").each(function(){
                if($(this).attr("data-approvallevelid")==id){
                    $(this).prop("checked",true)
                }
            })
        }else{
            requisitionprivilegestable.find("input").each(function(){
                if($(this).attr("data-approvallevelid")==id){
                    $(this).prop("checked",false)
                }
            })  
        }
    })

   

    // Purchase Order Special Permissions 

    function populatepurchaseorderprivileges(){ 
        var results="<thead><th>&nbsp;</th>",
        // Array to hold requisition privileges that will be iterated through each department 
        columns=[],
        userid=userslist.val()
        // get the purchaseorder privileges
        $.getJSON(
            "../controllers/materialoperations.php",
            {
                getpurchaseorderapprovallevel:true
            },
            function(data){
               for(var i=0;i<data.length;i++){
                   results+=`<th data-id='${data[i].id}' class='text-center'>${data[i].description}</th>`
                   columns.push(data[i].id)
               }
               results+='</thead>'
            }
        ).then( function(){
            // get departments
            results+='<tbody><tr><td>&nbsp;</td>'
            
            // add check boxes that select approval level for all departments below it
            for(i=0;i<columns.length;i++){
                results+=`<td align="center"><input type='checkbox' class='selectalldepartments' data-id=${columns[i]}>` 
            }
            results+='</tr>'

            $.getJSON(
                "../controllers/departmentoperations.php",
                {
                    getdepartments:true
                },
                function(data){
                    for(var i=0;i<data.length;i++){
                        results+=  `<tr><td data-id='${data[i].id}'>${data[i].departmentname}</td>`
                        // add checkboxes for all purchaseorder privileges 
                        for(j=0;j<columns.length;j++){
                            results+=`<td  align="center"><input type='checkbox' class='purchaseorderprivilege' data-departmentid=${data[i].id} data-approvallevelid=${columns[j]}></td>`
                        }
                        results+=`</tr>`
                    }
                    results+=`</tbody>`
                    purchaseorderprivilegestable.html(results)
                }
            ).then( function(){
                // get set user privileges
                $.getJSON(
                    "../controllers/useroperations.php",
                    {
                        getuserpurchaseorderapprovalprivileges:true,
                        userid
                    },
                    function(data){
                        for(var i=0;i<data.length;i++){
                            // loop through checkboxes and match department and privilegeid to check the box if privilege is applicable
                            purchaseorderprivilegestable.find("input.purchaseorderprivilege").each(function(){
                                var $this=$(this),
                                    departmentid=$this.attr("data-departmentid"),
                                    approvallevelid=$this.attr("data-approvallevelid")
                                if(departmentid==data[i].departmentid && approvallevelid==data[i].approvallevelid){
                                    $this.prop("checked",true)
                                }
                            })
                        }
                    }
                )
            })
        })
    }

    // check and uncheck all departments when a select all checkbox for a privilege is clicked
    purchaseorderprivilegestable.on("click",".selectalldepartments",function(){
        var $this=$(this),
            id=$this.attr("data-id")
        if($this.prop("checked")){
            purchaseorderprivilegestable.find("input").each(function(){
                if($(this).attr("data-approvallevelid")==id){
                    $(this).prop("checked",true)
                }
            })
        }else{
            purchaseorderprivilegestable.find("input").each(function(){
                if($(this).attr("data-approvallevelid")==id){
                    $(this).prop("checked",false)
                }
            })  
        }
    })

    // Add user to company
    const accessiblecompaniesmodal=$("#accessiblecompaniesmodal")
    const addusertocompanybuton=$("#addusercompany")
    const usercompanieslist=$("#accessiblecompanieslist")
    const accessiblecompaniestable=$("#accessiblecompaniestable")
    const saveusercompaniesbutton=$("#saveusercompanies")
    const membercompanynotification=$("#membercompanynotification")
    addusertocompanybuton.on("click",function(){
       
        accessiblecompaniesmodal.modal("show") 
        getusernonassignedcompanies()
    })

    // get member company assigned
    function getuseassignedcompanies(userid){
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getuserassignedcompanies:true,
                userid
            },
            (data)=>{
                let results=""
                if(data.length>0){
                    results="<table class='table table-sm'>"
                    data.forEach((company)=>{
                        results+=`<tr><td data-id='${company.companyid}'>${company.companyname}</td>`
                        results+=`<td><a href='#' class='deleteroleuser text-danger'><span><i class='fas fa-trash-alt fa-lg'></i></span></a></td></tr>`
                        // results+="<input type='checkbox' class='"+company.companyid+" usersrolestoadd'>&nbsp;"+company.companyname+"<br/>"
                    })  
                    results+="</table>"
                    // console.log(results)
                }else{
                    results=showAlert("info","No company assigned",1)
                }
                usercompanieslist.html(results)
            }
        )
    }

    function getusernonassignedcompanies(){
        const userid=userslist.val()
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getuserunassignedcompanies:true,
                userid
            },
            (data)=>{
                let results=""
                if(data.length>0){
                    data.forEach((company)=>{
                        results+=`<input type='checkbox' data-id=${company.companyid} class='${company.companyid} usersrolestoadd'>&nbsp;${company.companyname}<br/>`
                    }) 
                }else{
                    results=showAlert("info","Currently no company available for assignment",1)
                }
               
                accessiblecompaniestable.html(results)
            }
        )
    }

    saveusercompaniesbutton.on("click",()=>{
        let companies=[],
            errors=''
        accessiblecompaniestable.find(":checked").each(function(){
            companies.push({"companyid":$(this).attr("data-id")})
        })
       
        if(companies.length==0){
            errors="Please select at least a company"
            membercompanynotification.html(showAlert("info",errors))
        }else{
            membercompanynotification.html(showAlert("processing","Processing. Please wait ...",1))
            companies=JSON.stringify(companies)
            userid=userslist.val()
            $.post(
                "../controllers/useroperations.php",
                {
                    saveusercompany:true,
                    companies,
                    userid
                },
                (data)=>{
                    data=data.trim()
                    if(data=="success"){
                        membercompanynotification.html(showAlert("success","Companies added to the user successfully"))
                        getusernonassignedcompanies()
                    }else{
                        membercompanynotification.html(showAlert("danger", `Sorry an error occured. ${data}`))
                    }
                }
            )
        }
    })

    accessiblecompaniestable.on("click",":checkbox",()=>{
        membercompanynotification.html("")
    })
})