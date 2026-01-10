<?php
    require_once("../models/finance.php");

    $finance=new finance();

    if(isset($_POST['savefinancialperiod'])){
        $id=$_POST['id'];
        $label=$_POST['label'];
        $startdate=$_POST['startdate'];
        $enddate=$_POST['enddate'];
        $currentperiod=$_POST['currentperiod'];
        echo $finance->savefinacialperiod($id,$label,$startdate,$enddate,$currentperiod);
    }
    
    if(isset($_GET['getfinancialperiods'])){
        echo $finance->getfinancialperiods();
    }

    if(isset($_GET['getfinancialperioddetails'])){
        $id=$_GET['id'];
        echo $finance->getfinancialperioddetails($id);
    }

    if(isset($_POST['deletefinancialperiod'])){
        $id=$_POST['id'];
        echo $finance->deletefinancialperiod($id);
    }

    if(isset($_POST['savejournaltransaction'])){
        $refno=$finance->uniqidReal();
        $referenceno=$_POST['referenceno'];
        $description=$_POST['description'];
        $jounaldate=$_POST['jounaldate'];
        $journalentries=json_decode(stripcslashes($_POST['journalentries']),true);

        foreach($journalentries as $journal){
            $glaccount=$journal['glaccount'];
            $glcontra=0;
            $narration=$journal['narration'];
            $debit=$journal['debit'];
            $credit=$journal['credit'];
            $finance->savetempjournaldetails($refno,$glaccount,$glcontra,$narration,$debit,$credit);
        }

        $result = $finance->savejournalentry($refno, $referenceno, $description,$jounaldate);
        echo json_encode($result);
    }

    if(isset($_GET['getjournalentries'])){
        echo $finance->getjournalentries();
    }

    if(isset($_GET['getjournaldetails'])){
        $id=$_GET['id'];
        echo $finance->getjournaldetails($id);
    }

    if(isset($_GET['getglsubaccounts'])){
        $accountid = $_GET['accountid'];
        echo $finance->getglsubaccounts($accountid);
    }

    if(isset($_POST['saveglsubaccount'])){
        $id = $_POST['id'];
        $accountcode = $_POST['accountcode'];
        $subaccountname = $_POST['subaccountname'];
        echo $finance->saveglsubaccount($id,$accountcode,$subaccountname);
    }

    if(isset($_POST['deleteglsubaccount'])){
        $id = $_POST['id'];
        echo $finance->deleteglsubaccount($id);
    }

    if(isset($_GET['getglsubaccountbanks'])){
        echo $finance->getglsubaccountbanks();
    }

    if(isset($_GET['getglsubaccountbankdetails'])){
        $id = $_GET['getglsubaccountbankdetails'];
        echo $finance->getglsubaccountbankdetails($id);
    }

    if (isset($_POST['saveglsubaccountbank'])) {
        $id = $_POST['id'];
        $responses = [];
    
        if (!empty($_POST['bankdetails'])) {
            $bankdetails = json_decode($_POST['bankdetails'], true);
    
            if (is_array($bankdetails)) {
                foreach ($bankdetails as $bank) {
                    $bankid = $bank['bankid'] ?? null;
                    $branchid = $bank['branchid'] ?? null;
                    $accountnumber = $bank['accountnumber'] ?? null;
    
                    if (!empty($bankid) && !empty($branchid) && !empty($accountnumber)) {
                        $responses[] = $finance->saveglsubaccountbank($id, $bankid, $branchid, $accountnumber);
                    }
                }
            }
        }
        echo (count(array_unique($responses)) === 1 && $responses[0] === "success") ? "success" : json_encode($responses);
    }
    

    if (isset($_POST['saveglsubaccounttelephone'])) {
        $id = $_POST['id'];
        $responses = [];
    
        if (!empty($_POST['telephonedetails'])) {
            $telephonedetails = json_decode($_POST['telephonedetails'], true);
    
            if (is_array($telephonedetails)) {
                foreach ($telephonedetails as $telephone) {
                    $phonenumber = $telephone['phonenumber'] ?? null;
    
                    if (!empty($phonenumber)) {
                        $responses[] = $finance->saveglsubaccounttelephone($id, $phonenumber);
                    }
                }
            }
        }
        echo (count(array_unique($responses)) === 1 && $responses[0] === "success") ? "success" : json_encode($responses);
    }
    

    if(isset($_POST['deleteglsubaccountbank'])){
        $id = $_POST['id'];
        echo $finance->deleteglsubaccountbank($id);
    }

    if(isset($_GET['getglsubaccounttelephone'])){
        echo $finance->getglsubaccounttelephone();
    }

    if(isset($_GET['getglsubaccounttelephonedetails'])){
        $id = $_GET['id'];
        echo $finance->getglsubaccounttelephonedetails($id);
    }

    if(isset($_POST['deleteglsubaccounttelephone'])){
        $id = $_POST['id'];
        echo $finance->deleteglsubaccounttelephone($id);
    }


    if(isset($_GET['getlandlordvoucheradditions'])){
        $ownerid = $_GET['ownerid'];
        echo $finance->getlandlordvoucheradditions($ownerid);
    }

    if(isset($_GET['getlandlordvoucheradditionsdetails'])){
        $id = $_GET['id'];
        echo $finance->getlandlordvoucheradditionsdetails($id);
    }   

    if(isset($_POST['deletelandlordvoucheradditions'])){
        $id = $_POST['id'];
        echo $finance->deletelandlordvoucheradditions($id);
    }

    if(isset($_GET['getlandlordvoucherdeductions'])){
        $ownerid = $_GET['ownerid'];
        echo $finance->getlandlordvoucherdeductions($ownerid);
    }

    if(isset($_GET['getlandlordvoucherdeductionsdetails'])){
        $id = $_GET['id'];
        echo $finance->getlandlordvoucherdeductionsdetails($id);
    }

    if(isset($_POST['deletelandlordvoucherdeductions'])){
        $id = $_POST['id'];
        echo $finance->deletelandlordvoucherdeductions($id);
    }

    // Paymentmodes details

    if(isset($_GET['getpaymentmodesaccounts'])){
        echo $finance->getpaymentmodesaccounts();
    }

    if(isset($_POST['savepaymentmode'])){
        $paymentmodeid = $_POST['paymentmodeid']; 
        $modename = $_POST['modename']; 
        $requiref = $_POST['requiref']; 
        $accountid = $_POST['accountid']; 
        $response = $finance-> savepaymentmode($paymentmodeid, $modename,$requiref,$accountid);
        echo json_encode($response);
    }

    if(isset($_GET['getpaymentmodes'])){
        echo $finance->getpaymentmodes();
    }

    if(isset($_GET['getpaymentmodedetails'])){
        $paymentmodeid=$_GET['paymentmodeid'];
        echo $finance->getpaymentmodedetails($paymentmodeid);
    }

    if(isset($_POST['deletepaymentmode'])){
        $paymentmodeid=$_POST['paymentmodeid'];
        echo $finance->deletepaymentmode($paymentmodeid);
    }

    // financilareports
    if(isset($_GET['getprofitandlossreport'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $finance->getprofitandlossreport($startdate,$enddate);
    }
    if(isset($_GET['getbalancesheetreport'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $finance->getbalancesheetreport($startdate,$enddate);
    }
    if(isset($_GET['getcashflowreport'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $finance->getcashflowreport($startdate,$enddate);
    }
    if(isset($_GET['gettrialbalance'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $finance->gettrialbalance($startdate,$enddate);
    }
    if(isset($_GET['getglstatement'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        $accountid = $_GET['accountid'];
        echo $finance->getglstatement($startdate,$enddate,$accountid);
    }

    // cash book
    if(isset($_POST['savejournaltransaction2'])){

        $refno=$finance->uniqidReal();
        $referenceno=$_POST['referenceno'];
        $description=$_POST['description'];
        $journalentries=json_decode(stripcslashes($_POST['journalentries']),true);
        $journaldate=$_POST['cashbookdate'];

        foreach($journalentries as $journal){
            $glaccount=$journal['glaccount'];
            $glcontra=$journal['glcontra'];
            $narration=$journal['narration'];
            $debit=$journal['debit'];
            $credit=$journal['credit'];
            $finance->savetempjournaldetails($refno,$glaccount,$glcontra,$narration,$debit,$credit);
        }

        echo $finance->savejournalentry2($refno,$referenceno,$description,$journaldate);
    }

    // end of cash book

    // start of other transaction transaction
    if(isset($_GET['getothertransactiondetails'])){
        $transactiontype = $_GET['transactiontype'];
        echo $finance->getothertransactiondetails($transactiontype);
    }

    if(isset($_POST['saveothertransaction'])){

        $refno=$finance->uniqidReal();
        $transactionid=$_POST['transactionid'];
        $transactiontype=$_POST['transactiontype'];
        $description=$_POST['description'];
        $reference=$_POST['reference'];
        $transactiondate=$_POST['transactiondate'];
        $paymentmodeid=$_POST['paymentmodeid'];
        $currencyid=$_POST['currencyid'];
        $amount=$_POST['amount'];
        $loanamount=$_POST['loanamount'];
        $accountcreditedid=$_POST['accountcreditedid'];
        $subaccountid=$_POST['subaccountid'];

        // $transactionentries=json_decode(stripcslashes($_POST['transactionentries']),true);

        // foreach($transactionentries as $transaction){
        //     $glaccount=$transaction['glaccount'];
        //     $glcontra=0;
        //     $narration=$transaction['narration'];
        //     $debit=$transaction['debit'];
        //     $credit=$transaction['credit'];
        //     $finance->savetempjournaldetails($refno,$glaccount,$glcontra,$narration,$debit,$credit);
        // }
        $result = $finance->saveothertransaction($refno,$transactionid,$transactiontype,$description,$reference,$transactiondate,$paymentmodeid,$currencyid,$amount,$loanamount,$accountcreditedid,$subaccountid);
        echo json_encode($result);
    }

    if(isset($_GET['getothertransactions'])){
        echo $finance->getothertransactions();
    }
    if(isset($_GET['getotherfinancetransactionothersdetails'])){
        $transactionid=$_GET['transactionid'];
        echo $finance-> getotherfinancetransactionothersdetails($transactionid);
    }
    if(isset($_POST['deleteothertransaction'])){
        $transactionid=$_POST['transactionid'];
        echo $finance-> deleteothertransaction($transactionid);
    }
?>