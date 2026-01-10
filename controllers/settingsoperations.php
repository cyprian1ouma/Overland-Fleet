<?php
    require_once("../models/settings.php");

    $setting=new settings();

    if(isset($_GET['getserverdate'])){
        echo date('Y-m-d H:i:s') ;
    }
    if(isset($_GET['getregistrationdocuments'])){
        echo $setting->getiddocuments();
    }

    if(isset($_GET['getmaritalstatuses'])){
        echo $setting->getmaritalstatuses();
    }

    if(isset($_GET['getreligions'])){
        echo $setting->getreligions();
    }

    if(isset($_GET['getsalutations'])){
        echo $setting->getsalutation();
    }

    if(isset($_GET['gettenantcategories'])){
        echo $setting->gettenantcategories();
    }

    if(isset($_POST['savepublicholiday'])){
        $id=$_POST['holidayid'];
        $holidayname=$_POST['holidayname'];
        $holidaydate=$_POST['holidaydate'];
        $repeatsannually=$_POST['repeatsannually'];
        $skipweekends=$_POST['skipweekends'];
        $response=$setting->savepublicholiday($id,$holidayname,$holidaydate,$repeatsannually,$skipweekends);
        echo json_encode($response);
    }

    if(isset($_GET['getpublicholidays'])){
        $status=isset($_GET['status'])?$_GET['status']:"current";
        echo $setting->getpublicholidays($status);
    }

    if(isset($_GET['getpublicholidaydetails'])){
        $id=$_GET['holidayid'];
        echo $setting->getpublicholidaydetails($id);
    }

    if(isset($_POST['deletepublicholiday'])){
        $id=$_POST['holidayid'];
        $response=$setting->deletepublicholiday($id);
        echo json_encode($response);
    }

    if(isset($_GET['getrelationships'])){
        echo $setting->getrelationships();
    }

    if(isset($_GET['getcourselevels'])){
        echo $setting->getcourselevels();
    }

    if(isset($_GET['getpaymentmethods'])){
        echo $setting->getpaymentmethods();
    }

    if(isset($_GET['getinstitution'])){
        echo $setting->getinstitution();
    }
    

?>