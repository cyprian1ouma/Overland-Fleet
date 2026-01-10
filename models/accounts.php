<?php
    require_once("db.php");

    class account extends db{
        function checkvotehead($itemid,$itemname){
            $sql="CALL `sp_checkchargeableitem`({$itemid},'{$itemname}')";
            return $this->getData($sql)->rowCount();
        }

        function savevotehead($itemid,$itemdescription,$recurring,$amount,$refundable,$percentage,$percentageitemid, $isadeposit, $hascommission, $visible){
            if($this->checkvotehead($itemid,$itemdescription)){
                return "exists";
            }else{
                $sql="CALL `sp_savechargeableitem`({$itemid},'{$itemdescription}',{$recurring},{$amount},{$refundable},{$percentage},{$isadeposit}, {$hascommission}, {$visible},{$percentageitemid},
                    {$this->userid},'{$this->platform}')";
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