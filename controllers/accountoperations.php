<?php
    require_once("../models/accounts.php");

    $account=new account();

    if(isset($_POST['savevotehead'])){
        $itemid=$_POST['itemid'];
        $itemdescription=$_POST['itemdescription'];
        $recurring=$_POST['recurring'];
        $amount=$_POST['amount'];
        $refundable=$_POST['refundable'];
        $percentage=$_POST['percentage'];
        $isadeposit=$_POST['isadeposit'];
        $hascommission=$_POST['hascommission'];
        $visible=$_POST['visible'];
        $percentageitemid=$_POST['percentageitemid']==""?0:$_POST['percentageitemid'];
        echo $account-> savevotehead($itemid,$itemdescription,$recurring,$amount,$refundable,$percentage,$isadeposit,$hascommission,$visible,$percentageitemid);
    }

    if(isset($_GET['getvoteheads'])){
        echo $account-> getvoteheads();
    }

    if(isset($_GET['voteheaddetails'])){
        $itemid=$_GET['voteid'];
        echo $account->getvoteheaddetails($itemid);
    }

    if(isset($_POST['deletevotehead'])){
        $itemid=$_POST['voteid'];
        echo $account->deletevotehead($itemid);
    }

    if(isset($_GET['filtervoteheads'])){
        $category=$_GET['category'];
        echo $account->filtervoteheads($category);
    }


?>