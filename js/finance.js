$(document).ready(()=>{
    
    const currentmenu=$("#finance")
    setactivemenu(currentmenu)
    getloggedinuser()
    
    const inputcontrols=$("input"),
        selectcontrols=$("select"),
        glisbankaccountcontrol=$("#glisbankaccount"),
        glallowoverdraftaccount=$("#glallowoverdraft"),
        glallowoverdraftlabelcontrol=$("#glallowoverdraftlabel"),
        glbanknamecontrol=$("#glbankname"),
        glbranchnamecontrol=$("#glbranchname"),
        glbankaccountcontrol=$("#glaccountnumber"),
        glswiftcodecontrol=$("#glswiftcode"),
        glaccountclass=$("#accountclass"),
        glgroupclass=$("#groupclass"),
        subgroupof=$('#subgroupof'),
        grouperrordiv=$("#grouperrors"),
        savegroupbutton=$("#savegroup"),
        groupnamefield=$("#groupname"),
        cashbookaccountfield=$("#cashbookgroup"),
        accountgroup=$("#accountgroup"),
        accountsubgroup=$("#accountsubgroup"),
        saveglaccount=$("#savebutton"),
        accountcodefield=$("#accountcode"),
        accountnamefield=$("#accountname"),
        idfield=$("#id"),
        accounterrordiv=$("#accounterrordiv"),
        clearform=$("#clearbutton"),
        chartofaccountslist=$("#chartofaccountslist"),
        accordion=$(".myaccordion"),
        mappedaccountslist=$("#mappedaccountslist"),
        mappingaccountmodal=$("#accountmappingmodal"),
        mappingitemidfield=$("#mappingitemid"),
        mappingitemdescriptionfield=$("#mappingitemdescription"),
        mappingitemcategoryfield=$("#mappingitemcategory"),
        mappingglclasscontrol=$("#mappingaccountclass"),
        mappingparentgroupcontrol=$("#mappingaccountparentgroup"),
        mappingsubgroupcontrol=$("#mappingsubgroup"),
        mappingaccountcontrol=$("#mappingaccount"),
        savemappedaccountcontrol=$("#savemappedaccount"),
        mappingnotification=$("#mappingnotification"),
        mapmultipleitemscontrol=$("#mapmultipleitems"),
        paymentmethodfield=$("#paymentmethod"),
        subactegoryfield=$("#subactegoryof"),
        crledgerfield=$("#crledger"),
        payeenamefield=$('#payeename'),
        descriptionfield=$('#description'),
        referencefield=$('#reference'),
        amountfield=$('#amount'),
        voucheridfield=$('#voucherid'),
        vouchernofield=$('#voucherno'),
        draccfield=$('#dracc'),
        transactiondatefield=$('#transactiondate'),
        savepaymentvoucher=$('#savevoucherbutton'),
        paymentvouchernotification=$("#paymentvouchernotification"),
        // branchidfield = $("#branchid"),
        paymentvouchertable=$("#paymentvouchertable"),
        filterstartdatefield=$("#filterstartdate"),
        filterenddatefield=$("#filterenddate"),
        filterpaymentvoucherbutton=$("#filterpaymentvoucher"),
        financemodaldetailsnotification=$("#financemodaldetailsnotification")

    let selectedglsubaccountfield =null;

    function timeawaits(modalelement, notifications,delay=3000){
        setTimeout(()=>{
            modalelement.modal("hide")
            notifications.html("")
        },delay)
    }
    // disable all gl bank account fields by default
    disablebankcontrols()
    // getglaccountmapping()
    getglaccountclasses(mappingglclasscontrol, 'choose')
    getPaymentMethods(paymentmethodfield)
    getSubgroups(subactegoryfield, "choose")
    getAccountsForSubgroup(crledgerfield, "choose")

    // setting to todays date
    // setDateToToday(filterstartdatefield)
    // setDateToToday(filterenddatefield)

    // setDatePicker("#filterstartdate",false,false)
    // setDatePicker("#filterenddate",false,false)

    inputcontrols.on("input",function(){
        mappingnotification.html("")
        financialperioddetailnotification.html("")
        financialperiodnotifications.html("")
        journaldetailnotification.html("")
    })

    selectcontrols.on("change",function(){
        inputcontrols.trigger("input")
    })

    glisbankaccountcontrol.on("click",function(){
        const state=!$(this).prop("checked")
        glallowoverdraftaccount.prop("disabled",state)
        glbanknamecontrol.prop("disabled",state)
        glbranchnamecontrol.prop("disabled",state)
        glbankaccountcontrol.prop("disabled",state)
        glswiftcodecontrol.prop("disabled",state)
        glallowoverdraftlabelcontrol.prop("disabled",state)
    })

     // get all account classes
    function getClassesOfAccount(){
        const dfd = new $.Deferred()
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglaccountclasses:true
            },
            function(data){
                let results='<option value=0>&lt;Choose One&gt;</option>',
                    accountclasses='',
                    accordionclasses=''
                   
                for(var i=0;i<data.length;i++){ 
                    accordionid=makeid(5)
                    results+="<option value='"+data[i].id+"'>"+data[i].classname+"</option>"
                    accountclasses+="<div class='accountclass' id='"+data[i].id+"'>"
                    accordionclasses+='<div class="card">'
                    accordionclasses+='<div class="card-header" id="'+data[i].classname+'">'
                    accordionclasses+='<h2 class="mb-0">'
                    accordionclasses+='<button class="d-flex align-items-center justify-content-between btn btn-sm btn-link collapsed" data-toggle="collapse" data-target="#'+accordionid+'" aria-expanded="false" aria-controls="'+accordionid+'">'
                    accordionclasses+='<span class="text-uppercase">'+ data[i].newname+'</span>'
                    accordionclasses+='<span class="fa-stack fa-sm">'        
                    accordionclasses+='<i class="fas fa-circle fa-stack-2x"></i>'            
                    accordionclasses+='<i class="fas fa-plus fa-stack-1x fa-inverse"></i>'            
                    accordionclasses+='</span>'       
                    accordionclasses+='</button>'       
                    accordionclasses+='</h2>'    
                    accordionclasses+='</div>'   
                    accordionclasses+='<div id="'+accordionid+'" class="collapse" aria-labelledby="'+data[i].classname+'" data-parent="#accordion">'   
                    accordionclasses+='<div class="card-body accountclass" data-id="'+data[i].id+'">'   
                    accordionclasses+=' </div>'
                    accordionclasses+='</div>'    
                    accordionclasses+='</div><!-- closes the card -->'
                }
                
                glaccountclass.html(results)
                glgroupclass.html(results)
                //chartofaccountslist.find(".card-body").html(accountclasses)
                accordion.html(accordionclasses)
                dfd.resolve()
            }
        ) 
        return dfd.promise()
    }

    refreshChartOfAccounts()

    function refreshChartOfAccounts(){
            chartofaccountslist.find(".card-body").html("")
            getClassesOfAccount().done(function(){
            getGLParentGroups(0, '').done(function(){
                getSubGroups().done(function(){
                    getGLAccounts()
                })
            })
        })
    }
 
    // get parent accounts
    glgroupclass.on("change",function(){
        const classid=glgroupclass.val()
        getGLParentGroups(classid, subgroupof)
    })

    glaccountclass.on("change",function(){
        const classid=glaccountclass.val()
        getGLParentGroups(classid, accountgroup,'choose')
    })

    accountgroup.on("change",function(){
        const groupid=accountgroup.val()
        getAccountSubGroup(groupid)
    })

    savegroupbutton.on("click",function(){
        const glclassid=glgroupclass.val(),
            glsubaccountid=subgroupof.val(),
            groupname=groupnamefield.val(),
            cashbookaccount=cashbookaccountfield.prop("checked")?1:0
        let errors=''

        if(glclassid==0){
            errors="Please select the group's Class first"
            glgroupclass.focus()
        }else if(groupname==""){
            errors="Please provide the group name first"
            groupnamefield.focus()
        }

        if(errors==""){
            // grouperrordiv.html(showAlert("info",`Processing processing please wait...` ))
            $.post(
                "../controllers/glaccountoperations.php",
                {   
                   
                    saveglaccountgroup:true, 
                    id:0,
                    accountclass:glclassid,
                    groupname:groupname,
                    subcategoryof:glsubaccountid,
                    cashbookaccount:cashbookaccount
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status==="success"){  
                            refreshChartOfAccounts()
                            grouperrordiv.html(showAlert("GL group has been saved successfully."))
                            glgroupclass.val(0)
                            subgroupof.val(0)
                            groupnamefield.val("")
                          
                            // hide notifications
                            clearnotificationsdetails(grouperrordiv)
                        }else if(data.status=="exists"){
                             grouperrordiv.html(showAlert("info","GL group name already in use. Please correct and try again"))
                        }
                    }
                }
            )
        }else{
            grouperrordiv.html(showAlert("info",errors))
        }
    })

    function getGLParentGroups(classid, dropdown,option='none'){
        const dfd= new $.Deferred()
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                classid:classid,
                getglparentgroups:true
            },
            function(data){
                option=='none'?option='&lt;None&gt;':option='&lt;Choose One&gt;'
                let results="<option value=0>"+option+"</option>",results1=''
                    accountclassdiv=$(".accountclass")

                for (let i=0;i<data.length;i++){
                    if(dropdown==''){
                        results="<div class='parentgroup' id='"+data[i].id+"'><span class='parentgroupname font-weight-bold'>"+data[i].groupname+"</span></div>"
                        //accountclass=$("#chartofaccountslist #card-body #"+data[i].glaccountclass)
                        $(".accountclass").each(function(){
                           // console.log($(this).attr("data-id") +" vs "+data[i].glaccountclass)
                            if($(this).attr("data-id")==data[i].glaccountclass){
                                $(results).appendTo($(this))
                            }
                        })
                    }else{
                        results+="<option value='"+data[i].id+"'>"+data[i].groupname+"</option>"
                    }
                }
                if(dropdown!=''){
                    dropdown.html(results)
                }
                dfd.resolve()
            }
        ) 
        return dfd.promise()
    }

    saveglaccount.on("click",function(){
        const accountgroupid=accountsubgroup.find('option:selected').val()
            console.log("accountgroupid: ", accountgroupid)
            const accountcode=accountcodefield.val(),
            accountname=accountnamefield.val(),
            id=idfield.val(),
            isbankaccount=glisbankaccountcontrol.prop("checked")?1:0,
            allowoverdraft=glallowoverdraftaccount.prop("checked")?1:0,
            bankname=glbanknamecontrol.val(),
            branchname=glbranchnamecontrol.val(),
            accountno= glbankaccountcontrol.val(),
            swiftcode=glswiftcodecontrol.val()
    
        let errors=""
        if(accountgroupid==0){
            errors="<p class='alert alert-danger'>Please provide the account sub group</p>"
        }else if(accountcode==""){
            errors="<p class='alert alert-danger'>Please provide the account code</p>" 
        }else if(accountname==""){
            errors="<p class='alert alert-danger'>Please provide the account name</p>"
        }else{
            // save the GL account and display results
            $.post(
                "../controllers/glaccountoperations.php",
                {
                    id:id,
                    groupid:accountgroupid,
                    accountcode:accountcode,
                    accountname:accountname,
                    saveglaccount:true,
                    isbankaccount,
                    bankname,
                    branchname,
                    accountno,
                    swiftcode,
                    allowoverdraft
                },
                function(data){
                    const result=$.trim(data).toString()
                    //console.log(result)
                    if(result=="success"){
                        errors="<p class='alert alert-success'>The GL account has been saved successfully</p>"
                        clearForm()
                        refreshChartOfAccounts()

                        setTimeout(()=>{
                            accounterrordiv.html("")
                        },2000)

                    }else if (result=="account code exists"){
                        errors="<p class='alert alert-warning'>Sorry, <strong>account code</strong> provided is already in use</p>"
                        setTimeout(()=>{
                            accounterrordiv.html("")
                        },2000)

                    }else if (result=="account name exists"){
                        errors="<p class='alert alert-warning'>Sorry, <strong>account name</strong> provided is already in use</p>"
                    }else{
                        // display any other error resturned
                        errors="<p class='alert alert-danger'>"+result+"</p>"
                    }
                    accounterrordiv.html(errors)
                }
            )
        }
        accounterrordiv.html(errors)
    })

    // listen to clearform click event
    clearform.on("click",clearForm)

    function clearForm(){
        accountsubgroup.val(0),
        accountcodefield.val(""),
        accountnamefield.val(0),
        idfield.val(0)
        glisbankaccountcontrol.prop("checked",false)
        glallowoverdraftaccount.prop("checked",false)
        glbanknamecontrol.val("")
        glbranchnamecontrol.val("")
        glbankaccountcontrol.val("")
        glswiftcodecontrol.val("")
        disablebankcontrols()
    }

    function disablebankcontrols(){
        glallowoverdraftaccount.prop("disabled",true)
        glbanknamecontrol.prop("disabled",true)
        glbranchnamecontrol.prop("disabled",true)
        glbankaccountcontrol.prop("disabled",true)
        glswiftcodecontrol.prop("disabled",true)
        glallowoverdraftlabelcontrol.prop("disabled",true)
    }

    function enablebankcontrols(){
        glallowoverdraftaccount.prop("disabled",false)
        glbanknamecontrol.prop("disabled",false)
        glbranchnamecontrol.prop("disabled",false)
        glbankaccountcontrol.prop("disabled",false)
        glswiftcodecontrol.prop("disabled",false)
        glallowoverdraftlabelcontrol.prop("disabled",false)
    }

    function getSubGroups(){
        const dfd =new $.Deferred()
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getsubgroups:true,
                groupid:0
            },
            function(data){
                let results
                for(let i=0;i<data.length;i++){
                    results="<div class='subgroup' id='"+data[i].id+"'><span class='subgroupname font-weight-bold'>"+data[i].groupname+"</span></div>"
                    $(".parentgroup").each(function(){
                        if($(this).prop("id")==data[i].subactegoryof){
                             $(results).appendTo($(this))
                        }
                    })
                }
                dfd.resolve() 
            }
        )
       return dfd.promise()
    }

    function getGLAccounts(){
        const dfd=new $.Deferred()
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglaccounts:true,
                groupid:0
            },
            function(data){
                let results="", count=0
                for(let i=0;i<data.length;i++){
                    count=count+1
                    results="<div class='glaccount' id='"+data[i].id+"'>"+data[i].accountcode +" - "+data[i].accountname+"</div>"
                    $(".subgroup").each(function(){
                        if($(this).prop("id")==data[i].groupid){
                            $(results).appendTo($(this))
                        }
                    })
                }
                chartofaccountslist.find(".card-footer").html(count+" Account(s) displayed.")
            }
        )
    }

    function makeid(length) {       
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        const charactersLength = characters.length; 
        let result = ''
       
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
     }

     accordion.on("hide.bs.collapse show.bs.collapse", e => {
        $(e.target)
          .prev()
          .find("i:last-child")
          .toggleClass("fa-minus fa-plus");
      })

      accordion.on("shown.bs.collapse", e => {
        $("html, body").animate(
          {
            scrollTop: $(e.target)
              .prev()
              .offset().top
          },
          400
        );
      })
  
    accordion.on("click", ".glaccount",function(e){
        e.preventDefault()
        const id=$(this).attr("id")
        selectedglsubaccountfield = $(this).attr("id");
        // console.log("Selected GL Account ID:", selectedglsubaccountfield);
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglaccountdetails:true,
                id
            },
            function(data){
                // console.log(data);
                
                const classid=data[0].classid,
                    groupid=data[0].parentgroupid,
                    subgroupid=data[0].subgroupid

                // console.log("Class id:",classid);
                // console.log("Group id: ",groupid);
                // console.log("subgroup id: ",subgroupid);
                

                glaccountclass.val(data[0].classid)
                accountcodefield.val(data[0].accountcode)
                accountnamefield.val(data[0].accountname)
                idfield.val(data[0].id)
                glisbankaccountcontrol.prop("checked", data[0].isbankaccount==1?true:false)
                data[0].isbankaccount==1?enablebankcontrols():disablebankcontrols()
                glallowoverdraftaccount.prop("checked",data[0].allowoverdraft==1?true:false)
                glbanknamecontrol.val(data[0].bankname)
                glbranchnamecontrol.val(data[0].branchname)
                glbankaccountcontrol.val(data[0].accountno)
                glswiftcodecontrol.val(data[0].swiftcode)

            
                // get parent groups
                getGLParentGroups(classid, accountgroup,option='one').done(function(){
                    accountgroup.val(groupid)
                    // get sub groups
                    getAccountSubGroup(groupid).done(function(){
                        // console.log(subgroupid)
                        accountsubgroup.val(subgroupid)
                    })
                })

                saveglsubaccountbutton.show()
                glsubaccountsection.show()
                getsubaccounts()
            }
        )
    })

    function getAccountSubGroup(groupid){
        const dfd = new $.Deferred()
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getsubgroups:true,
                groupid:groupid
            },
            function(data){
                let results="<option value=0>&lt;Choose One&gt;</option>"
                for (let i=0;i<data.length;i++){
                    results+="<option value='"+data[i].id+"'>"+data[i].groupname+"</option>"
                }
                accountsubgroup.html(results)
                dfd.resolve()
            }
        )
        return dfd.promise()
    }

    // function getglaccountmapping(){
    //     $.getJSON(
    //         "../controllers/glaccountoperations.php",
    //         {
    //             getglaccountmapping:true
    //         },
    //         (data)=>{
    //             let results=''
    //             data.forEach((map,index)=>{
    //                 results+=`<tr data-id='${map.itemid}'><td class='d-flex align-items-center'><input type='checkbox' >&nbsp;&nbsp;</td>`
    //                 results+=`<td>${map.category}</td>`
    //                 results+=`<td>${map.description}</td>`
    //                 results+=`<td>${map.accountname==''?'&lt;Not Set&gt;':map.accountname}</td>`
    //                 //  results+=`<td><a class='edit'><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
    //                 results+="<td><a href='#' class='edit'><i class='fal fa-edit fa-lg fa-fw'></i></a></td></tr>"
    //             })
    //             mappedaccountslist.find("tbody").html(results)
    //         }
    //     )
    // }

    mapmultipleitemscontrol.on("click",function(){
        // const $this=$(this)
        const category= mappedaccountslist.find("tbody :checked:first").closest("tr").find("td").eq(1).text()
        let itemids=[]
        mappedaccountslist.find("tbody :checked").each(function(){
            let itemid=$(this).closest("tr").attr("data-id")
            itemids.push({"itemid":itemid})
        })

        mappingitemidfield.attr("data-id",JSON.stringify(itemids))
        mappingitemcategoryfield.html(category)
        mappingitemdescriptionfield.html("&lt;Multiple Items Selected&gt;")

        mappingaccountmodal.modal("show")
        mappingnotification.html("")
        checkselectedmappingoption(category)
        
    })

    // disable map account button if accounts of different categories are selected
    mappedaccountslist.on("click", ":checkbox",function(){
        // enable the button before check
        mapmultipleitemscontrol.prop("disabled",false)
        let similaritemsselected=true
        const initialcategory= mappedaccountslist.find("tbody :checked:first").closest("tr").find("td").eq(1).text()
        // console.log(initialcategory)
        if($(this).prop("checked")){
            // let category=$(this).parent("td").parent("tr").find("td").eq(1).text()
            mappedaccountslist.find("tbody :checked").each(function(){
                if($(this).closest("tr").find("td").eq(1).text()!==initialcategory){
                    similaritemsselected=false
                }
            }) 
            mapmultipleitemscontrol.prop("disabled",!similaritemsselected)
        }
    })

    mappedaccountslist.on("click",".edit",function(e){

        e.preventDefault()
        const parent=$(this).parent("td").parent("tr")
        const id=[{"itemid":parent.attr("data-id")}]
        const category=parent.find("td").eq(1).text()
        const description=parent.find("td").eq(2).text()

        mappingitemidfield.attr("data-id",JSON.stringify(id))
        mappingitemcategoryfield.html(category)
        mappingitemdescriptionfield.html(description)

        mappingaccountmodal.modal("show")
        mappingnotification.html("")
        // get get parent groups based on category
        checkselectedmappingoption(category)
    })

    function checkselectedmappingoption(category){
        if(category=="Deposits" || category=='Savings'){
            mappingglclasscontrol.find("option").each(function(){
                $this=$(this)
                classname=$this.text().toString().toUpperCase()
                if(classname=='LIABILITY'){
                    mappingglclasscontrol.val($this.val())
                }
            })
        }else if(category=="Interest" || category=='Registration' || category=='Loan Charges'){
            mappingglclasscontrol.find("option").each(function(){
                $this=$(this)
                classname=$this.text().toString().toUpperCase()
                if(classname=='INCOME'){
                    mappingglclasscontrol.val($this.val())
                }
            })
        }else if(category=="Loans") {
            mappingglclasscontrol.find("option").each(function(){
                $this=$(this)
                classname=$this.text().toString().toUpperCase()
                if(classname=='ASSET'){
                    mappingglclasscontrol.val($this.val())
                }
            })
        }else if(category=='Shares'){
            mappingglclasscontrol.find("option").each(function(){
                $this=$(this)
                classname=$this.text().toString().toUpperCase()
                if(classname=='CAPITAL'){
                    mappingglclasscontrol.val($this.val())
                }
            }) 
        }

        mappingglclasscontrol.prop("disabled",true)

        mappingparentgroupcontrol.html("<option value=''>&lt;Choose&gt;</option>")
        mappingsubgroupcontrol.html('<option>&lt;Choose&gt;</option>')
        mappingaccountcontrol.html("<option value=''>&lt;Choose&gt;</option>")

        const classid=mappingglclasscontrol.val()
        // console.log(classid);
        // console.log("Hello There");
        
        
        // get gl parent groups based on the selected class
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglparentgroups:true,
                classid
            },
            function(data){
                let results="<option value=''>&lt;Choose&gt;</option>"
                data.forEach((glgroup)=>{
                     results+="<option value='"+glgroup.id+"'>"+glgroup.groupname+"</option>"
                })
                mappingparentgroupcontrol.html(results)
            }
        ) 
    }

    mappingparentgroupcontrol.on("change",function(){
        groupid=$(this).val()

        mappingsubgroupcontrol.html('<option>&lt;Choose&gt;</option>')
        mappingaccountcontrol.html("<option value=''>&lt;Choose&gt;</option>")

        if(groupid!==""){
            // get sub groups
            $.getJSON(
                "../controllers/glaccountoperations.php",
                {
                     getsubgroups:true,
                     groupid
                },
                function(data){
                    let results="<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((subgroup)=>{
                        results+="<option value='"+subgroup.id+"'>"+subgroup.groupname+"</option>"
                    })
                    mappingsubgroupcontrol.html(results)
                }
            )
        }
    })

    mappingsubgroupcontrol.on("change",function(){
        groupid=$(this).val()
        mappingaccountcontrol.html("<option value=''>&lt;Choose&gt;</option>")
        if(groupid!==""){
            $.getJSON(
                "../controllers/glaccountoperations.php",
                {
                    getglaccounts:true,
                    groupid
                },
                function(data){
                    let results="<option value=''>&lt;Choose&gt;</option>"
                    data.forEach((glaccount)=>{
                        results+="<option value='"+glaccount.id+"'>"+glaccount.accountname+"</option>"
                    })
                    mappingaccountcontrol.html(results)
                }
            )
        }
    })

    // save mapping account
    savemappedaccountcontrol.on("click",function(){
        const itemid=mappingitemidfield.attr("data-id")
        const glaccountid=mappingaccountcontrol.val()
        const category=mappingitemcategoryfield.html()
        let errors=''
        // check for blank fields
        if(glaccountid==""){
            errors="Please select mapping account"
            mappingaccountcontrol.focus()
            mappingnotification.html(showAlert("info",errors))
        }else{
            mappingnotification.html(showAlert("processing","Processing. Please wait ...",1))
            $.post(
                "../controllers/glaccountoperations.php",
                {
                    saveglaccountmapping:true,
                    glaccountid,
                    itemid,
                    category
                },
                (data)=>{
                    if(data=="success"){
                        mappingnotification.html(showAlert("success","Account has been mapped successfully"))
                        // refresh the mappings list
                        getglaccountmapping()
                    }else{
                        mappingnotification.html(showAlert("danger",`Sorry an error occured. ${data}`))
                    }
                }
            )
        }
    })

    const financialperiodmodal=$("#financialperiodmodal")
    const addnewfinancialperiod=$("#addnewfinancialperiod")
    const finnacialperiodidcontrol=$("#financialperiodid")
    const financilaperiodlabelcontrol=$("#financialperiodlabel")
    const financialperiodstartdatecontrol=$("#financialperiodstartdate")
    const financialperiodenddatecontrol=$("#financialperiodenddate")
    const finincialperiodcurrentperiodcontrol=$("#financialperiodcurrentperiod")
    const savefinancialperiodcontrol=$("#savefinancialperiod")
    const financialperioddetailnotification=$("#financialperioddetailnotification")
    const financialperiodnotifications=$("#financialperiodnotifications")
    const financialperiodlist=$("#financialperiodlist")

    // set date picker control on the text inputs
    setDatePicker(financialperiodstartdatecontrol,false,false)
    setDatePicker(financialperiodenddatecontrol,false,false)

    getfinancialperiodsfortable()

    // show modal to add a new financial period
    addnewfinancialperiod.on("click",()=>{
        financialperiodmodal.modal("show")
        financialperioddetailnotification.html("") 
        // checkoruserprivilege('1x001').done(function(allowed){
        //     if(allowed==1){
                
        //     }else{
        //         financemodaldetailsnotification.html(showAlert("danger",`Sorry you dont have the <strong>Privilege</strong> to add Financial Period`))
        //     }
        // })
     
    })

    savefinancialperiodcontrol.on("click",()=>{
        const id=finnacialperiodidcontrol.val()
        const label=financilaperiodlabelcontrol.val()
        const startdate=financialperiodstartdatecontrol.val()
        const enddate=financialperiodenddatecontrol.val()
        const currentperiod=finincialperiodcurrentperiodcontrol.prop("checked")?1:0
        let errors=''

        // check for blank fields
        if(label==""){
            errors="Please provide financial period label"
            financilaperiodlabelcontrol.focus()
        }else if(startdate==""){
            errors="Please select start date"
            financialperiodstartdatecontrol.focus()
        }else if(enddate==""){
            errors="Please select end date"
            financialperiodenddatecontrol.focus()
        }else{            
            const datefrom= new Date(startdate)
            const dateto=new Date(enddate)
            if(datefrom>dateto){
                errors="Start date cannot be greater than end date"
            }else{
                const daysbetween=(dateto.getTime()-datefrom.getTime())/(1000*3600*24)
                if(daysbetween>365){
                    errors="Date range specified exceeds a year"
                }
            }
        }

        if(errors==""){
            $.post(
                "../controllers/financeoperations.php",
                {
                    savefinancialperiod:true,
                    id,
                    label,
                    startdate,
                    enddate,
                    currentperiod
                },
                (data)=>{
                    if(data=="success"){
                        getfinancialperiodsfortable()
                        financialperioddetailnotification.html(showAlert("success",`Financial period <strong>${label}</strong> saved successfully.`))
                        // clear form
                        clearfinancialperiodform()
                        // refresh financial period list

                        setTimeout(()=>{
                            financialperiodmodal.modal("hide")
                            financialperioddetailnotification.html("")
                        },3000)
                       
                    }else if(data=="label exists"){
                        financialperioddetailnotification.html(showAlert("info",`<strong>${label}</strong> already in use in the system`))
                    }else if(data=="period exists"){
                        financialperioddetailnotification.html(showAlert("info",`Date range specified already covered in the system`))
                    }else{
                        financialperioddetailnotification.html(showAlert("danger",`Sorry, an erro occured ${data}`,1))
                    }
                }
            )
        }else{
            financialperioddetailnotification.html(showAlert("info",errors))
        }
    })

    function clearfinancialperiodform(){
        finnacialperiodidcontrol.val("0")
        financilaperiodlabelcontrol.val("")
        financialperiodstartdatecontrol.val("")
        financialperiodenddatecontrol.val("")
        finincialperiodcurrentperiodcontrol.prop("checked",false)
    }

    function getfinancialperiodsfortable(){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getfinancialperiods:true
            },
            (data)=>{
                let results=''
                data.forEach((period,index)=>{
                    results+=`<tr data-id='${period.id}'><td>${Number(index+1)}</td>`
                    results+=`<td>${period.label}</td>`
                    results+=`<td>${formatDate(period.startdate)}</td>`
                    results+=`<td>${formatDate(period.enddate)}</td>`
                    results+=`<td>${period.current==1?'Yes':'No'}</td>`
                    results+=`<td>${formatDate(period.dateadded)}</td>`
                    results+=`<td>${period.addedbyuser}</td>`
                    // edit and delete buttons
                    results+=`<td><a class='edit'><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results+=`<td><a class='delete'><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></td></a></tr>` 
                   
                })
                // financialperiodlist.find("tbody").html(results)
                makedatatable(financialperiodlist,results,25)
            }
        )
    }

    financialperiodlist.on("click",".edit",function(e){
        e.preventDefault()
        const id=$(this).closest("tr").attr("data-id")
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getfinancialperioddetails:true,
                id
            },
            (data)=>{

                data=data[0]
                finnacialperiodidcontrol.val(id)
                financilaperiodlabelcontrol.val(data.label)
                financialperiodstartdatecontrol.val(formatDate(data.startdate))
                financialperiodenddatecontrol.val(formatDate(data.enddate))
                finincialperiodcurrentperiodcontrol.prop("checked",data.current==1?true:false)
                financialperiodmodal.modal("show")
                financialperioddetailnotification.html("")
            }
        )
    })

    financialperiodlist.on("click",".delete",function(e){
        e.preventDefault()
        const parent=$(this).closest("tr")
        const id=parent.attr("data-id")
        const description=parent.find("td").eq(1).text()

        bootbox.dialog({
            // title: "Confirm Item Removal!",
            message: `Are you sure you want to DELETE financial period <strong>${description}</strong>`,
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
                        financialperiodnotifications.html(showAlert("processing","Processing. Please wait ...",1))
                        $.post(
                            "../controllers/financeoperations.php",
                            {
                                deletefinancialperiod:true,
                                id
                            },
                            (data)=>{
                                let notification=""
                                if(data.trim()=="success"){
                                    notification=`The financial period <strong>${description}</strong> has been deleted successfully.`
                                    financialperiodnotifications.html(showAlert("success",notification))
                                    // parent.remove()
                                    getfinancialperiodsfortable()
                                }else{
                                    notification=`Sorry an error occured ${data}`
                                    financialperiodnotifications.html(showAlert("danger",notification))
                                }
                            }
                        )
                    }
                }
            }
        })
    })

    const journaldetailsmodal=$("#journaldetailsmodal")
    const addnewjournalentry=$("#addnewjournalentry")
    const journalaccountcontrol=$("#journalaccount")
    const journaldescriptioncontrol=$("#journaldescription"),
            jounaldatefield=$("#jounaldate")
    const journalrefcontrol=$("#journalref")
    const journalnarrativecontrol=$("#journalnarration")
    const journaldebitcontrol=$("#journaldebit")
    const journalcreditcontrol=$("#journalcredit")
    const addjournalbuttoncontrol=$("#addjournalentry")
    const journaldifferencecontrol=$("#journaldifference")
    const totaldebitcontrol=$("#totaldebits")
    const totalcreditscontrol=$("#totalcredits")
    const journaldetailnotification=$("#journaldetailnotification")
    const journalentrieslist=$("#journalentrieslist")
    const savejournalentry=$("#savejournal")
    const journalslist=$("#journalslist")
    const clearjournaldetailscontrol=$("#clearjournal")
    const journalaccountdetails=$("#journalaccountdetails")

    // populate journal account drop down
    getglaccounts(journalaccountcontrol, 0,'choose')
    getjournalentries()
    setDatePicker(jounaldatefield)
   
    setDateToToday("jounaldate")

    addnewjournalentry.on("click",()=>{
        // checkoruserprivilege('1x001').done(function(allowed){
        //     if(allowed==1){
                // journalentrieslist.find("tbody").html("") 
                // journaldetailnotification.html("")
                // journalrefcontrol.val("")
                // journaldescriptioncontrol.val("") 
                // savejournalentry.show()
                // clearjournaldetailscontrol.show()
                // journalaccountdetails.show()
                journaldetailsmodal.modal("show")
            // }else{
            //     financemodaldetailsnotification.html(showAlert("danger",`Sorry you dont have the <strong>Privilege</strong> to add Jounal Entry`))
            // }
        // })
       
    })

    addjournalbuttoncontrol.on("click",()=>{
        const accountid=journalaccountcontrol.val()
        const accountcode=journalaccountcontrol.find("option:selected").attr("data-accountcode")
        const accountname=journalaccountcontrol.find("option:selected").text()
        const narrative=journalnarrativecontrol.val()
        const debit=Number(journaldebitcontrol.val())
        const credit=Number(journalcreditcontrol.val())
        const totalrows=journalentrieslist.find("tbody tr").length
        let errors=""
        // check for blank fields
        if(accountid==""){
            errors="Please select ledger account first"
            journalaccountcontrol.focus()
        }else if(narrative==""){
            errors="Please provide journal entry narrative"
            journalnarrativecontrol.focus()
        }else if(Number(debit)==0 && Number(credit)==0){
            errors="Please provide Debit or Credit value"
        }
        if(errors==""){
            let row=`<tr data-id='${accountid}'><td>${Number(totalrows+1)}</td>`
            row+=`<td>${accountcode}</td>`
            row+=`<td>${accountname}</td>`
            row+=`<td>${narrative}</td>`
            row+=`<td class='text-right'>${$.number(debit)}</td>`
            row+=`<td class='text-right'>${$.number(credit)}</td>`
            // add edit and delete buttons
            row+="<td class='text-right'><a href='javascript void(0)' class='edit'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
            row+="<td class='text-right'><a href='javascript void(0)' class='delete'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
            $(row).appendTo(journalentrieslist.find("tbody"))
            // clear the fields
            clearjournaldetails()
            // compute totals
            computejournaltotals()
        }else{
            journaldetailnotification.html(showAlert("info",errors))
        }
    })

    function clearjournaldetails(){
        journalaccountcontrol.val("")
        journalnarrativecontrol.val("")
        journaldebitcontrol.val("")
        journalcreditcontrol.val("")
        journalaccountcontrol.focus()
    }

    function computejournaltotals(){

        let totaldebits=0,totalcredits=0, journaldifference=0

        journalentrieslist.find("tbody tr").each(function(index){
            $this=$(this).find("td")
            // re-arrange the number in the event an item was removed
            $this.eq(0).text(Number(index+1))
            totaldebits+=Number($this.eq(4).text().replace(",",""))
            totalcredits+=Number($this.eq(5).text().replace(",",""))
        })

        journaldifference=totaldebits-totalcredits
        totaldebitcontrol.html($.number(totaldebits,2))
        totalcreditscontrol.html($.number(totalcredits,2))

        if(journaldifference==0){
            journaldifferencecontrol.html("0.00")
        }else if(journaldifference>0){
            journaldifferencecontrol.html(`${Math.abs(journaldifference)} (Dr)`)
        }else{
            journaldifferencecontrol.html(`${Math.abs(journaldifference)} (Cr)`)
        }
    }

    journalentrieslist.on("click",".delete",function(e){
        e.preventDefault()
        parent=$(this).closest("tr")
        const description=parent.find("td").eq(2).text()
        // confirm removal with bootbox
        bootbox.dialog({
            // title: "Confirm Item Removal!",
            message: `Are you sure you want to DELETE financial period <strong>${description}</strong>`,
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
                        parent.remove()
                        computejournaltotals()
                    }
                }
            }
        })
    })

    journalentrieslist.on("click",".edit",function(e){
        e.preventDefault()
        parent=$(this).closest("tr")
        const accountid=parent.attr("data-id")
        const row=parent.find("td")
        const narrative=row.eq(3).text()
        const debit=Number(row.eq(4).text().replace(",",""))
        const credit=Number(row.eq(5).text().replace(",",""))

        journalaccountcontrol.val(accountid)
        journalnarrativecontrol.val(narrative)

        if(debit>0){
            journaldebitcontrol.val(debit)
        }else if(credit>0){
            journalcreditcontrol.val(credit)
        }
        parent.remove()
        computejournaltotals()
    })

    // save journal entry
    savejournalentry.on("click",function(){
        const referenceno=journalrefcontrol.val().trim().replace("'","''")
        const description=journaldescriptioncontrol.val().trim().replace("'","''")
        const jounaldate =jounaldatefield.val()
        let errors=''
        if(referenceno==''){
            errors="Please provide journal reference number"
            journalrefcontrol.focus()
        }else if(description==""){
            errors="Please provide journal description"
            journaldescriptioncontrol.focus()
        }else{
            if(journalentrieslist.find("tbody tr").length==0){
                errors="Please add at least an gl account transaction in the list"
            }else{
                if(journaldifferencecontrol.html()!=="0.00"){
                    errors="Debit and Credit entries must balance. Please check then try again"
                }
            }
        }

        if(errors==""){
            let journalentries=[]
            journalentrieslist.find("tbody tr").each(function(){
                $this=$(this)
                row=$this.find("td")
                const glaccount=$this.attr("data-id")
                const narration=row.eq(3).text().trim().replace("'","''")
                const debit=Number(row.eq(4).text().replace(",",""))
                const credit=Number(row.eq(5).text().replace(",",""))
                journalentries.push({glaccount,narration,debit,credit})
            })
            journalentries=JSON.stringify(journalentries)
            journaldetailnotification.html(showAlert("processing","Processing. Please wait ...",1))
            // console.log("Helloooo");
            
            $.post(
                "../controllers/financeoperations.php",
                {
                    savejournaltransaction:true,
                    referenceno,
                    description,
                    jounaldate,
                    journalentries
                },
                (data)=>{
                    // console.log("data");
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        getjournalentries()
                        if(data.status=="success"){
                            journaldetailnotification.html(showAlert("success","Journal enty saved successfully"))
                            // clear form
                            clearjournaldetails()
                            clearjournalheaders()
                            journalentrieslist.find("tbody tr").remove()
                            totaldebitcontrol.html("0")
                            totalcreditscontrol.html("0")
                            journaldifferencecontrol.html("0")
                            // refresh list
                            // hide the modal and refresh notifications
                            timeawaits(journaldetailsmodal,journaldetailnotification)
                        }else{
                            journaldetailnotification.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
                    
                }
            )  
        }else{
            journaldetailnotification.html(showAlert("info",errors))
        }   
    })

    function clearjournalheaders(){
        journalrefcontrol.val("")
        journaldescriptioncontrol.val("")
    }

    function getjournalentries(){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getjournalentries:true
            },
            (data)=>{
                let results=''
                data.forEach((journal,index)=>{
                    results+=`<tr data-id='${journal.id}'><td>${Number(index+1)}</td>`
                    results+=`<td>${journal.journalno}</td>`
                    results+=`<td>${journal.referenceno}</td>`
                    results+=`<td>${journal.description}</td>`
                    results+=`<td>${formatDate(journal.date)}</td>`
                    results+=`<td>${journal.addedbyname}</td>`
                    // icon for showing ledger info
                    results+="<td class='text-right'><a href='javascript void(0)' class='info'><span><i class='fas fa-info fa-sm'></i></span></a></td></tr>"
                })
                // journalslist.find("tbody").html(results)
                makedatatable(journalslist,results,25)
            }
        )
    }

    journalslist.on("click",".info",function(e){

        e.preventDefault()

        const parent=$(this).closest("tr")
        const id=parent.attr("data-id")
        const row=parent.find("td")
        const reference=row.eq(2).text()
        const description=row.eq(3).text()

        journalrefcontrol.val(reference)
        journaldescriptioncontrol.val(description)

        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getjournaldetails:true,
                id
            },
            (data)=>{
                let results=''
                data.forEach((entry,index)=>{
                    results+=`<tr data-id='${entry.accountid}'><td>${Number(index+1)}</td>`
                    results+=`<td>${entry.referenceno}</td>`
                    results+=`<td>${entry.accountname}</td>`
                    results+=`<td>${entry.narration}</td>`
                    results+=`<td class='text-right'>${$.number(entry.debit)}</td>`
                    results+=`<td class='text-right'>${$.number(entry.credit)}</td>`
                    results+=`<td></td><td></td></tr>`
                    // results+="<td class='text-right'><a href='javascript void(0)' class='edit'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                    // results+="<td class='text-right'><a href='javascript void(0)' class='delete'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    journalaccountdetails.val(data.glaccount)
                    journalnarrativecontrol.val(data.narration)
                    journaldebitcontrol.val(data.debit)
                    journalcreditcontrol.val(data.credit)
                })

                journalentrieslist.find("tbody").html(results) 
                computejournaltotals()
                // show modal and hide sections that will allow editing 
                savejournalentry.hide()
                clearjournaldetailscontrol.hide()
                // journalaccountdetails.hide()
                journaldetailsmodal.modal("show")
                journaldetailnotification.html("")
            }
            
        )
    })

    const filterpaymentmethodfield = $("#filterpaymentmethod")
    getPaymentMethods(filterpaymentmethodfield)

    // // get payment methods
    function getPaymentMethods(paymentdropdown, defaultOption="choose") {
        $.getJSON(
            "../controllers/glaccountoperations.php", 
            {
                getpaymentmethods: true
            },
            (data) => {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach((paymentmethod) => {
                        options += `<option value="${paymentmethod.paymentmodeid}">${paymentmethod.paymentmodename}</option>`;
                    });
                } else {
                    options += '<option value="">No payment methods available</option>';
                }
    
                paymentdropdown.html(options);
            }
        ).fail((xhr, status, error) => {
            // console.error("Error fetching payment methods:", error);
            paymentdropdown.html('<option value="">Error loading payment methods</option>');
        });
    }

    // Get subgroups and populate a select element
    function getSubgroups(subactegoryfield, defaultOption) {
        $.getJSON(
            "../controllers/glaccountoperations.php", 
            {
                getsubgroups: true,
                groupid: 4
            },
            (data) => {
                let options = `<option value="">${defaultOption}</option>`;

                if (data.length > 0) {
                    data.forEach((subgroup) => {
                        options += `<option value="${subgroup.id}">${subgroup.groupname}</option>`;
                    });
                } else {
                    options += '<option value="">No subgroups available</option>';
                }

                subactegoryfield.html(options);
            }
        ).fail((xhr, status, error) => {
            console.error("Error fetching subgroups:", error);
            subactegoryfield.html('<option value="">Error loading subgroups</option>');
        });
    }

    // Function to get accounts based on the selected subgroup ID
    function getAccountsForSubgroup(subgroupId, defaultOption) {
        $.getJSON(
            "../controllers/glaccountoperations.php", 
            {
                getglaccounts: true,
                // groupid: 5
            },
            function (data) {
                let options = `<option value="">&lt;${defaultOption}&gt; </option>`

                if (data.length > 0) {
                    data.forEach(function (account) {
                        options += `<option value="${account.id}">${account.accountname}</option>`
                    });
                } else {
                    options += '<option value="">No accounts available</option>'
                }

                subgroupId.html(options);
            }
        )
    }

    
    

    setDatePicker(transactiondatefield)
    setDatePicker(filterstartdatefield)
    setDatePicker(filterenddatefield)
    setDefaultDate(transactiondatefield)

    // setting to todays date
    setDateToToday("filterstartdate")
    setDateToToday("filterenddate")
    
    // Save payment voucher
    savepaymentvoucher.on("click", function() {
        const voucherid = voucheridfield.val(),
            payeename = payeenamefield.val(),
            description = descriptionfield.val(),
            paymentmode = paymentmethodfield.val(),
            refference = referencefield.val(),
            amount = amountfield.val(),
            crledger = crledgerfield.val(),
            subaccount = glsubaccountfield.val(),
            transactiondate = formatDate(transactiondatefield.val())
            // branchid = branchidfield.val();

        let errors = "";

        // Validation of the form
        if (payeename === "") {
            errors = "Please provide the payee name";
            payeenamefield.focus();
        } else if (paymentmode === "") {
            errors = "Please select the payment method";
            paymentmethodfield.focus();
        } else if (amount === "" || isNaN(amount)) {
            errors = "Please provide a valid amount";
            amountfield.focus();
        } else if (crledger === "") {
            errors = "Please select an account";
            crledgerfield.focus();
        }

        if (errors !== "") {
            paymentvouchernotification.html(showAlert("info", errors));
            return;
        }

        $.post(
            "../controllers/glaccountoperations.php",
            {
                savepaymentvoucher: true,
                payeename: payeename,
                description: description,
                paymentmode: paymentmode,
                refference: refference,
                amount: amount,
                transactiondate: transactiondate,
                voucherid: voucherid,
                subaccount: subaccount,
                crledger: crledger
            },
            function(data) {
                const result = $.trim(data).toString();

                if (result === "exists") {
                    paymentvouchernotification.html(showAlert("info", "Payment Voucher already exists."));
                } else if (result === "success") { 
                    getpaymentvouchers()
                    paymentvouchernotification.html(showAlert("success", "Payment Voucher saved successfully."));
                    clearpaymentvoucher()

                    setTimeout(()=>{
                        paymentvouchermodal.modal("hide")
                        paymentvouchernotification.html("")
                    },3000)
                    payeenamefield.focus()
                } else {
                    paymentvouchernotification.html(showAlert("danger", `Sorry, an error occurred: ${result}`));
                }
            }
        )
    })



    
    // Optional: Clear the form after successful save
    function clearpaymentvoucher() {
        voucheridfield.val("0"),
        payeenamefield.val(""),
        descriptionfield.val(""),
        paymentmethodfield.val(""),
        referencefield.val(""),
        amountfield.val(""),
        crledgerfield.val(""),
        glsubaccountfield.val("")
    } 
    
    // disable reference field upon selecting cash payment mode
    paymentmethodfield.on("change", function(){
        const selectedpaymentmode = $(this).val();

        if(selectedpaymentmode === "1"){
            referencefield.prop("disabled", true).val('')
        }
    })

    getpaymentvouchers()

    function getpaymentvouchers() {
        $.getJSON(
            "../controllers/glaccountoperations.php", 
            {
                getpaymentvouchers: true,
            },
            (data) => {
                let results = "";
    
                // Check if data is returned
                if (data && Array.isArray(data) && data.length > 0) {
                    data.forEach((voucher, i) => {
                        results += `<tr data-id="${voucher.voucherid}" data-paymentmode='${voucher.paymentmode}' data-transactiondate="${voucher.transactiondate}">`
                        results += `<td>${Number(i + 1)}</td>`
                        results += `<td>${voucher.voucherno}</td>`
                        results += `<td>${voucher.payeename}</td>`
                        results += `<td>${voucher.paymentname}</td>`
                        results += `<td>${voucher.refference}</td>`
                        results += `<td>${voucher.amount}</td>`
                        results += `<td>${voucher.addedbyname}</td>`
    
                        // Download, Edit and delete buttons
                        results += `<td><a class="download"><i class="fal fa-download fa-lg fa-fw text-success"></i></a></td>`;
                        results+=`<td><a class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                        results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td></tr>`
    
                        results += `</tr>`
                    });
                } else {
                    results = `<tr><td colspan="9" class="text-center">No records found</td></tr>`
                }
                // paymentvouchertable.find("tbody").html(results)
                
                makedatatable(paymentvouchertable, results, 25);
            }
        );
    }

    // Filter payment voucher
    filterpaymentvoucherbutton.on("click",()=> {
        // e.preventDefault();
        filterPaymentvouchers();
        // resetFilterFields();
    });

    function filterPaymentvouchers() {
        const startDate = parseDate(filterstartdatefield.val());
        const endDate = parseDate(filterenddatefield.val());
        const paymentMode = filterpaymentmethodfield.val()?.trim() || null;
    
        // console.log("Filter inputs:", { startDate, endDate, paymentMode });
    
        let rowsFiltered = false;
    
        $('#paymentvouchertable tr').show();
    
        $('#paymentvouchertable tr').each(function () {
            const row = $(this);
    
            const rowDateString = $(this).data('transactiondate');
            const rowDate = parseDate(rowDateString);
            const rowPaymentMode = $(this).data('paymentmode')?.toString();
    
            if (shouldHideRow(rowDate, startDate, endDate, rowPaymentMode, paymentMode)) {
                row.hide();
            } else {
                rowsFiltered = true;
            }
        });
    
        if (!rowsFiltered) {
            $('#paymentvouchertable').html("<tr><td colspan='10'>No results found</td></tr>");
        }
    }
    
    function resetFilterFields() {
        filterstartdatefield.val("");
        filterenddatefield.val("");
        paymentmethodfield.val("");
    }
    
    function parseDate(dateString) {
        if (!dateString || dateString === '0000-00-00') return null;
        const parsedDate = new Date(dateString);
        return isNaN(parsedDate) ? null : parsedDate;
    }
    
    function shouldHideRow(rowDate, startDate, endDate, rowPaymentMode, paymentMode) {

        const isOutsideDateRange =
            (startDate && rowDate && rowDate < startDate) ||
            (endDate && rowDate && rowDate > endDate);
    
        const isPaymentModeMismatch =
            paymentMode &&
            (!rowPaymentMode || rowPaymentMode !== paymentMode);
    
        return isOutsideDateRange || isPaymentModeMismatch;
    }  

    // Edit payment voucher
    paymentvouchertable.on("click", ".edit", function() {
        const voucherid = $(this).closest("tr").attr("data-id");

        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                 getpaymentvoucherdetails: true,
                 voucherid: voucherid
                
            },
            (data) => {
                data = data[0];

                voucheridfield.val(voucherid);
                vouchernofield.val(data.voucherno);
                payeenamefield.val(data.payeename);
                descriptionfield.val(data.description);
                paymentmethodfield.val(data.paymentmode);
                transactiondatefield.val(data.transactiondate);
                referencefield.val(data.refference);
                amountfield.val(data.amount);
                crledgerfield.val(data.crledger);
                glsubaccountfield.val(data.subaccount);

                // Show the modal
                paymentvouchermodal.modal("show");
                
                // Clear any previous notifications (optional)
                paymentvouchernotification.html("");
            }
        )
    });

    // Delete payment voucher
    const paymentvouchersdetailesnotifications=$("#paymentvouchersdetailesnotifications")
    paymentvouchertable.on("click", ".delete", function() {
        const parentRow = $(this).closest("tr");
        const voucherId = parentRow.attr("data-id");
        const voucherNo = parentRow.find("td").eq(1).text();

        bootbox.confirm({
            title: "Delete Payment Voucher",
            message: `Are you sure you want to delete the payment voucher with Voucher Number: <strong>${voucherNo}?</strong>`,
            buttons: {
                confirm: {
                    label: 'Yes, Delete',
                    className: 'btn-danger btn-sm'
                },
                cancel: {
                    label: 'No, Cancel',
                    className: 'btn-success btn-sm'
                }
            },
            callback: function(result) {
                if (result) {
                    $.post("../controllers/glaccountoperations.php", {
                        deletepaymentvoucher: true,
                        voucherid: voucherId
                    }, (response) => {
                        if (response === "success") {
                            getpaymentvouchers();
                            paymentvouchersdetailesnotifications.html(showAlert("success",`Voucher <strong>${voucherNo}</strong>  deleted successfully.`));
                            clearnotificationsdetails(paymentvouchersdetailesnotifications)
                        } else {
                            paymentvouchersdetailesnotifications.html(showAlert("danger",`Error deleting voucher ${response}.`));
                        }
                    });
                }
            }
        });
    });

    // Download payment voucher as PDF
    paymentvouchertable.on("click", ".download", function() {
        const voucherno = $(this).closest("tr").find("td:nth-child(2)").text();
        $.ajax({
            url: "../controllers/glaccountoperations.php",
            method: "GET",
            data: {
                printpaymentvoucher: true,
                voucherno: voucherno
            },
            xhrFields: {
                responseType: 'blob'
            },
            success: function(response) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(response);
                link.download = 'Payment_Voucher_' + voucherno + '.pdf';
                link.click();
            },
            error: function() {
                alert("There was an error generating the PDF.");
            }
        });        
    });    
    
    const paymentvouchermodal = $("#paymentvouchermodal"),
        addpaymentvoucherbutton=$("#addnewpaymentvoucher")
    
    addpaymentvoucherbutton.on("click", function(){ 
        paymentvouchermodal.modal('show')

        // checkoruserprivilege('1x001').done(function(allowed){
        //     if(allowed==1){
        //         paymentvouchernotification.val("")
               
        //     }else{
        //         financemodaldetailsnotification.html(showAlert("danger",`Sorry You dont have the <strong></strong>Privilege to add Voucher`))
        //     }
           
        // })
       
    })

    const saveglsubaccountbutton = $("#saveglsubaccountbutton") 
    const saveglsubaccount = $("#saveglsubaccount")
    const glsubaccountsmodal = $("#glsubaccountsmodal")
    const glsubaccountname = $("#glsubaccountname")
    const glsubaccountidfield = $("#glsubaccountid")
    const glsubaccountnotification = $("#glsubaccountnotification")
    const glsubaccountsection = $("#glsubaccountsection")
    const glsubaccountslist = $("#glsubaccountslist")
    const glsubaccountfield = $("#glsubaccount")
    const extendoptionscheckbox = $("#extendOptions")
    const extendedFields = $("#extendedFields")
    const subglaccountbanknamefield = $("#subglaccountbankname")
    const subglaccountbranchnamefield = $("#subglaccountbranchname")
    const subglaccountnumberfield = $("#subglaccountnumber")
    const glsubaccountstelephonefield = $("#glsubaccountstelephone")

    saveglsubaccountbutton.on("click", function(){
        // checkoruserprivilege('1x001').done(function(allowed){
        //     if(allowed==1){
                glsubaccountsmodal.modal('show')
        //     }else{
        //         financemodaldetailsnotification.html(showAlert("danger",`Sorry You dont have the <strong></strong>Privilege to add Sub Account`))
        //     }
        // })
        
    })

    // show gl sub account and telephone details fields
    extendoptionscheckbox.on("change", function () {
        if (this.checked) {
            extendedFields.show();
        } else {
            extendedFields.hide();
        }
    });

    getbankcodefield(subglaccountbanknamefield)

    //get banks in a dropdown list
    function getbankcodefield(itemdropdown,defaultOption="&lt;choose&gt;"){
        $.getJSON(
            "../controllers/bankoperations.php",
            {
                getbanks: true
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (bank) {
                        options += `<option value="${bank.bankid}">${bank.bankname} (${bank.bankcode})</option>`;
                    });
                } else {
                    options += '<option value="">No banks available</option>';
                }
    
                itemdropdown.html(options);
            }
        )
    }

    // get branches of selected branches
    function getbranchesForbank(bankId, itemdropdown, defaultOption) {
        $.getJSON(
            "../controllers/bankoperations.php", 
            {
                getbranches: true, 
                bankid: bankId
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
        
                if (data.length > 0) {
                    data.forEach(function (branch) {
                        options += `<option value="${branch.branchid}">${branch.branchname} (${branch.branchcode})</option>`;
                    });
                } else {
                    options += '<option value="">No branches available</option>';
                }
        
                itemdropdown.html(options);
            }
        ).fail(function (xhr, status, error) {
            console.error("Error fetching branches:", error);
            itemdropdown.html('<option value="">Error loading branches</option>');
        });
    }

    subglaccountbanknamefield.on("change", function(){
        const selectedBankId = $(this).val();
    
        if (selectedBankId) {
            getbranchesForbank(selectedBankId, $('#subglaccountbranchname'), "Select Branch");
        } else {
            subglaccountbranchnamefield.html('<option value="">Select Branch</option>');
        }
    })


    // Function to get GL Sub-accounts
    function getsubaccounts() {
        const accountid =selectedglsubaccountfield
        // console.log(accountid);
        
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getglsubaccounts: true,
                accountid
            },
            (data) => {
                let results = "";

                if (data.length > 0) {
                    data.forEach((subAccount, i) => {
                        results += `<div class="sub-account-item" data-id='${subAccount.id}' style="display: flex; justify-content: space-between; align-items: center; background-color: #fff; padding: 15px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; transition: background-color 0.3s ease;">
                                        <span style="font-size: 13px; font-weight: bold; color: #333;">${subAccount.subaccountname} (${subAccount.subaccountcode})</span>
                                        <div style="display: flex; gap: 10px;">
                                            <button class='editglsubaccount' style="padding: 8px 12px; font-size: 11px; color: white; background-color: #28a745; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
                                                <i class="fal fa-edit fa-lg fa-fw"></i> Edit
                                            </button>
                                            <button class='deleteglsubaccount' style="padding: 8px 12px; font-size: 11px; color: white; background-color: #dc3545; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease;">
                                                <i class="fal fa-trash-alt fa-lg fa-fw"></i> Delete
                                            </button>
                                        </div>
                                    </div>`;
                    });
                } else {
                    results += "<p style='font-size: 16px; color: #555; text-align: center;'>No sub-accounts found</p>";
                }

                // Insert the results into the HTML
                glsubaccountslist.html(results);
            }
        ).fail(function (xhr, status, error) {
            console.error("Error fetching sub-accounts:", error);
            glsubaccountslist.html("<p style='font-size: 16px; color: #555; text-align: center;'>Error loading sub-accounts</p>");
        });
    }

    // Save GL Sub Account
    // saveglsubaccount.on("click", function(){
    //     const id = glsubaccountidfield.val()
    //     const accountcode = accountcodefield.val()
    //     const subaccountname = glsubaccountname.val()

    //     let errors = "";

    //     if(subaccountname === ""){
    //         errors = "Please input sub account name"
    //         glsubaccountname.focus()
    //     }

    //     if(errors === ""){
    //         glsubaccountnotification.html(showAlert("processing", "Processing. Please wait ...", 1));

    //         $.post(
    //             "../controllers/financeoperations.php",
    //             {
    //                 saveglsubaccount: true,
    //                 id: id,
    //                 accountcode: accountcode,
    //                 subaccountname: subaccountname
    //             },
    //             function(data) {
    //                 console.log("Response from server:", data);
    //                 data = data.trim();

    //                 if (data === "success") {
    //                     glsubaccountnotification.html(showAlert("success", "GL sub Account saved successfully."));
    //                     getsubaccounts()
    //                     // clearbillfields()
    //                     // getbillingaccounts()
                        
    //                 } else {
    //                     glsubaccountnotification.html(showAlert("danger", `Sorry, an error occurred: ${data}`));
    //                 }
    //             }
    //         );
    //     } else {
    //         glsubaccountnotification.html(showAlert("info", errors));
    //     }
    // });

    // Save GL Sub Account with extended details
    

    // adding filed for sub account bank and sub account telephone

    const addglsubaccountbanksbutton =$("#addglsubaccountbanks"),
        glsubaccountbanktable=$("#glsubaccountbanktable"),
        addglsubaccountstelephonebutton =$("#addglsubaccountstelephone"),
        glsubaccountstelephonetable=$("#glsubaccountstelephonetable")

    addglsubaccountbanksbutton.on("click", function () {
        const bankid = subglaccountbanknamefield.val();
        const bankname = subglaccountbanknamefield.find("option:selected").text();
    
        const branchid = subglaccountbranchnamefield.val();
        const branchname = subglaccountbranchnamefield.find("option:selected").text();
    
        const accountnumber = subglaccountnumberfield.val();
    
        let errors = "";
    
        if (!bankid) {
            errors = "Please select a bank";
            subglaccountbanknamefield.focus();
        } else if (!branchid) {
            errors = "Please select a branch";
            subglaccountbranchnamefield.focus();
        } else if (!accountnumber) {
            errors = "Please input the account number";
            subglaccountnumberfield.focus();
        }
    
        if (errors === "") {
            const newRow = `<tr 
                data-bankid="${bankid}" 
                data-branchid="${branchid}">
                <td>${bankname}</td>
                <td>${branchname}</td>
                <td contenteditable="true">${accountnumber}</td>
                <td class='removebank'>
                    <i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i>
                </td>
            </tr>`;
    
            glsubaccountbanktable.append(newRow);
    
            // clear fields
            subglaccountbanknamefield.val("");
            subglaccountbranchnamefield.val("");
            subglaccountnumberfield.val("");
        } else {
            glsubaccountnotification.html(showAlert("info", errors));
        }
    })
        

    // Remove bank row
    glsubaccountbanktable.on("click", ".removebank", function () {
        $(this).closest("tr").remove();
        glsubaccountnotification.html(showAlert("success", "Bank code and Branch removed successfully."));
        setTimeout(()=>{
            glsubaccountnotification.html("")
            subglaccountbanknamefield.focus();
        },2000)
    });

    // Add GL Sub Account Telephone
    addglsubaccountstelephonebutton.on("click", function () {
        const telephone = glsubaccountstelephonefield.val();

        let errors = "";

        if (telephone === "") {
            errors = "Please input a telephone number";
            glsubaccountstelephonefield.focus();
        }

        if (errors === "") {
            const newRow = `<tr>
                                <td contenteditable="true">${telephone}</td>
                                <td class='removetelephone'><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></td>
                            </tr>`;
            glsubaccountstelephonetable.append(newRow);
            glsubaccountstelephonefield.val("");
        } else {
            glsubaccountnotification.html(showAlert("info", errors));
        }
    })

    // Remove telephone row
    glsubaccountstelephonetable.on("click", ".removetelephone", function () {
        $(this).closest("tr").remove();
        glsubaccountnotification.html(showAlert("success", "Telephone number removed successfully."));

        setTimeout(()=>{
            glsubaccountnotification.html("")
        },2000)
        glsubaccountstelephonefield.focus();
    })

    saveglsubaccount.on("click", function () {
        const id = glsubaccountidfield.val(); 
        
        const accountcode = selectedglsubaccountfield;
        const subaccountname = glsubaccountname.val();
        console.log("glsubaccount id: ",accountcode);
     
        const glaccountbankdetails = [];
        glsubaccountbanktable.find("tr").each(function () {
            const row = $(this),
                bankid = row.data("bankid"),
                branchid = row.data("branchid"),
                accountnumber = row.find("td").eq(2).text().trim();

            if (bankid && branchid && accountnumber) {
                glaccountbankdetails.push({ bankid, branchid, accountnumber });
            }
        })
        const bankdetails = JSON.stringify(glaccountbankdetails);
    
        const glaccounttelephonedetails = [];
        glsubaccountstelephonetable.find("tr").each(function () {
            const row = $(this),
                phonenumber = row.find("td").eq(0).text().trim();
    
            if (phonenumber) {
                glaccounttelephonedetails.push({ phonenumber });
            }
        });
        const telephonedetails = JSON.stringify(glaccounttelephonedetails);
    
        let errors = "";
    
        if (subaccountname === "") {
            errors = "Please input sub account name";
            glsubaccountname.focus();
        }
    
        if (errors === "") {
            glsubaccountnotification.html(showAlert("processing", "Processing. Please wait ...", 1));
    
            $.post(
                "../controllers/financeoperations.php",
                {
                    saveglsubaccount: true,
                    id: id,
                    accountcode: accountcode,
                    subaccountname: subaccountname
                },
                function (data) {
                    console.log("Response from first server call:", data);
                    data = data.trim();
                    if (data === "success") {
                        // Only send bank details if any are present
                        if (glaccountbankdetails.length > 0) {
                            const id = glsubaccountidfield.val(); 
                            $.post(
                                "../controllers/financeoperations.php",
                                {
                                    saveglsubaccountbank: true,
                                    id: id,
                                    bankdetails: bankdetails
                                },
                                function (data) {
                                    data = data.trim();
                                    if (data == "success") {
                                        glsubaccountnotification.html(showAlert("danger", `Error saving bank details: ${data}`));
                                        // return;
                                        // emptying the table
                                        glsubaccountbanktable.find("tbody").empty();
                                    }
    
                                    // Continue to telephone if any
                                    if (glaccounttelephonedetails.length > 0) {
                                        const id = glsubaccountidfield.val(); 
                                        $.post(
                                            "../controllers/financeoperations.php",
                                            {
                                                saveglsubaccounttelephone: true,
                                                id: id,
                                                telephonedetails: telephonedetails
                                            },
                                            function (data) {
                                                data = data.trim();
                                                if (data === "success") {
                                                    finishSuccess();
                                                    // eptying the field
                                                    glsubaccountstelephonetable.find("tbody").empty();
                                                } else {
                                                    glsubaccountnotification.html(showAlert("danger", `Error saving telephone details: ${data}`));
                                                }
                                            }
                                        );
                                    } else {
                                        finishSuccess();
                                    }
                                }
                            );
                        } else if (glaccounttelephonedetails.length > 0) {
                            // Only send phone details if bank is missing but phone is present
                            const id = glsubaccountidfield.val()
                            $.post(
                                "../controllers/financeoperations.php",
                                {
                                    saveglsubaccounttelephone: true,
                                    id: id,
                                    telephonedetails: telephonedetails
                                },
                                function (data) {
                                    data = data.trim();
                                    if (data === "success") {
                                        finishSuccess();
                                        // emptying the field
                                        glsubaccountstelephonetable.find("tbody").empty()
                                    } else {
                                        glsubaccountnotification.html(showAlert("danger", `Error saving telephone details: ${data}`));
                                    }
                                }
                            );
                        } else {
                            // Neither bank nor phone: finish success
                            finishSuccess();
                        }
                    } else {
                        glsubaccountnotification.html(showAlert("danger", `Error saving GL Sub Account: ${data}`));
                    }
                }
            );
        } else {
            glsubaccountnotification.html(showAlert("info", errors));
        }
    
        function finishSuccess() {
            glsubaccountnotification.html(showAlert("success", "All data saved successfully."));
            getsubaccounts();
            clearsubaccountfields();
            timeawaits(glsubaccountsmodal, glsubaccountnotification);
        }
    })
    

    // edit GL Sub Account
    glsubaccountslist.on("click", ".editglsubaccount", function(){
        const parent = $(`.sub-account-item[data-id='${id}']`);
        const subaccountname = parent.find("span").text().split(" (")[0];

        glsubaccountname.val(subaccountname);
        parent.remove();
    })

    // clear the gl sub account fields
    function clearsubaccountfields(){
       glsubaccountidfield.val(""),
       glsubaccountname.val("");
       subglaccountbanknamefield.val("");
       subglaccountbranchnamefield.val("");
       subglaccountnumberfield.val("");
       glsubaccountstelephonefield.val("");
    }
    

    // Delete GL Sub Account
    glsubaccountslist.on("click", ".deleteglsubaccount", function() {
        const parent = $(this).closest(".sub-account-item");
        const subaccountid = parent.attr("data-id");
        const subaccountname = parent.find("span").text().split('(')[0].trim();
        const subaccountcode = parent.find("span").text().split('(')[1].replace(')', '').trim();

        // Show a confirmation dialog before deleting
        bootbox.confirm({
            title: "Delete GL Sub-Account",
            message: `Are you sure you want to delete the sub-account: ${subaccountname} (${subaccountcode})?`,
            buttons: {
                confirm: {
                    label: 'Yes, Delete',
                    className: 'btn-danger btn-sm'
                },
                cancel: {
                    label: 'No, Cancel',
                    className: 'btn-success btn-sm'
                }
            },
            callback: function(result) {
                if (result) {
                    // Send the delete request to the server
                    $.post("../controllers/financeoperations.php", {
                        deleteglsubaccount: true,
                        id: subaccountid
                    }, (response) => {
                        if (response === "success") {
                            getsubaccounts();
                            financemodaldetailsnotification.html(showAlert("success",`Sub-account deleted successfully.`))
                            // hide notifications
                            clearnotificationsdetails(financemodaldetailsnotification)  
                        } else {
                            // alert("Error deleting sub-account.");
                            financemodaldetailsnotification.html(showAlert("danger",`Error deleting sub-account.`))
                        }
                    });
                }
            }
        });
    });


    // Function to get GL sub-accounts in a drop-down list
    function getglsubaccounts(accountid, glsubaccountDropdown, defaultOption = "<choose>") {
        if (!accountid) {
            console.error("Account ID is undefined");
            glsubaccountDropdown.html('<option value="">Please select an account first</option>');
            return;
        }

        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getglsubaccounts: true,
                accountcode: accountid
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;

                if (data.length > 0) {
                    data.forEach(function (subaccount) {
                        options += `<option value="${subaccount.accountcode}">${subaccount.subaccountname}</option>`;
                    });
                } else {
                    options += '<option value="">No Sub Accounts available</option>';
                }

                glsubaccountDropdown.html(options);
            }
        )
    }

    // Add a change event listener to the account dropdown
    crledgerfield.on('change', function() {
        const selectedaccountcode = crledgerfield.val()
        console.log(selectedaccountcode);
        
        if (selectedaccountcode) {
            getglsubaccounts(selectedaccountcode, $("#glsubaccount"), "Select Sub-account");
        } else {
            glsubaccountfield.html('<option value="">Please select an account first</option>');
        }
    });
    
    const landlordvoucheridfield = $("#landlordvoucherid")
    // const landlordvoucherbranchidfield = $("#landlordvoucherbranchid")
    const ownernamefield = $("#ownername")
    const paymodefield = $("#paymode")
    const ownertelephonefield = $("#ownertelephone")
    const banknamefield = $("#bankname")
    const owneraccountnumberfield = $("#owneraccountnumber")
    const monthfield = $("#month")
    const yearfield = $("#year")
    const voucherpayeenamefield = $("#voucherpayeename")
    const arrearscheckboxfield = $("#arrearscheckbox")
    const voucherreferencefield = $("#voucherreference")
    const voucherdescriptionfield = $("#voucherdescription")
    const voucheradditiondescriptionfield = $("#voucheradditiondescription")
    const voucheradditionamountfield = $("#voucheradditionamount")
    const addadditionbutton = $("#addadditionbutton")
    const adddeductionbutton = $("#adddeductionbutton")
    const voucherdeductionamountfield = $("#voucherdeductionamount")
    const voucherdeductiondescriptionfield = $("#voucherdeductiondescription")
    const totaladditionsfield = $("#totaladditions")
    const totaldeductionsfield = $("#totaldeductions")
    const totalloanamountfield = $("#totalloanamount")
    const tenantstotalrentfield = $("#tenantstotalrent")
    const agencycommissionfield = $("#agencycommission")
    const vouchertotalpayablefield = $("#vouchertotalpayable")
    const voucherdeductiontable = $("#voucherdeductiontable")
    const voucheradditiontable = $("#voucheradditiontable")
    const landlordpaymentvouchernotification = $("#landlordpaymentvouchernotification")
    const attachedpropertytable = $("#attachedpropertytable")
    const propertyownerloantable = $("#propertyownerloantable")
    const tenantdetailstable = $("#tenantdetailstable")
    const addlandlordvoucherbutton = $("#addlandlordvoucherbutton")
    const landlordfinancemodal = $("#landlordfinancemodal")
    const savelandlordvoucherbutton = $("#savelandlordvoucherbutton")
    const landlordvoucherstable = $("#landlordvoucherstable")


    populatemonths(monthfield)
    populateyears(yearfield)

    getpropertyowners(ownernamefield)
    getpaymentmethods(paymodefield)

    // populate lanlords in a dropdown list
    function getpropertyowners(itemsDropdown, defaultOption="&lt;choose&gt;"){
        $.getJSON(
            "../controllers/owneroperations.php",
            {
                getowners: true
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (propertyowner) {
                        options += `<option value="${propertyowner.ownerid}">${propertyowner.name}</option>`;
                    });
                } else {
                    options += '<option value="">No landlords available</option>';
                }
    
                itemsDropdown.html(options);
            }
        )
    }

    // get payment methods in a dropdown list
    function getpaymentmethods(itemdropdown,defaultOption="&lt;choose&gt;"){
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getpaymentmethods: true
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (paymentmode) {
                        options += `<option value="${paymentmode.paymentmodeid}">${paymentmode.paymentmodename}</option>`;
                    });
                } else {
                    options += '<option value="">No loans available</option>';
                }
    
                itemdropdown.html(options);
            }
        )
    }

    ownernamefield.on("change",function(){
        getpropertyownertelephone(ownertelephonefield)
        getpropertyownerbank(banknamefield)
        getownerproperties()
        getpropertyownerloans()
    })

    banknamefield.on("change", function(){
        propertyownerbankaccountnumber(owneraccountnumberfield)
    })

    // get property owner telephone
    function getpropertyownertelephone(itemdropdown,defaultOption="&lt;choose&gt;"){
        const ownerid = ownernamefield.val()
        $.getJSON(
            "../controllers/propertyoperations.php",
            {
                getpropertyownertelephone: true,
                ownerid: ownerid
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (owner) {
                        options += `<option value="${owner.id}">${owner.mobilenumber}</option>`;
                    });
                } else {
                    options += '<option value="">No telephone available</option>';
                }
    
                itemdropdown.html(options);
            }
        )
    }

    // get property owner bank
    function getpropertyownerbank(itemdropdown,defaultOption="&lt;choose&gt;"){
        const ownerid = ownernamefield.val()
        $.getJSON(
            "../controllers/propertyoperations.php",
            {
                getpropertyownerbank: true,
                ownerid: ownerid
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (owner) {
                        options += `<option value="${owner.bankid}">${owner.bankname}</option>`;
                    });
                } else {
                    options += '<option value="">No banks available</option>';
                }
    
                itemdropdown.html(options);
            }
        ).fail(function (xhr, status, error) {
            console.error("Error fetching Items:", error);
            itemdropdown.html('<option value="">Error loading loans</option>');
        });
    }

    //get property owner account numbers for bank
    function propertyownerbankaccountnumber(itemdropdown,defaultOption="&lt;choose&gt;"){
        const ownerid = ownernamefield.val()
        const bankid = banknamefield.val()
        $.getJSON(
            "../controllers/propertyoperations.php",
            {
                getpropertyownerbankaccount: true,
                ownerid: ownerid,
                bankid: bankid
            },
            function (data) {
                let options = `<option value="">${defaultOption}</option>`;
    
                if (data.length > 0) {
                    data.forEach(function (owner) {
                        options += `<option value="${owner.accountnumber}">${owner.accountnumber}</option>`;
                    });
                } else {
                    options += '<option value="">No accounts numbers available</option>';
                }
    
                itemdropdown.html(options);
            }
        )
    }

    // get properties and blocks attached to a given owner in a table
    
    
    // Get loans of a given property owner
    function getpropertyownerloans() {
        const ownerid = ownernamefield.val();
        $.getJSON(
            "../controllers/loanoperations.php",
            {
                getpropertyownerloans: true,
                ownerid: ownerid
            },
            (data) => {
                let results = "";

                if (data && Array.isArray(data) && data.length > 0) {
                    data.forEach((loan, i) => {
                        const applicationdate = new Date(loan.applicationdate);
                        const loanAmount = loan.amount;
                        const loanPeriod = loan.duration;
                        const loanInterest = loan.interest;

                        const principal = loanAmount / loanPeriod;

                        const interest = (loanInterest / 100) * principal;

                        const amount = principal + interest;

                        const deductiondate = new Date(applicationdate);
                        deductiondate.setMonth(deductiondate.getMonth() + 1);

                        const deductionDateFormatted = deductiondate.toISOString().split("T")[0];

                        results += `<tr data-loanid="${loan.loanid}">`;
                        results += `<td>${Number(i + 1)}</td>`;
                        results += `<td>${loan.loantype}</td>`;
                        results += `<td>${deductionDateFormatted}</td>`;
                        results += `<td><input type="number" class="form-control form-control-sm principal" value="${principal.toFixed(2)}"></td>`;
                        results += `<td><input type="number" class="form-control form-control-sm interest" value="${interest.toFixed(2)}"></td>`;
                        results += `<td><input type="number" class="form-control form-control-sm amount" value="${amount.toFixed(2)}" readonly></td>`;
                        results += `<td><input type="checkbox"></td>`;
                        results += `</tr>`;
                    });
                } else {
                    results = `<tr><td colspan="7" class="text-center">No loans found</td></tr>`;
                }
                propertyownerloantable.html(results);
                updateloantotal("propertyownerloantable", "totalloanamount");
            }
        );
    }

    // Recalculate the amount when principal or interest changes
    propertyownerloantable.on("input", ".principal, .interest", function () {
        const row = $(this).closest("tr");
        const principal = parseFloat(row.find(".principal").val()) || 0;
        const interest = parseFloat(row.find(".interest").val()) || 0;

        const amount = principal + (principal * interest / 100);
        row.find(".amount").val(amount.toFixed(2));
        updateloantotal("propertyownerloantable", "totalloanamount");
    });

    attachedpropertytable.on("change", '.selectproperty', function() {
        const blockname = $(this).data('blockname');
        const propertyname = $(this).data('propertyname');
        const propertyid = $(this).closest("tr").data('id');
        
        if (this.checked) {
            getpropertyunittenants(blockname, propertyname, propertyid);
        } else {
            delete tenantsByProperty[propertyid];
            
            tenantdetailstable.html(Object.values(tenantsByProperty).join(''));
            updatetenantstotal("tenantdetailstable", "tenantstotalrent");
        }
    });
    // Store the tenants for each property in an object, indexed by property id
    let tenantsByProperty = {};

    // Function to get tenants of the given unit and append them to the table
    function getpropertyunittenants(blockname, propertyname, propertyid) {
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                gettenantsbyblock: true,
                blockname: blockname,
                propertyname: propertyname
            },
            (data) => {
                let results = "";
        
                if (data && Array.isArray(data) && data.length > 0) {
                    data.forEach((tenant) => {
                        results += `<tr data-propertyid="${propertyid}" data-tenantid="${tenant.tenantid}">`;
                        results += `<td class="d-none">${tenant.tenantid}</td>`;
                        results += `<td>${tenant.tenantno}</td>`;
                        results += `<td>${tenant.firstname} ${tenant.middlename} ${tenant.lastname}</td>`;
                        results += `<td class="d-none">${tenant.doorno}</td>`;
                        results += `<td class="d-none">${tenant.propertyid}</td>`;
                        results += `<td class="d-none">${tenant.unitid}</td>`;
                        results += `<td>${tenant.unitname}</td>`;
                        results += `<td class="d-none">${tenant.paymode}</td>`;
                        results += `<td>${tenant.rent}</td>`;
                        results += `<td>${tenant.notice}</td>`;
                        results += `</tr>`;
                    });
                } else {
                    results = `<tr><td colspan="7" class="text-center">No tenants found for selected block(s)</td></tr>`;
                }

                tenantsByProperty[propertyid] = results;
                
                if ($(`input[data-propertyname="${propertyname}"][data-blockname="${blockname}"]`).prop('checked')) {
                    tenantdetailstable.html(Object.values(tenantsByProperty).join(''));
                    updatetenantstotal("tenantdetailstable", "tenantstotalrent");
                }
            }
        );
    }

    addlandlordvoucherbutton.on("click", function(){
        checkoruserprivilege('1x001').done(function(allowed){
            if(allowed==1){
                landlordpaymentvouchernotification.val("")
                clearlandlordvoucher()
                landlordfinancemodal.modal('show')
            }else{
                financemodaldetailsnotification.html(showAlert("danger",`Sorry You dont have the <strong></strong>Privilege to add Voucher`))
            }
        })
        
    })
    
    // Save landlord voucher modal
    savelandlordvoucherbutton.on("click", () => {
        const id = landlordvoucheridfield.val();
        const ownerid = ownernamefield.val();
        const paymode = paymodefield.val();
        const arrears = arrearscheckboxfield.prop("checked") ? 1 : 0;
        const bankid = banknamefield.val();
        const accountnumber = owneraccountnumberfield.val();
        const ownertelephone = ownertelephonefield.val();
        const paymonth = monthfield.val();
        const payyear = yearfield.val();
        const payeename = voucherpayeenamefield.val();
        const reference = voucherreferencefield.val();
        const description = voucherdescriptionfield.val();
        // const branchid = landlordvoucherbranchidfield.val();
    
        let errors = "";
    
        if (ownerid === "") {
            errors = "Please select owner name";
            ownernamefield.focus();
        } else if (paymode === "") {
            errors = "Please select payment mode";
            paymodefield.focus();
        } else if (payeename === "") {
            errors = "Please input payee name";
            voucherpayeenamefield.focus();
        } else if (paymonth === "") {
            errors = "Please select the month";
            monthfield.focus();
        } else if (payyear === "") {
            errors = "Please select the year";
            yearfield.focus();
        } else if (description === "") {
            errors = "Please input the description";
            voucherdescriptionfield.focus();
        }
    
        if (errors === "") {
            // Collect Additions
            const additions = [];
            voucheradditiontable.find("tr").each(function () {
                const description = $(this).find("td:eq(0)").text();
                const amount = parseFloat($(this).find("td:eq(1)").text());
                if (description && !isNaN(amount)) {
                    additions.push({ description, amount });
                }
            });
    
            // Collect Deductions
            const deductions = [];
            voucherdeductiontable.find("tr").each(function () {
                const description = $(this).find("td:eq(0)").text();
                const amount = parseFloat($(this).find("td:eq(1)").text());
                if (description && !isNaN(amount)) {
                    deductions.push({ description, amount });
                }
            });
    
            // Collect Loans
            const loans = [];
            propertyownerloantable.find("tr").each(function () {
                const row = $(this);
                const checkbox = row.find("input[type='checkbox']");
                console.log(checkbox.prop("checked"));

                if (checkbox.prop("checked")) {
                    const loanid = row.data("loanid");
                    const principal = parseFloat(row.find("td:eq(3) input").val());
                    const interest = parseFloat(row.find("td:eq(4) input").val());
                    // const principal = parseFloat(row.find("td:eq(4)").text());
                    // const interest = parseFloat(row.find("td:eq(5)").text());

                    console.log(loanid, principal, interest)
                    
                    if (loanid && !isNaN(principal) && !isNaN(interest)) {
                        loans.push({ loanid, principal, interest });
                    }
                }
            });
    
            // Collect Tenants
            const tenants = [];
            $("#tenantdetailstable tr").each(function() {
                const row = $(this);
                const tenant = {
                    tenantid: row.find("td:eq(0)").text(),
                    propertyid: row.find("td:eq(4)").text(),
                    unitid: row.find("td:eq(5)").text(),
                    amount: row.find("td:eq(8)").text()
                };
    
                if (tenant.tenantid && tenant.propertyid && tenant.unitid && tenant.amount) {
                    tenants.push(tenant);
                }
            });
    
            landlordpaymentvouchernotification.html(showAlert("processing", "Processing. Please wait ...", 1));
    
            // Send data via POST
            $.post(
                "../controllers/financeoperations.php",
                {
                    savelandlordvoucher: true,
                    id: id,
                    ownerid: ownerid,
                    paymode: paymode,
                    arrears: arrears,
                    bankid: bankid,
                    accountnumber: accountnumber,
                    ownertelephone: ownertelephone,
                    paymonth: paymonth,
                    payyear: payyear,
                    payeename: payeename,
                    reference: reference,
                    description: description,
                    branchid: branchid,
                    additions: JSON.stringify(additions),
                    deductions: JSON.stringify(deductions),
                    loans: JSON.stringify(loans),
                    tenants: JSON.stringify(tenants)
                },
                function (data) {
                    const result = $.trim(data).toString();
    
                    if (result === "exists") {
                        landlordpaymentvouchernotification.html(showAlert("info", "Landlord Voucher already exists."));
                    } else if (result === "success") {  
                        getlandlordvouchers()
                        landlordpaymentvouchernotification.html(showAlert("success", "Landlord Payment Voucher saved successfully."));
                        // clear the fields
                        clearlandlordvoucher()

                        // hide module and notifications
                        timeawaits(landlordfinancemodal,landlordpaymentvouchernotification)
                     
                    } else {
                        landlordpaymentvouchernotification.html(showAlert("danger", `Sorry, an error occurred: ${result}`));
                    }
                }
            );
        } else {
            landlordpaymentvouchernotification.html(showAlert("info", errors))
        }
    })
    
// function clear property owner voucher field after saving
function clearlandlordvoucher(){
    landlordvoucheridfield.val('0')
    ownernamefield.val("")
    paymodefield.val("")
    voucherpayeenamefield.val("")
    arrearscheckboxfield.prop("checked", false)
    $(".selectproperty").prop("checked", false);
    banknamefield.val("")
    owneraccountnumberfield.val("")
    ownertelephonefield.val("")
    voucherpayeenamefield.val("")
    voucherreferencefield.val("")
    voucherdescriptionfield.val("")
    // landlordvoucherbranchidfield.val("2")
    voucheradditiondescriptionfield.val("")
    voucheradditionamountfield.val("")
    voucherdeductiondescriptionfield.val("")
    voucherdeductionamountfield.val("")

    $("#voucheradditiontable").empty()
    $("#voucherdeductiontable").empty()
    $("#propertyownerloantable").empty()
    $("#tenantdetailstable").empty()
    ownernamefield.focus()
}

    // add additions to a table in landlord voucher modal
    addadditionbutton.on("click", ()=>{
        const description = voucheradditiondescriptionfield.val()
        const amount = voucheradditionamountfield.val()

        const rowHtml = `
        <tr>
            <td>${description}</td>
            <td>${parseFloat(amount).toFixed(2)}</td>
            <td><button type="button" class="btn btn-danger btn-sm removerow">Remove</button></td>
        </tr>
        `;
        voucheradditiontable.append(rowHtml);

        voucheradditiondescriptionfield.val('');
        voucheradditionamountfield.val('');

        updatetotal("voucheradditiontable", "totaladditions")
    })

    voucheradditiontable.on("click", ".removerow", function(){
        $(this).closest("tr").remove();
        updatetotal("voucheradditiontable", "totaladditions")
    })

    // add deductions to a table in landlord voucher modal
    adddeductionbutton.on("click", () => {
        const description = voucherdeductiondescriptionfield.val();
        const amount = voucherdeductionamountfield.val();
    
        const rowHtml = `
            <tr>
                <td>${description}</td>
                <td>${parseFloat(amount).toFixed(2)}</td>
                <td><button type="button" class="btn btn-danger btn-sm removerow">Remove</button></td>
            </tr>
        `;
        voucherdeductiontable.append(rowHtml);

        voucherdeductiondescriptionfield.val("");
        voucherdeductionamountfield.val("");

        updatetotal("voucherdeductiontable", "totaldeductions")
    });
    
    voucherdeductiontable.on("click", ".removerow", function () {
        $(this).closest("tr").remove();
        updatetotal("voucherdeductiontable", "totaldeductions")
    });
    
    // function to add totals to tables
    function updatetotal(tableid, totalfieldid) {
        let total = 0;
        
        $(`#${tableid} tr`).each(function () {
            const amount = parseFloat($(this).find("td:eq(1)").text());
            if (!isNaN(amount)) {
                total += amount;
            }
        });
    
        $(`#${totalfieldid}`).val(total.toFixed(2));
    }

    // Function to update total for loan amount
    function updateloantotal(tableid, totalfieldid) {
        let totalAmount = 0;

        $(`#${tableid} tr`).each(function () {
            const amount = parseFloat($(this).find(".amount").val());

            if (!isNaN(amount)) totalAmount += amount;
        });

        $(`#${totalfieldid}`).val(totalAmount.toFixed(2));
    }

    // Function to update total for tenant rents
    function updatetenantstotal(tableid, totalfieldid) {
        let total = 0;

        $(`#${tableid} tr`).each(function () {
            const rent = parseFloat($(this).find("td:eq(8)").text());
            if (!isNaN(rent)) {
                total += rent;
            }
        });

        $(`#${totalfieldid}`).val(total.toFixed(2));
        return total;
    }
    
    updatecommissionandtotalpayable()

    // Function to update the commission field
    function updatecommissionandtotalpayable() {
        const totalRent = parseFloat(tenantstotalrentfield.val() || 0);
        const loans = parseFloat(totalloanamountfield.val() || 0);
        const deductions = parseFloat(totaldeductionsfield.val() || 0);
        const additions = parseFloat(totaladditionsfield.val() || 0);

        const commissionPercentage = 10;

        const commission = (totalRent * commissionPercentage) / 100;

        // Calculate total payable
        const totalpayable = totalRent - loans - deductions + additions;

        agencycommissionfield.val(commission.toFixed(2));
        vouchertotalpayablefield.val(totalpayable.toFixed(2));
    }
    
    getlandlordvouchers()

    // Display landlord vouchers in a table
    function getlandlordvouchers() {
        $.getJSON(
          "../controllers/financeoperations.php",
          { 
            getlandlordvouchers: true 

          },
          (data) => {
            let results = "";
      
            if (data && Array.isArray(data) && data.length > 0) {
              i = 0;
              data.forEach((voucher) => {
                results += `<tr data-id="${voucher.id}">`;
                results += `<td>${Number(i + 1)}</td>`;
                results += `<td>${voucher.voucherno}</td>`;
                results += `<td>${voucher.ownername}</td>`;
                results += `<td>${voucher.paymodename}</td>`;
                results += `<td>${voucher.total_amount}</td>`;
                results += `<td>${voucher.commission}</td>`;
                results += `<td>${voucher.addition_amount}</td>`;
                results += `<td>${voucher.deduction_amount}</td>`;
                results += `<td>${voucher.loanamount}</td>`;
                results += `<td>${voucher.totalpayable}</td>`;
                results += `<td>${voucher.status}</td>`;
                results += `<td>${voucher.voucherdate}</td>`;
                results += `<td>${voucher.period}</td>`;
                results += `<td>${voucher.addedbyname}</td>`;

                results += `<td><a class="download"><i class="fal fa-download fa-lg fa-fw"></i></a></td>`;
                results+=`<td><a class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-lg fa-fw"></i></a></td></tr>`

                results += `</tr>`;
                i++
              });
            } else {
              results = `<tr><td colspan="16" class="text-center">No landlord vouchers found</td></tr>`;
            }
      
            landlordvoucherstable.html(results);
            // makedatatable(landlordvoucherstable,results,25);
          }
        );
    }

    // Edit landlord voucher
    landlordvoucherstable.on("click", ".edit", function() {
        const id = $(this).closest("tr").attr("data-id");

        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getlandlordvoucherdetails: true,
                id: id
            },
            (data) => {
                console.log(data)
                data = data[0];

                // Populate fields in the modal
                landlordvoucheridfield.val(data.id);
                ownernamefield.val(data.ownerid);
                paymodefield.val(data.paymode);
                voucherpayeenamefield.val(data.payeename);
                voucherreferencefield.val(data.reference);
                voucherdescriptionfield.val(data.description);
                const period = data.period.split(' ');
                monthfield.val(period[0]);
                yearfield.val(period[1]);
                voucheradditiondescriptionfield.val(data.addition_description);
                voucheradditionamountfield.val(data.addition_amount);
                voucherdeductiondescriptionfield.val(data.deduction_description);
                voucherdeductionamountfield.val(data.deduction_amount);
                banknamefield.val(data.bankname);
                owneraccountnumberfield.val(data.accountnumber);

                landlordvoucheridfield.val(id);
                landlordfinancemodal.modal("show");

                landlordpaymentvouchernotification.html("");

                // Populate additions table
                const additions = JSON.parse(data.additions);
                const additionsTable = $("#voucheradditiontable");
                additionsTable.empty();
                additions.forEach(addition => {
                    additionsTable.append(`
                        <tr>
                            <td>${addition.description}</td>
                            <td>${addition.amount}</td>
                        </tr>
                    `);
                });

                // Populate deductions table
                const deductions = JSON.parse(data.deductions);
                const deductionsTable = $("#voucherdeductiontable");
                deductionsTable.empty();  // Clear existing rows
                deductions.forEach(deduction => {
                    deductionsTable.append(`
                        <tr>
                            <td>${deduction.description}</td>
                            <td>${deduction.amount}</td>
                        </tr>
                    `);
                });

                // Populate loans table (assuming loans data is in the format you expect)
                const loans = JSON.parse(data.loans);  // Assuming loans are saved as JSON
                const loansTable = $("#propertyownerloantable");
                loansTable.find("input[type='checkbox']").prop("checked", false); // Uncheck all first
                loansTable.find("tr").each(function() {
                    const row = $(this);
                    const loanid = row.data("loanid");
                    loans.forEach(loan => {
                        if (loan.loanid === loanid) {
                            row.find("input[type='checkbox']").prop("checked", true);
                        }
                    });
                });

                // Populate tenants table
                const tenants = JSON.parse(data.tenants);  // Assuming tenants data is saved as JSON
                const tenantsTable = $("#tenantdetailstable");
                tenantsTable.empty();  // Clear existing rows
                tenants.forEach(tenant => {
                    tenantsTable.append(`
                        <tr>
                            <td>${tenant.tenantid}</td>
                            <td>${tenant.propertyid}</td>
                            <td>${tenant.unitid}</td>
                            <td>${tenant.amount}</td>
                        </tr>
                    `);
                });

            }
        );
    });

    // Delete landlord voucher
    landlordvoucherstable.on("click", ".delete", function() {
        const parentRow = $(this).closest("tr");
        const id = parentRow.attr("data-id");
        const amount = parentRow.find("td").eq(3).text(); 

        bootbox.confirm({
            title: "Delete Landlord Voucher",
            message: `Are you sure you want to delete the landlord voucher with amount: ${amount}?`,
            buttons: {
                confirm: {
                    label: 'Yes, Delete',
                    className: 'btn-danger btn-sm'
                },
                cancel: {
                    label: 'No, Cancel',
                    className: 'btn-success btn-sm'
                }
            },
            callback: function(result) {
                if (result) {
                    $.post("../controllers/financeoperations.php", {
                        deletelandlordvoucher: true,
                        id: id
                    }, (response) => {
                        if (response === "success") {
                            alert("Landlord Voucher and related records deleted successfully.");
                            getlandlordvouchers();
                        } else {
                            alert("Error deleting landlord voucher.");
                        }
                    });
                }
            }
        });
    });

    // Display landlord voucher report in a new tab and give option to print and download
    landlordvoucherstable.on("click", ".download", function() {
        const id = $(this).closest("tr").attr("data-id");
        const voucherno = $(this).find("td:eq(1)").text();

        $.ajax({
            url: "../controllers/financeoperations.php",
            method: "GET",
            data: {
                printlandlordvoucher: true,
                id: id
            },
            xhrFields: {
                responseType: 'blob'
            },
            success: function(response) {
                if (response instanceof Blob) {
                    const blobURL = URL.createObjectURL(response);
                    
                    // Open the PDF in a new tab
                    window.open(blobURL, '_blank');

                    // Optionally, revoke the object URL after some time (to clean up resources)
                    setTimeout(() => URL.revokeObjectURL(blobURL), 10000); // 10 seconds
                } else {
                    alert("Received data is not a valid PDF file.");
                }
            },
            error: function(xhr, status, error) {
                console.error("Error generating the PDF:", error);
                alert("There was an error generating the PDF.");
            }
        });
    });

    // GL Account mapping
    getglaccountmappings()
    const glaccountmappingfield=$("#glaccountmapping"),
          glaccountchargeableitemsfiled=$("#glaccountchargeableitems"),
          addglaccountitemsbutton =$("#addglaccountitems")

    function getglaccountmappingitems(obj,option='all'){
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglaccountmappingitems:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((accountmapping)=>{
                    results+=`<option value='${accountmapping.id}'>${accountmapping.accountname}</option>`
                })
                obj.html(results)
            }
        )
    }

    function getglaccountmappingchargeableitems(obj,option='all'){
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getglaccountmappingchargeableitems:true
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((items)=>{
                    results+=`<option value='${items.itemid}'>${items.itemname}</option>`
                })
                obj.html(results)
            }
        )
    }

    // populating the field with the records
    getglaccountmappingitems(glaccountmappingfield,'choose')
    getglaccountmappingchargeableitems(glaccountchargeableitemsfiled,'choose')
    const accountmappingnotificationdetails=$("#accountmappingnotificationdetails")

    addglaccountitemsbutton.on("click",()=>{
        const glaccount = glaccountmappingfield.val(),
            glaccountitem = glaccountchargeableitemsfiled.val()
        let errors=""
        if(glaccount==""){
            errors="Plase choose the account you want to map"
            glaccountmappingfield.focus()
        }else if(glaccountitem==""){
            errors="Please choose the item you want to map"
            glaccountchargeableitemsfiled.focus()
        }
        if(errors==""){
            $.post(
                "../controllers/glaccountoperations.php",
                {
                    savemappingaccount:true, 
                    accountid:glaccount,
                    itemid:glaccountitem
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data) 
                        getglaccountmappingitems(glaccountmappingfield,'choose')
                        if(data.status="success"){
                            getglaccountmappings()
                            accountmappingnotificationdetails.html(showAlert("success",`The account has been mapped successfully`))
                            // clear the field
                            glaccountmappingfield.val(""),
                            glaccountchargeableitemsfiled.val("")
                            setTimeout(()=>{
                                accountmappingnotificationdetails.html("")
                            },3000)
                            clearnotificationsdetails(accountmappingnotificationdetails)
                        }else if(data.status="exists"){
                            accountmappingnotificationdetails.html(showAlert("info",`The account has been mapped alreday exists in the system`))
                        }
                    }else{
                        accountmappingnotificationdetails.html(showAlert("danger",`Sorry an error has occured ${data}`))
                    }
                }
            )
        }else{
            accountmappingnotificationdetails.html(showAlert("info",errors))
        }
    })

    function getglaccountmappings(){
        $.getJSON(
            "../controllers/glaccountoperations.php",
            {
                getaccountmapping:true
            },
            (data)=>{
                let results=""
                data.forEach((mappingaccount,i)=>{
                    results+=`<tr data-id ='${mappingaccount.mappingid}'>`
                    results+=`<td> ${Number(i+1)}</td>`
                    results+=`<td> ${mappingaccount.accountname}</td>`
                    results+=`<td> ${mappingaccount.itemname}</td>`
                    results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-outline-danger fa-lg fa-fw text-danger"></i></a></td></tr>`
                })
                // mappedaccountslist.find("tbody").html(results)
                makedatatable(mappedaccountslist,results,25)
            }
        )
    }

    mappedaccountslist.on("click",".delete",function(){
        const mappingid = $(this).closest("tr").attr("data-id")
        // confirmdeletion with bootbox
        bootbox.dialog({
            title: "Delete Mapped account",
            message: `<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete this mapped account</strong>.`,
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
                        $.post(
                            "../controllers/glaccountoperations.php",
                            {
                                deletemappingaccount:true,
                                mappingid
                            },
                            (data)=>{
                                data=data.trim()
                                getglaccountmappings()
                                if(data==="success"){
                                    console.log(data);
                                    
                                    accountmappingnotificationdetails.html(showAlert("success",`Account has been deleted successfully.`))
                                    clearnotificationsdetails(accountmappingnotificationdetails)
                                }else{
                                    accountmappingnotificationdetails.html(showAlert("danger",`Sorry an error occured ${data}`))
                                }
                            }
                        )
                    }
                }
            }
        })
    })


    // financial reports
    const filterreporttypecontrol=$("#filterreporttype"),
        statementledgertypediv=$("#statementledgertypediv"),
        statementledgertypecontrol=$("#statementledgertype"),
        filterreportstartdatefield=$("#filterreportstartdate"),
        filterreportenddatefield=$("#filterreportenddate"),
        generatebutton=$("#generate"),
        statements=$("#statementlist"),
        filternotifications=$("#filternotifications"),
        exportlistbutton=$("#exportlist")


    // setting date picker
    setDatePicker(filterreportstartdatefield)
    setDatePicker(filterreportenddatefield)

    getserverdate().done(()=>{
        const leasefirstdate=getfirstdateofmonth(serverdate),
            leaselastdate=getlastdateofmonth(serverdate) 
            filterreportstartdatefield.val(formatDate(leasefirstdate))
            filterreportenddatefield.val(formatDate(leaselastdate))
    })

    statementledgertypediv.hide()
  
    getglaccounts(statementledgertypecontrol,0,'choose')

    
    filterreporttypecontrol.on("change",function(){
        const statement=$(this).val()
        if(statement=="ledgers"){
            statementledgertypediv.show()
            statements.html("")
        }else if(statement=='trialbalance' || statement=="profitloss" || statement=="balancesheet"){
            statementledgertypediv.hide()
            statements.html("")
        }
    })
     
    // financereportstypefield.on("change", () => {
    //     const reporttype = financereportstypefield.val(),
    //           datefrom = financereportdatefromfield.val(),
    //           dateto = financereportdatetofield.val()
    
    //     // hide all the divs
    //     generalledgerdiv.hide()
    //     trialbalancediv.hide()
    //     profitandlossdiv.hide()
    //     balancesheetdiv.hide()
    //     getcashflowdiv.hide()
    
    //     //reset the reort bodies
    //     generalledgerdiv.html("")
    //     trialbalancediv.html("")
    //     profitandlossdiv.html("")
    //     balancesheetdiv.html("")
    //     getcashflowdiv.html("")

    //     // bind click once
    //     generatefinancialreportbutton.off("click").on("click", () => { 
    //         const accountid = 0
    //         if (reporttype === "generalledger") {
    //             let generalledgerreport = `
    //               <table class="table table-hover table-striped" id="generalledgertable">  
    //                     <thead>
    //                     <tr>
    //                         <th>Date</th>
    //                         <th>Account</th>
    //                         <th>Reference</th>
    //                         <th>Description</th>
    //                         <th>Debit</th>
    //                         <th>Credit</th>
    //                         <th>Balance</th>
    //                     </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    //             `
    //             generalledgerdiv.html(generalledgerreport),

    //             $.getJSON(
    //                 "../controllers/financeoperations.php",
    //                 {
    //                     getglstatement: true,
    //                     startdate:datefrom,
    //                     enddate:dateto,
    //                     accountid
    //                 },
    //                 (data) => {
    //                     let results = ""
    //                     if (data && Array.isArray(data) && data.length > 0) {
    //                         let balance = 0
    //                         data.forEach((entry) => {
    //                             const debit = parseFloat(entry.debit) || 0
    //                             const credit = parseFloat(entry.credit) || 0
    //                             balance += debit - credit
    //                             results += `<tr>`
    //                             results += `<td>${entry.date}</td>`
    //                             results += `<td>${entry.accountname}</td>`
    //                             results += `<td>${entry.reference}</td>`
    //                             results += `<td>${entry.description}</td>`
    //                             results += `<td>${debit.toFixed(2)}</td>`
    //                             results += `<td>${credit.toFixed(2)}</td>`
    //                             results += `<td>${balance.toFixed(2)}</td>`
    //                             results += `</tr>`
    //                         })
    //                     } else {
    //                         results = `<tr><td colspan="7" class="text-center">No entries found for the selected period</td></tr>`
    //                     }
    //                     $("#generalledgertable tbody").html(results)
    //                 }
    //             )
    //             generalledgerdiv.show()
    //         } 
    //         else if (reporttype === "trialbalance") {
                
    //             let trialbalancereport = `
    //                 <table class="table table-hover table-striped" id="trialbalancetable">
    //                     <thead>
    //                         <tr>
    //                             <th>Account</th>
    //                             <th>Debit</th>
    //                             <th>Credit</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    //               `

    //             trialbalancediv.html(trialbalancereport)
    //             $.getJSON(
    //                 "../controllers/financeoperations.php",
    //                 {
    //                     gettrialbalance: true,
    //                     startdate: datefrom,
    //                     enddate: dateto
    //                 },
    //                 (data) => {
    //                     let results = ""
    //                     let totalDebit = 0
    //                     let totalCredit = 0
    //                     if (data && Array.isArray(data) && data.length > 0) {
    //                         data.forEach((entry) => {
    //                             const debit = parseFloat(entry.debit) || 0
    //                             const credit = parseFloat(entry.credit) || 0
    //                             totalDebit += debit
    //                             totalCredit += credit
    //                             results += `<tr>`
    //                             results += `<td>${entry.accountname}</td>`
    //                             results += `<td>${debit.toFixed(2)}</td>`
    //                             results += `<td>${credit.toFixed(2)}</td>`
    //                             results += `</tr>`
    //                         })
    //                         results += `<tr><th>Total</th><th>${totalDebit.toFixed(2)}</th><th>${totalCredit.toFixed(2)}</th></tr>`
    //                     } else {
    //                         results = `<tr><td colspan="3" class="text-center">No entries found for the selected period</td></tr>`
    //                     }
    //                     $("#trialbalancetable tbody").html(results)
    //                 }
    //             )
    //             trialbalancediv.show()
    //         }
    //         else if (reporttype === "profitloss") {  
    //             let profitandlossreport = `
    //                 <table class="table table-hover table-striped" id="profitandlosstable">
    //                     <thead>
    //                         <tr>
    //                             <th>Account</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    //               `
    //             profitandlossdiv.html(profitandlossreport)
    //             $.getJSON(
    //                 "../controllers/financeoperations.php",
    //                 {
    //                     getprofitandlossreport: true,
    //                     startdate: datefrom,
    //                     enddate: dateto
    //                 },
    //                 (data) => {
    //                     let results = ""
    //                     let totalIncome = 0
    //                     let totalExpenses = 0
    //                     if (data && Array.isArray(data) && data.length > 0) {
    //                         data.forEach((entry) => {
    //                             const amount = parseFloat(entry.amount) || 0
    //                             if (entry.type === "Income") {
    //                                 totalIncome += amount
    //                             } else if (entry.type === "Expense") {
    //                                 totalExpenses += amount
    //                             }
    //                             results += `<tr>`
    //                             results += `<td>${entry.accountname}</td>`
    //                             results += `<td>${amount.toFixed(2)}</td>`
    //                             results += `</tr>`
    //                         })
    //                         const netProfit = totalIncome - totalExpenses
    //                         results += `<tr><th>Total Income</th><th>${totalIncome.toFixed(2)}</th></tr>`
    //                         results += `<tr><th>Total Expenses</th><th>${totalExpenses.toFixed(2)}</th></tr>`
    //                         results += `<tr><th>Net Profit</th><th>${netProfit.toFixed(2)}</th></tr>`
    //                     } else {
    //                         results = `<tr><td colspan="2" class="text-center">No entries found for the selected period</td></tr>`
    //                     }
    //                     $("#profitandlosstable tbody").html(results)
    //                 }
    //             )
    //             profitandlossdiv.show()
             
    //         }
    //         else if (reporttype === "balancesheet") {
    //             let balancesheetreport = `
    //                 <table class="table table-hover table-striped" id="balancedsheettable">
    //                     <thead>
    //                         <tr>
    //                             <th>Account</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    //             `
    //             balancesheetdiv.html(balancesheetreport)
    //             $.getJSON(
    //                 "../controllers/financeoperations.php",
    //                 {
    //                     getbalancesheetreport: true,
    //                     startdate: datefrom,
    //                     enddate: dateto
    //                 },
    //                 (data) => {
    //                     let results = ""
    //                     let totalAssets = 0
    //                     let totalLiabilities = 0
    //                     if (data && Array.isArray(data) && data.length > 0) {
    //                         data.forEach((entry) => {
    //                             const amount = parseFloat(entry.amount) || 0
    //                             if (entry.type === "Asset") {
    //                                 totalAssets += amount
    //                             } else if (entry.type === "Liability") {
    //                                 totalLiabilities += amount
    //                             }
    //                             results += `<tr>`
    //                             results += `<td>${entry.accountname}</td>`
    //                             results += `<td>${amount.toFixed(2)}</td>`
    //                             results += `</tr>`
    //                         })
    //                         results += `<tr><th>Total Assets</th><th>${totalAssets.toFixed(2)}</th></tr>`
    //                         results += `<tr><th>Total Liabilities</th><th>${totalLiabilities.toFixed(2)}</th></tr>`
    //                         results += `<tr><th>Equity</th><th>${(totalAssets - totalLiabilities).toFixed(2)}</th></tr>`
    //                     } else {
    //                         results = `<tr><td colspan="2" class="text-center">No entries found for the selected period</td></tr>`
    //                     }
    //                     $("#balancedsheettable tbody").html(results)
    //                 }
    //             )
    //             balancesheetdiv.show()
    //         }else if(reporttype=="cashflow"){
    //            let cashflowreport=`
    //                 <table class="table table-hover table-striped" id="cashflowtable">
    //                     <thead>
    //                         <tr>
    //                             <th>Account</th>
    //                             <th>Amount</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                     </tbody>
    //                 </table>
    //             `
    //             getcashflowdiv.html(cashflowreport)
    //             $.getJSON(
    //                 "../controllers/financeoperations.php",
    //                 {
    //                     getcashflowreport:true,
    //                     startdate:datefrom,
    //                     enddate:dateto
    //                 },
    //                 (data)=>{
    //                     let results=""
    //                     let totalCashIn=0
    //                     let totalCashOut=0
    //                     if(data && Array.isArray(data) && data.length>0){
    //                         data.forEach((entry)=>{
    //                             const amount=parseFloat(entry.amount)||0
    //                             if(entry.type==="Cash In"){
    //                                 totalCashIn+=amount
    //                             }else if(entry.type==="Cash Out"){
    //                                 totalCashOut+=amount
    //                             }
    //                             results+=`<tr>`
    //                             results+=`<td>${entry.accountname}</td>`
    //                             results+=`<td>${amount.toFixed(2)}</td>`
    //                             results+=`</tr>`
    //                         })
    //                         const netCashFlow=totalCashIn-totalCashOut
    //                         results+=`<tr><th>Total Cash In</th><th>${totalCashIn.toFixed(2)}</th></tr>`
    //                         results+=`<tr><th>Total Cash Out</th><th>${totalCashOut.toFixed(2)}</th></tr>`
    //                         results+=`<tr><th>Net Cash Flow</th><th>${netCashFlow.toFixed(2)}</th></tr>`
    //                     }else{
    //                         results=`<tr><td colspan="2" class="text-center">No entries found for the selected period</td></tr>`
    //                     }
    //                     $("#cashflowtable tbody").html(results)
    //                 }
    //             )
    //         }
    //         if(reporttype!=""){
    //             // printfinancialreportsbutton.show()
    //             financialreportsdetails.show()
    //         }
    //     })
    // })
    

    // payment mode
   
    generatebutton.on("click",()=>{
        const reporttype=filterreporttypecontrol.val(),
           reportstartdate=filterreportstartdatefield.val(),
           reportenddate=filterreportenddatefield.val()
        let errors="",
            subreport=0
        // check for blank fields
        if(reportstartdate===""){
            errors="Please select start date"
            filterreportstartdatefield.focus()
        }else if(reportenddate===""){
            errors="Please select end date"
            filterreportenddatefield.focus()
        }

        if(errors==""){               
            if(reporttype=="trialbalance"){
                getTrialBalance(reportstartdate,reportenddate)  
            }else if(reporttype=="ledgers"){
                subreport=statementledgertypecontrol.val()
                let errors =""
                if(subreport ==""){
                    errors ="Please choose the Ledger Type"
                    statementledgertypecontrol.focus()
                    
                }
                if(errors===""){
                    getGLStatement(reportstartdate,reportenddate,subreport)
                    filternotifications.html("")
                }
                else{
                    filternotifications.html(showAlert("info",errors))
                    clearnotificationsdetails(filternotifications)

                }

            }else if(reporttype=="profitloss"){
                getProfitAndLoss(reportstartdate, reportenddate)
            }

        }else{
            filternotifications.html(showAlert("info",errors))
        }
    })


    function getTrialBalance(reportstartdate, reportenddate){
       const dfd = new $.Deferred()

        $.getJSON(
            "../controllers/financeoperations.php",
            {
                gettrialbalance:true,
                startdate:reportstartdate,
                enddate:reportenddate
            },
            function(data){
                var results="<table class='table table-sm table-striped'><thead><th>Account</th><th class='text-right'>Debit</th><th class='text-right'>Credit</th></thead><tbody>"
                for(var i=0;i<data.length;i++){
                    if(data[i].accountname=="TOTAL"){
                        results+="</tbody><tfoot><th>"+data[i].accountname+"</th>"
                        results+="<th class='text-right'>"+$.number(data[i].debit,2)+"</th>"
                        results+="<th  class='text-right'>"+$.number(data[i].credit,2)+"</th></tfoot></table>"
                    }else{
                        results+="<tr><td>"+data[i].accountname+"</td>"
                        parseFloat(data[i].debit)? results+="<td class='text-right'>"+$.number(data[i].debit,2)+"</td>":  results+="<td class='text-right'>&nbsp;</td>"
                        parseFloat(data[i].credit)? results+="<td  class='text-right'>"+$.number(data[i].credit,2)+"</td></tr>":  results+="<td class='text-right'>&nbsp;</td></tr>"
                    }   
                    
                }
                statements.html(results)
                dfd.resolve()
            }
        )
        return dfd.promise()
    }

    function getGLStatement(reportstartdate, reportenddate, accountid){
        const dfd = new $.Deferred()
        var results='', runningbalance=0
        
        $.getJSON(
            "../controllers/financeoperations.php",

                {
                    getglstatement:true,
                    startdate:reportstartdate,
                    enddate:reportenddate,
                    accountid
                },
                function(data){
                    if(data.length==0){
                        results="<p class='alert alert-info'>Sorry, No data matching filter criteria provided.</p>"
                    }else{
                        runningbalance=parseFloat(data[0].openingbalance)
                        results="<table class='table table-sm'><tr>"
                        results+="<td> Account #: <span class='font-weight-bold'>"+data[0].accountcode+"</span></td>"
                        results+="<td class='text-right'> Opening Balance: <span class='font-weight-bold'>"+$.number(data[0].openingbalance,2)+"</span></td></tr>"
                        results+="<tr><td> Account Name: <span class='font-weight-bold'>"+data[0].accountname+"</span></td>"
                        results+="<td class='text-right'> Debits: <span class='font-weight-bold'>"+$.number(data[0].debits,2)+"</span></td></tr>"
                        results+="<tr><td> Account Category: <span class='font-weight-bold'>"+data[0].classname+"</span></td>"
                        results+="<td class='text-right'> Credits: <span class='font-weight-bold'>"+$.number(data[0].credits,2)+"</span></td></tr>"
                        results+="<tr><td>&nbsp;</td>"
                        results+="<td class='text-right'> Closing Balance: <span class='font-weight-bold'>"+$.number(data[0].closingbalance,2)+"</span></td></tr></table>"

                        results+="<table class='table table-striped table-sm'><thead><th>Date</th><th>Reference</th><th>Narrative</th><th>Added By</th><th>Debit</th><th>Credit</th><th>Balance</th><thead>"
                        results+="<tbody>"
                        
                        for(var i=0; i<data.length;i++){
                            runningbalance+=parseFloat(data[i].debit)-parseFloat(data[i].credit)
                            results+="<tr><td>"+data[i].transactiondate+"</td>"
                            results+="<td>"+data[i].referenceno+"</td>"
                            results+="<td>"+data[i].narration+"</td>"
                            results+="<td>"+data[i].addedby+"</td>"
                            results+="<td class='text-right'>"+$.number(data[i].debit,2)+"</td>"
                            results+="<td class='text-right'>"+$.number(data[i].credit,2)+"</td>"
                            results+="<td class='text-right'>"+$.number(runningbalance,2)+"</td></tr>"
                        }

                        results+="</tbody></table>"
                    }
                    statements.html(results)
                    dfd.resolve()
                   //errordiv.html("")
                }
            )
       return dfd.promise()
    }

    function getProfitAndLoss(reportstartdate, reportenddate) {
        const dfd = new $.Deferred();
    
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getprofitandlossreport: true,
                startdate: reportstartdate,
                enddate: reportenddate
            },
            function (data) {
                console.log("Profit & Loss data:", data);
    
                let totalIncome = 0;
                let totalExpenses = 0;
    
                let results = `
                    <table class="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th class="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
    
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(entry => {
                        // Expenses normally in debits, Income in credits
                        let amount = 0;
    
                        if (entry.accountclass === "Expense") {
                            amount = parseFloat(entry.debits) || 0;
                            totalExpenses += amount;
                        } else if (entry.accountclass === "Income") {
                            amount = parseFloat(entry.credits) || parseFloat(entry.debits) || 0;
                            totalIncome += amount;
                        }
    
                        results += `
                            <tr>
                                <td>${entry.accountname}</td>
                                <td class="text-right">${$.number(amount, 2)}</td>
                            </tr>
                        `;
                    });
    
                    const netProfit = totalIncome - totalExpenses;
    
                    results += `
                        </tbody>
                        <tfoot>
                            <tr class="table-success">
                                <th>Total Income</th>
                                <th class="text-right">${$.number(totalIncome, 2)}</th>
                            </tr>
                            <tr class="table-danger">
                                <th>Total Expenses</th>
                                <th class="text-right">${$.number(totalExpenses, 2)}</th>
                            </tr>
                            <tr class="table-info">
                                <th>Net Profit</th>
                                <th class="text-right">${$.number(netProfit, 2)}</th>
                            </tr>
                        </tfoot>
                    </table>`;
                } else {
                    results += `
                        <tr>
                            <td colspan="2" class="text-center text-muted">
                                No entries found for the selected period
                            </td>
                        </tr>
                    </tbody></table>`;
                }
    
                $("#statementlist").html(results);
    
                dfd.resolve();
            }
        );
    
        return dfd.promise();
    }

    // export to excel
    exportlistbutton.on("click",()=>{
        const reporttype=filterreporttypecontrol.val()
        let tableid="statementlist",
            sheetname="Financial Report",
            documentname="Financial Report"
        if(reporttype=="trialbalance"){
            sheetname="Trial Balance"
            documentname="Trial Balance Report"
        }else if(reporttype=="ledgers"){
            sheetname="General Ledger"
            documentname="General Ledger Report"
        }else if(reporttype=="profitloss"){
            sheetname="Profit and Loss"
            documentname="Profit and Loss Report"
        }
        exporttable(tableid,sheetname,documentname)
    })
    
    
    
    
    const paymentmodenotificationsdetails=$("#paymentmodenotificationsdetails"),
        paymentmodetable=$("#paymentmodetable"),
        addpaymentmodebutton=$("#addpaymentmodebutton"),
        paymodemodal=$("#paymodemodal"),
        paymentmodeidfield=$("#paymentmodeid"),
        paymentmodenamefield=$("#paymentmodename"),
        requirereffield=$("#requireref"),
        paymentmodeaccountfield=$("#paymentmodeaccount"),
        savepaymentmodebutton=$("#savepaymentmode"),
        paymentmodenotifications=$("#paymentmodenotifications")

    // show up the modal
    addpaymentmodebutton.on("click",()=>{
        paymodemodal.modal("show")
    })
  
    requirereffield.prop("checked",true)

    getpaymentmodesaccounts(paymentmodeaccountfield,'Choose')

    // getting the gla account for cash only
    function getpaymentmodesaccounts(obj,option='all'){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getpaymentmodesaccounts:true
            },
            (data)=>{
                
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((paymentmode)=>{
                    results+=`<option value='${paymentmode.id}'>${paymentmode.accountname}</option>`
                })
                obj.html(results)
            }
        )
    }

    // form validataion
    savepaymentmodebutton.on("click",()=>{
        const paymentmodeid =paymentmodeidfield.val(),
              modename=paymentmodenamefield.val(),
              requireference=requirereffield.prop("checked") ? 1 : 0,
              accountid= paymentmodeaccountfield.val()

        let errors =""
        if(modename==""){
            errors="Please input the payment mode name"
            paymentmodenamefield.focus()
        }else if(accountid==""){
            errors="Please choose the account"
            paymentmodeaccountfield.focus()
        }
        if(errors===""){
            $.post(
                "../controllers/financeoperations.php",
                {
                    savepaymentmode:true,
                    paymentmodeid,
                    modename,
                    requiref:requireference,
                    accountid
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            getpaymentmode()
                            if(paymentmodeid==0){
                                paymentmodenotifications.html(showAlert("success",`Payment <strong>${modename}</strong> has been saved successfully`))
                            }else{
                                paymentmodenotifications.html(showAlert("success",`Payment <strong>${modename}</strong> has been edited and saved successfully`))
                            }
                            
                            clearpaymentmodefields()

                            // hide the modal and clear notifications
                            timeawaits(paymodemodal, paymentmodenotifications)
                        }else if(data.status=="exists"){
                            paymentmodenotifications.html(showAlert("info",`Payment ${modename} Already exists in the system`))
                        }
                    }else{
                        paymentmodenotifications.html(showAlert("danger",errors, data.message))
                    }
                }
            )
                   
        }else{
            paymentmodenotifications.html(showAlert("info",errors))
        }
    })

    function clearpaymentmodefields(){
        paymentmodeidfield.val(0),
        paymentmodenamefield.val(""),
        requirereffield.prop("checked",true),
        paymentmodeaccountfield.val("")
    }

    getpaymentmode()

    function getpaymentmode(){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getpaymentmodes:true
            },
            (data)=>{
                let results =""
                data.forEach((paymentmodes,i)=>{
                    results +=`<tr data-id= '${paymentmodes.paymentmodeid}'>`
                    results +=`<td>${Number(i + 1)}</td>`
                    results +=`<td>${paymentmodes.paymentmodename}</td>`
                    results+=`<td>${paymentmodes.requiresref == 1 ? "<i class='fas fa-check-circle fa-lg fa-fw text-success'></i>":"<i class='fas fa-times-circle fa-lg fa-fw text-danger'></i>"}</td>`
                    results +=`<td>${paymentmodes.accountname}</td>`
                    results+=`<td><a class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td>`
                    results+= `</tr>`
                })
                paymentmodetable.find("tbody").html(results)
            }
        )
    }

    paymentmodetable.on("click",".edit",function(){
        const paymentmodeid = $(this).closest("tr").attr("data-id")
        
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getpaymentmodedetails:true,
                paymentmodeid
            },
            (data)=>{
                data=data[0]
                paymentmodeidfield.val(data.paymentmodeid),
                paymentmodenamefield.val(data.paymentmodename),
                requirereffield.val(data.requiresref)?1 : val(data.requiresref),
                paymentmodeaccountfield.val(data.account)
                // show the modal
                paymodemodal.modal("show")
            }
        )
        
    })

    paymentmodetable.on("click",".delete",function(){
        const parent = $(this).closest("tr"),
        paymentmodeid = parent.attr("data-id"),
        paymentmodename = parent.find("td").eq(1).text().trim()
    
        // confirm deletion with bootbox
        bootbox.dialog({
            title: "Delete Paymode",
            message:`<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete payment mode <strong>${paymentmodename}</strong>.`,
            buttons: {
              success: {
                  label: "No, Keep",
                  className: "btn-success btn-sm",
                  callback: function() {
                      $('.bootbox').modal('hide')
                  }
              },
              danger: {
                  label: "Yes, Delete",
                  className: "btn-danger btn-sm",
                  callback: function() {
                    paymentmodenotificationsdetails.html(showAlert("processing","Processing. Please wait ...",1))
                    $.post(
                        "../controllers/financeoperations.php",
                        {
                            deletepaymentmode:true,
                            paymentmodeid
                        },
                        (data)=>{
                            data = data.trim()
                            if(data=="success"){  
                                paymentmodenotificationsdetails.html(showAlert("success",`Payment ${paymentmodename} was deleted successfully`)) 
                                getpaymentmode()
                                clearnotificationsdetails(paymentmodenotificationsdetails)
                            }else{
                                paymentmodenotificationsdetails.html(showAlert("danger",`Sorry an error has occurred ${data}`))
                            }
                        }
                    )
                  }
              }
            }
        }) 
    })

    // cash book
    const sourceaccountfield=$("#sourceaccount"),
        destinationaccountrfield=$("#destinationaccount"),
        cberrordiv=$("#cberrors"),
        transferfundsbutton=$("#transferfunds"),
        cbreferencefield=$("#cbreference"),
        cbamountfield=$("#cbamount"),
        inputfields=$("input"),
        selectfields=$("select"),
        cashbookdatefield=$("#cashbookdate")

    getCashbookAccounts(sourceaccountfield,'choose')
    getCashbookAccounts(destinationaccountrfield,'choose')
    setDatePicker(cashbookdatefield)
    getserverdate().done(()=>{
        cashbookdatefield.val(formatDate(serverdate))
    })
    transferfundsbutton.on("click",function(){
        const sourceaccount=sourceaccountfield.val(),
            sourceaccountname=sourceaccountfield.children(":selected").text(),
            destinationaccount=destinationaccountrfield.val(),
            destinationaccountname=destinationaccountrfield.children(":selected").text()
            cbreference=cbreferencefield.val(),
            cbamount=cbamountfield.val(),
            cberrors="",
            journalentries=[],
            journaldescription="Funds transferred from "+sourceaccountname+" to "+destinationaccountname
            journalentries.push({"glaccount":sourceaccount,"glcontra":destinationaccount,"narration":"Funds transferred to "+destinationaccountname,"debit":0,"credit":cbamount})
            journalentries.push({"glaccount":destinationaccount,"glcontra":sourceaccount,"narration":"Funds transferred from "+sourceaccountname ,"debit":cbamount,"credit":0}),
            cashbookdate=cashbookdatefield.val()
                
            // check for blank fields
        if(sourceaccount==""){
            cberrors="Please select source account"
            sourceaccountfield.focus()
        }else if(destinationaccount==""){
            cberrors="Please select destination account"
            destinationaccountrfield.focus()
        }else if(cbreference==""){
            cberrors="Please provide transaction reference number"
            referencefield.focus()
        }else if(cbamount=="" || cbamount==0){
            cberrors="Please provide amount to be transferred"
            amountfield.focus()
        }else if(sourceaccount==destinationaccount){
            cberrors="Source and Destination accounts cannot be the same"
        }

        if(cberrors==""){
            // save the transfer
            cberrordiv.html("")
            // generate data into array
            journalentries=JSON.stringify(journalentries)
            //var TableData=JSON.stringify(tabledata),
                url="../controllers/financeoperations.php"
                $.post(
                    url,
                    {
                        savejournaltransaction2:true,
                        referenceno:cbreference,
                        description:journaldescription,
                        journalentries:journalentries,
                        cashbookdate
                    },
                    function(data){
                        str=$.trim(data.toString())
                        if(str=="success"){
                            cberrors="<p class='alert alert-success'><i class='fas fa-check-circle fa-lg fa-fw'></i></span> Funds transfer from <strong>"+sourceaccountname+"</strong> to <strong>"+destinationaccountname+"</strong> successful.</p>"
                            cberrordiv.html(cberrors)
                            // clear form
                            clearForm()
                            clearcashbookfields()

                            setTimeout(()=>{
                                cberrordiv.html("")
                            })
                        }else{
                            cberrors="<p  class='alert alert-danger'><i class='fas fa-times-circle fa-lg fa-fw'></i></span> "+str+"</p>"
                            cberrordiv.html(cberrors)
                        }
                    }
                )
        }else{
            cberrors="<p class='alert alert-info'><i class='fas fa-info-circle fa-lg fa-fw'></i></span> "+cberrors+"</p>"
            cberrordiv.html(cberrors)
        }
    })

    function clearcashbookfields(){
        sourceaccountfield.val(""),
        destinationaccountrfield.val(""),
        cbreferencefield.val(""),
        cbamountfield.val(""),
        setDatePicker(cashbookdatefield)
        // clear notifications
        clearnotificationsdetails(cberrordiv)
    }   
    
    const financialyear=$("#fy")
    const currentYear = new Date().getFullYear()
    financialyear.text(currentYear)  
    
    // other transactions
    const addnewotherreceiptbutton=$("#addnewotherreceipt"),
        otherreceiptstable=$("#otherreceiptstable"),
        otherreceiptnotificationsdetails=$("#otherreceiptnotificationsdetails"),
        othertransactionmodal=$("#othertransactionmodal"),
        othertransactionnotification=$("#othertransactionnotification"),
        othertransactionidfield=$("#othertransactionid"),
        saveothertransactionsbutton=$("#saveothertransactions"),
        closeothertransactionmodalbutton=$("#closeothertransactionmodal"),

        // staffs
        othertransactionstaffloantable=$("#othertransactionstaffloantable"),
        totalstafftransactionsection=$("#totalstafftransaction"),
        othertransactionstaffs=$("#othertransactionstaffs"),

        // landlord
        othertransactionlandlordloantable=$("#othertransactionlandlordloantable"),
        othertransactionlandlord=$("#othertransactionlandlord"),
        totallandlordtransactionsection=$("#totallandlordtransaction"),
        // otherreciedfromfield=$("#otherreciedfrom"),

        // common fields
        transactiontypefield=$("#transactiontype"),
        recievedfromfield=$("#recievedfrom"),
        otherreceivedfromfield=$("#otherreceivedfrom"),
        itemsoldfield=$("#itemsold"),
        otherpaymentmodefield=$("#otherpaymentmode"),
        paymentmodereferencefield=$("#paymentmodereference"),
        receiptdatefield=$("#receiptdate"),
        othersaccountcreditedfield=$("#othersaccountcredited"),
        otherssubaccountfield=$("#otherssubaccount"),
        otherscurrencyfield=$("#otherscurrency"),
        otherreceiptdescriptionfield=$("#otherreceiptdescription"),
        otherreceiptamountfield=$("#otherreceiptamount"),
        loanamountfield=$("#loanamount"),
        exportotherreceiptsbutton=$("#exportotherreceipts")


    // settind date picker
    setDatePicker(receiptdatefield)
    getserverdate().done(()=>{
        receiptdatefield.val(formatDate(serverdate))
    }),

    // show the modal
    addnewotherreceiptbutton.on("click",()=>{
        othertransactionmodal.modal("show")
    })

    getglaccounts(othersaccountcreditedfield,0,'choose')
    getglsubaccountsothers(otherssubaccountfield,'choose')
    getpaymentmethods(otherpaymentmodefield,'choose')
    getcurrency(otherscurrencyfield,'choose')

    // getstaffs(othertransactionstaffs,'choose')

    function getglsubaccountsothers(obj,option='All'){
        const accountid = 0
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getglsubaccounts:true,
                accountid
            },
            (data)=>{
                
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((subaccount)=>{
                    results+=`<option value='${subaccount.id}'>${subaccount.accountname}</option>`
                })
                obj.html(results)
            }
        )
        
    }
    // hide and show the fields

    // initial state
    otherreceivedfromfield.hide()
    recievedfromfield.show().prop("disabled", false)
    loanamountfield.prop("disabled",true)

    transactiontypefield.on("change", function () {
        const transactiontype = $(this).val()

        if (transactiontype === "landlords") {
            othertransactionlandlord.show()
            othertransactionstaffs.hide()
            recievedfromfield.prop("disabled", false).show()
            otherreceivedfromfield.hide().val("")
            getlandlords(transactiontype,recievedfromfield,'choose')
            loanamountfield.prop("disabled",false)
        } 
        else if (transactiontype === "staffs") {
            othertransactionstaffs.show()
            othertransactionlandlord.hide()
            recievedfromfield.prop("disabled", false).show()
            otherreceivedfromfield.hide().val("")
            getstaffs(transactiontype,recievedfromfield,'choose')
            loanamountfield.prop("disabled",false)
        }
        else if (transactiontype === "others") {
            othertransactionlandlord.hide()
            othertransactionstaffs.hide()
            recievedfromfield.prop("disabled", true).hide()
            otherreceivedfromfield.show().focus()
            loanamountfield.prop("disabled",true)
        }
        else if( transactiontype === "tenants") {
            othertransactionlandlord.hide()
            othertransactionstaffs.hide()
            recievedfromfield.prop("disabled", false).show()
            otherreceivedfromfield.hide().val("")
            gettenants(transactiontype,recievedfromfield,'choose')
            loanamountfield.prop("disabled",true)
        }
        else if( transactiontype === "creditors") {
            othertransactionlandlord.hide()
            othertransactionstaffs.hide()
            recievedfromfield.prop("disabled", false).show()
            otherreceivedfromfield.hide().val("")
            getcreditors(transactiontype,recievedfromfield,'choose')
            loanamountfield.prop("disabled",true)
        }
    })

    function getlandlords(transactiontype,obj,option='all'){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getothertransactiondetails:true,
                transactiontype
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((landlord)=>{
                    results+=`<option value='${landlord.ownerid}'>${landlord.name}</option>`
                })
                obj.html(results)
            }
        ) 
    }

    function gettenants(transactiontype,obj,option='all'){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getothertransactiondetails:true,
                transactiontype
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((tenant)=>{
                    results+=`<option value='${tenant.tenantid}'>${tenant.tenantname}</option>`
                })
                obj.html(results)
            }
        ) 
    }

    function getstaffs(transactiontype,obj,option='all'){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getothertransactiondetails:true,
                transactiontype
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((employee)=>{
                    results+=`<option value='${employee.employeeid}'>${employee.employeename}</option>`
                })
                obj.html(results)
            }
        ) 
    }

    function getcreditors(transactiontype,obj,option='all'){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getothertransactiondetails:true,
                transactiontype
            },
            (data)=>{
                let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
                data.forEach((supplier)=>{
                    results+=`<option value='${supplier.supplierid}'>${supplier.suppliername}</option>`
                })
                obj.html(results)
            }
        ) 
    }

    // save other transaction

    saveothertransactionsbutton.on("click",()=>{
        const othertransactionid=othertransactionidfield.val(),
            transactiontype=transactiontypefield.val(),
            recievedfrom=recievedfromfield.val(),
            otherreceiptdescription=otherreceiptdescriptionfield.val(),
            otherreceivedfrom=otherreceivedfromfield.val(),
            // itemsold=itemsoldfield.val(),
            paymentmode=otherpaymentmodefield.val(),
            paymentreference=paymentmodereferencefield.val(),
            receiptdate=receiptdatefield.val(),
            accountcredited=othersaccountcreditedfield.val(),
            subaccount=otherssubaccountfield.val(),
            currency=otherscurrencyfield.val(),
            amount=otherreceiptamountfield.val(),
            loanamount = loanamountfield.val()

        let errors=""
        if(transactiontype==""){
            errors="Please choose the transaction type"
            transactiontypefield.focus()
        }else if(transactiontype!="others" && recievedfrom==""){
            errors="Please choose who the money was received from"
            recievedfromfield.focus()
        }else if(otherreceiptdescription==""){
            errors="Please input description of the receipt"
            otherreceiptdescriptionfield.focus()
        }else if(paymentreference==""){
            errors="Please input payment reference"
            paymentmodereferencefield.focus()
        }
        else if(transactiontype=="others" && otherreceivedfrom==""){
            errors="Please input who the money was received from"
            otherreceivedfromfield.focus()
        }
        // else if(itemsold==""){
        //     errors="Please input details of items sold"
        //     itemsoldfield.focus()
        // }
        else if(paymentmode==""){
            errors="Please choose payment mode"
            otherpaymentmodefield.focus()
        }
        else if(currency==""){
            errors="Please choose currency"
            otherscurrencyfield.focus()
        }
        else if(amount ==""){
            errors="Please insert the amount"
            otherreceiptamountfield.focus()
        }
        else if(accountcredited==""){
            errors="Please choose account credited"
            othersaccountcreditedfield.focus()
        }

        if(errors==""){
            othertransactionnotification.html("")
            // save the transaction
            $.post(
                "../controllers/financeoperations.php",
                {
                    saveothertransaction:true,
                    transactionid:othertransactionid,
                    transactiontype:transactiontype,
                    description: otherreceiptdescription,
                    reference:paymentreference,
                    transactiondate: receiptdate,
                    paymentmodeid:paymentmode,
                    currencyid:currency,
                    amount:amount,
                    loanamount:loanamount,
                    accountcreditedid: accountcredited,
                    subaccountid: subaccount,
                },
                (data)=>{
                    data=$.trim(data)
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            getothertransactions()
                            if(othertransactionid==0){
                                othertransactionnotification.html(showAlert("success",`Other Receipt Transaction has been saved successfully`))

                                clearothertransactionfields()
                                // hide the modal and clear
                                timeawaits(othertransactionmodal, othertransactionnotification)
                            }else{
                                othertransactionnotification.html(showAlert("success",`Other Receipt Transaction has been edited and saved successfully`))
                            }
                             
                        }
                    }else{
                        othertransactionnotification.html(showAlert("danger", data))
                    }
                }
            )
        }else{
            othertransactionnotification.html(showAlert("info",errors))
        }
    })

    function clearothertransactionfields(){
        othertransactionidfield.val(0),
        transactiontypefield.val(""),
        recievedfromfield.val(""),
        otherreceivedfromfield.val(""),
        itemsoldfield.val(""),
        otherpaymentmodefield.val(""),
        paymentmodereferencefield.val(""),
        setDatePicker(receiptdatefield)
        getserverdate().done(()=>{
            receiptdatefield.val(formatDate(serverdate))
        }),
        othersaccountcreditedfield.val(""),
        otherssubaccountfield.val(""),
        otherscurrencyfield.val("")
        // clear notifications
        clearnotificationsdetails(othertransactionnotification)
    }

    getothertransactions()

    function getothertransactions(){
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getothertransactions:true
            },
            (data)=>{
                let results=""
                let totalstafftransactions=0
                let totallandlordtransactions=0
                data.forEach((othertransaction,i)=>{
                    results +=`<tr data-id= '${othertransaction.transactionid}'>`
                    results +=`<td>${Number(i + 1)}</td>`
                    results +=`<td>${othertransaction.othertransactiono}</td>`
                    results +=`<td>${othertransaction.transactiontype.charAt(0).toUpperCase() + othertransaction.transactiontype.slice(1)}</td>` 
                    results +=`<td>${othertransaction.paymentmodename}</td>`
                    results +=`<td>${othertransaction.reference}</td>`
                    results +=`<td>${formatDate(othertransaction.transactiondate)}</td>`
                    results +=`<td>${othertransaction.addedby}</td>`
                    // results +=`<td class='text-right'>${$.number(othertransaction.amount,2)}</td>`
                    results+=`<td><a class="edit"><i class="fal fa-edit fa-lg fa-fw"></i></a></td>`
                    results+=`<td><a class="delete"><i class="fal fa-trash-alt fa-lg fa-fw text-danger"></i></a></td>`
                    results+= `</tr>`

                    if(othertransaction.transactiontype=="staffs"){
                        totalstafftransactions+=parseFloat(othertransaction.amount)
                    }else if(othertransaction.transactiontype=="landlords"){
                        totallandlordtransactions+=parseFloat(othertransaction.amount)
                    }
                })
                otherreceiptstable.find("tbody").html(results)
                totalstafftransactionsection.text($.number(totalstafftransactions,2))
                totallandlordtransactionsection.text($.number(totallandlordtransactions,2))
            }
        )
    }

    // export other receipts
    exportotherreceiptsbutton.on("click",()=>{
        let tableid="otherreceiptstable",
            sheetname="Other Receipts",
            documentname="Other Receipts"
            othertransactionnotification.html(showAlert("success","Other Reciepts has been exported successfully"))
        exporttable(tableid,sheetname,documentname)
        clearnotificationsdetails(othertransactionnotification)
    })

    // edit other transaction
    otherreceiptstable.on("click",".edit",function(){
        const othertransactionid = $(this).closest("tr").attr("data-id")
        console.log(othertransactionid);
        
        
        $.getJSON(
            "../controllers/financeoperations.php",
            {
                getotherfinancetransactionothersdetails:true,
                transactionid:othertransactionid
            },
            (data)=>{
                data=data[0]
                othertransactionidfield.val(data.transactionid),
                transactiontypefield.val(data.transactiontype).trigger('change'),
                // recievedfrom=recievedfromfield.val(),
                otherreceiptdescriptionfield.val(data.description),
               
                otherpaymentmodefield.val(data.paymodeid),
                paymentmodereferencefield.val(data.reference),
                othersaccountcreditedfield.val(data.acountcreditedid),
                otherssubaccountfield.val(data.subaccountid),
                otherscurrencyfield.val(data.currencyid),
                otherreceiptamountfield.val(data.amount),
                loanamountfield.val(data.loanamount)
                // show the modal
                othertransactionmodal.modal("show")
            }
        )
        
    })

    // delete other transaction
    otherreceiptstable.on("click",".delete",function(){
        const parent = $(this).closest("tr"),
        othertransactionid = parent.attr("data-id")
        // itemsold = parent.find("td").eq(3).text().trim()
    
        // confirm deletion with bootbox
        bootbox.dialog({
            title: "Delete Other Receipt Transaction",
            message:`<i class='fal fa-question-circle fa-2x fa-fw text-primary'></i> Are you sure you want to delete Other Receipt transaction`,
            buttons: {
              success: {
                  label: "No, Keep",
                  className: "btn-success btn-sm",
                  callback: function() {
                      $('.bootbox').modal('hide')
                  }
              },
              danger: {
                  label: "Yes, Delete",
                  className: "btn-danger btn-sm",
                  callback: function() {
                    otherreceiptnotificationsdetails.html(showAlert("processing","Processing. Please wait ...",1))
                    $.post(
                        "../controllers/financeoperations.php",
                        {
                            deleteothertransaction:true,
                            transactionid:othertransactionid
                        },
                        (data)=>{
                            data = data.trim()
                            if(data=="success"){  
                                otherreceiptnotificationsdetails.html(showAlert("success",`Other Receipt Transaction was deleted successfully`)) 
                                getothertransactions()
                                clearnotificationsdetails(otherreceiptnotificationsdetails)
                            }else{
                                otherreceiptnotificationsdetails.html(showAlert("danger",`Sorry an error has occurred ${data}`))
                            }
                        }
                    )
                  }
              }
            }
        })
    })


})