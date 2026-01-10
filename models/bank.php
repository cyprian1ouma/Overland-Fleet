<?php
    require_once('db.php');
    
    class bank extends db{

        function checkbank($bankid,$checkfield,$checkvalue){
            $sql="CALL `sp_checkbank`({$bankid},'{$checkfield}','{$checkvalue}')";
            return $this->getData($sql)->rowCount();
        }

        function savebank($bankid,$bankcode,$bankname){
            // check if code or name exists
            if($this->checkbank($bankid,'code',$bankcode)){
                return ["status" => "exists", "message"=>"code exists"];
            }else if($this->checkbank($bankid,'name',$bankname)) {
                return ["status" => "exists", "message"=>"name exists"];
            }else{
                $sql="CALL `sp_savebank`({$bankid},'{$bankcode}','{$bankname}',{$this->userid},'{$this->platform}')";
                // echo $sql.PHP_EOL;
                $this->getData($sql);
                return ["status"=>"success","message"=>"success"];
            }
        }

        function getbanks(){
            $sql="CALL `sp_getbanks`()";
            return $this->getJSON($sql);
        }

        function getbankdetails($bankid){
            $sql="CALL `sp_getbankdetails`({$bankid})";
            return $this->getJSON($sql);
        }

        function deletebank($bankid){
            $sql="CALL `sp_deletebank`({$bankid},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function checkbankbranchcode($branchid,$branchcode){
            $sql="CALL `sp_checkbankbranchcode`({$branchid},'{$branchcode}')";
            return $this->getData($sql)->rowCount();
        }

        function checkbankbranchname($branchid,$bankid,$branchname){
            $sql="CALL `sp_checkbankbranchname`({$branchid},{$bankid},'{$branchname}')";
            return $this->getData($sql)->rowCount();
        }

        function savebankbranch($branchid,$bankid,$branchcode,$branchname){
            if($this->checkbankbranchcode($branchid,$branchcode)){
                return ["status"=>"exists","message"=>"code exists"];
            }else if($this->checkbankbranchname($branchid,$bankid,$branchname)){
                return ["status"=>"exists","message"=>"name exists"];
            }else{
                $sql="CALL `sp_savebankbranch`({$branchid},{$bankid},'{$branchcode}','{$branchname}',{$this->userid},'{$this->platform}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"success"];
            }
        }

        function getbankbranches($bankid){
            $sql="CALL `sp_getbankbranches`({$bankid})";
            return $this->getJSON($sql);
        }

        function getbranchdetails($branchid){
            $sql="CALL `sp_getbankbranchdetails`({$branchid})";
            return $this->getJSON($sql);
        }

        function deletebankbranch($branchid){
            $sql="CALL `sp_deletebankbranch`({$branchid},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return["status" =>"success", "message"=>"success"];
        }
    }
?>