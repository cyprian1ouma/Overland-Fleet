<?php
   require_once("db.php");

   class master  extends db{
       function getvehicletype(){
        $sql =" CALL `sp_getvehicletype`()";
        return $this->getJSON($sql);
       }

       function savevehicles($vehicleid,$trucknumber,$trailerno,$model,$manufacturedyear, $color,$vehicletype){
        $sql="CALL `sp_savevehicles`({$vehicleid},'{$trucknumber}','{$trailerno}','{$model}',{$manufacturedyear},'{$color}',{$vehicletype})";
        $this->getData($sql);
        return["status"=>"success","message"=>"Vehicle saved successfully"];
       }

       function getallvehicles(){
        $sql="CALL `sp_getallvehicles`()";
        return $this->getJSON($sql);
       }

       function saveclients($clientid,$clientname,$address,$telephone,$contactperson){
       $sql="CALL `sp_saveclients` ({$clientid},'{$clientname}','{$address}','{$telephone}','{$contactperson}')";
       $this->getData($sql);
       return["status"=>"success", "message"=>"Client saved successfully"];
       }

       function getclients(){
        $sql="CALL `sp_getclients`()";
        return $this->getJSON($sql);
       }

       function deletevehicle($vehicleid){
        $sql="CALL `sp_deletevehicle` ({$vehicleid})";
        $this->getData($sql);
        return["status"=>"success", "message"=>"Vehicle deleted Sucessfully"];
       }

       function getvehicledetails($vehicleid){
        $sql="CALL `sp_getvehicledetails` ({$vehicleid})";
        return $this->getJSON($sql);
       }

        function deleteclient($clientid){
        $sql="CALL `sp_deleteclient` ({$clientid})";
        $this->getData($sql);
        return["status"=>"success", "message"=>"client deleted successfully"];
        }  

        function getclientdetails($clientid){
            $sql="CALL `sp_getclientdetails`({$clientid})";
            return $this->getJSON($sql);
        }

        function getidtypes(){
            $sql="CALL `sp_getidtypes`()";
            return $this->getJSON($sql);
        }

        function savedrivers($driverid,$firstname,$lastname,$idtype,$identityno,$telephone,$residence){
            $sql="CALL `sp_savedrivers` ({$driverid},'{$firstname}','{$lastname}',{$idtype},'{$identityno}','{$telephone}','{$residence}')";
            $this->getData($sql);
            return["status"=>"success", "message"=>"Driver added successfully"];
        }

        function getdrivers(){
            $sql="CALL `sp_getdrivers`()";
            return $this->getJSON($sql);
        }

        function getdriverdetails($driverid){
            $sql="CALL `sp_getdriverdetails`($driverid)";
            return $this->getJSON($sql);
        }

        function deletedriver($driverid){
            $sql="CALL `sp_deletedriver`($driverid)";
            $this->getData($sql);
            return["status"=>"success", "message"=>"driver deleted sucessfully"];
        }

        // votehead detail
        function checkvotehead($itemid,$itemname){
            $sql="CALL `sp_checkchargeableitem`({$itemid},'{$itemname}')";
            return $this->getData($sql)->rowCount();
        }

        function savevotehead($itemid,$itemdescription,$amount, $visible){
            if($this->checkvotehead($itemid,$itemdescription)){
                return "exists";
            }else{
                $sql="CALL `sp_savechargeableitem`({$itemid},'{$itemdescription}',{$amount}, {$visible},{$this->userid},'{$this->platform}')";
                // echo $sql.PHP_EOL;
                $this->getData($sql);
                return "success";
            }
        }

        function deletevotehead($itemid){
            $sql="CALL `sp_deletechargeableitem`($itemid,{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }

        function getvoteheads(){
            $sql="CALL `sp_getchargeableitems`()";
            return $this->getJSON($sql);
        }

        function getvoteheaddetails($itemid){
            $sql="CALL `sp_getchargeableitemdetails`({$itemid})";
            return $this->getJSON($sql);
        }

        function filtervoteheads($category){
            $sql="CALL `sp_filterchargeableitems`('{$category}')";
            return $this->getJSON($sql);
        }
   }
?>