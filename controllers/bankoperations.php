<?php
    require_once("../models/bank.php");
    $bank=new bank();

    if(isset($_POST['savebank'])){
        $bankid=$_POST['bankid'];
        $bankname=$_POST['bankname'];
        $bankcode=$_POST['bankcode'];
        $response=$bank->savebank($bankid,$bankcode,$bankname);
        echo json_encode($response);
    }

    if(isset($_GET['getbanks'])){
        echo $bank->getbanks();
    }

    if(isset($_GET['getbankdetails'])){
        $bankid=$_GET['bankid'];
        echo $bank->getbankdetails($bankid);
    }

    if(isset($_POST['deletebank'])){
        $bankid=$_POST['bankid'];
        $response=$bank->deletebank($bankid);
        echo json_encode($response);
    }

    if(isset($_POST['savebranch'])){
        $branchid=$_POST['branchid'];
        $branchname=$_POST['branchname'];
        $branchcode=$_POST['branchcode'];
        $bankid=$_POST['bankid'];
        $response=$bank->savebankbranch($branchid,$bankid,$branchcode,$branchname);
        echo json_encode($response);
    }

    if(isset($_GET['getbranches'])){
        $bankid=isset($_GET['bankid'])?$_GET['bankid']:0;
        echo $bank->getbankbranches($bankid);
    }

    if(isset($_POST['deletebranch'])){
        $branchid=$_POST['branchid'];
        $response=$bank->deletebankbranch($branchid);
        echo json_encode($response);
    }

    if(isset($_GET['getbranchdetails'])){
        $branchid=$_GET['branchid'];
        echo $bank->getbranchdetails($branchid);
    }
?>