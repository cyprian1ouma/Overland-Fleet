$(document).ready(function(){
    const usernamefield=$("#inputEmail"),
        passwordfield=$('#inputPassword'),
        loginbutton=$("#loginbutton"),
        errordiv=$("#errordiv"),
        forgotpasswordbutton=$("#forgotpasswordbutton"),
        recoverpasswordiv=$("#recoverpassworddiv"),
        logindiv=$("#logindiv"),
        resetpasswordbutton=$("#recoverpasswordbutton"),
        backtologinformbutton=$("#backtologinlink"),
        recoveremailaddressfield=$("#recoverpasswordemail"),
        recoverpassworderrordiv=$("#recoverpassworderrors"),
        registerbutton=$("#register"),
        emailpattern=/^([\w\.]{2,})@([\w\.]{2,})\.([a-z]{2,})([\.a-z]{2,})?$/,
        INACTIVITY_TIMEOUT = 300000; // 5 MINUTES
        let inactivityTimer;

    logindiv.show()
    recoverpasswordiv.hide()

    forgotpasswordbutton.on("click",()=>{
        logindiv.hide()
        recoverpasswordiv.show()
    })

    backtologinformbutton.on("click",()=>{
        logindiv.show()
        recoverpasswordiv.hide() 
    })

    resetpasswordbutton.on("click",()=>{
        const username=recoveremailaddressfield.val().trim()
        if(username!==""){
            recoverpassworderrordiv.html(showAlert("Processing","Processing. Please wait ...",1))
            $.post(
                "controllers/useroperations.php",
                {
                    recoveruserpassword:true,
                    username
                },
                (data)=>{
                    data=data.trim()
                    if(data=="success"){
                        recoverpassworderrordiv.html(showAlert("success","Password reset successful. Check your email for further instructions.",1))
                    } else if(data=="not exists"){
                        recoverpassworderrordiv.html(showAlert("info","Invalid username. Please try again",1))
                    }else{
                        recoverpassworderrordiv.html(showAlert("danger",`Sorry an error occured ${data}`,1))
                    }
                }
            )
        }else{
            recoverpassworderrordiv.html(showAlert("info","Please enter your username"))
        }
    })

    loginbutton.on("click", function() {
        const username = usernamefield.val(),
            password = passwordfield.val();

            console.log(username,password);
            
    
        let errors = "";
    
        if (username == "") {
            errors = "Please provide username";
        } else if (password == "") {
            errors = "Please provide password";
        }
    
        if (errors == "") {
            $.post(
                "controllers/useroperations.php",
                {
                    loginuser: true,
                    username: username,
                    password: password
                },
                function(data) {
                    // Check if the response is valid JSON
                    if (data && data.status) {
                        if (data.status == "success") {
                            // Redirect to the dashboard if login is successful
                            window.location.href = "views/dashboard.php";
                        } else if (data.status == "change password") {
                            // Redirect to the change password page
                            window.location.href = "views/changepassword.php";
                        } else if (data.status == "inactive") {
                            errors = "Account disabled.";
                        } else if (data.status == "invalid credentials") {
                            errors = "Invalid credentials.";
                        }
                    } else {
                        errors = "Sorry, an error occurred: " + data;
                    }
    
                    // If there are any errors, show them
                    if (errors != "") {
                        errordiv.html(showAlert("info", errors));
                    }
                },
                'json' // Ensure that the response is treated as JSON
            );
        } else {
            errordiv.html(showAlert("info", errors));
        }
    });
    

    usernamefield.on("input",function(){
        errordiv.html("")
    })

    passwordfield.on("input",function(){
        errordiv.html("")
    })

    registerbutton.on("click",function(e){
        e.preventDefault()
        window.location.href="registration.php"
    })

    recoveremailaddressfield.on("keyup",function(){
        recoverpassworderrordiv.html("")
    })


    // logout user due to inactivity
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logoutUser, INACTIVITY_TIMEOUT);
    }
    
    const logoutUser = () => {
        window.location.replace("./index.php");
    }
    
    //Attach event listeners to monitor user activity
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);
    document.addEventListener("scroll", resetInactivityTimer);
})