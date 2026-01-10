
<?php
    require_once( 'db.php');
    require_once('mail.php');

    $mail =new mail();

    class User extends db{

         function generateRandomString($length = 10) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!$&#?';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        function checkUser($userid,$field,$searchvalue){ 
            $sql="CALL `sp_checkuser`({$userid},'{$field}','{$searchvalue}')";
            $rst=$this->getData($sql);   
            if($rst->rowCount()){
                return true;
            }else{
                return false;
            }         
        }
      
        function saveUser($userid,$username,$password,$salt,$firstname,$middlename,$lastname,$mobile,$email,$systemadmin,$accountactive,$changepasswordonlogon,$institutionid){
            // check username
            if($this->checkUser($userid,'username',$username)){
                return ["status"=>"exists","message"=>"Sorry, the username is already in use."];
            }else if ($this->checkUser($userid,'email',$email)){
               //check email 
                return ["status"=>"exists","message"=> "Sorry, the email address is already in use."];
            }else if ($this->checkUser($userid,'mobile',$mobile)){
                // check mobile
                return ["status"=>"exists","message"=> "Sorry, the mobile phone number is already in use."];
            }else{
                $this->platform = $_SERVER['HTTP_USER_AGENT'];
                $sql = $sql = "CALL `sp_saveuser`({$userid},'{$password}','{$salt}',{$systemadmin},'{$username}','{$firstname}','{$middlename}','{$lastname}','{$email}','{$mobile}',{$changepasswordonlogon},
                {$accountactive},{$_SESSION['userid']},{$institutionid},'{$this->platform}')";
                // error_log($sql);
                $rst = $this->getData($sql); 
                // Process the result as necessary
                do {
                    $row = $rst->fetch(); 
                    if (array_key_exists("userid", $row)) {
                        return $row['userid'];
                    }
                } while ($rst->nextRowset()); 
            }
        }

    
        function getUserNameFromId($userid){
            $sql="CALL `sp_getuserbyid` ({$userid})";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()){
                $row=$rst->fetch();
                return $row['username'];
            }else{
                return '';
            }
        }

        function validateLoginDetails($username,$password){
           $sql="CALL `sp_getuserdetails` ('{$username}')";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()>0){
                while ($row = $rst->fetch()) {
                    if($row['password'] == md5($password)){
                        return "ok";
                    }else{
                        return "invalid password";
                    }
                }
            }else{
                return "invalid username";
            }
		}

        function getusersdetails($userid){
            $sql = "CALL `sp_getusersdetails`({$userid})";
            return $this->getJSON($sql);
        }
        

        function checkUserAccount($id,$username){
           $sql="CALL spcheckuser ({$id},'{$username}')";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()){
                return true;
            }else{
                return false;
            }
        }

        function disableUserAccount($userid){
            $sql="CALL `sp_disableuseraccount` ({$userid},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql);
            return "success";
        }

        function enableUserAccount($userid){
            $sql="CALL `sp_enableuseraccount` ({$userid},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql);
            return "success";
        }

        function changeUserPassword($userid,$oldpassword,$newpassword,$changepasswordonlogon){
            $username=$this->getUserNameFromId($userid);
            // echo $this->validateLoginDetails($username,$password);
            if($this->validateLoginDetails($username,$oldpassword)=="ok"){
                $newpassword=md5($newpassword);
                $sql="CALL `sp_changeuserpassword` ({$userid},'{$newpassword}',{$changepasswordonlogon})";
                $rst=$this->connect()->query($sql);
                
                // email user informing them their password was changed
                $username=$this->getUserNameFromId($userid);
                $sql="CALL`sp_getuserdetails`('{$username}')";
                $rst=$this->connect()->query($sql)->fetch();
                $fullname="{$rst['firstname']} {$rst['middlename']}";
                $emailaddress=$rst['email'];

                // Send the user an email with their reset password
                $message = "
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            line-height: 1.6;
                        }
                        .header {
                            font-size: 24px;
                            color: #4CAF50;
                        }
                        .content {
                            font-size: 16px;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 14px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class='header'>Hello <strong>{$fullname}</strong>,</div>
                    <div class='content'>
                        We wanted to inform you that your password has been changed successfully. 
                        If you did not initiate this change, please contact us immediately for assistance.
                    </div>
                    <div class='footer'>Kind regards,<br/>The Fleet Management System Team</div>
                </body>
                </html>
                ";
                $subject = "Your Password Has Been Changed";
                $GLOBALS['mail']->sendEmail($emailaddress,$subject,$message,'System Administrator');
                return "success";
            }else{
                return "invalid old pasword";
            }
            
        }

        function logUserIn($username, $password) {
            $sql = "CALL `sp_getuserdetails` ('{$username}')";
            $rst = $this->connect()->query($sql);

            if ($rst->rowCount()) {
                $row = $rst->fetch();
                
                if ($row['password'] === md5($password)) {
                    if ($row['accountactive'] == true) {
                        if ($row['changepasswordonlogon'] == true) {
                            $_SESSION['userid'] = $row['userid'];
                            $_SESSION['username'] = $row['firstname'] . ' ' . $row['middlename'];
                            echo json_encode(['status' => 'change password']);
                            exit();  
                        } else {
                            // Successful login
                            $_SESSION['userid'] = $row['userid'];
                            $_SESSION['username'] = $row['firstname'] . ' ' . $row['middlename'];
                            echo json_encode(['status' => 'success']);
                            exit(); 
                        }
                    } else {
                        // Account is inactive
                        echo json_encode(['status' => 'inactive']);
                        exit(); 
                    }
                } else {
                    // Invalid username or password
                    echo json_encode(['status' => 'invalid credentials']);
                    exit();  // Exit the function to prevent further code execution
                }
            } else {
                // User not found
                echo json_encode(['status' => 'invalid credentials']);
                exit();  // Exit the function to prevent further code execution
            }
        }
        

        function logUserOut(){
            session_destroy();
        }

        function getUsers(){
            $sql="CALL sp_getallusers()";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getUserDetails($userid){
            $username=$this->getUserNameFromId($userid);
            $sql="CALL `sp_getuserdetails`('{$username}')";
            $rst=$this->connect()->query($sql);
            return $this->getJSON($sql); #json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function deleteUser($userid){
            $sql="CALL spdeleteuser ({$userid},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql);
            echo "The user has been deleted successfully.";
        }

        function getLoggedInUserName(){
            return json_encode(isset($_SESSION['username'])?$_SESSION['username']:""); 
        }

        function getloggedinUserId(){
            return json_encode(isset($_SESSION['userid'])?$_SESSION['userid']:""); 
        }
        
        function logoffUser(){
            session_unset();
        }

        function saveUserPrivilege($userid,$object,$valid){
            $sql="CALL spsaveuserprivilege ({$userid},{$object},{$valid},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql); 
        }

        function checkUserPrivilege($objectid){
            $userid=$_SESSION['userid'];
            $sql="CALL spvalidateuserprivilege({$userid},{$objectid})";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()){
                $row=$rst->fetch();
                if ($row['allowed']==1){
                    echo 1;
                }else{
                    echo 0;
                }
            }else{
                echo 0;
            }
        }

        function getUsersList(){
            $sql="CALL sp_getallusers()";
            return $this->getJSON($sql);
        }

        function getObjects($moduleid){
            $sql="CALL `sp_getobjects`('{$moduleid}')";
            return $this->getJSON($sql);
        }

        function  getUserPrivileges($userid){
            $sql="CALL `sp_getuserprivileges`({$userid})";
            return $this->getJSON($sql);
        }

         function getUsernameFromUserId($userid){
            $sql="CALL spgetusernamefromuserid({$userid})";
            //echo $sql."<br/>";
            $rst=$this->getData($sql);
            return $rst->rowCount()?$rst->fetch()['username']:'';
        }

        function getuseridfromname($username){
            $sql="CALL `sp_getuserdetails` ('{$username}')";
            $rst= $this->getData($sql);
            return $rst->rowCount()?$rst->fetch()['userid']:''; 
        }

        function saveTempPrivileges($refno,$userid,$objectid,$valid){
            // id is either userid or role id
            $sql="CALL sp_savetempprivilege('{$refno}',{$userid},{$objectid},{$valid})";
            $rst=$this->getData($sql);
            if($rst){
                return 'success';
            }
        }


        function savePrivileges($refno,$userid,$category){
            // category is either user or role
            $sql="CALL `sp_saveprivileges`({$userid},'{$category}','{$refno}',{$_SESSION['userid']})";
            //echo $sql."<br/>";
            $rst=$this->getData($sql);
            return "Success";
        }
        
       
        function resetUserPassword($id, $newpassword){
            error_log("Reset password called for ID: " . $id);  // Log the ID value
            
            $userid = $id;
            if ($newpassword == '') {
                $newpassword = $this->generateRandomString();
            }
        
            $encryptedpassword = md5($newpassword);
            
            // Debugging the SQL query
            $sql = "CALL `sp_changeuserpassword` ({$id},'{$encryptedpassword}', 1)";
            error_log("SQL Query: " . $sql);  // Log the query
            
            try {
                $rst = $this->connect()->query($sql);
            } catch (PDOException $e) {
                error_log("Error executing query: " . $e->getMessage());
            }
        
            // Retrieve the user's details to send an email
            $username = $this->getUserNameFromId($userid);
            $sql = "CALL `sp_getuserdetails`('{$username}')";
            
            try {
                $rst = $this->connect()->query($sql)->fetch();
            } catch (PDOException $e) {
                error_log("Error fetching user details: " . $e->getMessage());
            }
        
            $fullname = "{$rst['firstname']} {$rst['middlename']}";
            $emailaddress = $rst['email'];
        
            // Send the email
            $message = "Hello {$fullname},<br/>Your password was reset successfully.<br>Your new password is <h1>{$newpassword}</h1>";
            $message .= "Please note that you will be required to change this password prior to accessing the system for normal operations.";
            $message .= "Kind Regards <br/> System Administrator";
            
            $subject = "System Password Reset.";
            
            $GLOBALS['mail']->sendEmail($emailaddress, $subject, $message, 'System Administrator');
            
            return "success";
        }
        
        function getsystemadmins(){
            $sql="CALL `sp_getsystemadmins`()";
            return $this->getJSON($sql);
        }

        function saveusercompany($userid,$companyid){
            $sql="CALL `sp_addusercompamy`({$userid},{$companyid},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }

        function getuserassignedcompanies($userid){
            $sql="CALL `sp_getusercompanies`({$userid})";
            return $this->getJSON($sql);
        }

        function getuserunassignedcompanies($userid){
            $sql="CALL `sp_getusernonassignedcompanies`({$userid})";
            // echo $sql."<br/>";
            return $this->getJSON($sql);
        }
        
    }
?>
