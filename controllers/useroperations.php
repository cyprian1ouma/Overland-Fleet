<?php 
    require_once("../models/user.php");
    $user=new user();

    if(isset($_POST['loginuser'])){
        $username=$_POST['username'];
        $password=$_POST['password'];
        echo ($user->logUserIn($username,$password));
    }

    if(isset($_GET['getuserdetails'])){
        $userid=$_GET['userid'];
        $user->getUserDetails($userid);
    }

    if(isset($_POST['deleteuser'])){
        $userid=$_POST['userid'];
        $user->deleteUser($userid);
    }

    if(isset($_GET['getloggedinusername'])){
        echo $user->getLoggedInUserName();
    }

    if(isset($_GET['getloggedinuserid'])){
        echo $user->getloggedinUserId();
    }

    if(isset($_GET['getloggedinuser'])){
        echo $user->getUserDetails($_SESSION['userid']);
    }

    if(isset($_GET['logout'])){
        session_destroy();
        header('Location: ../index.php'); 
    }

    if(isset($_POST['saveuserprivileges'])){
        $pattern='::';
        $userid=$_POST['userid'];
        $privileges=explode(",",json_decode($_POST['privileges']));
        if(count($privileges)>0){
            // the array is not empty
            foreach($privileges as $privilege){
                //echo print_r(explode($pattern,$otherspare));
                $privilegedetail=explode($pattern,$privilege);
                $objectid=$privilegedetail[0];
                $valid=$privilegedetail[1];
                $user-> saveUserPrivilege($userid,$objectid,$valid);
            }
            echo "Success";
        }
    }

    /*if(isset($_POST['getuserprivilege'])){
        $objectid=$_POST['objectid'];
        $user->checkUserPrivilege($objectid);
    }*/

    if(isset($_GET['getuserslist'])){
        echo $user->getUsersList();
    }

    // if(isset($_GET['getuserroles'])){
    //     $userid=$_GET['userid'];
    //     echo $user->getUserRoles($userid);
    // }

    // if(isset($_GET['getobjects'])){
    //     if(isset($_GET['moduleid'])){
    //         $moduleid=$_GET['moduleid'];
    //     }else{
    //         $moduleid='';
    //     }
    //     echo $user->getObjects($moduleid);
    // }

    // if(isset($_GET['getroles'])){
    //     $user->getRoles();
    // }
 
    // if(isset($_GET['getroleusers'])){
    //     $roleid=$_GET['roleid'];
    //     $user->getRoleUsers($roleid);
    // }
 
    // if(isset($_POST['saverole'])){
    //     $category='role';
    //     $roleid=$_POST['roleid'];
    //     $rolename=$_POST['rolename'];
    //     $roledescription=$_POST['roledescription'];
    //     $refno=mt_rand(1000,9999);
    //     $tableData = stripcslashes($_POST['TableData']);
    //     // Decode the JSON array
    //     $tableData = json_decode($tableData,TRUE);
    //     // save the role
    //     $roleid=$user->saveRole($roleid,$rolename,$roledescription);
    //     if(is_numeric($roleid)){
    //          foreach($tableData as $roleprivilege){
    //              $objectid=$roleprivilege['id'];
    //              $valid=$roleprivilege['valid'];
    //              $user->saveTempPrivileges($refno,$roleid,$objectid,$valid);
    //          }
    //          echo $user->savePrivileges($refno,$roleid,$category);
    //     }else{
    //         echo $roleid;
    //     }
    // }
 
    // if(isset($_GET['getroledetails'])){
    //     $roleid=$_GET['roleid'];
    //     $user->getRoleDetails($roleid);
    // }
 
    // if(isset($_GET['getroleprivileges'])){
    //     $roleid=$_GET['roleid'];
    //     $user-> getRolePrivileges($roleid);
    // }

    // if(isset($_GET['getrolesforassignment'])){
    //     $user->getRolesForAssignment();
    // }

    // if(isset($_GET['getusernonroles'])){
    //     $userid=$_GET['userid'];
    //     $user->getUserNonRoles($userid);
    // }

    // if(isset($_POST['saveuserroles'])){
    //  $userid=$_POST['userid'];
    //  $tableData = stripcslashes($_POST['TableData']);
    //  // Decode the JSON array
    //  $tableData = json_decode($tableData,TRUE);
    //  foreach($tableData as $userrole){
    //      $roleid=$userrole['roleid'];
    //      $user->addUserToRole($userid,$roleid);
    //  }
    //  echo "success";
    // }

    // if(isset($_POST['removeuserrole'])){
    //     $userid=$_POST['userid'];
    //     $roleid=$_POST['roleid'];
    //     $user->removeUserRole($userid,$roleid);
    // }

    if (isset($_GET['getuserdetails'])) {
        if (isset($_GET['userid']) && !empty($_GET['userid']) && is_numeric($_GET['userid'])) {
            $userid = $_GET['userid'];
            $username = $user->getUsernameFromUserId($userid);  // Get username from userid
            echo $user->getUserDetails($userid);  // Assuming this returns user details in a proper format (JSON, HTML, etc.)
        } else {
            // If 'userid' is not valid, return an error
            echo "Error: Invalid or missing user ID.";
        }
    }

    if(isset($_GET['getusersdetails'])){
        $userid = $_GET['userid'];
        echo $user->getusersdetails($userid);
    }

    if(isset($_GET['getuserprivileges'])){
        $userid=$_GET['userid'];
        echo $user->getUserPrivileges($userid);
    }

  
    if (isset($_POST['saveuser'])) {
        // Safely extract and validate inputs
        $userid = isset($_POST['userid']);
        $username = $_POST['username'];
        $password = md5($_POST['password']);
        $email = $_POST['email'];
        $mobile = $_POST['mobile'];
        $firstname = $_POST['firstname'];
        $middlename = $_POST['middlename'];
        $lastname = $_POST['lastname'];
        $systemadmin = $_POST['systemadmin'];
        $changepasswordonlogon = $_POST['changepasswordonlogon'];
        $accountactive = 1; 
        $category = 'user';
        $salt = $user->uniqidReal(40); 
        $institutionid = isset($_POST['institutionid']);
        
        // Get the addedby user ID (assuming it's stored in the session)
        $addedby = isset($_SESSION['userid']) ? $_SESSION['userid'] : null;
        
        // Get the platform (user agent)
        $platform = $_SERVER['HTTP_USER_AGENT'];
        
        // Decode the JSON array for table data
        $tableData = isset($_POST['TableData']) ? json_decode(stripcslashes($_POST['TableData']), true) : [];
        $refno = hash('md5', $user->uniqidReal(10));
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
            return;
        }
        $response = $user->saveUser($userid, $username, $password, $salt, $firstname, $middlename, $lastname, $mobile, $email, $systemadmin, $accountactive, $changepasswordonlogon, $institutionid);
        if (is_numeric($response)) {
            $userid = $response;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error saving user']);
            return;
        }
        
        if (is_array($tableData) && count($tableData) > 0) {
            $responses = [];

            foreach ($tableData as $item) {
                $objectid = isset($item['id']) ? $item['id'] : 0; 
                $valid = isset($item['valid']) ? $item['valid'] : 0;

                // Save the privilege for each user temporarily
                $tempResponse = $user->saveTempPrivileges($refno, $userid, $objectid, $valid);

                $responses[] = $tempResponse;
            }

            $permanentResponse = $user->savePrivileges($refno, $userid, $category);

            echo json_encode([
                'status' => 'success',
                'message' => 'Successfully added the privileges and saved the user',
                'data' => $permanentResponse
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid privileges data']);
        }
    }
      
    
    
    
    

    // if(isset($_POST['changeaccountstatus'])){
    //     $activity=$_POST['activity'];
    //     $userid=$_POST['id'];
    //     $reason=$_POST['reason'];
    //     if($activity=="disable"){
    //         echo $user->disableUserAccount($userid,$reason);
    //     }
    //     else if($activity=="enable"){
    //         echo $user->enableUserAccount($userid);
    //     }
    // }

    if(isset($_POST['resetuserpassword'])){
        $id=$_POST['id'];
        $password=$_POST['password'];
        echo $user->resetUserPassword($id,$password);
    }

    if(isset($_POST['recoveruserpassword'])){
        $username=$_POST['username'];
        $userid=$user->getuseridfromname($username);
        if($userid!==''){
            echo $user->resetUserPassword($userid,'');
        }else{
            echo "not exists";
        }
        
    }

    if(isset($_GET['getuserassignedcompanies'])){
            $userid=$_GET['userid'];
            echo $user->getuserassignedcompanies($userid);
    }

    if(isset($_GET['getuserunassignedcompanies'])){
        $userid=$_GET['userid'];
        echo $user->getuserunassignedcompanies($userid);
    }

    if(isset($_POST['saveusercompany'])){
        $companies=json_decode(stripcslashes($_POST['companies']),true);
        $userid=$_POST['userid'];
        foreach($companies as $company){
            $companyid=$company['companyid'];
            $user->saveusercompany($userid,$companyid);
        }
        echo "success";
    }

    if (isset($_POST['changeuserpassword'])) {
        if (isset($_SESSION['userid'])) {
            $userid = $_SESSION['userid'];
        } else {
            echo json_encode(["status" => "error", "message" => "User is not logged in"]);
            exit;
        }
        $oldpassword = $_POST['oldpassword'];
        $newpassword = $_POST['newpassword'];

        $result = $user->changeUserPassword($userid, $oldpassword, $newpassword, 0);

        echo $result;
    }
?>
