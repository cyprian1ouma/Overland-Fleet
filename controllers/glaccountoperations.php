<?php
    require_once("../models/glaccount.php");

    $glaccount=new glaccount();

    if(isset($_GET['getglaccountclasses'])){

        $glaccount->getglaccountclasses();

    }else if(isset($_GET['getglaccountgroups'])){

        $classid=$_GET['classid'];
        $glaccount->getglgroups($category);

    }else if(isset($_GET['getglaccounts'])){

        // $groupid=$_GET['groupid'];
        $glaccount->getglaccounts();

    }else if(isset($_POST['saveglaccountgroup'])){

        $id=$_POST['id'];
        $glaccountclass=$_POST['accountclass'];
        $groupname=$_POST['groupname'];
        $subcategoryof=$_POST['subcategoryof'];
        $cashbookaccount=$_POST['cashbookaccount'];
        $response=$glaccount->saveglgroup($id,$glaccountclass,$groupname,$subcategoryof,$cashbookaccount);
        echo json_encode($response);

    }
    else if(isset($_POST['saveglaccount'])){

        $id=$_POST['id'];
        $groupid=$_POST['groupid'];
        $accountcode=$_POST['accountcode'];
        $accountname=$_POST['accountname'];
        $isbankaccount=$_POST['isbankaccount'];
        if($isbankaccount==0){
            $allowoverdraft=0;
            $bankname='';
            $branchname='';
            $accountno='';
            $swiftcode='';
        }else{
            $allowoverdraft=$_POST['allowoverdraft'];
            $bankname=$_POST['bankname'];
            $branchname=$_POST['branchname'];
            $accountno=$_POST['accountno'];
            $swiftcode=$_POST['swiftcode'];
        }
        $glaccount->saveglaccount($id,$groupid,$accountcode,$accountname,$isbankaccount,$allowoverdraft,$bankname,$branchname,$accountno, $swiftcode);

    }else if(isset($_POST['deleteglgroup'])){

        $id=$_POST['id'];
        $glaccount->deleteglgroup($id);

    }else if(isset($_POST['deleteglaccount'])){

        $id=$_POST['id'];
        $glaccount->deleteglaccount($id);

    }else if(isset($_GET['getglparentgroups'])){

        $classid=$_GET['classid'];
        $glaccount->getglparentgroups($classid);

    }else if (isset($_GET['getsubgroups'])){

        $groupid=$_GET['groupid'];
        $glaccount->getsubgroups($groupid);

    }else if(isset($_GET['getcashbookaccounts'])){

        $glaccount->getCashBookAccounts();

    }else if(isset($_GET['getglaccountdetails'])){

        $id =$_GET['id'];
        $glaccount->getGLAccountDetails($id);
    }

    if(isset($_GET['getglaccountmapping'])){
        echo $glaccount->getglaccountmapping();
    }

    if(isset($_POST['saveglaccountmapping'])){
        
        $category=$_POST['category'];
        $items=json_decode(stripcslashes($_POST['itemid']),true);
        $glaccountid=$_POST['glaccountid'];

        foreach($items as $item){
            $itemid=$item['itemid'];
            $glaccount->saveglaccountmapping($category,$itemid,$glaccountid);
        }

        echo "success";
    }

    if (isset($_GET['getpaymentmethods'])){
        echo $glaccount->getpaymentmethods();
    }

    if (isset($_GET['getpaymentvouchers'])) {
        $startdate = isset($_GET['startdate']) ? $_GET['startdate'] : '';
        $enddate = isset($_GET['enddate']) ? $_GET['enddate'] : '';
        $paymentmode = isset($_GET['paymentmode']) ? $_GET['paymentmode'] : '';
    
        echo $glaccount->getpaymentvouchers();
        // $startdate, $enddate, $paymentmode
    }
    

    if(isset($_GET['getpaymentvoucherdetails'])){
        $voucherid = $_GET['voucherid'];
        echo $glaccount->getpaymentvoucherdetails($voucherid);
    }

    // if(isset($_POST['checkpaymentvoucher'])){
    //     $voucherno = $_POST['voucherno'];
    //     echo $glaccount->checkpaymentvoucher($voucherno);
    // }

    if (isset($_POST['savepaymentvoucher'])) {
        $voucherid = $_POST['voucherid'];
        $payeename = $_POST['payeename'];
        $description = $_POST['description'];
        $paymentmode = $_POST['paymentmode'];
        $refference = $_POST['refference'];
        $amount = $_POST['amount'];
        $crledger= $_POST['crledger'];
        $subaccount = $_POST['subaccount'];
        $transactiondate = $_POST['transactiondate'];
        echo $glaccount->savepaymentvoucher($voucherid, $payeename, $description, $paymentmode, $refference, $amount, $crledger, $subaccount,$transactiondate);
    }

    if(isset($_POST['deletepaymentvoucher'])){
        $voucherid = $_POST['voucherid'];
        echo $glaccount->deletepaymentvoucher($voucherid);
    }

    if(isset($_GET['filterpaymentvoucher'])) {
        $startdate = isset($_GET['startdate']) ? $_GET['startdate'] : null;
        $enddate = isset($_GET['enddate']) ? $_GET['enddate'] : null;
        $paymentmode = isset($_GET['paymentmode']) ? $_GET['paymentmode'] : null;
        echo $glaccount->filterpaymentvoucher($startdate, $enddate, $paymentmode);
    }

    if(isset($_GET['printpaymentvoucher'])){
        $voucherno = $_GET['voucherno'];
        echo $glaccount-> printpaymentvoucher($voucherno);
    }

    // account mapping
    if(isset($_GET['getglaccountmappingitems'])){
        echo $glaccount-> getglaccountmappingitems();
    }
    if(isset($_GET['getglaccountmappingchargeableitems'])){
        echo $glaccount->getglaccountmappingchargeableitems();
    }
    
    if(isset($_POST['savemappingaccount'])){
        $accountid=$_POST['accountid'];
        $itemid=$_POST['itemid'];
        $response=$glaccount->savemappingaccount($accountid,$itemid);
        echo json_encode($response);
    }
    if(isset($_GET['getaccountmapping'])){
        echo $glaccount->getaccountmapping();
    }
    if(isset($_POST['deletemappingaccount'])){
        $mappingid=$_POST['mappingid'];
        echo $glaccount->deletemappingaccount($mappingid);
        // echo json_encode($response);
    }
    
?>