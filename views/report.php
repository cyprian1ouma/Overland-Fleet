<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>


<title>Fleet Manager - Reports</title>
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
               Reports
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
        <main id="report">
            <div class="card">
                <div class="card-body">
                    <!-- Navigation Tabs -->
                    <nav class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="statements-tab" data-toggle="tab" href="#statements" role="tab" aria-controls="statements" aria-selected="true">Statements</a>
                        <!-- <a class="nav-item nav-link" id="viewinvoicessaved-tab" data-toggle="tab" href="#viewinvoicessaved" role="tab" aria-controls="viewinvoicessaved" aria-selected="false">View Invoices</a> -->
                        <!-- <a class="nav-item nav-link" id="viewcreditnotes-tab" data-toggle="tab" href="#viewcreditnotes" role="tab" aria-controls="viewcreditnotes" aria-selected="false">View Credit Notes</a> -->
                        <a class="nav-item nav-link" id="tracker-tab" data-toggle="tab" href="#tracker" role="tab" aria-controls="tracker" aria-selected="false">Tracker Report</a>
                    </nav>

                    <!-- Tab Content -->
                    <div class="tab-content text-left" id="nav-tabContent">
                        <!-- Statements Tab -->
                        <div class="tab-pane fade show active" id="statements" role="tabpanel" aria-labelledby="statements-tab">
                            <div id="statementnotifications" name="statementnotifications" class="mb-2 mt-3"></div>
                            <div class="row">
                                <div class="col">
                                    <div class="card containergroup mt-3">
                                        <div class="card-header">
                                            <h6>Filter Statements</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col col-form-group">
                                                    <label for="statementclients">Clients List</label>
                                                    <select name="statementclients" id="statementclients" class="form-control form-control-sm">
                                                        <option value="">&lt;Choose&gt;</option>
                                                    </select>
                                                </div>

                                                <div class="col col-form-group">
                                                    <label for="statementcurrency">Currency</label>
                                                    <select name="statementcurrency" id="statementcurrency" class="form-control form-control-sm">
                                                        <option value="">&lt;Choose&gt;</option>
                                                    </select>
                                                </div>

                                                <div class="col col-form-group">
                                                    <label for="startstatement">Start Date</label>
                                                    <input type="text" name="startstatement" id="startstatement" class="form-control form-control-sm">
                                                </div>
                                                <div class="col col-form-group">
                                                    <label for="endstatement">End Date</label>
                                                    <div class="input-group">
                                                        <input type="text" name="endstatement" id="endstatement" class="form-control form-control-sm">
                                                        <div class="input-group-append">
                                                            <button type="button" name="generatestatement" id="generatestatement" class="btn btn-success btn-sm"><i class="fas fa-search fa-lg fa-fw"></i> Generate</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        <div class="card containergroup mt-3">
                                <div class="card-header">
                                    <h6>Statements Table</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row mr-1 ml-1  text-center">
                                        <table class="table table-striped table-hover table-sm" id="statementstable">
                                            <thead>
                                                <tr>
                                                    <th class="text-center" scope="col">#</th>
                                                    <th>Date</th>
                                                    <th>Reference</th>
                                                    <th>Transaction Description</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <div class="col d-flex justify-content-end">
                                            <div class="form-check">
                                                <!-- <input class="form-check-input" type="checkbox" id="printstatement" name="printstatement">
                                                <label class="form-check-label ms-1" for="printstatement">
                                                    Print Statement
                                                </label> -->
                                                <button type="button" class="btn btn-primary btn-sm" id="printstatement"> Print Statement <i class="fas fa-print fa-lg fa-fw"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End of Statements Tab -->

                        <!-- View Invoices Tab -->
                            <div class="tab-pane fade" id="viewinvoicessaved" role="tabpanel" aria-labelledby="viewinvoicessaved-tab">
                                <div class="mt-4"></div>
                                <div class="row">
                                    <div class="col">
                                        <div class="card containergroup shadow">
                                            <div class="card-header">
                                                <h6 class="card-title">Filter Invoices</h6>
                                            </div>
                                            <div class="card-body">
                                                <div id="filternotifications" name="filternotifications"></div>
                                                <div class="row">
                                                    <div class="col col-form-group">
                                                        <label for="invoicedclients">Client Name</label>
                                                        <select name="invoicedclients" id="invoicedclients" class="form-control form-control-sm">
                                                            <option value="">&lt;Choose&gt;</option>
                                                        </select>
                                                    </div>

                                                    <div class="col col-form-group">
                                                        <label for="invoicecurreny">Currency</label>
                                                        <select name="invoicecurreny" id="invoicecurreny" class="form-control form-control-sm">
                                                            <option value="">&lt;Choose&gt;</option>
                                                        </select>
                                                    </div>

                                                    <div class="col col-form-group">
                                                        <label for="invoicestatus">Invoice Status</label>
                                                        <select name="invoicestatus" id="invoicestatus" class="form-control form-control-sm">
                                                            <option value="pending">Pending</option>
                                                            <option value="paid">Paid</option>
                                                        </select>
                                                    </div>

                                                    <div class="col col-form-group col-md-1 text-center">
                                                        <label for="invoicealldates" class="form-label d-block mb-1">All Dates</label>
                                                        <input type="checkbox" id="invoicealldates" name="invoicealldates" class="form-check-input">
                                                    </div>

                                                    <div class="col col-form-group">
                                                        <label for="startdate" class="form-label"><strong>Start Date</strong></label>
                                                        <input type="text" name="startdate" id="startdate" class="form-control form-control-sm">
                                                    </div>
                                                    <div class="col col-form-group">
                                                        <label for="enddate" class="form-label"><strong>End Date</strong></label>
                                                        <div class="input-group">
                                                            <input type="text" name="enddate" id="enddate" class="form-control form-control-sm">
                                                            <div class="input-group-append">
                                                                <button type="button" class="btn btn-success btn-sm form-control form-control-sm" id="filterinvoice">Apply Filter <i class="fal fa-fw fa-sm fa-filter"></i></button>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <!-- <div class="col col-form-group">
                                                        <label>&nbsp;</label>
                                                        
                                                    </div> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card containergroup mt-4">
                                    <div class="card-header" >
                                        <h6>Invoices Table</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="viewinvoices"></div>
                                        <div id="invoicesnotifications"></div>
                                        <table class="table table-striped table-hover table-sm" id="savedinvoicestable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Invoice-No</th>
                                                    <th>Invoice Date</th>
                                                    <th>Client Name</th>
                                                    <th>Amount</th>    
                                                    <th>&nbsp;</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                        <div class="container-fluid">
                                            <div class="d-flex justify-content-end align-items-center mt-3">
                                                <label for="addbankinvoice" class="me-2">Add Bank</label>
                                                <input type="checkbox" id="addbankinvoice" name="addbankinvoice">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- bank details -->
                                <div class="container-fluid mt-3" style="display:none">
                                    <div class="d-flex justify-content-end align-items-center">
                                        <h6>Invoice Bank Details</h6>
                                        <input type="checkbox">
                                        <label for="invoiceusdbank">Show USD Bank Details</label>
                                        <input type="checkbox">
                                        <label for="invoicekshbank">Show Ksh Bank Details</label>
                                    </div>
                                </div>
                            </div>
                        <!-- End of View Invoices Tab -->

                        <!-- View Credit Notes Tab -->
                        <div class="tab-pane fade" id="viewcreditnotes" role="tabpanel" aria-labelledby="viewcreditnotes-tab">
                            <div id="viewcreditnotesnotifications" class="mt-2"></div>
                                <div class="mt-2"></div>
                                <div class="row">
                                    <div class="col">
                                        <div class="card containergroup">
                                            <div class="card-header">
                                                <h6 class="card-title">Filter Credit Notes</h6>
                                            </div>
                                            <div class="card-body">
                                                <div id="creditnotefilternotifications" name="creditnotefilternotifications"></div>
                                                <div class="row">
                                                    <div class="col col-form-group">
                                                        <label for="startcredit" class="form-label"><strong>Start Date</strong></label>
                                                        <input type="text" name="startcredit" id="startcredit" class="form-control form-control-sm">
                                                    </div>
                                                    <div class="col col-form-group">
                                                        <label for="endcredit" class="form-label"><strong>End Date</strong></label>
                                                        <input type="text" name="endcredit" id="endcredit" class="form-control form-control-sm"> 
                                                    </div> 
                                                    <div class="col col-form-group">
                                                        <label for="searchbyclient">Search by</label>
                                                        <div class="input-group">
                                                            <select name="creditclients" id="creditclients" class="form-control form-control-sm">
                                                                <option value="">&lt;Choose&gt;</option>
                                                            </select>
                                                            <div class="input-group-append">
                                                                <button type="button" name="filtercreditnote" id="filtercreditnote" class="btn btn-success btn-sm">
                                                                    <i class="fas fa-fw fa-search"></i> Search
                                                                </button>
                                                            </div>
                                                        </div>
                                                    
                                                    </div> 
                                                </div> 
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                                <div class="card containergroup mt-4">
                                    <div class="card-header">
                                        <h6>Credit Notes Table</h6>
                                    </div>
                                    <div class="card-body">
                                        <div id="printnotifications" name="printnotifications"></div>
                                        <table class="table table-striped table-sm" id="savedcreditnotestable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>
                                                        <!-- Select? -->
                                                        <input type="checkbox" name="selectallcreditnotes" id="selectallcreditnotes">
                                                    </th>
                                                    <th>Credit Note No.</th>
                                                    <th>Date</th>
                                                    <th>Client</th>
                                                    <!-- <th>Client Address</th> -->
                                                    <th>Amount</th>
                                                    <th>Username</th>
                                                    <th>Cancelled</th>
                                                    <th>Cancelled By</th>
                                                    <th>Cancelled Date</th>    
                                                    <!-- <th class="text-center">
                                                       
                                                        
                                                    </th> -->
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>

                                        <!-- print button -->
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-success" id="printallcreditnotes" name="printallcreditnotes">
                                                <i class="fal fa-fw fa-print fa-sm"></i>
                                            </button>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        <!-- End of View Invoices Tab -->

                         <!-- View Tracker Report Tab -->
                        <div class="tab-pane fade" id="tracker" role="tabpanel" aria-labelledby="tracker-tab">
                            <div id="trackernotifications" class="mt-2"></div>
                                <div class="mt-2"></div>
                                <div class="row">
                                    <div class="col">
                                        <div class="card containergroup">
                                            <div class="card-header">
                                                <h6 class="card-title">Filter Tracker</h6>
                                            </div>
                                            <div class="card-body">
                                                <div id="trackerfilternotifications" name="trackerfilternotifications"></div>

                                                <div class="row">
                                                    <div class="col form-group">
                                                        <label for="">Date Range</label>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text">
                                                                    <input type="checkbox" id="filteralldates" name="filteralldates">
                                                                </div>
                                                            </div>
                                                            <input type="text" id="" class="form-control form-control-sm" value="All Dates">
                                                        </div>
                                                    </div>

                                                    <div class="col col-form-group">
                                                        <label for="trackerstart" class="form-label"><strong>Start Date</strong></label>
                                                        <input type="text" name="trackerstart" id="trackerstart" class="form-control form-control-sm">
                                                    </div>
                                                    <div class="col col-form-group">
                                                        <label for="trackerend" class="form-label"><strong>End Date</strong></label>
                                                        <input type="text" name="trackerend" id="trackerend" class="form-control form-control-sm"> 
                                                    </div> 
                                                    <div class="col col-form-group">
                                                        <label for="trackerstatus">Interchange Collection Status</label>
                                                        <div class="input-group">
                                                            <select name="trackerstatus" id="trackerstatus" class="form-control form-control-sm">
                                                                <option value="All">All</option>
                                                                
                                                                <!-- <option value="pending" selected>Pending</option>
                                                                <option value="completed">Completed</option> -->
                                                            </select>
                                                            <div class="input-group-append">
                                                                <button type="button" name="filtertracker" id="filtertracker" class="btn btn-success btn-sm">
                                                                    <i class="fas fa-fw fa-search"></i> Search
                                                                </button>
                                                            </div>
                                                        </div>
                                                    
                                                    </div> 
                                                </div> 
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                                <div class="card containergroup mt-4">
                                    <div class="card-header">
                                        <h6>Tracker</h6>
                                    </div>
                                    <!-- <div class="card-body"> -->
                                        <div id="trackernotifications" name="trackernotifications"></div>
                                        <!--  table table-striped table-sm -->
                                        <table class="table table-striped mb-3" id="trackertable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <!-- <th><input type="checkbox" name="selectalltracker" id="selectalltracker"></th> -->
                                                    <th>Truck</th>
                                                    <th>Date</th>
                                                    <th>Destination</th>
                                                    <th>Client Name</th> 
                                                    <th>Container #</th>
                                                    <th>Container Deport</th>
                                                    <th>Delivery Status</th>
                                                    <th>Container Return Status</th>
                                                    <th>Guarantee</th>
                                                    <th>Interchange Collection</th>  
                                                    <th>Invoice</th> 
                                                    <th>Cheque Status</th> 
                                                    <th>Interchange Return</th>
                                                    <th>Comments</th>
                                                    <!-- <th class="text-center"></th>  -->
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>                                       
                                    <!-- </div> -->
                                </div>
                                <!-- <button class="btn btn-sm btn-outline-primary mr-2 ml-2 mt-3" id="exportlist"><i class="fal fa-file-export fa-lg fa-fw"></i>Export List</button> -->
                            </div>
                        <!-- End of View Tracker -->
                    
                    </div> 
                </div>
            </div>
        </main>

    <!-- bank details confirmation-->
    <div class="modal" tabindex="-1" role="dialog" id="invoicebankdetailsconfirmation">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Do you want to Add Bank Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="font-bold text-primary">Bank Details Will not show if you dont Add </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" id="addbankdetailsbutton">Add <i class="fas fa-plus fa-lg fa-fw"></i></button>
                        <button type="button" class="btn btn-outline-primary btn-sm" id ="printinoicebuttion"> No Just Print  <i class="fas fa-print fa-lg fa-fw"></i></button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- bank details -->
        <div class="modal fade" tabindex="-1" role="dialog" id="invoicebankdetailsmodal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                <!-- Header -->
                <div class="modal-header">
                    <h6 class="modal-title mb-0">Bank Details</h6>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">

                    <p class="small mb-2">Select the bank details to include on the invoice:</p>

                    <div class="form-check mb-2">
                        <input type="checkbox" class="form-check-input" id="invoicebankusddetail">
                        <label class="form-check-label" for="invoicebankusddetail">USD Bank Details </label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="invoicekashbankdetail">
                        <label class="form-check-label" for="invoicekashbankdetail">KSH Bank Details</label>
                    </div>

                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="attachbanksdetails">Print <i class="fas fa-print mr-1"></i></button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal">Close <i class="fas fa-times mr-1"></i> </button>
                </div>

                </div>
            </div>
        </div>
    </div>

     <!-- report tracker records modal-->
     <div class="modal fade" id="reporttrackertmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document"> 
            <div class="modal-content">

                <!-- Header -->
                <div class="modal-header">
                    <h5 class="modal-title">Report Tracker Additional Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body">
                    <input type="hidden" id="containerdeportstatusid" name="containerdeportstatusid" value="0">
                    <div id="reporttrcakernotifications"></div>

                    <!-- Container Depot Field -->
                    <div class="form-group">
                        <label for="containerdeportname">Container Depot</label>
                        <div class="input-group">
                            <select id="containerdeportname" name="containerdeportname" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                            </select>
                            <div class="input-group-append">
                                <button type="button" class="btn btn-primary btn-sm" id="addcontainerdeportname">Add <i class="fal fa-plus fa fw fw-lg"></i></button>
                            </div>
                        </div>
                        <div class="input-group">
                            <input type="hidden" id="containerdeportotherid" name="containerdeportotherid" value="0">
                            <input type="text" name="containerdeportothername" id="containerdeportothername" class="form-control form-control-sm mt-2" style="display:none;">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-secondary btn-sm mt-2" id="saveotherdeportname" style="display:none;">Save <i class="fal fa-save fa fw fw-lg"></i></button>
                            </div>
                        </div>
                        
                    </div>

                    <!-- Delivery Status -->
                    <div class="form-group">
                        <label for="deliverystatus">Delivery Status</label>
                        <input type="text" name="deliverystatus" id="deliverystatus" class="form-control form-control-sm">
                    </div>

                    <!-- Return Depot -->
                    <div class="form-group">
                        <label for="containerreturndeport">Container Return To Depot</label>
                        <input type="text" name="containerreturndeport" id="containerreturndeport" class="form-control form-control-sm">
                    </div>

                    <!-- Guarantee Status -->
                    <div class="form-group">
                        <label for="guaranteestatus">Guarantee Status</label>
                        <input type="text" name="guaranteestatus" id="guaranteestatus" class="form-control form-control-sm">
                    </div>

                    <!-- Driver Interchange Collection -->
                    <div class="form-group">
                        <label for="driverinterchangecollection">Driver Interchange Collection</label>
                        <select name="driverinterchangecollection" id="driverinterchangecollection" class="form-control form-control-sm">
                            <option value="">&lt;Choose&gt;</option>
                        </select>
                        <!-- <input type="text" name="driverinterchangecollection" id="driverinterchangecollection" class="form-control form-control-sm"> -->
                    </div>

                    <!-- Client Interchange Return -->
                    <div class="form-group">
                        <label for="clinetinterchangereturn">Client Interchange Return</label>
                        <input type="text" name="clinetinterchangereturn" id="clinetinterchangereturn" class="form-control form-control-sm">
                    </div>
                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savereporttracker">Save <i class="fal fa-save fa fw fw-lg"></i></button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" id="closereporttracker">Close <i class="fal fa-times fa fw fw-lg"></i></button>
                </div>

            </div>
        </div>
    </div>

    
    <?php require_once("footer.txt")?>
    <script src="../plugins/fullcalendar-6.1.14/index.global.js"></script>
    <script src="../plugins/xlsx.full.min.js"></script>
    <script src="../plugins/filesaver.js"></script>
    <script src="../plugins/tinymce/tinymce.min.js"></script>
    <!--<script src="../js/communication.js"></script>-->
    <script src="../js/report.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</body>
</html>