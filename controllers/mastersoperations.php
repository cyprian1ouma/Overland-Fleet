<?php
   require_once("../models/masters.php");

   $masters = new master();
  // vehicles
  if(isset($_POST['savevehicles'])){
    $vehicleid=$_POST['vehicleid'];
    $trucknumber=$_POST['trucknumber'];
    $trailerno=$_POST['trailerno'];
    $model=$_POST['model'];
    $manufacturedyear=$_POST['manufacturedyear'];
    $color=$_POST['color'];
    $vehicletype=$_POST['vehicletype'];

    $response=$masters->savevehicles($vehicleid,$trucknumber,$trailerno,$model,$manufacturedyear, $color,$vehicletype);
    echo json_encode($response);
  }

  if(isset($_GET['getallvehicles'])){
    echo $masters->getallvehicles();
  }

  if (isset($_GET['getvehicledetails'])){
    $vehicleid=$_GET['vehicleid'];
    echo $masters->getvehicledetails($vehicleid);
  }
  if(isset($_GET['getvehicletype'])){
    echo $masters->getvehicletype();
  }

  if (isset($_POST['deletevehicle'])){
    $vehicleid=$_POST['vehicleid'];
    echo json_encode($masters->deletevehicle($vehicleid));
    // echo json_encode($response); 
  }
  
  // identification
  if (isset($_GET['getidtypes'])){
    echo $masters->getidtypes();
  }

  

  

  // drivers
  if (isset($_POST['savedrivers'])){
    $driverid=$_POST['driverid'];
    $firstname=$_POST['firstname'];
    $lastname=$_POST['lastname'];
    $idtype=$_POST['idtype'];
    $identityno=$_POST['identityno'];
    $telephone=$_POST['telephoneno'];
    $residence=$_POST['residence'];

    $response=$masters->savedrivers($driverid,$firstname,$lastname,$idtype,$identityno,$telephone,$residence);
    echo json_encode($response);
  }

  if (isset($_GET['getdrivers'])){
    echo $masters->getdrivers();
  }

  if(isset($_GET['getdriverdetails'])){
    $driverid=$_GET['driverid'];
    echo $masters->getdriverdetails($driverid);
  }

  if(isset($_POST['deletedriver'])){
    $driverid=$_POST['driverid'];
    echo json_encode($masters->deletedriver($driverid));
  }

  // clients
  if (isset($_POST['saveclients'])){
    $clientid=$_POST['clientid'];
    $clientname=$_POST['clientname'];
    $address=$_POST['address'];
    $telephone=$_POST['telephone'];
    $contactperson=$_POST['contactperson'];

    $response=$masters->saveclients($clientid,$clientname,$address,$telephone,$contactperson);
    echo json_encode($response);
  }

  if (isset($_GET['getclients'])){
    echo $masters->getclients();
  }

  if(isset($_GET['getclientdetails'])){
    $clientid=$_GET['clientid'];
    echo $masters->getclientdetails($clientid);
  }

  if(isset($_POST['deleteclient'])){
    $clientid=$_POST['clientid'];
    echo json_encode($masters->deleteclient($clientid));
  }

  // voteheads
  if(isset($_POST['savevotehead'])){
    $itemid=$_POST['itemid'];
    $itemdescription=$_POST['itemdescription'];
    // $recurring=$_POST['recurring'];
    $amount=$_POST['amount'];
    // $refundable=$_POST['refundable'];
    // $percentage=$_POST['percentage'];
    // $isadeposit=$_POST['isadeposit'];
    // $hascommission=$_POST['hascommission'];
    $visible=$_POST['visible'];
    // $percentageitemid=$_POST['percentageitemid']==""?0:$_POST['percentageitemid'];
    echo $masters-> savevotehead($itemid,$itemdescription,$amount,$visible);
  }

  if(isset($_GET['getvoteheads'])){
      echo $masters-> getvoteheads();
  }

  if(isset($_GET['voteheaddetails'])){
      $itemid=$_GET['voteid'];
      echo $masters->getvoteheaddetails($itemid);
  }

  if(isset($_POST['deletevotehead'])){
      $itemid=$_POST['voteid'];
      echo $masters->deletevotehead($itemid);
  }

  if(isset($_GET['filtervoteheads'])){
      $category=$_GET['category'];
      echo $masters->filtervoteheads($category);
  }



  

  
 

  

  
?>