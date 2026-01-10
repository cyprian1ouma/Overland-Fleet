<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>


<title>Fleet Manager - Finance</title>
</head>
<body>
<input type="checkbox" name="nav-toggle" id="nav-toggle">
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2>
                <i class="fas fa-warehouse"></i><span>Fleet Manager v1.0</span>
            </h2>
        </div>

        <?php require_once("sidebar.txt"); ?>
    </div>
    <div class="main-content">
        <div class="header">
            <h2>
                <label for="nav-toggle">
                    <i class="fas fa-bars"></i>
                </label>
               Receivables
            </h2>
            <div class="search-wrapper">
               <i class="fas fa-search"></i>
                <input type="text" name="search" id="search" placeholder="Search here ...">
            </div>

            <div class="user-wrapper">
                <img src="../images/user_profiles/1.jpg"  height="40px" width="40px"alt="" class="profilephoto">
                <div>
                    <h4 class="username">Martin Obwaka</h4>
                    <small class="role">System Admin</small>
                </div>
            </div>
        </div>
        <main id="finance">
            <!-- Navigation Tabs -->
             <div class="card">
                <div class="card-body">
                    <nav class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="payments-tab" data-toggle="tab" href="#payments" role="tab" aria-controls="payments" aria-selected="false">Payments</a>
                        <a class="nav-item nav-link" id="transactions-tab" data-toggle="tab" href="#transactions" role="tab" aria-controls="transactions" aria-selected="true">Transactions</a>
                        <a class="nav-item nav-link" id="viewreceipts-tab" data-toggle="tab" href="#viewreceipts" role="tab" aria-controls="viewreceipts" aria-selected="true">Receipts</a>
                    </nav>


                    
               
           

                <!-- Tab Content -->
                    <div class="tab-content text-left" id="nav-tabContent">
                        <!-- Payments Tab -->
                            <div class="tab-pane fade show active" id="payments" role="tabpanel" aria-labelledby="payments-tab">
                                <div class="mt-4"></div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <h5>Clients List</h5>
                                            <select name="clientslist2" id="clientslist2" class="clientslistreview mt-2 form-control" multiple style="display:none"></select>
                                            <div id="clientslist3">
                                                <ul>
                                                </ul>
                                            </div>
                                            
                                            <!-- Search Input Box -->
                                            <div class="col col-form-group mt-4">
                                                <label for="searchbynames1" class="text-center d-block">Search By Name</label>
                                                <div class="input-group">
                                                    <input type="text" name="searchbynames1" id="searchbynames1" class="form-control form-control-sm" placeholder="Search by Client Name..." aria-label="Search by Client Name">
                                                </div>
                                            </div>     
                                        </div>
                                            <!-- Right Side: Client Information -->
                                        <div class="col">
                                            <div class="alert alert-primary py-4 rounded">
                                                <div class="row mb-2">
                                                    <div class="col">ClientID: <span id="lblclientid1" class="font-weight-bold"></span></div>
                                                    <div class="col">ClientName: <span id="lblclientname1" class="font-weight-bold"></span></div>
                                                    <div class="col">Balance Due: <span id="lblbalancedue1" class="font-weight-bold"></span></div>
                                                    <div class="col">Oldest Charge: <span id="lbloldestcharge1" class="font-weight-bold"></span></div>
                                                </div>
                                            </div>
                                            <div class="paidinvoicenotifications" id="paidinvoicenotifications"></div>
                                            <input type="hidden" id="clientid" name="clientid">
                                               
                                            <table class="table table-striped table-hover table-sm mt-4" id="paidinvoicestable">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Inv.Date</th>
                                                        <th>Description</th>
                                                        <th>Original Amount</th>
                                                        <th>Amount Paid</th>
                                                        <th>Amount Due</th>
                                                        <th>Payment</th>
                                                        <th>Pay?</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                              
                                            <div class="paymentnotifications" id="paymentnotifications"></div>
                                           
                                            <h4 class="text-dark text-center mb-2"><strong>Make a Payment</strong></h4>
                                            <div class="row mb-2">
                                                <div class="col col-form-group">
                                                    <label for="modeofpayment">Mode of Pay</label>
                                                    <select name="modeofpayment" id="modeofpayment" class="form-control form-control-sm">
                                                        <option value="">&lt;Choose&gt;</option>
                                                       
                                                    </select>
                                                </div>
                                                <div class="col col-from-group">
                                                    <label for="reference">Reference</label>
                                                    <input type="text" name="reference" id="reference" class="form-control form-control-sm">
                                                </div>
                                                <div class="col col-form-group">
                                                    <label for="paycurrency">currency</label>
                                                    <select name="paycurrency" id="paycurrency" selectedvalue="1" class="form-control form-control-sm">
                                                        <option value="">&lt;Choose&gt;</option>
                                                    </select>
                                                </div>
                                                <div class="col col-form-group">
                                                    <label for="exchangerate">Ex.rate</label>
                                                    <input type="text" name="exchangerate" id="exchangerate" class="form-control form-control-sm" value="1">
                                                </div>
                                                <div class="col col-form-group">
                                                    <label for="paydate">Paydate</label>
                                                    <input type="text" name="paydate" id="paydate" class="form-control form-control-sm">
                                                </div>

                                                <div class="col col-form-group">
                                                    <label for="manualamount">Amount</label>
                                                    <div class="input-group">
                                                        <input type="text" id="manualamount" name="manualamount" class="form-control form-control-sm">
                                                        <div class="input-group-append">
                                                            <button type="button" class="btn btn-primary btn-sm" id="distributeamount" name="distributeamount" class="form-control form-control-sm">Distribute<i class="fas fa-chart-network fa-lg fa-fw"></i></button> 
                                                            <button type="button" class="btn btn-success btn-sm ml-2" id="addpayment" name="addpayment" class="form-control form-control-sm">Save <i class="fal fa-save fa-fw fa-lg"></i> </button>
                                                        </div>
                                                    </div>

                                                    <!-- <button type="button" class="btn btn-success btn-sm" id="addpayment" name="addpayment" class="form-control form-control-sm">Save <i class="fal fa-save fa-fw fa-lg"></i> </button> -->
                                                    
                                                </div>

                                            </div>
                                            <!-- <div class="row mt-2">
                                                
                                            </div> -->
                                            
                                            <div class="row mt-4">
                                                <div class="col col-form-group">
                                                    <input type="checkbox" id="manualpay" name="manualpay">
                                                    <label for="manualpay">Manual Pay</label>
                                                </div>
                                                <!-- <div class="col col-form-group">
                                                    <label for="printreceipt">Print-Receipt</label>
                                                    <input type="checkbox" name="printreceipt" id="printreceipt">
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>

                                    <!--View the invoices  -->
                                    <!-- <div class="mt-4">
                                        <div class="row">
                                            <div class="col col-md-2">
                                                <select name="filterpaymentstatus" id="filterpaymentstatus" class="form-control form-control-sm">
                                                    <option value="all">&lt;All&gt;</option>
                                                    <option value="active">Active</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="pending">Pending</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                    </div> -->
                            </div>
                        <!-- End of Payments Tab -->
                        <!-- Transactions Tab -->
                            <div class="tab-pane fade" id="transactions" role="tabpanel" aria-labelledby="transactions-tab">
                                <div class="mt-4"></div>
                                <div class="row mt-2">
                                    <div class="col-md-2">
                                        <h5>Clients List</h5>
                                        <select name="clientslist" id="clientslist" class="clientslistreview mt-2 form-control" multiple style="display:none"></select>
                                        <div id="clientslist4">
                                            <ul>
                                            </ul>
                                        </div>
                                        
                                        <!-- Search Input Box -->
                                        <div class="col col-form-group mt-4">
                                            <label for="searchbynames" class="text-center d-block">Search By Name</label>
                                            <div class="input-group">
                                                <input type="text" name="searchbynames" id="searchbynames" class="form-control form-control-sm" placeholder="Search by Client Name..." aria-label="Search by Client Name">
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Right Side: Client Information -->
                                    <div class="col">
                                        <div class="alert alert-primary rounded py-4">
                                            <div class="row mb-2">
                                                <div class="col">ClientID: <span id="lblclientid" class="font-weight-bold"></span></div>
                                                <div class="col">ClientName: <span id="lblclientname" class="font-weight-bold"></span></div>
                                                <div class="col">Balance Due: <span id="lblbalancedue" class="font-weight-bold"></span></div>
                                                <div class="col">Oldest Charge: <span id="lbloldestcharge" class="font-weight-bold"></span></div>
                                            </div>
                                        </div>
                                        <div class="invoicenotifications" id="invoicenotifications"></div>
                                        
                                            <div class="row">
                                                <div class="col col-md-2 form-group mt-4">
                                                    <label for="all">All</label>
                                                    <input type="checkbox" name="all" id="all">
                                                </div>

                                                <div class="col form-group col-md-5">
                                                    <label for="from">Date From</label> 
                                                    <input type="text" name="from" id="from" class="form-control form-control-sm">
                                                </div>
                                                
                                                <div class="col form-group col-md-5">
                                                    <label for="to">Date To</label>
                                                    <div class="input-group">
                                                        <input type="text" name="to" id="to" class="form-control form-control-sm">
                                                        <div class="input-append">
                                                             <button type="button" class="btn btn-primary btn-sm form-control form-control-sm" name="filter" id="filter">Apply Filter <i class="fas fa-search fa-lg fa-fw"></i></button>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <!-- <div class="col form-group"></div> -->
                                            </div>

                                            
                                   
                                        <div class="row mt-2">
                                            <input type="hidden" id="transactionclientid" name="transactionclientid">
                                                <table class="table table-striped table-hover" id="viewinvoicestable1">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Date</th>
                                                            <th>Refno</th>
                                                            <th>Description</th>
                                                            <th>Comment</th>
                                                            <th>Amount</th>
                                                            <th>Balance</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- End of Transactions Tab -->
                        <!-- View Receipts Tab -->
                            <div class="tab-pane fade" id="viewreceipts" role="tabpanel" aria-labelledby="viewreceipts-tab">
                                <div class="mt-4"></div>
                                <div class="row mt-2">  
                                    <div class="col">
                                        <div class="card containergroup">
                                            <div class="card-header">
                                                <h6>Filter Receipts</h6>
                                            </div>
                                            <div class="card-body">
                                                <div class="receiptnotifications" id="receiptnotifications"></div>
                                                <div class="row">
                                                    <div class="col col-form-group">
                                                        <label for="receiptstartdate"><strong>Start Date</strong></label>
                                                        <input type="text" id="receiptstartdate" name="receiptstartdate" class="form-control form-control-sm">
                                                    </div>
                                                    <div class="col col-form-group">
                                                        <label for="receiptenddate"><strong>End Date</strong></label>
                                                        <div class="input-group">
                                                            <input type="text" id="receiptenddate" name="receiptenddate" class="form-control form-control-sm">
                                                            <div class="input-group-append">
                                                                <button type="button" name="generatereceipt" id="generatereceipt" class="btn btn-success btn-sm"><i class="fas fa-fw fa-search"></i> Generate</button>
                                                            </div>
                                                        </div>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                    <!-- Receipt Information -->
                                <div class="row mt-3">
                                    <input type="hidden" id="receiptid" name="receiptid">
                                    <div class="col m-2">
                                        <table class="table table-striped table-hover table-sm" id="receiptstable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ReceiptNo</th>
                                                    <th>Date</th>
                                                    <th>Client</th>
                                                    <th>Payment Mode</th>
                                                    <th>Reference</th>
                                                    <th>Currency</th>
                                                    <th>Amount</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        <!-- End of Receipts Tab -->
        
                    </div> 
                </div>
                
            </div>
        </main>
       
    </div>
<?php require_once("footer.txt")?>
    <script src="../plugins/fullcalendar-6.1.14/index.global.js"></script>
    <script src="../plugins/xlsx.full.min.js"></script>
    <script src="../plugins/filesaver.js"></script>
    <script src="../plugins/tinymce/tinymce.min.js"></script>
    <!--<script src="../js/communication.js"></script>-->
    <script src="../js/receivables.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</body>
</html>