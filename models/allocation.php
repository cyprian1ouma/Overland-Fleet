<?php
require_once("db.php");

class allocation extends db{


    function getallvehicles(){
        $sql="CALL `sp_getallvehicles`()";
        return $this->getJSON($sql);
    }

    function deleteallocatedvehicle($allocationid){
        $sql = "CALL `sp_deleteallocatedvehicle`({$allocationid})";
        $this->getData($sql);
        return [
            "status" => "success",
            "message" => "Allocated Vehicle deleted successfully"
        ];
    }

    function getdrivers(){
        $sql="CALL `sp_getdrivers`()";
        return $this->getJSON($sql);
    }

    function getclients(){
        $sql="CALL `sp_getclients`()";
        return $this->getJSON($sql);
    }

    function getallocationcurrencies(){
        $sql="CALL `sp_getallocationcurrencies`()";
        return $this->getJSON($sql);
    }

    function getallocationcontainers(){
        $sql="CALL `sp_getallocationcontainers`()";
        return $this->getJSON($sql);
    }

    function getcompanydetails(){
        $sql = "CALL `sp_getcompanydetails`()";
        return $this->getJSON($sql);
    }
    

        function getallocatedvehiclesdetails($allocationid){
            $sql = "CALL `sp_getallocatedvehiclesdetails`({$allocationid})";
            // echo $sql;
            return $this->getJSON($sql);
        }

        function loadallocatedvehicles(){
            $sql = "CALL `sp_loadallocatedvehicles`()";
            return $this->getJSON($sql);
        }

        function gettrailernumbers($vehicleid){
            $sql = "CALL `sp_gettrailernumbers`({$vehicleid})";
            return $this->getJSON($sql);
        }

        function getexpecteddatein($allocationid){
            $sql = "CALL `sp_getexpecteddatein`({$allocationid})";
            return $this->getJSON($sql);
        }

        function getfilteredallocation($startdate, $enddate,$allocationstatus) {
            $startdate= $this->mySQLDate($startdate);
            $enddate= $this->mySQLDate($enddate);
            $sql = "CALL `sp_getfilteredallocation`('{$startdate}', '{$enddate}','{$allocationstatus}')";
            return $this->getJSON($sql);
        }

        function savetemporaryallocatedexpenses($refno,$expenseid,$amount){
            $sql="CALL `sp_savetempallocatedexpenses`('{$refno}',{$expenseid},{$amount})";
            $this->getData($sql);
        }

        function saveallocatedexpenses($refno,$allocationid){
            $sql="CALL `sp_saveallocatedexpenses`('{$refno}',{$allocationid},{$this->userid})";
        //    echo $sql;
            $this->getData($sql);
            return ["status"=>"success","message"=>"allocated expense save successfully"];
        }

        function saveallocatedvehicle($allocationid,$deliverytype,$truckno,$driverid,$route,$destination,$kilometers,$dateout,$expecteddatein, $clientid, 
            $particular, $containerid, $containernumber, $others,$amount, $currency, $exchangerate,$remarks,$newdriverid,
            $newdriverstatus,$newvehicleid,$newvehiclestatus,$newremarks,$updated) {
            
            $dateout=$this->mySQLDate($dateout);
            $expecteddatein=$this->mySQLDate($expecteddatein);                
            $sql ="CALL `sp_saveallocatedvehicle`({$allocationid},'{$deliverytype}',{$truckno},{$driverid},'{$route}','{$destination}',{$kilometers},
            '{$dateout}','{$expecteddatein}',{$clientid}, '{$particular}', {$containerid},'{$containernumber}','{$others}',{$amount},
            '{$currency}',{$exchangerate},'{$remarks}',{$this->userid},{$newdriverid},'{$newdriverstatus}',{$newvehicleid},'{$newvehiclestatus}',
            '{$newremarks}',{$updated})";
            //    echo ($sql);
            $deliveryno=$this->getData($sql)->fetch()['deliveryno'];
            return["status"=>"success", "message"=>"success","deliveryno"=>$deliveryno];
        }

        function getallexpenses(){
            $sql = "CALL `sp_getallexpenses`()";
            return $this->getJSON($sql);
        }

        function saveallocationexpenses($expenseid, $allocatedexpensename){
            $sql = "CALL `sp_saveallocationexpenses`({$expenseid}, '{$allocatedexpensename}')";
            $result=$this->getData($sql);
            return["status"=>"success", "message"=>"success"];
        }


        function getsavedexpenses(){
            $sql = "CALL `sp_getsavedespenses`()";
            return $this->getJSON($sql);
        }

        function getallocatedexpenses($allocationid){
            $sql = "CALL `sp_getallocationexpenses`({$allocationid})";
            return $this->getJSON($sql);
        }

        function getunallocatedvehicles(){
            $sql = "CALL `sp_getunallocatedvehicles`()";
            return $this ->getJSON($sql);
        }

        function getunallocateddrivers(){
            $sql = "CALL `sp_getunallocateddrivers`()";
            return $this -> getJSON($sql);
        }

        function printdeliverynote($allocationid){
            $sql = "CALL `sp_printdeliverynote`({$allocationid})";
            return $this->getJSON($sql);
        }

       
        function savevehiclerecieved($allocationid, $actualdate, $revceivablestatus){
          $actualdate=$this->mySQLDate($actualdate);
          $sql = "CALL `sp_savevehiclerecieved`({$allocationid}, '{$actualdate}', {$this->userid}, '{$revceivablestatus}', '{$this->platform}')";
          $this->getData($sql);
          return["status"=>"success", "message"=>"Vehicle received successfully"];
         }

        //  other allocation application
        function getavailabledruck(){
            $sql = "CALL `sp_getavailabledruck`()";
            return $this->getJSON($sql);
        }

        function getavaiabledrivers(){
            $sql = "CALL `sp_getavaiabledrivers`()";
            return $this->getJSON($sql);
        }
    }                 
?>