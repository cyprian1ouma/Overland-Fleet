<?php
    require_once("db.php");

    class finance extends db{

        function checkfinancialperiodlabel($id,$label){
            $sql="CALL `sp_checkfinancialperiodlabel`({$id},'{$label}')";
            return $this->getData($sql)->rowCount();
        }

        function checkfinancialperioddates($id,$startdate,$enddate){
            $sql="CALL `sp_checkfinancialperioddates`({$id},'{$startdate}','{$enddate}')";
            return $this->getData($sql)->rowCount();
        }

        function savefinacialperiod($id,$label,$startdate,$enddate,$currentperiod){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            // check if label is in use
            if($this->checkfinancialperiodlabel($id,$label)){
                return "label exists";
            //check if date range is covered by another financial period
            }else if($this->checkfinancialperioddates($id,$startdate,$enddate)){
                return "period exists";
            // save the finnacial period
            }else{
                $sql="CALL `sp_savefinancialperiod`({$id},'{$label}','{$startdate}','{$enddate}',{$currentperiod},{$this->userid},'{$this->platform}',1)";
                $this->getData($sql);
                return "success";
            } 
        }

        function getfinancialperiods(){
            $sql="CALL sp_getfinancialperiods()";
            return $this->getJSON($sql);
        }

        function getfinancialperioddetails($id){
            $sql="CALL `sp_getfinancialperioddetails`({$id})";
            return $this->getJSON($sql);
        }

        function deletefinancialperiod($id){
            $sql="CALL `sp_deletefinancialperiod`({$id},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }

        function savetempjournaldetails($refno,$glaccount,$glcontra,$narration,$debit,$credit){
            $sql="CALL `sp_savetempjournaldetails`('{$refno}',{$glaccount},{$glcontra},'{$narration}',{$debit},{$credit})";
            // echo $sql."<br/>";
            $this->getData($sql);
            return "success";
        }

        function savejournalentry($refno,$referenceno,$description,$jounaldate){
            $addtoledger=1;
            $jounaldate=$this->mySQLDate( $jounaldate);
            $sql="CALL `sp_savejournaltransaction`('{$refno}','{$referenceno}','{$description}','{$jounaldate}',{$addtoledger},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function getjournalentries(){
            $sql="CALL `sp_getjournalentries`()";
            return $this->getJSON($sql);
        }

        function getjournaldetails($id){
            $sql="CALL `sp_getjournaldetails`({$id})";
            return $this->getJSON($sql);
        }

        function getglsubaccounts($accountid){
            $sql = "CALL `sp_getsubaccounts`({$accountid})";
            return $this->getJSON($sql);
        }

        function saveglsubaccount($id,$accountcode,$subaccountname){
            $sql = "CALL `sp_saveglsubaccounts`({$id},{$accountcode},'{$subaccountname}')";
            $this->getData($sql);
            return "success";
        }

        function deleteglsubaccount($id){
            $sql = "CALL `sp_deleteglsubaccount`($id,{$this->userid})";
            $this->getData($sql);
            return "success";
        }

        function getglsubaccountbanks(){
            $sql = "CALL `sp_getglsubaccountbanks`()";
            return $this->getJSON($sql);
        }

        function getglsubaccountbankdetails($id){
            $sql = "CALL `sp_getglsubaccountbankdetails`({$id})";
            return $this->getJSON($sql);
        }

        function checkglsubaccountbank($id,$accountnumber){
            $sql = "CALL `sp_checkglsubaccountbank`({$id}, '{$accountnumber}')";
            return $this->getData($sql)->rowCount();
        }

        function saveglsubaccountbank($id,$bankid,$branchid,$accountnumber){
            if($this->checkglsubaccountbank($id,$accountnumber)){
                return "exists";
            }else {
                $sql = "CALL `sp_saveglsubaccountbank`({$id},{$bankid},{$branchid},'{$accountnumber}',{$this->userid})";
                $this->getData($sql);
                return "success";
            }
        }

        function deleteglsubaccountbank($id){
            $sql = "CALL `sp_deleteglsubaccountbank`({$id},{$this->userid})";
            $this->getData($sql);
            return "Gl sub account bank deleted successfully";
        }

        function getglsubaccounttelephone(){
            $sql = "CALL `sp_getglsubaccounttelephone`()";
            return $this->getJSON($sql);
        }

        function getglsubaccounttelephonedetails($id){
            $sql = "CALL `sp_getglsubaccounttelephonedetails`({$id})";
            return $this->getJSON($sql);
        }

        function checkglsubaccounttelephone($id,$phonenumber){
            $sql = "CALL `sp_checkglsubaccounttelephone`({$id},'{$phonenumber}')";
            return $this->getData($sql)->rowCount();
        }

        function saveglsubaccounttelephone($id,$phonenumber){
            if($this->checkglsubaccounttelephone($id,$phonenumber)){
                return "exists";
            }else {
                // $phonenumber = !empty($phonenumber) ? '$phonenumber': "NULL";
                $sql = "CALL `sp_saveglsubaccounttelephone`({$id},'{$phonenumber}',{$this->userid})";
                $this->getData($sql);
                return "success";
            }
        }

        function deleteglsubaccounttelephone($id){
            $sql = "CALL `sp_deleteglsubaccounttelephone`({$id},{$this->userid})";
            $this->getData($sql);
            return "success";
        }

        // function getlandlordvouchers(){
        //     $sql = "CALL `sp_getlandlordvouchers`()";
        //     return $this->getJSON($sql);
        // }

        // function getlandlordvoucherdetails($id){
        //     $sql = "CALL `sp_getlandlordvoucherdetails`({$id})";
        //     return $this->getJSON($sql);
        // }

        // function checklandlordvoucher($id,$ownerid,$paymonth,$payyear){
        //     $sql = "CALL `sp_checklandlordvoucher`({$id},{$ownerid},'{$paymonth}',{$payyear})";
        //     return $this->getData($sql)->rowCount();
        // }      

        // function deletelandlordvoucher($id){
        //     $sql = "CALL `sp_deletelandlordvoucher`({$id},{$this->userid})";
        //     $this->getData($sql);
        //     return "success";
        // }

        function getlandlordvoucheradditions($ownerid){
            $sql = "CALL `sp_getlandlordoucheradditions`({$ownerid})";
            return $this->getJSON($sql);
        }

        function getlandlordvoucheradditionsdetails($id){
            $sql = "CALL `sp_getlandlordvoucheradditionsdetails`({$id})";
            return $this->getJSON($sql);
        }

        function deletelandlordvoucheradditions($id){
            $sql = "CALL `sp_deletelandlordvoucheradditions`({$id},{$this->userid})";
            $this->getData($sql);
            return "success";
        }

        function getlandlordvoucherdeductions($ownerid){
            $sql = "CALL `sp_getlandlordvoucherdeductions`({$ownerid})";
            return $this->getJSON($sql);
        }

        function getlandlordvoucherdeductionsdetails($id){
            $sql = "CALL `sp_getlandlordvoucherdeductionsdetails`({$id})";
            return $this->getData($sql);
        }

        function deletelandlordvoucherdeductions($id){
            $sql = "CALL `sp_deletelandlordvoucherdeductions`($id,{$this->userid})";
            $this->getData($sql);
            return "success";
        }

                             
        
        // payment modes
        function getpaymentmodesaccounts(){
            $sql = "CALL `sp_getpaymentmodesaccounts`()";
            return $this->getJSON($sql);
        }

        function checkpaumentmodes($paymentmodeid,$modename){
            $sql = "CALL `sp_checkpaumentmodes`({$paymentmodeid},'{$modename}')";
            $this->getData($sql)->rowCount();
        }

        function savepaymentmode($paymentmodeid, $modename,$requiref,$accountid){
            if($this->checkpaumentmodes($paymentmodeid,$modename)){
                return ["status"=>"exists","message"=>"exists"];
            }else{
                $sql = "CALL `sp_savepaymentmode`({$paymentmodeid},'{$modename}',{$requiref},{$accountid},{$this->userid},'{$this->platform}')";
                $this->getData($sql);
                return["status"=>"success","message"=>"successs"];
            }
        }

        function getpaymentmodes(){
            $sql="CALL `sp_getpaymentmodes`()";
            return $this->getJSON($sql);
        }

        function getpaymentmodedetails($paymentmodeid){
            $sql ="CALL `sp_getpaymentmodedetails`({$paymentmodeid})";
            return $this->getJSON($sql);
        }

        function deletepaymentmode($paymentmodeid){
            $sql = "CALL `sp_deletepaymentmode`({$paymentmodeid},{$this->userid},'{$this->platform}')";
             $this->getData($sql);
             return "success";
        }

        // financial reports
        function getprofitandlossreport($startdate,$enddate){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            $sql="CALL `sp_getprofitandlossreport`('{$startdate}','{$enddate}')";
            return $this->getJSON($sql);
        }

        function getbalancesheetreport($startdate,$enddate){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            $sql="CALL `sp_getbalancesheetreport`('{$startdate}','{$enddate}')";
            return $this->getJSON($sql);
        }

        function getcashflowreport($startdate,$enddate){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            $sql="CALL `sp_getcashflowreport`('{$startdate}','{$enddate}')";
            return $this->getJSON($sql);
        }

        function gettrialbalance($startdate,$enddate){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            // $sql="CALL `sp_gettrialbalance`($startdate,$enddate)";
            $sql = "CALL `sp_gettrialbalance`('{$startdate}','{$enddate}')";
            return $this->getJSON($sql);
        }

        function getglstatement($startdate,$enddate,$accountid){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            $sql="CALL `sp_getglstatement`('{$startdate}','{$enddate}',{$accountid})";
            return $this->getJSON($sql);
        }

        // cashbook
        function savejournalentry2($refno,$referenceno,$description,$journaldate){
            $addtoledger=1;
            $journaldate=$this->mySQLDate($journaldate);
            $sql="CALL `sp_savejournaltransaction`('{$refno}','{$referenceno}','{$description}','{$journaldate}',{$addtoledger},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }


        // other financial transactions
        function getothertransactiondetails($transactiontype){
            $sql= "CALL `sp_getothertransactiondetails`(1,'{$transactiontype}')";
            return $this->getJSON($sql);
        }

        // save other financial transaction
        function saveothertransaction($refno,$transactionid,$transactiontype,$description,$reference,$transactiondate,$paymentmodeid,$currencyid,$amount,$loanamount,$accountcreditedid,$subaccountid){
            $transactiondate=$this->mySQLDate($transactiondate);
            $reference= empty($reference) ? "NULL" : "'$reference'";
            $subaccountid= empty($subaccountid) ? "NULL" : $subaccountid;
            $loanamount= empty($loanamount) ? 0 : $loanamount;
            $sql="CALL `sp_saveothertransaction`('{$refno}',{$transactionid},'{$transactiontype}','{$description}',{$reference},'{$transactiondate}',{$paymentmodeid},{$currencyid},{$amount},{$loanamount},
            {$accountcreditedid},{$subaccountid},{$this->userid},1,'{$this->platform}')";
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function getothertransactions(){
            $sql = "CALL `sp_getothertransactions`()";
            return $this->getJSON($sql);
        }
        function getotherfinancetransactionothersdetails($transactionid){
            $sql = "CALL `sp_getotherfinancetransactionothersdetails`({$transactionid})";
           return $this->getJSON($sql);
        }
        function deleteothertransaction($transactionid){
            $sql="CALL `sp_deleteothertransaction`({$transactionid},{$this->userid},1,'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }
    }
?>