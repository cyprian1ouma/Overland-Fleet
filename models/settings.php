<?php
    require_once("db.php");

    class settings extends db{
        function getiddocuments(){
            $sql="CALL `sp_getregistrationdocuments`()";
            return $this->getJSON($sql);
        }

        function getmaritalstatuses(){
            $sql="CALL `sp_getmaritalstatuses`()";
            return $this->getJSON($sql);
        }

        function getreligions(){
            $sql="CALL `sp_getreligions`()";
            return $this->getJSON($sql);
        }

        function getsalutation(){
            $sql="CALL `sp_getsalutations`()";
            return $this->getJSON($sql);
        }

        function gettenantcategories(){
            $sql="CALL `sp_gettenantcategories`()";
            return $this->getJSON($sql);
        }

        function checkpublicholiday($id,$holidaydate,$holidayname){
            $sql="CALL `sp_checkpublicholiday`({$id},'{$holidaydate}','{$holidayname}')";
            $response=$this->getData($sql);
            if($response->rowCount()){
                return ["status"=>"exists","message"=>$response->fetch()['description']];
            }else{
                return ["status"=>"ok","message"=>""];
            }
        }   

        function savepublicholiday($id,$holidayname,$holidaydate,$repeatsannually,$skipweekends){
            $holidaydate=$this->mySQLDate($holidaydate);
            $status=$this->checkpublicholiday($id,$holidaydate,$holidayname);
            if($status['status']=="exists"){
                return  $status;
            }else{
                $sql="CALL `sp_savepublicholiday`({$id},'{$holidayname}','{$holidaydate}',{$repeatsannually},{$skipweekends},{$this->userid},'{$this->platform}')";
                $this->getData($sql);
                return ["status"=>"success","message"=>"success"];
            }
        }

        function getpublicholidays($status="current"){
            $sql="CALL `sp_getpublicholidays`('{$status}')";
            return $this->getJSON($sql);
        }

        function getpublicholidaydetails($id){
            $sql="CALL `sp_getpublicholidaydetails`({$id})";
            return $this->getJSON($sql);
        }

        function deletepublicholiday($id){
            $sql="CALL `sp_deletepublicholiday`({$id},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function getrelationships(){
            $sql="CALL `sp_getrelationships`()";
            return $this->getJSON($sql);
        }

        function getcourselevels(){
            $sql="CALL `sp_getcourselevels`()";
            return $this->getJSON($sql);
        }

        function getpaymentmethods(){
            $sql="CALL `sp_getpaymentmethods`()";
            return $this->getJSON($sql);
        }
        function getinstitution(){
            $sql = "CALL `sp_getinstitution`()";
            return $this->getJSON($sql);
        }
    
    }

?>