<?php
require_once("db.php");

class dashboard extends db{

    // get dashboard users
    function getdashboardusers(){
        $sql = "CALL `sp_getdashboardusers`()";
        return $this->getJSON($sql);
    }

    function getallocateddriversandvehicles(){
        $sql = "CALL `sp_getallocateddriversandvehicles`()";
        return $this->getJSON($sql);
    }

    function getfilteredreports($startdate, $enddate) {
        $sql = "CALL `sp_getfilteredreports`('{$startdate}', '{$enddate}')";
        return $this->getJSON($sql);
    }

    function getdashboardcreditnotes(){
        $sql = "CALL `sp_getdashboardcreditnotes`()";
        return $this->getJSON($sql);
    }

    // add more dashboard operations here
    function getdashboardtotaldivers(){
        $sql = "CALL `sp_getdashboardtotaldivers`()";
        return $this->getJSON($sql);
    }

    function getdashboarddrivers(){
        $sql = "CALL `sp_getdashboarddrivers`()";
        return $this->getJSON($sql);
    }

    function getdashboardtruckno(){
        $sql = "CALL `sp_getdashboardtruckno`()";
        return $this->getJSON($sql);
    }

    function getdashboardtrucks(){
        $sql = "CALL `sp_getdashboardtrucks`()";
        return $this->getJSON($sql);
    }

    function getdashboardcustomersno(){
        $sql = "CALL `sp_getdashboardcustomersno`()";
        return $this->getJSON($sql);
    }
    function getdashboardactiveallocationsno(){
        $sql = "CALL `sp_getdashboardactiveallocationsno`()";
        return $this->getJSON($sql);
    }

    function comaparedriversandclients(){
        $sql = "CALL `sp_comaparedriversandclients`()";
        return $this->getJSON($sql);
    }

    function getclientinvoicesummary(){
        $sql = "CALL `sp_getclientinvoicesummary`()";
        return $this->getJSON($sql);
    }

    function getclientsbalances(){
        $sql="CALL `sp_getclientsbalances`()";
        return $this->getJSON($sql);
    }
}
?>