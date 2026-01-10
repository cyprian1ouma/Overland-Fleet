$(document).ready(function(){
    const currentmenu=$("#settings")
    setactivemenu(currentmenu)
    getloggedinuser()

    $(document).ready(function(){
        const currentmenu=$("#settings")
        setactivemenu(currentmenu)
        getloggedinuser()
    
        function gotoinstitutionnotifications(){
            $('html, body').animate({
                scrollTop: ($(institutiondetailnotification).offset().top-300)
              }, 500)
        }
    
        const emailaddressfield=$("#senderemail"),
            emailpasswordfield=$("#password"),
            smtpserverfield=$("#smtp"),
            smtpportfield=$("#smtpport"),
            sslfield=$("#usessl"),
            smsclientidfield=$("#smsclientid"),
            urlfield=$("#smsurl"),
            senderidfield=$("#smssenderid"),
            apikeyfield=$("#smsapikey"),
            saveemailparametersbutton=$("#saveemail"),
            savesmsparametersbutton=$("#savesms"),
            emailerrordiv=$("#emailerrors"),
            smserrodiv=$("#smserrors"),
            sendtestemailbutton=$("#sendtestemail"),
            sendtestsmsbutton=$("#sendtestmessage"),
            emailrecipientfield=$("#testemailaddress"),
            emailmessagefield=$("#testemailmessage"),
            emailsubjectfield=$("#testemailsubject"),
            testemailerrordiv=$("#testmailerrors"),
            testsmserrordiv=$("#testsmserrors"),
            smsrecipientfield=$("#testsmsrecipient"),
            smsmessagefield=$("#testsmsmessage"),
            inputfield=$("input"),
            selectfield=$("select"),
    
            consumerkeyfield=$("#consumerkey"),
            consumersecretfield=$("#consumersecret"),
            validationurlfield=$("#validationurl"),
            confirmationurlfield=$("#confirmationurl"),
            paybillnofield=$("#paybillnumber"),
            savempesabutton=$("#savempesa"),
            mpesaerrors=$("#mpesaerrors"),
            mpesaerrors2=$("#mpesaerrors2"),
            
            mpesac2burl=$("#c2burl"),
            mpesac2bshortcode=$("#c2bshortcode"),
            mpesac2bmsisdn=$("#c2bmsisdn"),
            mpesac2breference=$("#c2breference"),
            mpesac2bamount=$("#c2bamount"),
            mpesac2bsimulatetransaction=$("#simulate2cbtransactionbutton"),
            simulatec2berror=$("#simulatec2berrors"),
            savempesaconfigurationbutton=$("#savempesa"),
    
            loandetailsmodal=$("#loandetailsmodal"),
            addloanbbutton=$("#addnewloan"),
            loaninterestratefield=$("#interestmethod"),
    
            companydetailsmodal=$("#companydetailsmodal"),
            addcompanybutton=$("#addnewcompany"),
            companyerrors=$("#companyerrors"),
            companyidfield=$("#companyid"),
            companynamefield=$("#companyname"),
            companycodefield=$("#companycode"),
            membernoprefixfield=$("#membernoprefix"),
            currentmembernofield=$("#currentmembernumber"),
            allowcheckofffield=$("#companyallowcheckoff"),
            savecompanydetails=$("#savecompany"),
            companylist=$("#companylist"),
            clearcompanyfieldbutton=$("#clearcompanydetails"),
            companynotifications=$("#companynotifications"),
    
            loanidfield=$("#loantypeid"),
            loancodefield=$("#loancode"),
            loannamefield=$("#loanname"),
            interestmethodfield=$("#interestmethod"),
            interestratefield=$("#interestrate"),
            maxamountfield=$("#maxamount"),
            minamountfield=$("#minamount"),
            loanallocheckofffield=$("#allowcheckoff"),
            loanautoprocessfield=$("#autoprocessloan"),
            loannumberprefixfield=$("#loannoprefix"),
            loancurrentnumberfield=$("#loancurrentno"),
            saveloantypebutton=$("#saveloantype"),
            loanerrors=$("#loanerrors"),
            clearloantypefields=$("#clearloantype"),
            loanslist=$("#loanslist"),
            loannotifications=$("#loannotifications"),
            loantypemaxrunningloanscontrol=$("#loantypemaxrunningloans"),
    
            countriesmodal=$("#countrydetailsmodal"),
            addnewcountrybutton=$("#addnewcountry"),
            countryidfield=$("#countryid"),
            countrycodefield=$("#countrycode"),
            countrynamefield=$("#countryname"),
            diallingcodefield=$("#diallingcode"),
            defaultcountryfield=$("#defaultcountry"),
            savecountrybutton=$("#savecountry"),
            countryerrors=$("#countryerrors"),
            countrylist=$("#countrylist"),
            countrynotifications=$("#countrynotification"),
            clearcountrybutton=$("#clearcountry"),
    
            iddocumentmodal=$("#iddocumentmodal"),
            documentidfield=$("#iddocumentid"),
            documentnamefield=$("#iddocumentname"),
            saveiddocumentbutton=$("#saveiddocument"),
            iddocumentexpiresfield=$("#iddocumentexpires"),
            cleariddocumentbutton=$("#cleariddocument"),
            iddocumenterrors=$("#iddocumenterrors"),
            idoducumentnotifications=$("#iddocumentnotification"),
            addnewiddocumentbutton=$("#addnewiddocument"),
            iddoccumentlist=$("#iddocumentlist"),
    
            relationshipmodal=$("#relationshipmodal"),
            addrelationshipbutton=$("#addrelationship"),
            saverelationshipbutton=$("#saverelationship"),
            clearrelationshipbutton=$("#clearrelationship"),
            relationshipnamefield=$("#relationshipname"),
            relationshipidfield=$("#relationshipid"),
            relationshiperrors=$("#relationshiperrors"),
            relationshipnotifications=$("#relationshipnotifications"),
            relationshiplist=$("#relationshiplist"),
    
            loantypechargedetails=$("#loantypechargedetails")
        
        // getloaninterestpaymentmethod(loaninterestratefield,'choose')
    
        addrelationshipbutton.on("click",()=>{
            relationshipmodal.modal("show")
        })
        
        addnewiddocumentbutton.on("click",()=>{
            iddocumentmodal.modal("show")
            idoducumentnotifications.html("")
            iddocumenterrors.html("") 
            cleariddocumentfields()
            documentnamefield.focus()
        })
    
        addnewcountrybutton.on("click",()=>{
            countrynotifications.html("")
            countryerrors.html("")
            clearcountryfields()
            countriesmodal.modal("show")
        })
    
        addloanbbutton.on("click",()=>{
            loandetailsmodal.modal("show")
            loannotifications.html("")
            loanerrors.html("")
            clearloanfields()
            loancodefield.focus()
        })
        
        addcompanybutton.on("click",()=>{
            clearcompanyfields()
            companyerrors.html("")
            companynotifications.html("")
            companydetailsmodal.modal("show")
            companycodefield.focus()
        })
    
        clearcountrybutton.on("click",()=>{
            clearcountryfields()
        })
    
        clearcompanyfieldbutton.on("click",()=>{
            // confirm clear fields
            clearcompanyfields()
            companycodefield.focus()
        })
    
        clearloantypefields.on("click",()=>{
            clearloanfields()
            loanerrors.html("")
            loannotifications.html("")
            loancodefield.focus()
        })
    
        saverelationshipbutton.on("click",()=>{
            const relationshipid=relationshipidfield.val()
            const relationshipname=relationshipnamefield.val()
    
            let errors="", notification=""
    
            if(relationshipname==""){
                errors="Please provide relationship name"
                relationshipnamefield.focus()
                relationshiperrors.html(showAlert("info",errors))
            }else{
                relationshiperrors.html(showAlert("processing","Processing. Please wait ..."))
                $.post(
                    "../controllers/relationshipoperations.php",
                    {
                        saverelationship:true,
                        relationshipid,
                        relationshipname
                    },
                    (data)=>{
                        if(data=="success"){
                            notification="The relationship has been saved successfully"
                            relationshiperrors.html(showAlert("success",notification))
                            // refresh the relationship list
                            getrelationships()
                        }else if(data=="exists"){
                            notification="Relationship name already exists in the system"
                            relationshiperrors.html(showAlert("info",notification))
                        }else{
                            notification=`Sorry an error occured ${data}`
                            relationshiperrors.html(showAlert("danger",notification))
                        }
                    }
                )
                    
            }
        })
    
        saveiddocumentbutton.on("click",()=>{
            const documentid=documentidfield.val()
            const documentname=documentnamefield.val()
            const expires=iddocumentexpiresfield.prop("checked")?1:0
            let errors="",
                notification=""
            if(documentname==""){
                errors="Please provide document name"
            }
    
            if(errors==""){
                $.post(
                    "../controllers/iddocumentoperations.php",
                    {
                        saveiddocument:true,
                        documentid,
                        documentname,
                        expires
                    },
                    (data)=>{
                        if(data=="success"){
                            notification="The document has been saved successfully"
                            iddocumenterrors.html(showAlert("success",notification))
                            // get existing documents
                            getiddocuments()
                        }else if(data=="exists"){
                            notification="The document already exists"
                            iddocumenterrors.html(showAlert("info",notification))
                        }else{
                            notification=`Sorry an error occured ${data}`
                            iddocumenterrors.html(showAlert("danger",notification))
                        }
                    }
                )
            }else{
                iddocumenterrors.html(showAlert("info",errors))
            }
        })
        
        savecountrybutton.on("click",()=>{
            const countryid=countryidfield.val(),
                    countrycode=countrycodefield.val(),
                    countryname=countrynamefield.val(),
                    diallingcode=diallingcodefield.val(),
                    defaultcountry=defaultcountryfield.val()
            let errors="",
                notification=""
            
            if(countrycode==""){
                errors="Please provide country code"
            }else if(countryname==""){
                errors="Please provide country name"
            }else if(diallingcode==""){
                errors="Please provide country dialling code"
            }else if(defaultcountry==""){
                errors="Please select whether this is the default country"
            }
    
            if(errors==""){
                countryerrors.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/countryoperations.php",
                    {
                        savecountry:true,
                        countryid,
                        countryname,
                        countrycode,
                        diallingcode,
                        defaultcountry
                    },
                    (data)=>{
                        if(data=="success"){
                            notification="The country has been saved successfully"
                            countryerrors.html(showAlert("success",notification))
                            // refresh countries list
                            getcountries()
                        }else if(data=="code exists"){
                            notification="Country code already exists"
                            countryerrors.html(showAlert("info",notification))
                        }else if(data=="name exists"){
                            notification="Country name already exists"
                            countryerrors.html(showAlert("info",notification))
                        }else if(data=="dialling code exists"){
                            notification="Country dialling code already exists"
                            countryerrors.html(showAlert("info",notification))
                        }else{
                            notification=`Sorry an error occured ${data}`
                            countryerrors.html(showAlert("danger",notification))
                        }
                    }
                )
            }else{
                countryerrors.html(showAlert("info",errors))
            }
        })
    
        savecompanydetails.on('click',()=>{
            const companyid=companyidfield.val(),
                    companyname=companynamefield.val(),
                    membernoprefix=membernoprefixfield.val(),
                    currentmemberno=currentmembernofield.val(),
                    companycode=companycodefield.val(),
                    allowcheckoff=allowcheckofffield.prop("checked")?1:0
            let errors="",
                notifications=""
            // check for blank fields
            if(companycode==""){
                errors="Please provide company code"
                companycodefield.focus()
            }else if(companyname==""){
                errors="Please provide company name"
                companynamefield.focus()
            }else if(membernoprefix==""){
                errors="Please provide member no prefix"
                membernoprefixfield.focus()
            }else if(Number(currentmemberno)==0){
                errors="Please enter correct current member no"
                currentmembernofield.focus()
            }
    
            if(errors==""){
                $.post(
                    "../controllers/companyoperations.php",
                    {
                        savecompany:true,
                        companyid,
                        companycode,
                        companyname,
                        currentmemberno,
                        membernoprefix,
                        allowcheckoff
                    },
                    (data)=>{
                        if(data=="success"){
                            notifications="Company saved successfully"
                            // refresh the list
                            getcompanies()
                            companyerrors.html(showAlert("success",notifications))
                        }else if(data=="name exists"){
                            notifications="The company name is already in use."
                            companyerrors.html(showAlert("info",notifications))
                        }else if(data=="code exists"){
                            notifications="The company code is already in use."
                            companyerrors.html(showAlert("info",notifications))
                        }else if(data=="prefix exists"){
                            notifications="The member no prefix is already in use."
                            companyerrors.html(showAlert("info",notifications))
                        }else{
                            notifications=`Sorry an error occured ${data}` 
                            companyerrors.html(showAlert("danger",notifications))
                        }
                    }
                )
            }else{
                companyerrors.html(showAlert("info",errors))
            } 
        })
    
        // save loan type
        saveloantypebutton.on("click",()=>{
            const loanid=loanidfield.val(),
                    loancode=loancodefield.val().trim(),
                    loanname=loannamefield.val().trim(),
                    interestmethodid=interestmethodfield.val(),
                    interestrate=Number(interestratefield.val().trim()),
                    minamount=Number(minamountfield.val().trim()),
                    maxamount=Number(maxamountfield.val().trim()),
                    allowcheckoff=loanallocheckofffield.prop("checked")?1:0,
                    autoprocess=loanautoprocessfield.prop("checked")?1:0,
                    loannoprefix=loannumberprefixfield.val(),
                    currentloanno=Number(loancurrentnumberfield.val().trim()),
                    offsetinterestmethod=loanoffsetineterestmethodcontrol.val(),
                    offsetinterestrate=loanoffsetinterestratecontrol.val(),
                    defaultcycle=loanrepayfrequencycontrol.val(),
                    defaultinsurer=loaninsurercontrol.val(),
                    maxduration=loanmaxdurationcontrol.val(),
                    fixrepayperiod=loanfixrepayperiodcontrol.prop("checked")?1:0,
                    enforceloanguarantee=enforceguaranteecontrol.prop("checked")?1:0,
                    overridemembermaxloan=overridemembermaxloancontrol.prop("checked")?1:0,
                    membermustselfguarantee=membermustselfguaranteecontrol.prop("checked")?1:0,
                    applytomembers=loanapplytomembers.prop("checked")?1:0,
                    applytononmembers=loanapplytononmembers.prop("checked")?1:0,
                    maxrunningloans=Number(loantypemaxrunningloanscontrol.val())
                    // enforceloanguarantee=0
    
            let errors="",
                notification=""
            if(loancode==""){
                errors="Please provide the loan code"
            }else if(loanname==""){
                errors="Please provide the loan name"
            }else if(interestmethodid==""){
                errors="Please select loan interest method"
            }else if(Number(interestrate)<=0){
                errors="Please provide correct interest rate"
            }else if(loannoprefix==""){
                errors="Please provide the numbering prefix"
            }else if(Number(currentloanno)<=0){
                errors="Please provide correct current loan number"
            }else if(Number(minamount)<=0){
                errors="Please provide correct minimum loan amount"
            }else if(Number(maxamount)<=0){
                errors="Please provide correct maximum loan amount"
            }else if(maxrunningloans<=0){
                errors="Please provide maximum number of loans members can have"
            }else if(offsetinterestmethod==""){
                errors="Please select interest offset method"
            }else if (Number(offsetinterestrate)<0 || offsetinterestrate==""){
                errors="Please enter correct offset interest rate"
            }else if(defaultcycle==""){
                errors="Please select loan default repayment cycle"
            }else if(defaultinsurer==""){
                errors="Please select loan default insurer"
            }else if(Number(maxduration)<=0){
                errors="Please provide correct maximum loan duration"
            }
    
            if(errors==""){
                $.post(
                    "../controllers/loanoperations.php",
                    {
                        saveloantype:true,
                        loanid,
                        loancode,
                        loanname,
                        interestmethodid,
                        interestrate,
                        minamount,
                        maxamount,
                        allowcheckoff,
                        autoprocess,
                        loannoprefix,
                        currentloanno,
                        offsetinterestmethod,
                        offsetinterestrate,
                        defaultcycle,
                        defaultinsurer,
                        maxduration,
                        fixrepayperiod,
                        enforceloanguarantee,
                        overridemembermaxloan,
                        membermustselfguarantee,
                        applytomembers,
                        applytononmembers,
                        maxrunningloans
                    },
                    (data)=>{
                        if(data=="success"){
                            notification="Loan type has been saved successfully"
                            loanerrors.html(showAlert("success",notification))
                            // refresh loan list
                            getloantypes()
                        }else if(data=="code exists"){
                            notification="Sorry, loan code already exists"
                            loanerrors.html(showAlert("info",notification))
                        }else if(data=="name exists"){
                            notification="Sorry, loan name already exists"
                            loanerrors.html(showAlert("info",notification))
                        }else if(data=="prefix exists"){
                            notification="Sorry, loan numbering prefix already exists"
                            loanerrors.html(showAlert("info",notification))
                        }else{
                            notification=`Sorry an error occured ${data}`
                            loanerrors.html(showAlert("danger",notification))
                        }
                    }
                )
            }else{
                loanerrors.html(showAlert("info",errors))
            }
        })
    
        mpesa2cbparameters={
            url:'',
            shortcode:'',
            subscribersnumber:''
        }
    
        getrelationships()
        getiddocuments()
        getcountries()
        getloantypes()
        getcompanies()
        getemailconfiguration()
        getsmsconfiguration()
        getMPESAC2BParameters()
        getMPESAConfiguration()
    
        function clearcompanyfields(){
            companyidfield.val("0"),
            companycodefield.val(""),
            companynamefield.val(""),
            membernoprefixfield.val(""),
            currentmembernofield.val(""),
            allowcheckofffield.prop("checked",0)
        }
    
        function clearloanfields(){
            loanidfield.val("0")
            loancodefield.val("")
            loannamefield.val("")
            interestmethodfield.val(""),
            interestratefield.val(""),
            minamountfield.val(""),
            maxamountfield.val(""),
            loanallocheckofffield.prop("checked",0)
            loanautoprocessfield.prop("checked",0)
            loannumberprefixfield.val(""),
            loancurrentnumberfield.val("") 
        }
    
        function clearcountryfields(){
            countryidfield.val("0"),
            countrycodefield.val(""),
            countrynamefield.val(""),
            diallingcodefield.val(""),
            defaultcountryfield.val("")
        }
    
        function cleariddocumentfields(){
            documentidfield.val("0")
            documentnamefield.val("")
            iddocumentexpiresfield.prop("checked",false)
        }
    
        function getrelationships(){
            $.getJSON(
                "../controllers/relationshipoperations.php",
                {
                    getrelationships:true
                },
                (data)=>{
                    let results="", i=0
                    data.forEach((relationship)=>{
                        i++
                        results+=`<tr><td>${i}</td>`
                        results+=`<td>${relationship.relationshipname}</td>`
                        results+=`<td>${relationship.dateadded}</td>`
                        results+=`<td>${relationship.addedbyname}</td>`
                        results+="<td><a href='javascript void(0)' class='editdata' data-id='"+relationship.relationshipid+"'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='deletedata' data-id='"+relationship.relationshipid+"'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    relationshiplist.find("tbody").html(results)
                }
            )
        }
    
        function getiddocuments(){
            $.getJSON(
                "../controllers/iddocumentoperations.php",
                {
                    getiddocuments:true
                },
                (data)=>{
                    let results=""
                        i=0
                    data.forEach((document)=>{
                        i++
                        results+=`<tr><td>${i}</td>`
                        results+=`<td>${document.documentname}</td>`
                        results+=`<td>${document.expires==1?'Yes':'No'}</td>`
                        results+=`<td>${document.dateadded}</td>`
                        results+=`<td>${document.addedbyname}</td>`
                        results+="<td><a href='javascript void(0)' class='editdata' data-id='"+document.documentid+"'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='deletedata' data-id='"+document.documentid+"'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    iddoccumentlist.find("tbody").html(results)
                }
            )
        }
    
        function getcountries(){
            $.getJSON(
                "../controllers/countryoperations.php",
                {
                    getcountries:true
                },
                (data)=>{
                    let results="",
                        i=0
                    data.forEach((country)=>{
                        i++
                        results+=`<tr><td>${i}</td>`
                        results+=`<td>${country.countrycode==null?'':country.countrycode}</td>`
                        results+=`<td>${country.countryname}</td>`
                        results+=`<td>${country.diallingcode==null?'':country.diallingcode}</td>`
                        results+=`<td>${country.defaultcountry==1?'Yes':'No'}</td>`
                        results+=`<td>${country.dateadded}</td>`
                        results+=`<td>${country.addedbyname}</td>`
                        results+="<td><a href='javascript void(0)' class='editdata' data-id='"+country.nationalityid+"'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='deletedata' data-id='"+country.nationalityid+"'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    countrylist.find("tbody").html(results)
                }
            )
        }
    
        function getloantypes(){
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloantypes:true
                },
                (data)=>{
                    let results="",
                        i=0
                    if(data.length>0){
                        data.forEach((loantype)=>{
                            i++
                            results+=`<tr><td>${i}</td>`
                            results+=`<td>${loantype.loancode}</td>`
                            results+=`<td>${loantype.loanname}</td>`
                            results+=`<td>${loantype.interestname}</td>`
                            results+=`<td>${loantype.interestrate}</td>`
                            results+=`<td>${loantype.loannoprefix}</td>`
                            results+=`<td>${loantype.currentloanno}</td>`
                            results+=`<td>${$.number(loantype.minamount,2)}</td>`
                            results+=`<td>${$.number(loantype.maxamount,2)}</td>`
                            results+="<td><a href='javascript void(0)' class='editdata' data-id='"+loantype.loanid+"'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                            results+="<td><a href='javascript void(0)' class='deletedata' data-id='"+loantype.loanid+"'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
    
                        })
                    }else{
                        results=`<tr><td colspan="13">Currently no loan types in the system.</td></tr>`
                    }
                
                    loanslist.find("tbody").html(results)
                }
            )
        }
    
        function getcompanies(){
            $.getJSON(
                "../controllers/companyoperations.php",
                {
                    getcompanies:true
                },
                (data)=>{
                    let results="",
                        i=0
                    if(data.length>0){
                        data.forEach((company)=>{
                            i++
                            results+=`<tr><td>${i}</td>`
                            results+=`<td>${company.companycode}</td>`
                            results+=`<td>${company.companyname}</td>`
                            results+=`<td>${company.membernoprefix}</td>`
                            results+=`<td>${company.currentmemberno}</td>`
                            results+=`<td>${company.allowcheckoff?"Yes":"No"}</td>`
                            results+=`<td>${company.dateadded}</td>`
                            results+=`<td>${company.addedbyname}</td>`
                            results+="<td><a href='javascript void(0)' class='editdata' data-id='"+company.companyid+"'><span><i class='fas fa-edit fa-sm'></i></span></a></td>"
                            results+="<td><a href='javascript void(0)' class='deletedata' data-id='"+company.companyid+"'><span><i class='fas fa-trash-alt fa-sm'></i></span></a></td></tr>"
                        })
                    }else{
                        results=`<tr><td colspan='10'>Currently there are no companies in the system</td></tr>`
                    }
    
                    companylist.find("tbody").html(results)
                }
            )
        }
    
        cleariddocumentbutton.on("click",()=>{
            cleariddocumentfields()
            documentnamefield.focus()
        })
    
        // edit relationship
        relationshiplist.on("click",".editdata",function(e){
            e.preventDefault()
            const relationshipid=$(this).attr("data-id")
            $.getJSON(
                "../controllers/relationshipoperations.php",
                {
                    getrelationshipdetails:true,
                    relationshipid
                },
                (data)=>{
                    relationshiperrors.html("")
                    relationshipnotifications.html("")
                    relationshipnamefield.val(data[0].relationshipname)
                    relationshipidfield.val(relationshipid)
                    relationshipmodal.modal("show")
                }
            )
        })
    
        // delete existing relationship
        relationshiplist.on("click",".deletedata",function(e){
            e.preventDefault()
            const $this=$(this)
            const relationshipid=$this.attr("data-id")
            const parent=$this.parent("td").parent("tr")
            const relationshipname=parent.find("td").eq(1).text()
    
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE the relationship <strong>${relationshipname}</strong>`,
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
                                "../controllers/relationshipoperations.php",
                                {
                                    deleterelationship:true,
                                    relationshipid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The relationship <strong>${relationshipname}</strong> has been deleted successfully.`
                                        relationshipnotifications.html(showAlert("success",notification))
                                        // parent.remove()
                                        getrelationships()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        relationshipnotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
        // edit existing id document
        iddoccumentlist.on("click",".editdata",function(e){
            e.preventDefault()
            idoducumentnotifications.html("")
            const $this=$(this)
            const documentid=$this.attr("data-id")
            // get document details
            $.getJSON(
                "../controllers/iddocumentoperations.php",
                {
                    getiddocumentdetails:true,
                    documentid
                },
                (data)=>{
                    documentidfield.val(documentid),
                    documentnamefield.val(data[0].documentname)
                    iddocumentexpiresfield.prop("checked",data[0].expires==1?true:false)
                    iddocumentmodal.modal("show")
                    iddocumenterrors.html("")
                    idoducumentnotifications.html("")
                }
            )
        })
    
        // delete existing id document
        iddoccumentlist.on("click",".deletedata",function(e){
            e.preventDefault()
            $this=$(this)
            idoducumentnotifications.html("")
            const documentid=$this.attr("data-id")
            const parent=$this.parent("td").parent("tr")
            const documentname=parent.find("td").eq(1).text()
    
            // confirm deletion
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE the ID document <strong>${documentname}</strong>`,
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
                                "../controllers/iddocumentoperations.php",
                                {
                                    deleteiddocument:true,
                                    documentid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The document <strong>${documentname}</strong> has been deleted successfully.`
                                        idoducumentnotifications.html(showAlert("success",notification))
                                        // parent.remove()
                                        getiddocuments()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        idoducumentnotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        // Edit existing country
        countrylist.on("click",".editdata",function(e){
            e.preventDefault()
            countrynotifications.html("")
            const countryid=$(this).attr("data-id")
            // get country details 
            $.getJSON(
                "../controllers/countryoperations.php",
                {
                    getcountrydetails:true,
                    countryid
                },
                (data)=>{
                    countryidfield.val(countryid),
                    countrycodefield.val(data[0].countrycode),
                    countrynamefield.val(data[0].countryname),
                    diallingcodefield.val(data[0].diallingcode),
                    defaultcountryfield.val(data[0].defaultcountry)
                    countrynotifications.html("")
                    countryerrors.html("")
                    countriesmodal.modal("show")
                }
            )
        })
    
        // delete country
        countrylist.on("click",".deletedata",function(e){
            e.preventDefault()
            countrynotifications.html("")
            const $this=$(this)
            const countryid=$this.attr("data-id")
            const parent=$this.parent("td").parent("tr")
            const countryname=parent.find("td").eq(2).text()
    
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE <strong>${countryname}</strong>`,
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
                                "../controllers/countryoperations.php",
                                {
                                    deletecountry:true,
                                    countryid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The country <strong>${countryname}</strong> has been deleted successfully.`
                                        countrynotifications.html(showAlert("success",notification))
                                        parent.remove()
                                        getcountries()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        countrynotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        function getMPESAC2BParameters(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getmpesac2bparameters:true
                },
                function(data){
                   
                    mpesa2cbparameters.url=data[0].c2burl
                    mpesa2cbparameters.shortcode=data[0].c2bshortcode
                    mpesa2cbparameters.subscribersnumber=data[0].c2bmsisdn
                    // mpesac2burl.val(data[0].c2burl)
                    // mpesac2bshortcode.val(data[0].c2bshortcode)
                    // mpesac2bmsisdn.val(data[0].c2bmsisdn)
                }
            )
        }
    
        function getMPESAConfiguration(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getmpesaconfiguration:true
                },
                function(data){
                    consumerkeyfield.val(data[0].consumerkey)
                    consumersecretfield.val(data[0].consumersecret)
                    validationurlfield.val(data[0].validationurl)
                    confirmationurlfield.val(data[0].confirmationurl)
                    paybillnofield.val(data[0].paybillnumber)
                }
            )
        }
        
        // get email configuration
        function getemailconfiguration(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getemailparameters:true
                },
                (data)=>{
                    if(data.length>0){
                        emailaddressfield.val(data[0].emailaddress)
                        emailpasswordfield.val(data[0].password)
                        smtpserverfield.val(data[0].smtpserver)
                        smtpportfield.val(data[0].smtpport)
                        if(data[0].usessl==1){
                            sslfield.prop("checked",true)
                        }else{
                            sslfield.prop("checked",false)
                        }
                    }else{
                        // show that no configuration is set
                    }
                }
            )
        }
    
        // get sms configuration
        function getsmsconfiguration(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getsmsparameters:true
                },
                (data)=>{
                    if(data.length>0){
                        smsclientidfield.val(data[0].clientid)
                        urlfield.val(data[0].url)
                        senderidfield.val(data[0].senderid)
                        apikeyfield.val(data[0].apikey)
                        tokenfield.val(data[0].token)
                        if(data[0].apiused=='old'){
                            oldapiradiobutton.prop("checked",true)
                            oldapiradiobutton.trigger("click")
                        }else{
                            newapiradiobutton.prop("checked",true)
                            newapiradiobutton.trigger("click")
                        }
                    }else{
                        // show that no configuration is set
                    }
                }
            )
        }
    
        // Edit company details
        companylist.on("click",".editdata",function(e){
            e.preventDefault()
            companynotifications.html("")
            const companyid=$(this).attr("data-id")
            $.getJSON(
                "../controllers/companyoperations.php",
                {
                    getcompanydetails:true,
                    companyid
                },
                (data)=>{
                    companyidfield.val(companyid),
                    companycodefield.val(data[0].companycode),
                    companynamefield.val(data[0].companyname),
                    membernoprefixfield.val(data[0].membernoprefix),
                    currentmembernofield.val(data[0].currentmemberno),
                    allowcheckofffield.prop("checked",data[0].allowcheckoff)
                    companyerrors.html("")
                    companydetailsmodal.modal("show")
                }
            )
        })
    
        companylist.on("click",".deletedata",function(e){
            e.preventDefault()
            companynotifications.html("")
            const companyid=$(this).attr("data-id")
            const parent=$(this).parent("td").parent("tr")
            const companyname=parent.find("td").eq(2).text()
            // confirm deletion
            // refresh list
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE <strong>${companyname}</strong>`,
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
                                "../controllers/companyoperations.php",
                                {
                                    deletecompany:true,
                                    companyid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The company <strong>${companyname}</strong> has been deleted successfully.`
                                        companynotifications.html(showAlert("success",notification))
                                        parent.remove()
                                        getcompanies()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        companynotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        loanslist.on("click",".editdata",function(e){
            e.preventDefault()
            loannotifications.html("")
            loanerrors.html("")
            const loanid=$(this).attr("data-id")
            // get loan type details
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloantypedetails:true,
                    loanid   
                },
                (data)=>{
                    
                    loanidfield.val(loanid)
                    loancodefield.val(data[0].loancode)
                    loannamefield.val(data[0].loanname)
                    interestmethodfield.val(data[0].interestmethodid),
                    interestratefield.val(data[0].interestrate),
                    minamountfield.val(data[0].minamount),
                    maxamountfield.val(data[0].maxamount),
                    loanallocheckofffield.prop("checked",data[0].allowcheckoff==1?true:false)
                    loanautoprocessfield.prop("checked",data[0].autoprocess==1?true:false)
                    loannumberprefixfield.val(data[0].loannoprefix),
                    loancurrentnumberfield.val(data[0].currentloanno) 
                    loanoffsetineterestmethodcontrol.val(data[0].offsetinterestmethod)
                    loanoffsetinterestratecontrol.val(data[0].offsetinterestrate)
                    loanrepayfrequencycontrol.val(data[0].defaultrepamentcycle)
                    loaninsurercontrol.val(data[0].defaultinsurer)
                    loanmaxdurationcontrol.val(data[0].maxduration)
                    loanfixrepayperiodcontrol.prop("checked",data[0].fixduration==1?true:false)
                    enforceguaranteecontrol.prop("checked",data[0].enforceguarantee==1?true:false)
                    overridemembermaxloancontrol.prop("checked",data[0].overridemaxmemberloan==1?true:false)
                    membermustselfguaranteecontrol.prop("checked",data[0].membermustselfguarantee==1?true:false)
                    loanapplytomembers.prop("checked",data[0].applytomembers==1?true:false)
                    loanapplytononmembers.prop("checked",data[0].applytononmembers==1?true:false)
                    loantypemaxrunningloanscontrol.val(data[0].maxrunningloans)
                    loannotifications.html()
                    loanerrors.html()
                    loandetailsmodal.modal("show")
                    loantypechargedetails.show()
                    getapplicableloantypecharges(loanid)
                }
            )
        })
    
        loanslist.on("click",".deletedata",function(e){
            e.preventDefault()
            loannotifications.html("")
            const $this=$(this)
            const loanid=$this.attr("data-id")
            const parent=$this.parent("td").parent("tr")
            const loanname=parent.find("td").eq(2).text()
            // confirm deletion
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE the loan <strong>${loanname}</strong>`,
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
                                "../controllers/loanoperations.php",
                                {
                                    deleteloantype:true,
                                    loanid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The loan <strong>${loanname}</strong> has been deleted successfully.`
                                        loannotifications.html(showAlert("success",notification))
                                        parent.remove()
                                        getloantypes()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        loannotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
        // save email parameters
        saveemailparametersbutton.on("click",()=>{
           var emailaddress=emailaddressfield.val(),
                password=emailpasswordfield.val(),
                smtpserver=smtpserverfield.val(),
                smtpport=smtpportfield.val(),
                usessl=sslfield.prop("checked")?1:0,
                errors=""
            // check for blank fields
            if(emailaddress==""){
                errors="Please provide Email Address"
                emailaddressfield.focus()
            }else if(password==""){
                errors="Please provide Password."
                emailpasswordfield.focus()
            }else if(smtpserver==""){
                errors="Please provide SMTP Server"
                smtpserverfield.focus()
            }else if(smtpport==""){
                errors="Please provide SMTP Port"
                smtpportfield.focus()
            }
    
            // save the email parameters
            if(errors==""){
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        saveemailparameters:true,
                        emailaddress:emailaddress,
                        password:password,
                        smtpserver:smtpserver,
                        smtpport:smtpport,
                        usessl:usessl
                    },
                    function(data){
                        data=$.trim(data)
                        if(data=="success"){
                            errors="Email configuration saved successfully."
                            emailerrordiv.html(showAlert("success",errors))
                        }else{
                            errors=`Sorry an error occured.<br/>${data}`
                            emailerrordiv.html(showAlert("danger",errors))
                        }
                    }
                )
            }else{
                emailerrordiv.html(showAlert("info",errors))
            }
        })
    
        //save sms parameters
        savesmsparametersbutton.on("click",()=>{
            const clientid=smsclientidfield.val(),
                url=urlfield.val(),
                senderid=senderidfield.val(),
                apikey=apikeyfield.val()
            const token=tokenfield.val()
            const apiused=oldapiradiobutton.prop("checked")?'old':'new'
            let errors=""
            // check for blank fields
            if(apiused=="old"){
                if(clientid==""){
                    errors="Please provide Client ID"
                    smsclientidfield.focus()
                }else if(senderid==""){
                    errors="Please provide Sender ID"
                    senderidfield.focus()
                }else if(url==""){
                    errors="Please provide URL"
                    urlfield.focus()
                }else if(apikey==""){
                    errors="Please provide API Key"
                    apikeyfield.focus()
                }
            }else{
                if(token==""){
                    errors="Please enter Token"
                    tokenfield.focus()
                }else if(senderid==""){
                    errors="Please provide Sender ID"
                    senderidfield.focus()
                }
                else if(url==""){
                    errors="Please provide URL"
                    urlfield.focus()
                }
            }
            
    
            if(errors==""){
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        savesmsparameters:true,
                        clientid,
                        url,
                        senderid,
                        apikey,
                        token,
                        apiused
                    },
                    (data)=>{
                        data=$.trim(data)
                        if(data.toUpperCase()=="SUCCESS"){
                            errors="SMS settings configuration saved successfully."
                            smserrodiv.html(showAlert("success",errors))
                        }else{
                            errors=`Sorry and error occured.<br/>${data}`
                            smserrodiv.html(showAlert("info",errors))
                        }
                    }
                )
            }else{
                smserrodiv.html(showAlert("info",errors))
            }
        })
    
        sendtestemailbutton.on("click",function(){
            var recipient=emailrecipientfield.val(),
                message=emailmessagefield.val(),
                subject=emailsubjectfield.val(),
                errors=""
            
            emailerrordiv.html("")
            // check for blank field
            if(recipient==""){
                errors="Please provide recipient's email address"
                emailrecipientfield.focus()
            }else if(subject==""){
                errors="Please provide email subject"
                emailsubjectfield.focus()
            }else if(message==""){
                errors="Please provide message to sell"
                emailsubjectfield.focus()
            }
            
            if(errors==""){
                testemailerrordiv.html(showAlert("processing","Sending test email. Please wait ..."))
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        sendemail:true,
                        recipient:recipient,
                        subject:subject,
                        message:message
                    },
                    (data)=>{
                        data=$.trim(data)
                        if(data=="success"){
                            errors="The test email has been sent successfully"
                            testemailerrordiv.html(showAlert("success",errors))
                            // clear email fields
                        }else{
                            errors=`Sorry, an error occured.<br/>${data}`
                            testemailerrordiv.html(showAlert("danger",errors))
                        }
                    }
                )
            }else{
                testemailerrordiv.html(showAlert("info",errors))
            }
        })
    
        sendtestsmsbutton.on("click",()=>{
            var recipient=smsrecipientfield.val(),
                message=smsmessagefield.val(),
                errors=""
                //testsmserrordiv=$("#smserrors"),
            // check for blank fields
            smserrodiv.html("")
            if(recipient==""){
                errors="Please provide SMS recepient"
                smsrecipientfield.focus()
            }else if(message==""){
                errors="Please provide a Message for the recipient"
                smsmessagefield.focus()
            }
    
            if(errors==""){
                testsmserrordiv.html(showAlert("processing", "Sending test SMS. Please wait ..."))
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        sendsms:true,
                        recipient:recipient,
                        message:message
                    },
                    (data)=>{
                        data=$.trim(data)
                        if(data.toUpperCase()=="SUCCESS"){
                            errors="The test SMS has been sent successfully."
                            testsmserrordiv.html(showAlert("success", errors))
                        }else{
                            errors=`Sorry, an error occured.<br/>${data}`
                            testsmserrordiv.html(showAlert("danger", errors))
                        }
                    }
                )
            }else{
                testsmserrordiv.html(showAlert("info", errors))
            }
        })
    
        savempesabutton.on("click",()=>{
            let consumerkey=consumerkeyfield.val(),
                consumersecret=consumersecretfield.val(),
                confirmationurl=confirmationurlfield.val(),
                validationurl=validationurlfield.val(),
                paybillnumber=paybillnofield.val(),
                errors=''
            // check for blanl fields
            if(consumerkey==""){
                errors="Please provide the consumer key"
            }else if(consumersecret==""){
                errors="Please provide the consumer secret"
            }else if(paybillnumber==""){
                errors="Please provide paybill number"}
            else if(validationurl==""){
                errors="Please provide validation URL"
            }else if(confirmationurl==""){
                errors="Please provide the confirmation URL"
            }
    
            if(errors==""){
                mpesaerrors.html(showAlert("processing","Saving MPESA configuration. Please wait...",1))
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        savempesaconfiguration:true,
                        consumerkey,
                        consumersecret,
                        paybillnumber,
                        validationurl,
                        confirmationurl
                    },
                    (data)=>{
                        data=data.trim()
                        if(JSON.parse(data)){
                            data=JSON.parse(data)
                            if(data.saveconfig=="success"){
                                mpesaerrors.html(showAlert("success","MPESA configuration saved successfully."))
                            }else{
                                mpesaerrors.html(showAlert("danger",`MPESA configuration save failed ${data}`))
                            }
                            if(data.registerurl=="success"){
                                mpesaerrors2.html(showAlert("success","Validation and Confirmation urls set successfully."))
                            }else{
                                mpesaerrors2.html(showAlert("danger",`Validation, confirmation URLs not set: ${data}`))  
                            }
                        }else{
                            mpesaerrors.html(showAlert("danger",`Sorry an error occured: ${data}`,1))
                        }
                    }
                )
            }
        })
    
        // hide all notifications
        inputfield.on("input",()=>{
            testsmserrordiv.html("") 
            testemailerrordiv.html("")
            smserrodiv.html("")
            emailerrordiv.html("")
            companyerrors.html("")
            loanerrors.html("")
            countryerrors.html("")
            iddocumenterrors.html("")
            relationshiperrors.html("")
            savingtypedetailnotification.html("")
            savingtypenotifications.html("")
            registrationpolicynotification.html("")
            loanapplicationnotification.html("")
            loanchargedetailnotification.html("")
            applicablechargenotificationdetail.html("")
            applicablechargesnotification.html("")
            institutiondetailnotification.html("")
        })
    
        selectfield.on("change",()=>{
            inputfield.trigger("input")
        })
    
        const sharetypedetailsmodal=$("#sharetypedetailsmodal")
        const addnewsharetype=$("#addnewsharetype")
        const sharestypeslist=$("#sharetypeslist")
        const sharetypesnotifications=$("#sharetypesnotifications")
        const sharetypedetailsnotification=$("#sharetypedetailsnotification")
        const savesharetypecontrol=$("#savesharetype")
        const sharetypeidcontrol=$("#sharetypeid")
    
        const sharetypedescriptioncontrol=$("#sharetypedescription")
        const sharetypeminamountcontrol=$("#sharetypeminamount")
        const sharetypemaxamountcontrol=$("#sharetypemaxamount")
        const sharetypemandatorycontrol=$("#sharetyperequired")
        const savingstypelist=$("#savingstypelist")
    
        const savingtypedetailsmodal=$("#savingtypedetailsmodal")
        const addnewsavingtype=$("#addnewsavingstype")
        const savingtypeidcontrol=$("#savingtypeid")
        const savingtypenamecontrol=$("#savingtypedescription")
        const savingtypeminamountcontrol=$("#savingtypeminamount")
        const savingtypemaxamountcontrol=$("#savingtypemaxamount")
        const savesavingtype=$("#savesavingtype")
        const savingtypenotifications=$("#savingtypenotifications")
        const savingtypedetailnotification=$("#savingtypenotification")
    
        const generatemembernoscontrol=$("#registrationgeneratemembernos")
        const chargeregistrationfeescontrol=$("#registrationchargeregistration")
        const registrationfeescontrol=$("#registrationfeeamount")
        const registrationfeesviacheckoffcontrol=$("#registrationfeesoncheckoff")
        const registrationagecontrol=$("#registrationminimumage")
        const minmonthlydepositscontrol=$("#minimummonthlycontribution")
        const saveregistrationpolicycontrol=$("#saveregistrationpolicy")
        const registrationpolicynotification=$("#registrationpolicynotification")
        const allowselfregistrationcontrol=$("#allowselfregistration")
        const generatemembernosgloballycontrol=$("#generatemembernosglobally")
        const globalmembernoprefixcontrol=$("#globalmembernoprefix")
        const globalcurrentmemberno=$("#globalcurrentmemberno")
    
        const minimummembershipdurationcontrol=$("#loanpolicyminmembershipduration")
        const loanpolicysharefactorcontrol=$("#loanpolicysharefactor")
        const enforceguaranteeshipecontrol=$("#loanpolicyenforceguaranteeship")
        const overguaranteeloanscontrol=$("#loanpolicyoverguaranteeship")
        const emailackcontrol=$("#loanpolicyemailack")
        const smsackcontrol=$("#loanpolicysmsack")
        const saveloanpolicycontrol=$("#saveloanapplicationpolicy")
        const loanapplicationnotification=$("#loanapplicationnotification")
        const maxrunningloanscontrol=$('#maxrunningloans')
        const suspendwitnesscontrol=$("#suspendwitness")
    
        const loanchargeabledetailsmodal=$("#loanchargeabledetailsmodal")
        const addnewloancharge=$("#addnewloancharge")
        const memberchargedetailsmodal=$("#memberchargedetailsmodal")
        const loanchargeidcontrol=$("#loanchargeid")
        const loanchargedescriptioncontrol=$("#loanchargedescription")
        const loanchargeamountcontrol=$("#loanchargeamount")
        const loanchargerequiredcontrol=$("#loanchargerequired")
        const loanchargepercentagecontrol=$("#loanchargepercentage")
        const saveloanchargecontrol=$("#saveloancharge")
        const loanchargedetailnotification=$("#loanchargedetailnotification")
        const loachargenotification=$("#loachargenotification")
    
        const addnewmembercharge=$("#addnewmembercharge")
        const loanchargeslist=$("#loanchargeslist")
        const applicablechareslist=$("#applicablechargeslist")
        const applicablechargesnotification=$("#applicablechargesnotification")
        const applicablechargeglaccountcontrol=$("#memberchargeglaccount")
        const applicablechargeidcontrol=$("#memberchargeid")
        const applicablechargedescriptioncontrol=$("#memberchargedescription")
        const applicablechargeamountcontrol=$("#memberchargeamount")
        const applicablechargerecurringcontrol=$("#memberchargerecurring")
        const saveapplicablechargecontrol=$("#saveapplicablecharge")
        const applicablechargenotificationdetail=$("#applicablechargenotificationdetail")
    
        const institutionregdoccontrol=$("#institutionregdoc")
        const imagefileselectorcontrol=document.querySelector("#institutionlogo")
        const imagepreviewcontrol=document.querySelector(".institutionlogo")
        const institutioncategorycontrol=$("#institutioncategory")
        const institutionnamecontrol=$("#institutionname")
        const institutionregdocnocontrol=$("#institutionregno")
        const institutionsasraregnocontrol=$("#institutionsasraregno")
        const institutionpinnocontrol=$("#institutionpinno")
        const institutiongpscoordinatescontrol=$("#institutiongpscoordinates")
        const institutionmarkloactioncontrol=$("#institutionmarklocation")
        const institutionphysicaladdresscontrol=$("#institutionphysicallocation")
        const institutionpostaladdrescontrol=$("#institutionpostaladdress")
        const institutiontowncontrol=$("#institutiontown")
        const institutionpostalcodecontrol=$("#institutionpostalcode")
        const institutionmobilecontrol=$("#institutionmobile")
        const institutionemailcontrol=$("#institutionemail")
        const institutionwebsitecontrol=$("#institutionwebsite")
        const saveinstitiondetailscontrol=$("#saveinstitution")
        const institutiondetailnotification=$("#institutiondetailnotification")
        const enablememberportalfield=$("#enablememberportal")
    
        let logochanged=false
    
        getsharetypesfortable()
        getsavingstypefortable()
        getregistrationpolicy()
        getloanapplicationpolicy()
        getloanchargeitemsfortable()
        getglaccounts(applicablechargeglaccountcontrol, 0,'choose')
        getmemberapplicablechargesfortable()
    
        // getinstitutionregistrationdpocuments(institutionregdoccontrol,'choose')
        // getinstitutioncategories(institutioncategorycontrol,'choose')
        getinstitutiondetails()
    
        // load institition logo preview on selection of a new image
        imagefileselectorcontrol.addEventListener("change",function(){
            logochanged=true
            if (imagefileselectorcontrol.files && imagefileselectorcontrol.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagepreviewcontrol.src = e.target.result;
                }
                reader.readAsDataURL(imagefileselectorcontrol.files[0]);
              }
        })
    
        addnewsharetype.on("click",()=>{
            sharetypedetailsmodal.modal("show")
            savingtypenotifications.html("")
            savingtypedetailnotification.html("")
        })
    
        addnewsavingtype.on("click",function(){
            savingtypedetailsmodal.modal("show")
        })
    
        addnewloancharge.on("click",()=>{
            loanchargeabledetailsmodal.modal("show")
        })
    
        addnewmembercharge.on("click",()=>{
            memberchargedetailsmodal.modal("show")
        })
    
        function getsharetypesfortable(){
            $.getJSON(
                "../controllers/shareoperations.php",
                {
                    getsharetypes:true
                },
                (data)=>{
                    let results=''
                    data.forEach((sharetype,index)=>{
                        results+=`<tr data-id=${sharetype.sharetypeid}><td>${Number(index+1)}</td>`
                        results+=`<td>${sharetype.sharename}</td>`
                        results+=`<td>${sharetype.manadatory==1?'Yes':'No'}</td>`
                        results+=`<td>${$.number(sharetype.minamount)}</td>`
                        results+=`<td>${$.number(sharetype.maxamount)}</td>`
                        results+=`<td>${formatDate(sharetype.dateadded)}</td>`
                        results+=`<td>${sharetype.addedbyname}</td>`
                        // Edit and delete buttons
                        results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-lg fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='delete'><span><i class='fal fa-lg fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    sharestypeslist.find("tbody").html(results)
                }
            )
        }
    
        savesharetypecontrol.on("click",()=>{
    
            const sharetypeid=sharetypeidcontrol.val()
            const sharename=sharetypedescriptioncontrol.val().trim().replace("'","''")
            const minamount=sharetypeminamountcontrol.val()
            const maxamount=sharetypemaxamountcontrol.val()
            const mandatory=sharetypemandatorycontrol.prop("checked")?1:0
            let errors=''
            // check for blank fields
            if(sharename==""){
                errors="Please provide share name"
                sharetypedescriptioncontrol.focus()
            }else if(Number(minamount)<=0){
                errors="Please provide correct minimum amount"
                sharetypeminamountcontrol.focus()
            }else if(Number(maxamount)<=0){
                errors="Please provide correct maximum amount"
                sharetypemaxamountcontrol.focus()
            }
    
            if(errors==""){
                sharetypedetailsnotification.html(showAlert("processing","Processing. Please wait ..."))
                $.post(
                    "../controllers/shareoperations.php",
                    {
                        savesharetype:true,
                        sharetypeid,
                        sharename,
                        minamount,
                        maxamount,
                        mandatory
                    },
                    (data)=>{
                        if(data=="success"){
                            sharetypedetailsnotification.html(showAlert("success","Share type has been saved successfully"))
                            // clear form
                            clearsharedetailsform()
                            sharetypedescriptioncontrol.focus()
                            //refresh list
                            getsharetypesfortable()
                        }else if(data=="exists"){
                            sharetypedetailsnotification.html(showAlert("info",`<strong>${sharename}</strong> already exists in the system`))
                            sharetypedescriptioncontrol.focus()
                        }else{
                            sharetypedetailsnotification.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
                )
            }else{
                sharetypedetailsnotification.html(showAlert("info",errors))
            }
        })
    
        function clearsharedetailsform(){
            sharetypeidcontrol.val("0")
            sharetypedescriptioncontrol.val("")
            sharetypeminamountcontrol.val("")
            sharetypemaxamountcontrol.val("")
            sharetypemandatorycontrol.prop("checked",false)
        }
    
        // edit share type
        sharestypeslist.on("click",".edit",function(e){
            e.preventDefault()
            sharetypesnotifications.html("")
            const $this=$(this)
            const sharetypeid=$this.closest("tr").attr("data-id")
            $.getJSON(
                "../controllers/shareoperations.php",
                {
                    getsharetypedetails:true,
                    sharetypeid
                },
                (data)=>{
                    sharetypeidcontrol.val(data[0].sharetypeid)
                    sharetypedescriptioncontrol.val(data[0].sharename)
                    sharetypeminamountcontrol.val(data[0].minamount)
                    sharetypemaxamountcontrol.val(data[0].maxamount)
                    sharetypemandatorycontrol.prop("checked",data[0].mandatory==1?1:0) 
                    sharetypedetailsmodal.modal("show")
                }
            )
        })
    
        // delete share type
        sharestypeslist.on("click",".delete",function(e){
            e.preventDefault()
            sharetypesnotifications.html("")
            const $this=$(this)
            const parent= $this.closest("tr")
            const sharetypeid=parent.attr("data-id")
            const sharename=parent.find("td").eq(1).text()
            // confirm deletion with bootbox
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE share type <strong>${sharename}</strong>`,
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
                            sharetypesnotifications.html(showAlert("processing","Processing. Please wait ..."))
                            $.post(
                                "../controllers/shareoperations.php",
                                {
                                    deletesharetype:true,
                                    sharetypeid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The share type <strong>${sharename}</strong> has been deleted successfully.`
                                        sharetypesnotifications.html(showAlert("success",notification))
                                        // parent.remove()
                                        getsharetypesfortable()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        sharetypesnotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        // get savings type for table
        function getsavingstypefortable(){
            $.getJSON(
                "../controllers/savingsoperations.php",
                {
                    getsavingstypes:true
                },
                (data)=>{
                    let results=''
                    data.forEach((savings,index)=>{
                        results+=`<tr data-id='${savings.id}'><td>${Number(index+1)}</td>`
                        results+=`<td>${savings.savingname}</td>`
                        results+=`<td>${$.number(savings.minamount)}</td>`
                        results+=`<td>${$.number(savings.minamount)}</td>`
                        results+=`<td>${formatDate(savings.dateadded)}</td>`
                        results+=`<td>${savings.addedbyname}</td>`
                        results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-lg fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='delete'><span><i class='fal fa-lg fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    savingstypelist.find("tbody").html(results)
                }
            )
        }
    
        // save saving type
        savesavingtype.on("click",()=>{
            const savingid=savingtypeidcontrol.val()
            const savingname=savingtypenamecontrol.val()
            const minamount=savingtypeminamountcontrol.val()
            const maxamount=savingtypemaxamountcontrol.val()
            let errors=""
            // check for blank fields
            if(savingname==""){
                errors="Please enter saving name"
                savingtypenamecontrol.focus()
            }else if(Number(minamount)<0 || minamount==""){
                errors="Please enter correct minimum amount"
                savingtypeminamountcontrol.focus()
            }else if(Number(maxamount)<0 || maxamount==""){
                errors="Please enter correct maximum amount"
                savingtypemaxamountcontrol.focus()
            }
    
            if(errors==""){
                savingtypedetailnotification.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/savingsoperations.php",
                    {
                        savesavingtype:true,
                        savingid,savingname,minamount,maxamount
                    },
                    (data)=>{
                        if(data=="success"){
                            savingtypedetailnotification.html(showAlert("success",`Saving type <strong>${savingname}</strong> has been saved successfully.`))
                            // clear fields
                            clearsavingtypedetails()
                            // refresh list
                            getsavingstypefortable()
                        }else if(data=="exists"){
                            savingtypedetailnotification.html(showAlert("info",`Saving type already exists in the system`))
                            savingtypenamecontrol.focus()
                        }else{
                            savingtypedetailnotification.html(showAlert("danger",`Sorry an error occured. ${data}`))
                        }
                    }
                )
            }else{
                savingtypedetailnotification.html(showAlert("info",errors))
            }
        })
    
        // edit saving type
        savingstypelist.on("click",".edit",function(e){
            e.preventDefault()
            savingtypenotifications.html("")
            savingtypedetailnotification.html("")
            const $this=$(this)
            const id=$this.closest("tr").attr("data-id")
            $.getJSON(
                "../controllers/savingsoperations.php",
                {
                    getsavingsdetails:true,
                    id
                },
                (data)=>{
                    savingtypeidcontrol.val(data[0].id)
                    savingtypenamecontrol.val(data[0].savingname)
                    savingtypeminamountcontrol.val(data[0].minamount)
                    savingtypemaxamountcontrol.val(data[0].maxamount) 
                    //show the modal
                    addnewsavingtype.trigger("click")
                }
            )
        })
    
        function clearsavingtypedetails(){
            savingtypeidcontrol.val("0")
            savingtypenamecontrol.val("")
            savingtypeminamountcontrol.val("")
            savingtypemaxamountcontrol.val("") 
        }
    
        // delete saving type
        savingstypelist.on("click",".delete",function(e){
            e.preventDefault()
            savingtypenotifications.html("")
            savingtypedetailnotification.html("")
            $this=$(this)
            parent=$this.closest("tr")
            id=parent.attr("data-id")
            savingtypename=parent.find("td").eq(1).text()
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE saving type <strong>${savingtypename}</strong>`,
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
                            savingtypenotifications.html(showAlert("processing","Processing. Please wait ..."))
                            $.post(
                                "../controllers/savingsoperations.php",
                                {
                                    deletesavingtype:true,
                                    id
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The share type <strong>${savingtypename}</strong> has been deleted successfully.`
                                        savingtypenotifications.html(showAlert("success",notification))
                                        // parent.remove()
                                        getsavingstypefortable()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        savingtypenotifications.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        // save registration policy
        saveregistrationpolicycontrol.on("click",()=>{
    
            const generatememberno=generatemembernoscontrol.prop("checked")?1:0
            const chargeregfees=chargeregistrationfeescontrol.prop("checked")?1:0
            const registrationfees=registrationfeescontrol.val()
            const allowregistrationviacheckoff=registrationfeesviacheckoffcontrol.prop("checked")?1:0
            const registrationage=registrationagecontrol.val()
            const minmonthlydeposits=minmonthlydepositscontrol.val()
            const allowselfregistration=allowselfregistrationcontrol.prop("checked")?1:0
            const generatemembernosglobally=generatemembernosgloballycontrol.prop("checked")?1:0
            const membernoprefix=globalmembernoprefixcontrol.val()
            const currentmemberno=globalcurrentmemberno.val()
            const nonmembernoprefix=nonmembernoprefixcontrol.val()
            const currentnonmemberno=currentnonmembernocontrol.val()
    
            let errors=""
            // check blank fields
            if(Number(registrationfees)<=0){
                errors="Please enter correct registration fees amount"
                registrationfeescontrol.focus()
            }else if(Number(registrationage)<=0){
                errors="Please enter correct minimum registration age"
                registrationagecontrol.focus()
            }else if(Number(minmonthlydeposits)<=0){
                errors="Please enter correct minimum monthly deposits"
                minmonthlydepositscontrol.focus()
            }else if(membernoprefix==""){
                errors="Please enter member number prefix"
                membernoprefixfield.focus()
            }else if(Number(currentmemberno)<=0){
                errors="Please enter correct current member number"
                currentmembernofield.focus()
            }else if(nonmembernoprefix==""){
                errors="Please enter Non-member number prefix"
                nonmembernoprefixcontrol.focus()
            }else if(Number(currentnonmemberno)<=0){
                errors="Please enter correct non-member prefix"
                currentnonmembernocontrol.focus()
            }
    
            if(errors==""){
                registrationpolicynotification.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        saveregistrationpolicy:true,
                        generatememberno,
                        chargeregfees,
                        allowregistrationviacheckoff,
                        registrationage,
                        minmonthlydeposits,
                        registrationfees,
                        allowselfregistration,
                        generatemembernosglobally,
                        membernoprefix,
                        currentmemberno,
                        nonmembernoprefix,
                        currentnonmemberno
                    },
                    (data)=>{
                        if(data=="success"){
                            registrationpolicynotification.html(showAlert("success","Registration policy saved successfully"))
                        }else{
                            registrationpolicynotification.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
                )
            }else{
                registrationpolicynotification.html(showAlert("info",errors))
            }
        })
    
        function getregistrationpolicy(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getregistrationpolicy:true
                },
                (data)=>{
                    generatemembernoscontrol.prop("checked",data[0].generatememberno)
                    chargeregistrationfeescontrol.prop("checked",data[0].chargeregfee)
                    registrationfeescontrol.val(data[0].registrationfees)
                    registrationfeesviacheckoffcontrol.prop("checked",data[0].allowregistrationfeesviacheckoff)
                    registrationagecontrol.val(data[0].registrationage)
                    minmonthlydepositscontrol.val(data[0].minmonthlydeposits)
                    allowselfregistrationcontrol.prop("checked",data[0].allowselfregistration==1?true:false)
                    generatemembernosgloballycontrol.prop("checked",data[0].generatemembernosglobally==1?true:false)
                    globalmembernoprefixcontrol.val(data[0].membernoprefix)
                    globalcurrentmemberno.val(data[0].currentno)
                    nonmembernoprefixcontrol.val(data[0].nonmembernoprefix)
                    currentnonmembernocontrol.val(data[0].nonmembercurrentno)
                }
            )
        }
    
        function getloanapplicationpolicy(){
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloanapplicationpolicy:true
                },
                (data)=>{
                    minimummembershipdurationcontrol.val(data[0].minmembershipduration)
                    loanpolicysharefactorcontrol.val(data[0].loansharefactor)
                    enforceguaranteeshipecontrol.prop("checked",data[0].enforceguaranteeship==1?true:false)
                    overguaranteeloanscontrol.prop("checked",data[0].overguaranteeshares==1?true:false)
                    emailackcontrol.prop("checked", data[0].emailnotificationonapplication==1?true:false)
                    smsackcontrol.prop("checked",data[0].smsnotificationonapplication==1?true:false)
                    loanamountbasedonfreesharescontrol.prop("checked",data[0].loanbasedonfreeshares==1?true:false)
                    restrictmultipeapplicationscontrol.prop("checked",data[0].noapplicationonpendingloans==1?true:false)
                    maxrunningloanscontrol.val(data[0].maxrunningloans)
                    suspendwitnesscontrol.prop("checked",data[0].suspendwitness==1?true:false)
                }
            )
        }
    
        saveloanpolicycontrol.on("click",function(){
    
            const minmembershipduration=minimummembershipdurationcontrol.val()
            const loansharefactor=loanpolicysharefactorcontrol.val()
            const enforceguaranteeship=enforceguaranteeshipecontrol.prop("checked")?1:0
            const overguaranteeshares=overguaranteeloanscontrol.prop("checked")?1:0
            const emailack=emailackcontrol.prop("checked")?1:0
            const smsack=smsackcontrol.prop("checked")?1:0
            const loanbasedonfreeshares=loanamountbasedonfreesharescontrol.prop("checked")?1:0
            const noapplicationonpendingloans=restrictmultipeapplicationscontrol.prop("checked")?1:0
            const maxrunningloans=Number(maxrunningloanscontrol.val())
            const suspendwitness=suspendwitnesscontrol.prop("checked")?1:0
            
            $.post(
                "../controllers/settingoperations.php",
                {
                    saveloanpolicy:true,
                    minmembershipduration,
                    loansharefactor,
                    enforceguaranteeship,
                    overguaranteeshares,
                    emailack,
                    smsack,
                    loanbasedonfreeshares,
                    noapplicationonpendingloans,
                    maxrunningloans,
                    suspendwitness
                },
                (data)=>{
                    if(data=="success"){
                        loanapplicationnotification.html(showAlert("success","Loan policy saved successfully"))
                    }else{
                        loanapplicationnotification.html(showAlert("danger",`Sorry an error occured ${data}`))
                    }
                }
            )
        })
    
        function getloanchargeitemsfortable(){
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloanchargeitems:true
                },
                (data)=>{
                    let results=''
                    data.forEach((charge,index)=>{
                        results+=`<tr data-id='${charge.applicablechargeid}'><td>${Number(index+1)}</td>`
                        results+=`<td>${charge.chargedescription}</td>`
                        results+=`<td>${$.number(charge.amount)}</td>`
                        results+=`<td>${charge.required==1?'Yes':'No'}</td>`
                        results+=`<td>${charge.percentage==1?'Yes':'No'}</td>`
                        results+=`<td>${formatDate(charge.dateadded)}</td>`
                        results+=`<td>${charge.addedbyname}</td>`
                        // add edit and delete icons
                        results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-lg fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='delete'><span><i class='fal fa-lg fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    loanchargeslist.find("tbody").html(results)
                }
            )
        }
    
        saveloanchargecontrol.on("click",function(){
    
            const chargeid=loanchargeidcontrol.val()
            const chargename=loanchargedescriptioncontrol.val().trim().replace("'","''")
            const amount=loanchargeamountcontrol.val()
            const required=loanchargerequiredcontrol.prop("checked")?1:0
            const percentage=loanchargepercentagecontrol.prop("checked")?1:0
            let errors=""
    
            // check for blank fields
            if(chargename==""){
                errors="Please provide charge name"
                loanchargedescriptioncontrol.focus()
            }else if(Number(amount)<=0){
                errors="Please provide correct amount"
                loanchargeamountcontrol.focus()
            }
    
            if(errors==""){
                loanchargedetailnotification.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/loanoperations.php",
                    {
                        saveloanchargeitem:true,
                        chargeid,chargename,amount,required,percentage
                    },
                    (data)=>{
                        if(data=="success"){
                            loanchargedetailnotification.html(showAlert("success","Loan charge has been saved successfully"))
                            // clear form
                            clearloanchargesform()
                            loanchargedescriptioncontrol.focus()
                            // refresh list
                            getloanchargeitemsfortable()
                        }else if(data=="exists"){
                            loanchargedetailnotification.html(showAlert("info",`<strong>${chargename}</strong> already exists in the system`))
                        }else{
                            loanchargedetailnotification.html(showAlert("danger",`Sorry an error occured. ${data}`))
                        }
                    }
                )
            }else{
                loanchargedetailnotification.html(showAlert("info",errors))
            }
        })
    
        function clearloanchargesform(){
            loanchargeidcontrol.val("0")
            loanchargedescriptioncontrol.val("")
            loanchargeamountcontrol.val("")
            loanchargerequiredcontrol.prop("checked",false)
            loanchargepercentagecontrol.prop("checked",false)
        }
    
        // delete loan charge
        loanchargeslist.on("click",".delete",function(e){
            e.preventDefault()
            const $this=$(this)
            const chargeid=$this.closest("tr").attr("data-id")
            const description=$this.closest("tr").find("td").eq(1).text()
            // confirm with bootbox
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE <strong>${description}</strong>`,
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
                            loachargenotification.html(showAlert("processing","Processing. Please wait ...",1))
                            $.post(
                                "../controllers/loanoperations.php",
                                {
                                    deleteloancharge:true,
                                    chargeid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The loan charge <strong>${description}</strong> has been deleted successfully.`
                                        loachargenotification.html(showAlert("success",notification))
                                        // parent.remove()
                                        getloanchargeitemsfortable()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        loachargenotification.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        // edit loan charge
        loanchargeslist.on("click",".edit",function(e){
            e.preventDefault()
            const chargeid=$(this).closest("tr").attr("data-id")
            loanchargedetailnotification.html(showAlert("processing","Processing. Please wait ...",1))
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloanchargeitemdetails:true,
                    chargeid
                },
                (data)=>{
                    loanchargeidcontrol.val(data[0].applicablechargeid)
                    loanchargedescriptioncontrol.val(data[0].chargedescription)
                    loanchargeamountcontrol.val(data[0].amount)
                    loanchargerequiredcontrol.prop("checked",data[0].required==1?true:false)
                    loanchargepercentagecontrol.prop("checked",data[0].percentage==1?true:false)
                    loanchargeabledetailsmodal.modal("show")
                    loachargenotification.html("")
                    loanchargedetailnotification.html("")
                }
            )
        })
    
        function getmemberapplicablechargesfortable(){
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getmemberapplicablecharges:true
                },
                (data)=>{
                    let results=''
                    data.forEach((charge,index)=>{
                        results+=`<tr data-id='${charge.chargeid}'><td>${Number(index+1)}</td>`
                        results+=`<td>${charge.description}</td>`
                        results+=`<td>${charge.recurring==1?'Yes':'No'}</td>`
                        results+=`<td>${$.number(charge.amount)}</td>`
                        results+=`<td>${charge.accountname} - ${charge.accountcode}</td>`
                        results+=`<td>${formatDate(charge.dateadded)}</td>`
                        results+=`<td>${charge.addedbyname}</td>`
                        // add edit and delete buttons
                        results+="<td><a href='javascript void(0)' class='edit'><span><i class='fal fa-lg fa-edit fa-sm'></i></span></a></td>"
                        results+="<td><a href='javascript void(0)' class='delete'><span><i class='fal fa-lg fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    applicablechareslist.find("tbody").html(results)
                }
            )
        }
    
        // save loan charge
        saveapplicablechargecontrol.on("click",()=>{
            const chargeid=applicablechargeidcontrol.val()
            const glaccountid=applicablechargeglaccountcontrol.val()
            const description=applicablechargedescriptioncontrol.val()
            const amount=applicablechargeamountcontrol.val()
            const recurring=applicablechargerecurringcontrol.prop("checked")?1:0 
            let errors=''        
            // const applicablechargesnotification=$("#applicablechargesnotification")
            if(description==""){
                errors="Please enter charge description"
                applicablechargedescriptioncontrol.focus()
            }else if(Number(amount)<0){
                errors="Please enter correct amount"
                applicablechargeamountcontrol.focus()
            }else if(glaccountid==''){
                errors="Please select account charged"
                applicablechargeglaccountcontrol.focus()
            }
    
            if(errors==''){
                applicablechargenotificationdetail.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/settingoperations.php",
                    {
                        savememberapplicablecharge:true,
                        chargeid,
                        description,
                        glaccountid,
                        amount,
                        recurring
                    },
                    (data)=>{
                        if(data=="success"){
                            applicablechargenotificationdetail.html(showAlert("success",`Member charge <strong>${description}</strong> saved successfully`))
                            // clear form
                            clearapplicablechargesform()
                            applicablechargeglaccountcontrol.focus()
                            // refresh list
                            getmemberapplicablechargesfortable()
                        }else if(data=="exists"){
                            applicablechargenotificationdetail.html(showAlert("info",`Member charge <strong>${$description}</strong> already exists in the system`))
                        }else{
                            applicablechargenotificationdetail.html(showAlert("danger",`Sorry an erro occured. ${data}`))
                        }
                    }
                )
            }else{
                applicablechargenotificationdetail.html(showAlert("info",errors))
            }
        })
    
        applicablechareslist.on("click",".edit",function(e){
            e.preventDefault();
            const chargeid=$(this).closest("tr").attr("data-id")
            $.getJSON(
                "../controllers/settingoperations.php",
                {
                    getmemberapplicabelchargedetails:true,
                    chargeid
                },
                (data)=>{
                    applicablechargeidcontrol.val(data[0].chargeid)
                    applicablechargeglaccountcontrol.val(data[0].glaccountid)
                    applicablechargedescriptioncontrol.val(data[0].description)
                    applicablechargeamountcontrol.val(data[0].amount)
                    applicablechargerecurringcontrol.prop("checked",data[0].recurring==1?true:false) 
                    memberchargedetailsmodal.modal("show")
                    applicablechargenotificationdetail.html("")
                }
            )
        })
    
        applicablechareslist.on("click",".delete",function(e){
            e.preventDefault()
            const $this=$(this)
            const parent=$this.closest("tr")
            const chargeid=parent.attr("data-id")
            const description=parent.find("td").eq(1).text()
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE <strong>${description}</strong>`,
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
                            applicablechargesnotification.html(showAlert("processing","Processing. Please wait ...",1))
                            $.post(
                                "../controllers/settingoperations.php",
                                {
                                    deletememberapplicablecharge:true,
                                    chargeid
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The loan charge <strong>${description}</strong> has been deleted successfully.`
                                        applicablechargesnotification.html(showAlert("success",notification))
                                        // parent.remove()
                                        getmemberapplicablechargesfortable()
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        applicablechargesnotification.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        function clearapplicablechargesform(){
            applicablechargeidcontrol.val("0")
            applicablechargeglaccountcontrol.val("")
            applicablechargedescriptioncontrol.val("")
            applicablechargeamountcontrol.val("")
            applicablechargerecurringcontrol.prop("checked",false) 
        }
    
        // save institution details 
        saveinstitiondetailscontrol.on("click",function(){
    
            const regdocid=institutionregdoccontrol.val()
            const categoryid=institutioncategorycontrol.val()
            const name=institutionnamecontrol.val()
            const regdocno=institutionregdocnocontrol.val()
            const sasraregno=institutionsasraregnocontrol.val()
            const pinno=institutionpinnocontrol.val()
            const physicaladdress=institutionphysicaladdresscontrol.val()
            const postaladdress=institutionpostaladdrescontrol.val()
            const town=institutiontowncontrol.val()
            const postalcode=institutionpostalcodecontrol.val()
            const mobile=institutionmobilecontrol.val()
            const email=institutionemailcontrol.val()
            const website=institutionwebsitecontrol.val()
            const attachment=$("#institutionlogo")[0].files[0]
            const latlong=institutiongpscoordinatescontrol.val().trim().split(",")
            const enablememberportal=enablememberportalfield.prop("checked")?1:0
    
            let latitude=0, longitude=0
            let errors=''
    
            if (latlong.length==2){
                latitude=latlong[0]
                longitude=latlong[1]
            }
    
            // check for blank fields
            if(name==""){
                errors="Please provide institution name"
                institutionnamecontrol.focus()
            }else if(regdocid==""){
                errors="Please select institution registration document"
                institutionregdoccontrol.focus()
            }else if(physicaladdress==""){
                errors="Please provide institution physical address"
                validationurlfield.focus()
            }else if(regdocno==""){
                errors="Please provide institution registration number"
                institutionregdocnocontrol.focus()
            }else if(categoryid==""){
                errors="Please select institution category"
                institutioncategorycontrol.focus()
            }
            if(errors==''){
                let fd=new FormData()
                fd.append("updateinstitutiondetails",true)
                fd.append("regdocid",regdocid)
                fd.append("name",name)
                fd.append("categoryid",categoryid)
                fd.append("regdocno",regdocno)
                fd.append("sasraregno",sasraregno)
                fd.append("pinno",pinno)
                fd.append("longitude",longitude)
                fd.append("latitude",latitude)
                fd.append("physicaladdress",physicaladdress)
                fd.append("postaladdress",postaladdress)
                fd.append("town",town)
                fd.append("postalcode",postalcode)
                fd.append("mobile",mobile)
                fd.append("email",email)
                fd.append("website",website)
                fd.append("enablememberportal",enablememberportal)
    
                if(logochanged==true){
                    fd.append("file",attachment)
                }
    
                institutiondetailnotification.html(showAlert("processing","Processing. Please wait ...",1))
                $.ajax({
                    url:   "../controllers/institutionoperations.php",
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(data){
                        if(data=="success"){
                            notifications="Institution details saved successfully"
                            institutiondetailnotification.html(showAlert("success",notifications))
                        }else{
                            notifications=`Sorry an error occured ${data}`
                            institutiondetailnotification.html(showAlert("danger",notifications,1))
                        }
                        gotoinstitutionnotifications()
                    }
                })
            }else{
                institutiondetailnotification.html(showAlert("info",errors))
                gotoinstitutionnotifications()
            }   
        })
    
        // mark current location
        function  showPosition(position){
            institutiongpscoordinatescontrol.val(`${position.coords.latitude},${position.coords.longitude}`)
        }
    
        institutionmarkloactioncontrol.on("click",function(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                institutiondetailnotification.html(showAlert("danger","Geolocation is not supported by this browser.",0)) ;
            }
        })
    
        function getinstitutiondetails(){
            const instititionlogo=$(".institutionlogo")
            $.getJSON(
                "../controllers/settingsoperations.php",
                {
                    getinstitution:true
                },
                (data)=>{
                    data=data[0]
                    institutionregdoccontrol.val(data.regdocid)
                    institutioncategorycontrol.val(data.categoryid)
                    institutionnamecontrol.val(data.companyname)
                    institutionregdocnocontrol.val(data.regdocno)
                    institutionsasraregnocontrol.val(data.sasraregno)
                    institutionpinnocontrol.val(data.pinno)
                    institutionphysicaladdresscontrol.val(data.physicaladdress)
                    institutionpostaladdrescontrol.val(data.postaladdress)
                    institutiontowncontrol.val(data.town)
                    institutionpostalcodecontrol.val(data.postalcode)
                    institutionmobilecontrol.val(data.mobile)
                    institutionemailcontrol.val(data.email)
                    institutionwebsitecontrol.val(data.website)
                    enablememberportalfield.prop("checked",data.enablememberportal==1?true:false)
                    if(data.logo=='' || data.logo===null){
                        instititionlogo.attr("src","../images/noimage.jpg")
                    }else{
                        instititionlogo.attr("src",data.logo)
                    }
    
                    if(data.longitude && data.latitude){
                        institutiongpscoordinatescontrol.val(`${data.latitude},${data.longitude}`)
                    }
                }
            )
        }
    
        const loantypeapplicablechargelist=$("#loantypeapplicablecharge")
        const loantypeapplicablechareamount=$("#loanchargeapplicableamount")
        const addloantypecharge=$("#addloantypecharge")
        const loantypeapplicablechargestable=$("#loantypeapplicablechargestable")
    
        // getloanchargeables(loantypeapplicablechargelist, 'choose')
    
        loantypeapplicablechargelist.on("change",function(){
            chargeid=$(this).val()
            if(chargeid!==""){
                // get loan charge details
                $.getJSON(
                    "../controllers/loanoperations.php",
                    {
                        getloanchargeitemdetails:true,
                        chargeid
                    },
                    (data)=>{
                        data=data[0]
                        loantypeapplicablechareamount.attr("data-amount",data.amount)
                        loantypeapplicablechareamount.val($.number(data.amount))
                        loantypeapplicablechareamount.attr("data-percentage",data.percentage)
                        loantypeapplicablechareamount.attr("data-required",data.required)
                    }
                )
            }
        })
    
        addloantypecharge.on("click",()=>{
    
            const chargeid=loantypeapplicablechargelist.val()
            const amount=loantypeapplicablechareamount.val()
            const loantypeid=loanidfield.val()
            const id=loantypeapplicablechareamount.attr("data-id")
            const percentage=loantypeapplicablechareamount.attr("data-percentage")
            const required=loantypeapplicablechareamount.attr("data-required")
            const chargedescription=loantypeapplicablechargelist.find("option:selected").text()
    
            let errors=''
            if(chargeid==""){
                errors="Please select loan chargeable item first"
                loantypeapplicablechargelist.focus()
            }else if(Number(amount)<=0){
                errors="Please provide loan chargeable amount"
                loantypeapplicablechareamount.focus()
            }
    
            if(errors==""){
                // save the loan charge and add to the list
                loanerrors.html(showAlert("processing","Processing. Please wait ...",1))
                $.post(
                    "../controllers/loanoperations.php",
                    {
                        saveloantypeapplicablecharge:true,
                        id,
                        loantypeid,
                        chargeid,
                        amount,
                        percentage,
                        required
                    },
                    (data)=>{
                        if(data=="success"){
                            loanerrors.html()
                            loantypeapplicablechargelist.val("")
                            loantypeapplicablechareamount.val("")
                            loanerrors.html(showAlert("success",`<strong>${chargedescription}</strong> added successfully.`))
                            // refresh application loan type charges
                            getapplicableloantypecharges(loantypeid)
                        }else if(data=="exists"){
                            loanerrors.html(showAlert("info",`<strong>${chargedescription}</strong> already added to the loan.`))
                        }else{
                            loanerrors.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
                )
            }else{
                loanerrors.html(showAlert("info",errors))
            }
        })
    
        function getapplicableloantypecharges(loantypeid){
            $.getJSON(
                "../controllers/loanoperations.php",
                {
                    getloantypeapplicablecharges:true,
                    loantypeid
                },
                (data)=>{
                    let results=''
                    data.forEach((charge,index)=>{
                        results+=`<tr data-id='${charge.id}'><td>${Number(index+1)}</td>`
                        results+=`<td>${charge.chargedescription}</td>`
                        results+=`<td>${$.number(charge.amount)}</td>`
                        results+=`<td>${charge.percentage==1?'Yes':'No'}</td>`
                        results+=`<td>${charge.required==1?'Yes':'No'}</td>`
                        results+="<td><a href='javascript void(0)' class='delete'><span><i class='fal fa-lg fa-trash-alt fa-sm'></i></span></a></td></tr>"
                    })
                    loantypeapplicablechargestable.find("tbody").html(results)
                }
            )
        }
    
        loantypeapplicablechargestable.on("click",".delete",function(e){
            e.preventDefault()
            const parent=$(this).closest("tr")
            const id=parent.attr("data-id")
            const description=parent.find("td").eq(1).text()
            const loantypeid=loanidfield.val()
    
            bootbox.dialog({
                // title: "Confirm Item Removal!",
                message: `Are you sure you want to DELETE <strong>${description}</strong>`,
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
                            applicablechargesnotification.html(showAlert("processing","Processing. Please wait ...",1))
                            $.post(
                                "../controllers/loanoperations.php",
                                {
                                    deleteloantypeapplicablecharge:true,
                                    id
                                },
                                (data)=>{
                                    let notification=""
                                    if(data.trim()=="success"){
                                        notification=`The loan charge <strong>${description}</strong> has been deleted successfully.`
                                        loanerrors.html(showAlert("success",notification))
                                        // parent.remove()
                                        getapplicableloantypecharges(loantypeid)
                                    }else{
                                        notification=`Sorry an error occured ${data}`
                                        loanerrors.html(showAlert("danger",notification))
                                    }
                                }
                            )
                        }
                    }
                }
            })
        })
    
        const loanoffsetineterestmethodcontrol=$("#offsetinterestmethod")
        const loanoffsetinterestratecontrol=$("#offsetinterestrate")
        const loanrepayfrequencycontrol=$("#loanrepayfrequency")
        const loaninsurercontrol=$("#loaninsurer")
        const loanmaxdurationcontrol=$("#loanmaxrepaymentduration")
        const loanfixrepayperiodcontrol=$("#loanfixrepaymentperiod")
        const enforceguaranteecontrol=$("#loanenforceguaranteeship")
        const overridemembermaxloancontrol=$("#overridemembermaxloan")
        const membermustselfguaranteecontrol=$("#membermustselfguarantee")
    
        // getinterestmethods(loanoffsetineterestmethodcontrol, 'choose')
        // getloanrepaycycles(loanrepayfrequencycontrol,'choose')
        // getinsurancecompanies(loaninsurercontrol,'choose')
    
        const restrictmultipeapplicationscontrol=$("#loanapplicationrestrictmultipleapplication")
        const loanamountbasedonfreesharescontrol=$("#loanapplicationbasedonfreeshares")
    
        const loanapplytomembers=$("#loanapplytomembers")
        const loanapplytononmembers=$("#loanapplytononmembers")
    
        const nonmembernoprefixcontrol=$("#nonmembernoprefix")
        const currentnonmembernocontrol=$("#currentnonmemberno")
    
        const oldapidiv=$("#oldapi")
        const newapidiv=$("#newapi")
        const oldapiradiobutton=$("#oldapiused")
        const newapiradiobutton=$("#newapiused")
        const tokenfield=$("#token")
    
        oldapiradiobutton.on("click",function(){
            if($(this).prop("checked")){
                oldapidiv.show()
                newapidiv.hide()
            }
        })
    
        newapiradiobutton.on("click",function(){
            if($(this).prop("checked")){
                oldapidiv.hide()
                newapidiv.show()
            } 
        })
    })
})