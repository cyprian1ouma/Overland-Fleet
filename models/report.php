<?php
    require_once("db.php");

    class report extends db{

        function getcreditnotedetails($clientid){
            $sql = "CALL `sp_getcreditnotedetails`({$clientid})";
            return $this->getJSON($sql);
        }

        function getcreditnoteprintdetails($clientid){
            $sql = "CALL `sp_getcreditnoteprintdetails`({$clientid})";
            return $this->getJSON($sql);
        }
        
        function cancelcreditnote($creditnoteid){
            $sql = "CALL `sp_cancelcreditnote`({$creditnoteid})";
            $this->getData($sql);
            return [
                "status" => "success",
                "message" => "Credit Note Deleted Successfully"
            ];
        }

        // delete invoice
        function deleteinvoice($invoiceid){
            if ($this->checkifinvoiceispaid($invoiceid)){
                // return "exists";
                return["status"=>"exists", "message"=>"Invoice already exists"];   
            }else{
                $sql = "CALL `sp_deleteinvoice`({$invoiceid},{$this->userid})";
                $this->getData($sql);
                // return "success"; 
                return["status"=>"success", "message"=>"Invoice deleted Sucessfully"];               
            }
        }

        // check if invoice has been paid first
        function checkifinvoiceispaid($invoiceid){
            $sql = "CALL `sp_checkifinvoiceispaid`({$invoiceid})";
             return $this->getData($sql)->rowCount();
        }

        function getallinvoices(){
            $sql = "CALL `sp_getallinvoices`()";
            return $this->getJSON($sql); 
        }

        function getinvoicedetails($invoiceid){
            $sql = "CALL `sp_getinvoicedetails` ('{$invoiceid}')";
            return $this->getJSON($sql);
        }


        function getcompanydetails(){
            $sql = "CALL `sp_getcompanydetails`()";
            return $this->getJSON($sql);
        }

        // function for filtering the clients
        function getinvoicedclient(){
            $sql= "CALL `sp_getinvoicedclients`()";
            return $this->getJSON($sql);
        }
       
        function filtertracker($startdate,$enddate,$status){
            $startdate=$this->mySQLDate($startdate);
            $enddate=$this->mySQLDate($enddate);
            $sql="CALL `sp_filtertracker`('{$startdate}','{$enddate}','{$status}')";
            return $this->getJSON($sql);
        }

        function getcontainerdeport(){
            $sql= "CALL `sp_getcontainerdeport`()";
            return $this->getJSON($sql);
        }

        function savecontainerdeportname($deportid, $deportname){
            $sql = "CALL `sp_savecontainerdeportname`({$deportid},'{$deportname}')";
            $this->getData($sql);
            return ["status" => "success", "message" => "Deport Name Saved Successfully"];
        }

        // save the reporttracker
        function savecontainerdeliverystatus($statusid, $allocationid, $containerdeportid, $cargodeliverystatus,$returndeportstatus,$qurantee,$deliveryinterchange,$clientinterchange){
            $sql= "CALL `sp_savecontainerdeliverystatus`({$statusid},{$allocationid},{$containerdeportid},'{$cargodeliverystatus}', '{$returndeportstatus}', '{$qurantee}','{$deliveryinterchange}',
             '{$clientinterchange}', {$this->userid})";
             $this->getData($sql);
             return["status"=>"success","message"=>"success"];
        }

        function getreporttrackerdetails($allocationid){
            $sql= "CALL `sp_getreporttrackerdetails`({$allocationid})";
            return $this->getJSON($sql);
        }

        function getinterchangestatus(){
            $sql= "CALL `sp_getinterchangestatus`()";
            return $this->getJSON($sql);
        }
    }


?>