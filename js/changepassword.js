$(document).ready(function(){
    const currentmenu=$("#dashboard")
    setactivemenu(currentmenu)

    const oldpasswordfield=$("#oldpassword"),
    newpasswordfield=$("#newpassword"),
    confirmnewpasswordfield=$("#confirmnewpassword"),
    notifications=$("#changepasswordnotifications"),
    changepassword=$("#changepassword"),
    useridfield=$("#userid"),
    inputfield=$("input")

    // Hide errors
    inputfield.on("input",function(){
        notifications.html("")
    })

    getloggedinuser()

    // get logged in user
    function getloggedinuser(){
        $.getJSON(
            "../controllers/useroperations.php",
            {
                getloggedinuser:true
            },
            function(data){
                // console.log("data fetched")
                // console.log(data)
                useridfield.val(data[0].id)
            }
        )
    }
    
   // change password button
    changepassword.on("click", function() {
        const userid = useridfield.val(),
            newpassword = newpasswordfield.val(),
            oldpassword = oldpasswordfield.val(),
            confirmnewpassword = confirmnewpasswordfield.val(),
            changepasswordonlogon = 0;

        let errors = '';

        // Check for blank fields
        if (oldpassword == "") {
            errors = "Provide your Old Password";
            oldpasswordfield.focus();
        } else if (newpassword == "") {
            errors = "Provide your New Password";
            newpasswordfield.focus();
        }
        // Check if password entries do not match 
        else if (newpassword != confirmnewpassword) {
            errors = "New password entries don't match";
            notifications.html(showAlert("info", errors));
        }

        if (!errors) {
            notifications.html(showAlert("processing", "Processing. Please wait ..."));
            $.post(
                '../controllers/useroperations.php',
                {
                    changeuserpassword: true,
                    userid,
                    newpassword,
                    oldpassword,
                    changepasswordonlogon
                },
                (data) => {
                    if (data.status === "Success") {
                        notifications.html(showAlert("success", `Your Password has been Changed Successfully`));
                    } else if (data.password == "invalid old password") {
                        notifications.html(showAlert("danger", `Invalid Old Password`));
                    } else {
                        notifications.html(showAlert("success", `Your Password has been Changed Successfully`, 1));
                    }
                }
            );
        } else {
            notifications.html(showAlert("info", errors));
        }
    });
})