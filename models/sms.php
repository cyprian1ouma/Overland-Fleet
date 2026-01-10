<?php

    require_once("db.php");
    require_once("mail.php");
    require_once("user.php");

    $smsmail=new mail();
    $smsuser=new User();

    class sms extends db {
        private $apikey;
        private $senderid;
        private $clientid;
        private $url;
        private $apiused;
        private $token;

        public function __construct(){
            $sql="CALL sp_getuwazismsparameters ()";
            $data=$this->getData($sql)->fetch();
            $this->apikey=$data['apikey'];
            $this->senderid=$data['senderid'];
            $this->clientid=$data['clientid'];
            $this->url=$data['url'];
            $this->apiused=$data['apiused'];
            $this->token=$data['token'];
            // echo json_decode($GLOBALS['smsuser']->getsystemadmins());
        }

        public function sendSMS($recipient,$message){
            // encode message to replace spaces with %20
            $message=urlencode($message);
            if($this->apiused=='old'){
                $redirecturl  =$this->url."?ApiKey=".$this->apikey;
                $redirecturl .="&ClientId=".$this->clientid;
                $redirecturl .="&SenderId=".$this->senderid;
                $redirecturl .="&Message=".$message;
                $redirecturl .="&MobileNumbers=".$recipient;
            }else{
                //https://api2.uwaziimobile.com/send?token=wJd8mN14re5AM7gQt0S46MfKRJhdBW&phone=254727709772&senderID=Wavishaji&text=Hello%20world%21&type=sms&lifetime=86400&beginDate=2022-10-01&beginTime=15%3A07%3A15&delivery=TRUE
                $redirecturl  =$this->url."?token=".$this->token;
                $redirecturl .="&senderID=".$this->senderid;
                $redirecturl .="&phone=".$recipient;
                $redirecturl .="&text=".$message;
            }

            // echo $redirecturl."<br/>";

            $ch=curl_init();
            $headers=['Content-Type:application/json'];
            
            curl_setopt($ch, CURLOPT_URL, $redirecturl);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            $response=curl_exec($ch);
            $status= json_decode($response, true);
            curl_close($ch);
            // echo $response;
            if ($this->apiused=='new'){
                // echo json_encode($status);
                if(array_key_exists($recipient,$status)){
                    // $messagestatus="success";
                    $messagedescription="";
                    $messageid=$status[$recipient];
                    $messagestatus='Sent';
                }else{
                    // $messagestatus=$status['errors'];
                    $errordescription=$status['error'];
                    $messageid="";
                    $messagestatus="Pending";
                }
            }else{
                if($errorcode==0){ 
                    $messagedescription=$status['Data'][0]['MessageErrorDescription'];
                    $messageid=$status['Data'][0]['MessageId'];
                    $messagestatus='Sent';
                }else{
                    $messageid="";
                    $messagestatus='Pending';  
                    $errordescription=$status['ErrorDescription']; 
                }
            }
            // $errorcode=$status['ErrorCode'];
            // if($errorcode==0){ 
            //     $messagedescription=$status['Data'][0]['MessageErrorDescription'];
            //     $messageid=$status['Data'][0]['MessageId'];
            //     $messagestatus='Sent';
            // }else{
            //     $messageid="";
            //     $messagestatus='Pending';  
            //     $errordescription=$status['ErrorDescription']; 

            //     // get system admin email addresses
            //     $systemadmins=json_decode($GLOBALS['smsuser']->getsystemadmins(),true);

            //     // Open email template
            //     $template_file="../templates/smsnotifications.html";
            //     if(file_exists($template_file)){
            //         $emailmessage=file_get_contents($template_file);
            //         foreach($systemadmins as $systemadmin){ 
            //             // send admin an email is sms credit has run low  
            //             if($errorcode==21){
            //                 // get system administrators and send them the notification
            //                 $message='<p>The SMS credit has run low and messages are no longer sending.</p>
            //                 <p>Kindly organize to top up inorder to continue sending SMS</p>';
                        
            //                 $swap_var=array(
            //                     "{{title}}"=>"Low SMS Credit",
            //                     "{{firstname}}"=>$systemadmin['firstname'],
            //                     "{{middlename}}"=>$systemadmin['middlename'],
            //                     "{{message}}"=>$message,
            //                     "{{year}}"=>date("Y")
            //                 );

            //                 foreach(array_keys($swap_var) as $key){
            //                     if(strlen($key)>2 && trim($key)!==""){
            //                         $emailmessage=str_replace($key,$swap_var[$key],$emailmessage);
            //                     }
            //                 }
            
            //                 // queue the message for sending
            //                 $GLOBALS['smsmail']->sendEmail($systemadmin['email'],"Low SMS Credit",$emailmessage,"Saccosoft Team");
            //                 // Disable sms sending until further enabled by the user or system
            //             }else{
            //                 // send a message a different error message
            //                 $message='<p>The system has encountered an error while attempting to send SMS.</p>
            //                 <p>The error dedscription is: </p>';
            //                 $message.='<p>'.$errordescription.'</p>';
                        
            //                 $swap_var=array(
            //                     "{{title}}"=>"SMS Sending General Error",
            //                     "{{firstname}}"=>$systemadmin['firstname'],
            //                     "{{middlename}}"=>$systemadmin['middlename'],
            //                     "{{message}}"=>$message,
            //                     "{{year}}"=>date("Y")
            //                 );

            //                 foreach(array_keys($swap_var) as $key){
            //                     if(strlen($key)>2 && trim($key)!==""){
            //                         $emailmessage=str_replace($key,$swap_var[$key],$emailmessage);
            //                     }
            //                 }
            
            //                 // queue the message for sending
            //                 $GLOBALS['smsmail']->sendEmail($systemadmin['email'],"SMS Sending General Error",$emailmessage,"Saccosoft Team");
            //             }
            //         }  
            //     } 
            // }

            //Save the message in the message log
            $this->savesmslog($recipient,0,$message,$messageid,$messagestatus);
            // // validate later on any returned error 
            return $messagestatus=="Sent"?"success":$errordescription;
        }

        public function savesmslog($mobileno,$customerid,$message,$messageid,$messagestatus){
            $sql="CALL `sp_savesmslog`('{$mobileno}','{$customerid}','{$message}','{$messageid}','{$messagestatus}')";
            $this->getData($sql);
        }

        public function getmenuname($menuid){
            $sql="CALL `sp_getobjectdetails`({$menuid})";
            return $this->getData($sql)->fetch()['description'];
        }

        public function checkifmenuisrestricted($menuid){
            $sql="CALL `sp_getobjectdetails`({$menuid})";
            return $this->getData($sql)->fetch()['restricted']==1?true:false;
        }

        public function getsmsparameters(){
            $sql="CALL sp_getuwazismsparameters ()";
            return $this->getJSON($sql);
        }

        public function savesmsparameters($clientid,$url,$senderid,$apikey,$token,$apiused){
            $sql="CALL `sp_saveuwazismsparameters`('{$clientid}','{$url}','{$senderid}','{$apikey}','{$token}','{$apiused}')";
            $this->getData($sql);
            return "success";
        }
    }

    $sms=new sms();

    if(isset($_POST['sendmenuaccessmessage'])){
         $menuid=$_POST['menuid'];
        if($sms->checkifmenuisrestricted($menuid) && isset($_SESSION['username'])){
            $recipient='254727709772';
            $loggedinuser=$_SESSION['username'];
            $menuname=$sms->getmenuname($menuid);

            $message="Hello, ".$loggedinuser.' has just accessed '.$menuname. '. Thank you.';
            
            $response=$sms->sendSMS($recipient,$message);
            $status=$response['Data'][0]['MessageErrorDescription'];
            $messageid=$response['Data'][0]['MessageId'];
            // save the messages sent to the server
            $sms->savesmslog($recipient,$menuid,$message,$messageid,$status);
            echo $status;
        }else{
            if(!$sms->checkifmenuisrestricted($menuid)){
                echo "Menu unrestricted";
            }else{
                echo "User not logged in";
            }
        }
    }
?>