<?php
    require_once ('db.php');
    class creditnote extends db{
        function getinvoicedclients(){
            $sql = "CALL `sp_getinvoicedclients`()";
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
        function getclients(){
            $sql="CALL `sp_getclients`()";
            return $this->getJSON($sql);
        }
    }


?>