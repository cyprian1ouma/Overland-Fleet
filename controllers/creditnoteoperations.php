<?php

    require_once ('../models/creditnote.php');

    $creditnote = new creditnote();

    if(isset($_GET['getinvoicedclients'])){
        echo $creditnote->getinvoicedclients();
    }

    if(isset($_GET['getcreditnotes'])){
        $clientid = $_GET['clientid'];
        echo $creditnote->getcreditnotes($clientid);
    }

    // creditnote save
    if(isset($_POST['savecreditnote'])){
        $clientid = $_POST['clientid'];
        // $tax = json_decode($_POST['tax'] ?? '[]', true);
        $creditinvoiceitems=json_decode(stripcslashes($_POST['creditinvoiceitems']),true);

        $refno=hash('SHA256',$creditnote->uniqidReal());
    
        // Temporarily save all the items
        foreach($creditinvoiceitems as $item){
            $invoiceid=$item['invoiceid'];
            $amount = $item['amount'];
            $currency = $item['currency'];
            $tax = $item['tax'];
            $creditnote->savetempcreditnotes($refno,$invoiceid,$amount,$currency,$tax);
        }
    
        // Save permanently
        $response=$creditnote->savecreditnote($refno,$clientid);
        echo json_encode($response);
    }

     // allocation clients
     if(isset($_GET['getclients'])){
        echo $creditnote->getclients();
    }
?>