<?php
    require_once("../models/invoice.php");

    $invoices = new invoice();

    
    // allocated clients
    if(isset($_GET['getclients'])){
        echo $invoices->getclients();
    }

    if(isset($_GET['getcreditnotes'])){
        $clientid = $_GET['clientid'];
        echo $invoices->getcreditnotes($clientid);
    }


    if(isset($_GET['getalldeliveryorders'])){
        $clientid = $_GET['clientid'];
        echo $invoices->getalldeliveryorders($clientid);
    }


    if(isset($_POST['saveinvoices'])){
        // var_dump($_POST);
        $clientid = $_POST['clientid'];
        $invoicedate = $_POST['invoicedate'];
        $oldinvoiceno = $_POST['oldinvoiceno'];
        // $currency = $_POST['currency'];
        // $rate = $_POST['rate'];
        $tax = json_decode($_POST['tax'] ?? '[]', true);
        $invoiceditems=json_decode(stripcslashes($_POST['invoiceditems']),true);

        $refno=hash('SHA256',$invoices->uniqidReal());
    
        // Temporarily save all the items
        foreach($invoiceditems as $item){
            $deliveryorderno = $item['deliveryorderno'];
            $amount=$item['amount'];
            $tax = $item['tax'];
            $invoices->savetempinvoices($refno,$deliveryorderno,$amount,$tax);
        }
    
        // Save permanently
        $response=$invoices->saveinvoices($refno,$clientid,$invoicedate,$oldinvoiceno);
        echo json_encode($response);
        
    }

    
    // creditnote save
    if(isset($_POST['savecreditnote'])){
        $clientid = $_POST['clientid'];
        // $tax = json_decode($_POST['tax'] ?? '[]', true);
        $creditinvoiceitems=json_decode(stripcslashes($_POST['creditinvoiceitems']),true);

        $refno=hash('SHA256',$invoices->uniqidReal());
    
        // Temporarily save all the items
        foreach($creditinvoiceitems as $item){
            $invoiceid=$item['invoiceid'];
            $amount = $item['amount'];
            $currency = $item['currency'];
            $tax = $item['tax'];
            $invoices->savetempcreditnotes($refno,$invoiceid,$amount,$currency,$tax);
        }
    
        // Save permanently
        $response=$invoices->savecreditnote($refno,$clientid);
        echo json_encode($response);
    }
    

    if(isset($_GET['getallinvoices'])){
        echo $invoices->getallinvoices();
    }

    // allocation currencies
    if(isset($_GET['getallcurrencies'])){
        echo $invoices->getallcurrencies();
    }

    // get filtered invoices
    if(isset($_GET['getfilteredinvoices'])){
        $clientid =$_GET['clientid'];
        $startdate = $_GET['startdate'];
        $enddate = $_GET['enddate'];
        $invoicecurrency=$_GET['invoicecurrency'];  
        $invoicestatus=$_GET['invoicestatus'];
        $ischecked=$_GET['ischecked'];
        echo $invoices->getfilteredinvoices($clientid,$startdate,$enddate,$invoicecurrency,$invoicestatus,$ischecked);
    }

    // other invoice operations
    if(isset($_GET['getclientstoinvoice'])){
        echo $invoices->getclientstoinvoice();
    }

    if(isset($_GET['getinvoicedclients'])){
        echo $invoices->getinvoicedclients();
    }

    
    
?>
