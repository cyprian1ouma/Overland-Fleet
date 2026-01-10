<?php
    require_once("../models/allocation.php");

    $allocations = new allocation();

    // allocationvehicles
    if(isset($_GET['getallvehicles'])){
        echo $allocations->getallvehicles();
    }


    // allocation drivers
    if(isset($_GET['getdrivers'])){
        echo $allocations->getdrivers();
    }

       // get filtered allocations
    if(isset($_GET['getfilteredallocation'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        $allocationstatus=$_GET['allocationstatus'];
        echo $allocations->getfilteredallocation($startdate,$enddate,$allocationstatus);
    }
    

    // get all allocated vehicles
    if(isset($_GET['getallocatedvehiclesdetails'])){
        $allocationid = $_GET['allocationid'];
        echo $allocations->getallocatedvehiclesdetails($allocationid);
    }

    // combine both
    // Check if both parameters are set
    if (isset($_GET['getcompanydetails']) && isset($_GET['getallocatedvehiclesdetails'])) {
        // Get company details
        $companyDetails = json_decode($allocations->getcompanydetails(), true);

        // Get allocated vehicle details
        $allocationid = $_GET['allocationid'];
        $allocationDetails = json_decode($allocations->getallocatedvehiclesdetails($allocationid), true);

        // Combine both details into one array
        $response = [
            'company' => $companyDetails[0], // Assuming first result
            'allocation' => $allocationDetails[0] // Assuming first result
        ];

        // Return the combined response as JSON
        echo json_encode($response);
    }
    
    // allocation clients
    if(isset($_GET['getclients'])){
        echo $allocations->getclients();
    }

    // allocation currencies
    if(isset($_GET['getallocationcurrencies'])){
        echo $allocations->getallocationcurrencies();
    }

    // allocation containers
    if(isset($_GET['getallocationcontainers'])){
        echo $allocations->getallocationcontainers();
    }

    // get allocated vehicles
    if(isset($_GET['loadallocatedvehicles'])){
        echo $allocations->loadallocatedvehicles();
    }

   

    // get trailernumbers
    // if(isset($_GET['gettrailernumbers'])){
    //     echo $allocations->gettrailernumbers();
    // }

    // // get expected date in
    // if(isset($_GET['getexpecteddatein'])){
    //     echo $allocations->getexpecteddatein();
    // }

    // delete allocated vehicle
    if(isset($_POST['deleteallocatedvehicle'])){
        $allocationid = $_POST['allocationid'];
        echo json_encode($allocations->deleteallocatedvehicle($allocationid));
    }

    // save allocated vehicles
    if(isset($_POST['saveallocatedvehicle'])){
        // allocation card
        $allocationid=$_POST['allocationid'];
        $deliverytype=$_POST['deliverytype'];
        $truckno=$_POST['truckno'];
        $driverid= $_POST['driversname'];
        $route = $_POST['route'];
        $destination = $_POST['destination'];
        $kilometers = $_POST['kilometers'];

        // other details card
        $dateout = $_POST['dateout'];   
        // $stddays = $_POST['stddays'];
        $expecteddatein = $_POST['expecteddatein'];

        // particulars card
        $clientid = $_POST['clientname'];
        $particular=$_POST['particular'];
        $containerid = $_POST['containername'];
        $containernumber = $_POST['containernumber'];
        $others = $_POST['others'];
        $amount = $_POST['amount'];
        $currency = $_POST['currency'];
        $exchangerate = $_POST['exchangerate'];
        $remarks = $_POST['remarks'];

        // new allocated vehicle
        $updated =$_POST['updated'];
        
        if( $updated==1){
            $newdriverid = $_POST['newdriverid'];
            $newdriverstatus = $_POST['driverstatus'];
            $newvehicleid = $_POST['newvehicleid'];
            $newvehiclestatus = $_POST['truckstatus'];
            $newremarks = $_POST['statusremarks'];
        }else{
            $newdriverid =0;
            $newdriverstatus = '';
            $newvehicleid =0;
            $newvehiclestatus ='';
            $newremarks ='';
        }
       
       

        $response=$allocations->saveallocatedvehicle($allocationid,$deliverytype,$truckno,$driverid,$route,$destination,$kilometers,$dateout,$expecteddatein, $clientid, 
        $particular, $containerid, $containernumber, $others,$amount, $currency, $exchangerate,$remarks,$newdriverid,
        $newdriverstatus,$newvehicleid,$newvehiclestatus,$newremarks,$updated);
            
        echo json_encode($response);
    }

    // save allocated expenses
    if(isset($_POST['saveallocationexpenses'])){
        $expenseid = $_POST['addexpenseid'];
        $allocatedexpensename = $_POST['allocatedexpensename'];
        // $expenseamount = $_POST['expenseamount'];
        $response=$allocations->saveallocationexpenses($expenseid,$allocatedexpensename);
        echo json_encode($response);
    }

    // save the expenses of a specific vehicle
    if(isset($_POST['saveallocatedexpense'])){
        $allocationid = $_POST['allocationid'];
        $expenses=json_decode($_POST['expenses'],true);
        $refno=$allocations->uniqidReal();
        
        foreach($expenses as $expense){
            $expenseid=$expense['allocatedexpensename'];
            $amount=$expense['allocatedexpenseamount'];
            // execute saving code here
            $allocations->savetemporaryallocatedexpenses($refno,$expenseid,$amount);
            // $response=$allocations->saveallocatedexpenses($expenseid,$expensename);
            // echo json_encode($response);
        }
        $response=$allocations->saveallocatedexpenses($refno,$allocationid);
        echo json_encode($response);
        // $allocatedexpensename = $_POST['allocatedexpensename'];
        // $allocatedexpenseamount = $_POST['allocatedexpenseamount'];
    }

    // if(isset($_GET['getallocatedvehiclesdetails'])){
    //     echo $allocations->getallocatedvehiclesdetails();
    // } 

    if(isset($_GET['gettrailernumber'])){
        $vehicleid = $_GET['vehicleid'];
        echo $allocations->gettrailernumbers($vehicleid);
    }

    if(isset($_GET['getallexpenses'])){
        echo $allocations->getallexpenses();
    }
    if(isset($_GET['getsavedexpenses'])){
        echo $allocations->getsavedexpenses();
    }

    if(isset($_GET['getallocatedexpenses'])){
        $allocationid = $_GET['allocationid'];
        echo $allocations->getallocatedexpenses($allocationid);
    }

    if(isset($_GET['getunallocatedvehicles'])){
        echo $allocations->getunallocatedvehicles();
    }

    if(isset($_GET['getunallocateddrivers'])){
        echo $allocations->getunallocateddrivers();
    }

    if(isset($_GET['printdeliverynote'])){
        $allocationid = $_GET['allocationid'];
        echo $allocations->gettrailernumbers($allocationid);
    }

  if(isset($_POST['savevehiclerecieved'])){
        $allocationid = $_POST['allocationid'];
        $actualdate = $_POST['actualdate'];
        $revceivablestatus = $_POST['revceivablestatus'];
        $response= $allocations->savevehiclerecieved($allocationid, $actualdate, $revceivablestatus);
        echo json_encode($response);
    }

    // other allocation application
    if(isset($_GET['getavailabletruck'])){
        echo $allocations->getavailabledruck();
    }
    if(isset($_GET['getavaiabledrivers'])){
        echo $allocations->getavaiabledrivers();
    }
    
?>