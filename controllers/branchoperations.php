<?php
    require_once("../models/branch.php");

    $branch=new branch();

    if(isset($_POST['savebranch'])){
        $branchid=$_POST['branchid'];
        $branchname=$_POST['branchname'];
        $shortcode=$_POST['shortcode'];
        $physicaladdress=$_POST['physicaladdress'];
        $tenantnoprefix=$_POST['tenantnoprefix'];
        $tenantcurrentno=$_POST['tenantcurrentno'];
        $tenantnosuffix=$_POST['tenantnosuffix'];
        $senderid=$_POST['senderid'];
        $emailaddress=$_POST['emailaddress'];
        $emailpassword=$_POST['emailpassword'];
        $smtpserver=$_POST['smtpserver'];
        $smtpport=$_POST['smtpport'];
        $usessl=$_POST['usessl'];
        echo $branch->savebranch($branchid,$branchname,$shortcode,$physicaladdress,$tenantnoprefix,$tenantcurrentno,$tenantnosuffix,
        $senderid,$emailaddress,$emailpassword,$smtpserver,$smtpport,$usessl);
    }

    if(isset($_POST['deletebranch'])){
        $branchid=$_POST['branchid'];
        echo $branch->deletebranch($branchid);
    }

    if(isset($_GET['getbranches'])){
        echo $branch->getbranches();
    }

    if(isset($_GET['getbranchdetails'])){
        $branchid=$_GET['branchid'];
        echo $branch->getbranchdetails($branchid);
    }

?>