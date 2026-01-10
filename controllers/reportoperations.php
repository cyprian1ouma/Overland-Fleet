<?php
 require_once("../models/report.php");

 $reports = new report();

   if(isset($_GET['getcreditnotedetails'])){
      $clientid = $_GET['clientid'];
      echo $reports->getcreditnotedetails($clientid);
   }
   // delete Credit Note
   if(isset($_POST['cancelcreditnote'])){
      // var_dump($_POST);
      $creditnoteid = $_POST['creditnoteid'];
      echo json_encode($reports->cancelcreditnote($creditnoteid));
   }

   // get all invoices
   if(isset($_GET['getallinvoices'])){
      echo $reports->getallinvoices();
   }

   // delete invoice
   if(isset($_POST['deleteinvoice'])){
      $invoiceid = $_POST['invoiceid'];
      echo json_encode($reports->deleteinvoice($invoiceid));
   }

   // check if invoice has been paid
  if (isset($_GET['checkifinvoiceispaid'])) {
    $invoiceid = $_GET['invoiceid'];    
    echo $reports->checkifinvoiceispaid($invoiceid);
   }

   // combine both
   // Check if both parameters are set
   if (isset($_GET['getcompanydetails']) && isset($_GET['getinvoicedetails'])) {
      // Get company details
      $companyDetails = json_decode($reports->getcompanydetails(), true);

      // Get Invoice details
      $invoiceid = $_GET['invoiceid'];
      $invoiceDetails = json_decode($reports->getinvoicedetails($invoiceid), true);

      // Combine both details into one array
      $response = [
         'company' => $companyDetails[0], 
         'invoice' => $invoiceDetails[0] 
      ];

      // Return the combined response as JSON
      echo json_encode($response);
   }




   //get creditnoteprintingdetails
   // Check if both parameters are set
   if (isset($_GET['getcompanydetails']) && isset($_GET['getcreditnoteprintdetails'])) {
      // Get company details
      $companyDetails = json_decode($reports->getcompanydetails(), true);

      // Get Invoice details
      $clientid = $_GET['clientid'];
      $creditnoteDetails = json_decode($reports->getcreditnoteprintdetails($clientid), true);

      // Combine both details into one array
      $response = [
         'company' => $companyDetails[0], 
         'creditnote' => $creditnoteDetails[0] 
      ];

      // Return the combined response as JSON
      echo json_encode($response);
   }


   // Company details
   if(isset($_GET['getinvoicedclient'])){
      echo $reports->getinvoicedclient();
   }

       // get filtered allocations
    if(isset($_GET['filtertracker'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        $status=$_GET['status'];
        echo $reports->filtertracker($startdate,$enddate,$status);
    }

    // added code on the tracker report
   if(isset($_GET['getcontainerdeport'])){
      echo $reports->getcontainerdeport();
   }

   if(isset($_POST['savecontainerdeportname'])){
      $deportid = $_POST['deportid'];
      $deportname = $_POST['otherdeportname'];
      $response= $reports-> savecontainerdeportname($deportid, $deportname);
      echo json_encode($response);
   }
   if(isset($_POST['savecontainerdeliverystatus'])){
      $statusid = $_POST["containerdeportstatusid"];
      $allocationid = $_POST["allocationid"];
      $containerdeportid = $_POST["containerdeportid"];
      $cargodeliverystatus  = $_POST["deliverystatus"];
      $returndeportstatus = $_POST["containerreturnstatus"];
      $qurantee = $_POST["guaranteestatus"];
      $deliveryinterchange = $_POST["driverinterchangecollection"];
      $clientinterchange = $_POST["clinetinterchangereturn"];

      $response = $reports->savecontainerdeliverystatus($statusid, $allocationid, $containerdeportid, $cargodeliverystatus,$returndeportstatus,$qurantee,$deliveryinterchange,$clientinterchange);
      echo json_encode( $response);
   }

   if(isset($_GET['getreporttrackerdetails'])){
      $allocationid = $_GET['allocationid'];
      echo $reports->getreporttrackerdetails($allocationid);
   }

   if(isset($_GET['getinterchangestatus'])){
      echo $reports->getinterchangestatus();
   }

?>