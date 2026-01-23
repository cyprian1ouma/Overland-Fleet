<?php
    require_once("db.php");

    class receivables extends db{


        // fill clients list
        function getallinvoicedclients(){
            $sql = "CALL `sp_getallinvoicedclients`()";
            return $this->getJSON($sql);
        }

        function getallinvoicedclientsdetails($clientid){
            $sql = "CALL `sp_getallinvoicedclientsdetails`({$clientid})";
            return $this->getJSON($sql);
        }

        function getmultipleinvoices(){
            $sql = "CALL `sp_getmultipleinvoices`()";
            return $this->getJSON($sql);
        }

        function getallinvoices(){
            $sql = "CALL `sp_getallinvoices`()";
            return $this->getJSON($sql);
        }

        function getallreceipts(){
            $sql = "CALL sp_getallreceipts()";
            return $this->getJSON($sql);
        }

        function getunpaidinvoices($clientid){
            $sql = "CALL `sp_getunpaidinvoices`({$clientid})";
            return $this->getJSON($sql);
        }

        function getfilteredreceipts($startdate, $enddate) {
            $sql = "CALL `sp_getfilteredreceipts`('{$startdate}', '{$enddate}')";
            return $this->getJSON($sql);
        }



        // function savetempreceipts($refno,$invoiceid,$invoiceno,$amount){
        //     $sql = "CALL `sp_savetempreceipts`('{$refno}',{$invoiceid},'{$invoiceno}',{$amount})";
        //     //echo $sql.PHP_EOL;
        //     $this->getData($sql);
        //     return "success";
        // }

        // // save single and multiple payments 
        // function savereceipts($refno,$clientid,$receiptdate,$modeofpayment,$reference,$paycurrency,$exchangerate){
        //     $receiptdate=$this->mySQLDate($receiptdate);
        //     $sql = "CALL `sp_savereceipts`('{$refno}',{$clientid},'{$receiptdate}',{$modeofpayment},'{$reference}',{$paycurrency}, {$exchangerate}, {$this->userid})";
        //     // echo $sql;
        //     $this->getData($sql);
        //     return ["status"=>"success","message"=>"success"];
        // }

        function savetempreceipts($refno,$invoiceid,$invoiceno,$amount){
            $sql = "CALL `sp_savetempreceipts`('{$refno}',{$invoiceid},'{$invoiceno}',{$amount})";
            $this->getData($sql);
            return "success";
        }

        // save single and multiple payments 
        function savereceipts($refno,$clientid,$receiptdate,$modeofpayment,$reference,$paycurrency,$exchangerate){
            $receiptdate=$this->mySQLDate($receiptdate);
            $sql = "CALL `sp_savereceipts`('{$refno}',{$clientid},'{$receiptdate}',{$modeofpayment},'{$reference}',{$paycurrency}, {$exchangerate}, {$this->userid})";
            // echo $sql;
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        // get statements
        function getstatementclients(){
            $sql = "CALL  `sp_getstatementclients`()";
            return $this->getJSON($sql);
        }

        function getstatement($clientid,$datefrom,$dateto,$statementcurrency){
            $datefrom=$this->mySQLDate($datefrom);
            $dateto=$this->mySQLDate($dateto);
            $sql = "CALL  `sp_getstatement`({$clientid},'{$datefrom}','{$dateto}',{$statementcurrency})";
            return $this->getJSON($sql);
        }

        function getfilteredstatements($startdate,$enddate){
            $sql = "CALL  `sp_getfilteredstatements`('{$startdate}','{$enddate}')";
            return $this->getJSON($sql);
        }


        function getalltransactionclients(){
            $sql = "CALL `sp_getalltransactionclients`()";
            return $this->getJSON($sql);
        }

        // delete receipt
        function deletereceipt($receiptid){
            $sql = "CALL `sp_deletereceipt`({$receiptid})";
            $this->getData($sql);
            return [
                "status" => "success",
                "message" => "Receipt Deleted Successfully"
            ];
        }

        // function getalltransactionclientsdetails($clientid){
        //     $sql = "CALL `sp_getalltransactionclientsdetails`({$clientid})";
        //     return $this->getJSON($sql);
        // }

        function getpaymentmethods(){
            $sql = "CALL `sp_getpaymentmethods`()";
            return $this->getJSON($sql);
        }




    }
?>