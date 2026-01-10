<?php
    require_once("../models/receivables.php");

    $receivables = new receivables();


    if(isset($_GET['getallinvoicedclients'])){
        echo $receivables->getallinvoicedclients();
    }

    if (isset($_GET['getallinvoicedclientsdetails'])) {
        // Ensure that 'selectedclientid' is passed
        if (isset($_GET['selectedclientid'])) {
            $clientid = $_GET['selectedclientid'];  // Fetch the selected client ID
            echo $receivables->getallinvoicedclientsdetails($clientid);  // Call the method with the client ID
        } else {
            echo json_encode(["error" => "Client ID not provided."]);
        }
    }

    if(isset($_GET['getallreceipts'])){
        echo $receivables->getallreceipts();
    }

    // get filtered receipts
    if(isset($_GET['getfilteredreceipts'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $receivables->getfilteredreceipts($startdate,$enddate);
    }


    // if(isset($_POST['savepayment'])){
    //     $paymentid = $_POST['paymentid'];
    //     $paymentdate = $_POST['paymentdate'];
    //     // $description = $_POST['description'];
    //     // $amount = $_POST['amount'];
    //     $amountpaid = $_POST['amountpaid'];
    //     $modeofpayment = $_POST['modeofpayment'];
    //     $balance = $_POST['balance'];
    //     $comments = $_POST['comments'];

    //     // Save payment
    //     $response=$receivables->savepayment($paymentid,$paymentdate,$amountpaid,$modeofpayment,$balance,$comments);
    //     echo json_encode($response);
    // }


    if(isset($_GET['getmultipleinvoices'])){
        echo $receivables->getmultipleinvoices();
    }

    if(isset($_GET['getallinvoices'])){
        echo $receivables->getallinvoices();
    }

    if(isset($_GET['getunpaidinvoices'])){
        $clientid = $_GET['clientid'];
        echo $receivables->getunpaidinvoices($clientid);

    }

    if(isset($_GET['getstatementclients'])){
        echo $receivables->getstatementclients();
    }

    if(isset($_GET['getstatement'])){ 
        $clientid = $_GET['clientid'];
        $datefrom = $_GET['datefrom'];
        $dateto = $_GET['dateto'];
        $statementcurrency=$_GET['statementcurrency'];
        echo $receivables->getstatement($clientid,$datefrom,$dateto,$statementcurrency);
    }
   

     if(isset($_GET['getfilteredstatement'])){
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        echo $receivables->getfilteredstatements($startdate,$enddate);
    }

    if(isset($_GET['getalltransactionclients'])){
        echo  $receivables->getalltransactionclients();
    }

    // delete receipt
   if(isset($_POST['deletereceipt'])){
      $receiptid = $_POST['receiptid'];
      // var_dump($_POST);
      echo json_encode($receivables->deletereceipt($receiptid));
   }
 

    // if(isset($_GET['getalltransactionclientsdetails'])){
    //     $clientid = $_GET['clientid'];
    //     echo  $receivables->getalltransactionclientsdetails($clientid);
    // }




    // save the invoices temporarily
    if (isset($_POST['savereceipts'])) {
        $clientid = $_POST['clientid'];
        $modeofpayment = $_POST['modeofpayment'];
        $reference = $_POST['reference'];
        $paycurrency = $_POST['paycurrency'];
        $exchangerate = $_POST['exchangerate'];
        $receiptdate = $_POST['receiptdate'];
        $paiditems = json_decode(stripcslashes($_POST['paiditems']), true);
        $refno = hash('md5', $receivables->uniqidReal(10));

        // Check for any JSON errors
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
            return;
        }

        if (is_array($paiditems) && count($paiditems) > 0) {
            $responses = [];
            foreach ($paiditems as $item) {
                $invoiceno = $item['invoiceno'];
                $amount = $item['amount'];
                $response = $receivables->savetempreceipts($refno,$invoiceno,$amount);
                $responses[] = $response;
            }

            $response = $receivables->savereceipts($refno,$clientid,$receiptdate,$modeofpayment,$reference,$paycurrency,$exchangerate);
            echo json_encode(['status' => 'success', 'message' => 'Invoices paid successfully', 'data' => $response]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Invalid invoice data']);
        }
    }

    // payment methods
    if(isset($_GET['getpaymentmethods'])){
        echo $receivables->getpaymentmethods();
    }






?>