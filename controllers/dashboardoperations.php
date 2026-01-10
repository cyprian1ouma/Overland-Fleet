<?php
    require_once("../models/dashboard.php");

    $dashboard = new dashboard();

    // get dashboardusers
    if(isset($_GET['getdashboardusers'])){
        echo $dashboard->getdashboardusers();
    }

    // get the allocated vehicles and drivers
    if(isset($_GET['getallocateddriversandvehicles'])){
        echo $dashboard->getallocateddriversandvehicles();
    }

     // get filtered reports
    if(isset($_GET['getfilteredreports'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $dashboard->getfilteredreports($startdate,$enddate);
    }

    if(isset($_GET['getdashboardcreditnotes'])){
        echo $dashboard->getdashboardcreditnotes();
    }

    // added dashboard operations here
    if(isset($_GET['getdashboardtotaldivers'])){
        echo $dashboard->getdashboardtotaldivers();
    }

    if(isset($_GET['getdashboarddrivers'])){
        echo $dashboard->getdashboarddrivers();
    }

    if(isset($_GET['getdashboardtruckno'])){
        echo $dashboard->getdashboardtruckno();
    }

    if(isset($_GET['getdashboardtrucks'])){
        echo $dashboard->getdashboardtrucks();
    }
    if(isset($_GET['getdashboardcustomersno'])){
        echo $dashboard->getdashboardcustomersno();
    }
    if(isset($_GET['getdashboardactiveallocationsno'])){
        echo $dashboard->getdashboardactiveallocationsno();
    }

    if(isset($_GET['comaparedriversandclients'])){
        echo $dashboard->comaparedriversandclients();
    }

    if(isset($_GET['getclientinvoicesummary'])){
        echo $dashboard->getclientinvoicesummary();
    }

    if(isset($_GET['getclientsbalances'])){
        echo $dashboard->getclientsbalances();
    }
?>