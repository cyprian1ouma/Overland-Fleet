
$(document).ready(()=>{
    const titlefield=$("#title"),
        emailfields=$("#emailfields"),
        mobilefields=$("#mobilefields"),
        emailfield=$("#email"),
        mobilefield=$("#mobile"),
        signupbutton=$("#signup"),
        signinbutton=$("#signin"),
        usernamefield=$("#username"),
        passwordfield=$("#password"),
        notifications=$("#notifications"),
        inputfields=$("input"),
        selectfield=$("select"),
        mainform=$(".mainform"),
        changepasswordform=$(".changepassword"),
        forgotpasswordform=$("#forgotpasswordform"),
        forgotpasswordlink=$("#forgotpasswordlink"),
        resetpasswordbutton=$("#resetpassword"),
        resetpasswordsigninbutton=$("#restpasswordsignin"),
        resetpasswordstaffno=$("#forgotpasswordusername"),
        oldpasswordfield=$("#oldpassword"),
        newpasswordfield=$("#newpassword"),
        confirmnewpasswordfield=$("#confirmnewpassword"),
        changepasswordbutton=$("#changepassword"),
        changepasswordsigninbutton=$("#changepasswordsignin"),
        useridfield=$("#userid")

    let currentmenu="signin"

    inputfields.on("input",()=>{
        notifications.html("")
    })

    selectfield.on("change",()=>{
        inputfields.trigger("input")
    })

    emailfields.css('max-height',"0")
    mobilefields.css('max-height',"0")
    titlefield.html("Sign In")
    signupbutton.addClass("disabled")
    signinbutton.removeClass("disabled")

    signupbutton.on("click",()=>{
        // hide email and mobile fields and change the title
        // console.log(currentmenu)
        notifications.html("")
        if(currentmenu=="signin"){
            emailfields.css('max-height',"60px")
            mobilefields.css('max-height',"60px")
            titlefield.innerHTML="Sign Up"
            signupbutton.removeClass("disabled")
            signinbutton.addClass("disabled")
            currentmenu="signup"
            emailfield.focus()
        }else{
            // register user
            const staffno=usernamefield.val(),
                password=passwordfield.val(),
                email=emailfield.val(),
                mobile=mobilefield.val()
            let errors=""
            // check for blank fields
            if(!validatefielddata(email,'email')){
                errors="Please provide correct email address format"
                emailfield.focus()
            }else if(!validatefielddata(mobile,'mobile')){
                errors="Please provide correct mobile mnumber format"
                mobilefield.focus()
            }else if(staffno==""){
                errors="Please provide your staff number"
                usernamefield.focus()
            }else if(password==""){
                errors="Please provide complex password"
                passwordfield.focus()
            }

            if(errors==""){
                notifications.html(showAlert("processing",`Processing. Please wait ...`,1))
                $.post(
                    "../controllers/employeeoperations.php",
                    {
                        registeremployeeasuser:true,
                        staffno:staffno,
                        mobile,
                        email,
                        password,
                    },
                    (data)=>{
                        if(isJSON(data)){
                            data=JSON.parse(data)
                            if(data.status=="success"){
                                notifications.html(showAlert("success",`Your portal account has been activated successfully. Check your email for further instructions`))
                                // clear sign in fields and show login form
                                clearregistrationform()
                                // return to login form
                                emailfields.css('max-height',"0")
                                mobilefields.css('max-height',"0")
                                titlefield.html("Sign In")
                                signupbutton.addClass("disabled")
                                signinbutton.removeClass("disabled")
                                currentmenu="signin"
                            }else if(data.status=="not exists"){
                                notifications.html(showAlert("info",`Sorry, staff number <strong>${staffno}</strong> was not found in the system`))
                            }else if(data.status=="exists"){
                                if(data.message=="email address exists")
                                    notifications.html(showAlert("info",`Email address already exists`))
                                else if(data.message="mobile nor exists"){
                                    notifications.html(showAlert("info",`Mobile number already exists`))
                                }
                            }
                        }else{
                            notifications.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }
                )
            }else{
                notifications.html(showAlert("info",errors))
            }
        }
    })

    function clearregistrationform(){
        emailfield.val("")
        mobilefield.val("")
        usernamefield.val("")
        passwordfield.val("")
    }
    

    signinbutton.on("click",()=>{
        // console.log(currentmenu)
        notifications.html("")
        if(currentmenu=="signup"){
            // hide emaail and mobile fields and change the title
            emailfields.css('max-height',"0")
            mobilefields.css('max-height',"0")
            titlefield.html("Sign Up")
            signinbutton.removeClass("disabled")
            signupbutton.addClass("disabled")
            currentmenu="signin"
            usernamefield.focus()
        }else{
            const username=sanitizestring(usernamefield.val()),
                password=sanitizestring(passwordfield.val())
            let errors=""
            // check blank fields
            if(username==""){
                errors="Please provide username"
                usernamefield.focus()
            }else if(password==""){
                errors="Please provide password"
                passwordfield.focus()
            }

            if(errors==""){
                notifications.html(showAlert("processing","Porcessing. Please wait ..."))
                $.post(
                    "../controllers/useroperations.php",
                    {
                        loginuser:true,
                        username,
                        password
                    },
                    (data)=>{
                        if(isJSON(data)){
                            data=JSON.parse(data)
                            if(data.status=="success"){
                                window.location.href="dashboard.php"
                            }else if(data.status=="invalid"){
                                notifications.html(showAlert("info",`Invalid username or password`))
                            }else if(data.status=="inactive"){
                                notifications.html(showAlert("info",`Account inactive. Contact system administrator`))
                            }else if(data.status=="change password"){
                                // show change password fields
                                notifications.html(showAlert("info","Please change your password before proceeding",1))
                                titlefield.html("Password Change")
                                useridfield.val(data.userid)
                                mainform.hide()
                                changepasswordform.show()
                                oldpasswordfield.focus()
                            }
                        }else{
                            notifications.html(showAlert("danger",`Sorry an error occured ${data}`))
                        }
                    }                
                )
            }else{
                notifications.html(showAlert("info",errors))
            }
        }
    })

    forgotpasswordlink.on("click",()=>{
        titlefield.html("Reset Password")
        forgotpasswordform.show()
        mainform.hide()
    })

    resetpasswordsigninbutton.on("click",()=>{
        forgotpasswordform.hide()
        mainform.show()
        titlefield.html("Sign in")
    })


    resetpasswordbutton.on("click",()=>{
        const staffno=resetpasswordstaffno.val()
        let errors=""
        if(staffno==""){
            errors="Please provide your staff number"
            notifications.html(showAlert("info",errors))
            resetpasswordstaffno.focus()
        }else{
            notifications.html(showAlert("processing","Processing. Please wait ...",1))
            $.post(
                "../controllers/employeeoperations.php",
                {
                    resetemployeeportalpassword:true,
                    staffno
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            notifications.html(showAlert("success",`Your password has been reset successfully. Check email for more instructions.`))
                            resetpasswordstaffno.val("")
                            mainform.show()
                            forgotpasswordform.hide()
                            usernamefield.focus()
                            titlefield.html("Sign in")
                        }else if(data.status=="not exists"){
                            notifications.html(showAlert("info",`Staff number provided does not exists`))
                        }
                    }else{
                        notifications.html(showAlert("danger",`Sorry an error occured ${data}`,1))
                    }
                }
            )
        }
    })

    // Change Password
    changepasswordbutton.on("click",()=>{
        const oldpassword=sanitizestring(oldpasswordfield.val()),
            newpassword=sanitizestring(newpasswordfield.val()),
            confirmnewpassword=sanitizestring(confirmnewpasswordfield.val()),
            userid=useridfield.val()

        let errors=""
        // check blank fields
        if(oldpassword==""){
            errors="Please provide current password"
            oldpasswordfield.focus()
        }else if(newpassword==""){
            errors="Please ptovide your new password"
            newpasswordfield.focus()
        }else if(newpassword!==confirmnewpassword){
            errors="New password entries do not match"
        }

        if(errors==""){
            notifications.html(showAlert("processing","Processing. Please wait ...",1))
            $.post(
                "../controllers/useroperations.php",
                {
                    changeuserpassword:true,
                    userid,
                    oldpassword,
                    newpassword
                },
                (data)=>{
                    if(isJSON(data)){
                        data=JSON.parse(data)
                        if(data.status=="success"){
                            window.location.href="dashboard.php?message='password change successful'"
                        }else if(data.status="invalid"){
                            notifications.html(showAlert("info",`Invalid old password, please try again`))
                            oldpasswordfield.focus()
                        }
                    }else{
                        notifications.html(showAlert("danger",`Sorry an error occured ${data}`))
                    }
                }
            )
        }else{
            notifications.html(showAlert("info",errors))
        }
    })
})
