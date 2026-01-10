<?php
require_once("db.php");

class invoice extends db{

        function getclients(){
            $sql = "CALL `sp_getclients`()";
            return $this->getJSON($sql);
        }

        function getalldeliveryorders($clientid){
            $sql = "CALL `sp_getalldeliveryorders`({$clientid})";
            return $this->getJSON($sql);
        }

        function savetempinvoices($refno,$deliveryorderno,$amount,$tax){
            $sql = "CALL `sp_savetempinvoices`('{$refno}','{$deliveryorderno}',{$amount},{$tax})";
            //echo $sql.PHP_EOL;
            $this->getData($sql);
            return "success";
        }

        function saveinvoices($refno,$clientid,$invoicedate,$oldinvoiceno){
            $sql = "CALL `sp_saveinvoices`('{$refno}',{$clientid},'{$invoicedate}','{$oldinvoiceno}',{$this->userid})";
            // echo $sql;
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function getallinvoices(){
            $sql = "CALL `sp_getallinvoices`()";
            return $this->getJSON($sql);
            
        }

        function getallcurrencies(){
            $sql = "CALL `sp_getallcurrencies`()";
            return $this->getJSON($sql);
        }

        function getfilteredinvoices($clientid,$startdate, $enddate,$invoicecurrency,$invoicestatus,$ischecked) {
            // $startdate=$this->mySQLDate($startdate);
            // $enddate=$this->mySQLDate($enddate);
            $sql = "CALL `sp_getfilteredinvoices`({$clientid},'{$startdate}', '{$enddate}',{$invoicecurrency},'{$invoicestatus}',{$ischecked})";
            return $this->getJSON($sql);
        }

        function getcreditnotes($clientid){
            $sql = "CALL `sp_getcreditnotes`({$clientid})";
            return $this->getJSON($sql);
        }
        

        function savetempcreditnotes($refno,$invoiceid,$amount,$currency,$tax){
            $sql = "CALL `sp_savetempcreditnotes`('{$refno}',{$invoiceid},{$amount},'{$currency}',{$tax})";
            //echo $sql.PHP_EOL;
            $this->getData($sql);
            return "success";
        }

        function savecreditnote($refno,$clientid){
            $sql = "CALL`sp_savecreditnote`('{$refno}',{$clientid},{$this->userid})";
            // echo $sql;
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        // other invoice functions
        function getclientstoinvoice(){
            $sql = "CALL `sp_getclientstoinvoice`()";
            return $this->getJSON($sql);
        }

        function getinvoicedclients(){
            $sql = "CALL `sp_getinvoicedclients`()";
            return $this->getJSON($sql);
        }
    
    }

 
                       
?>