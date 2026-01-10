<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>


<title>Fleet Manager - Invoicing</title>
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
                Invoicing
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
        <main id="invoicedetails">
            <!-- Navigation Tabs -->
            <nav class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="invoiceclients-tab" data-toggle="tab" href="#invoiceclients" role="tab" aria-controls="invoiceclients" aria-selected="true">Invoice Client</a>
                <!-- <a class="nav-item nav-link" id="credit-tab" data-toggle="tab" type="button" href="#creditnote" role="tab" aria-controls="creditnote" aria-selected="false">Credit Note</a> -->
                <a class="nav-item nav-link" id="viewinvoicessaved-tab" data-toggle="tab" href="#viewinvoicessaved" role="tab" aria-controls="viewinvoicessaved" aria-selected="false">View Invoices</a>
            </nav>
            <!-- Tab Content -->
            <div class="tab-content text-left" id="nav-tabContent">
                <!-- Save Invoices Tab -->
                <div class="tab-pane fade show active" id="invoiceclients" role="tabpanel" aria-labelledby="invoiceclients-tab">
                    <div class="mt-4"></div>
                    <div class="row">
                        <div class="col">
                            <div class="card containergroup mb-4">
                                <div class="card-header">
                                    <h6>Invoice Clients</h6>
                                </div>

                                <div class="card-body">
                                    <div id="invoicenotifications" name="invoicenotifications"></div>
                                    <div class="clientid" id="clientid" value="0"></div>

                                    <div class="row">
                                        <div class="col col-form-group">
                                            <label for="clientname" class="form-label">Client Name</label>
                                            <select id="clientname" name="clientname" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                            </select>
                                        </div>
                                        <div class="col col-form-group">
                                            <label for="clientaddress" class="form-label">Client Address</label>
                                            <input type="text" id="clientaddress" name="clientaddress" class="form-control form-control-sm" disabled>
                                        </div>

                                        <div class="col col-form-group">
                                            <label for="oldinvoiceno" class="form-label">Ivoice Number</label>
                                            <input type="text" id="oldinvoiceno" name="oldinvoiceno" class="form-control form-control-sm">
                                        </div>
                                        <div class="col col-form-group">
                                                <label for="invoicedate" class="form-label"><b>Invoice Date</b></label>
                                                <input type="text" id="invoicedate" name="invoicedate" class="form-control form-control-sm">
                                        </div>
                                    </div>

                                    <div class="row" style="display:none">
                                        <div class="col-md-4">
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label for="currency" class="form-label"><b>Currency</b></label>
                                                <!-- <input type="text"  name="currency" id="currency" class="form-control form-control-sm"> -->
                                                <select name="currency" id="currency" class="form-control form-control-sm" disabled>
                                                  <option value="">&lt;Choose&gt;</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group mb-3">
                                                <label for="rate" class="form-label">Rate</label>
                                                <input type="text" id="rate" name="rate" class="form-control form-control-sm" disabled >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card containergroup">
                        <div class="card-header">
                            <h6>Delivery Information</h6>
                        </div>
                        <div class="card-body">
                            <div class="invoicetable"></div>
                            <div id="invoicenotificationstable" name="invoicenotificationstable"></div>
                            <table class="table table-striped table-sm" name="invoicingtable" id="invoicingtable">
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th>Invoice?</th>
                                        <th>Delivery Order No</th>
                                        <th>Date Out</th>
                                        <th>Destination</th>
                                        <th>Container No</th>
                                        <th>Rate</th>
                                        <th>Currency</th>
                                        <th>Amount</th>
                                        <th>Tax</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>

                            <div class="text-right">
                                <label for="totalinvoiceamount">Total Invoice Amount</label>
                                <div id="totalinvoiceamountDisplay" class="text-dark"></div>
                            </div>

                            <div class="footer text-right mt-4">
                                <button type="button" class="btn btn-success btn-sm" id="saveinvoice"><i class="fal fa-fw fa-lg fa-save"></i> Save Invoice</button>
                                <button type="button" class="btn btn-info btn-sm" id="refreshinvoicetable">Refresh <i class="fal fa-fw fa-lg fa-hand-sparkles"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Credit Note Tab -->
                <div class="tab-pane fade" id="creditnote10" role="tabpanel" aria-labelledby="credit10-tab">
                    <div class="card containergroup mt-3">
                        <!-- Card Header -->
                        <div class="card-header">
                            <h6>Client Credit Notes</h6>
                        </div>

                        <!-- Card Body -->
                        <div class="card-body">
                        <div id="creditnotenotifications" name="creditnotenotifications"></div>
                            <div class="row">
                                <div class="col">
                                    <label for="chooseclient">Select a Client</label>
                                    <select name="chooseclient" id="chooseclient" class="form-control form-control-sm">
                                        <option value="">&lt;Choose&gt;</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="invoiceclientphoneno">Phone No:</label>
                                    <input type="text" name="invoiceclientphoneno" id="invoiceclientphoneno" class="form-control form-control-sm">
                                </div>
                                <div class="col">
                                    <label for="invoiceclientaddress">Address:</label>
                                    <input type="text" name="invoiceclientaddress" id="invoiceclientaddress" class="form-control form-control-sm">
                                </div>
                                <div class="col">
                                    <label for="invoiceddate">Invoice Date:</label>
                                    <input type="text" name="invoiceddate" id="invoiceddate" class="form-control form-control-sm">
                                </div>
                            </div>
                            <!-- Table -->
                            <div class="table-responsive mt-3">
                                <table class="table table-striped table-hover table-sm" id="creditnotetable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Invoice ID</th>
                                            <th>Invoice No</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>CR Amount</th>
                                            <th>Currency</th>
                                            <th>Tax</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-md-10"></div>
                                <div class="col-md-2 col-form-group d-flex justify-content-end">
                                    <button type="button" class="btn btn-sm btn-success btn-sm" id="savecreditnote" name="savecreditnote"><i class="fas fal fa-fw fa-clipboard-check"></i> Save Credit Note</button>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>

                <!-- View Invoices -->

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
            </div>
        </main>

        <!-- tax modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#taxmodal"></button>
        <div class="modal fade" id="taxmodal" tabindex="-1" role="dialog" aria-labelledby="taxmodalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taxmodalLabel">Assign The Delivery Order Tax</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                   
                </div>
                <div class="modal-footer bg-light" id="expensestabfooter">
                        <div class="col form-group">
                            <button type="button" class="btn btn-block btn-sm btn-success form-control form-control-sm" id="saveallocatedexpense"><i class="fal fa-save fa-fw fa-lg"></i>Save</button>
                        </div>
                        <div class="col col-form-group">
                             <button type="button" class="btn  btn-block btn-sm btn-outline-info form-control form-control-sm" id="refreshexpenses"><i class="fal fa-fw fa-lg fa-hand-sparkles "></i>Refresh</button>
                        </div>
                        <div class="col col-form-group">
                            <button type="button" class="btn  btn-block btn-sm btn-outline-danger form-control form-control-sm" id="modalclosebutton" data-dismiss="modal"><i class="fal fa-times fa-fw fa-lg "></i>Close </button>
                        </div>
                </div>
                </div>
            </div>
        </div>
        <!-- incase of Modals -->

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
    </div>
<?php require_once("footer.txt")?>
    <script src="../plugins/fullcalendar-6.1.14/index.global.js"></script>
    <script src="../plugins/xlsx.full.min.js"></script>
    <script src="../plugins/filesaver.js"></script>
    <script src="../plugins/tinymce/tinymce.min.js"></script>
    <!--<script src="../js/communication.js"></script>-->
    <script src="../js/invoice.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</body>
</html>