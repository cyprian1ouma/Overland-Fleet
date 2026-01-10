<?php
    require_once("db.php");

    class branch extends db{

        function checkbranch($branchid,$checkfield,$checkvalue){
            $sql="CALL `sp_checkbranch`({$branchid},'{$checkfield}','{$checkvalue}')";
            return $this->getData($sql)->rowCount();
        }

        function savebranch($branchid,$branchname,$shortcode,$physicaladdress,$tenantnoprefix,$tenantcurrentno,$tenantnosuffix,
        $senderid,$emailaddress,$emailpassword,$smtpserver,$smtpport,$usessl){
            if($this->checkbranch($branchid,'branchname',$branchname)){
                return "branch exists";
            }else if($this->checkbranch($branchid,'shortcode',$shortcode)){
                return "shortcode exists";
            }else if($this->checkbranch($branchid,'tenantnoprefix',$tenantnoprefix)){
                return "tenant no prefix exists";
            }else if($this->checkbranch($branchid,'senderid',$senderid)){
                return "senderid exists";
            }else{
                $sql="CALL `sp_savebranch`({$branchid},'{$branchname}','{$shortcode}','{$physicaladdress}','{$tenantnoprefix}',{$tenantcurrentno},'{$tenantnosuffix}',
                '{$senderid}','{$emailaddress}','{$emailpassword}','{$smtpserver}',{$smtpport},{$usessl},{$this->userid},'{$this->platform}')";
                // echo $sql.PHP_EOL;
                $this->getData($sql);
                return "success";
            }
        }

        function deletebranch($branchid){
            $sql="CALL `sp_deletebranch`({$branchid},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }

        function getbranches(){
            $sql="CALL `sp_getbranches`()";
            return $this->getJSON($sql);
        }

        function getbranchdetails($branchid){
            $sql="CALL `sp_getbranchdetails`({$branchid})";
            return $this->getJSON($sql);
        }
    }

?>