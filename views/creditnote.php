<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>
<title>Fleet Manager - Credit Note</title>
</head>
<body>
<input type="checkbox" name="nav-toggle" id="nav-toggle">
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2>
                <i class="fas fa-warehouse"></i><span>Fleet Manager</span>
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

        <main id="creditnotedetails">
            <div class="card">
                <div class="card-body">
                    <!-- Navigation Tabs -->
                    <nav class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="credit-tab" data-toggle="tab" href="#creditnote" role="tab" aria-controls="creditnote" aria-selected="true">Credit Note</a>
                        <a class="nav-item nav-link" id="viewcreditnotes-tab" data-toggle="tab" href="#viewcreditnotes" role="tab" aria-controls="viewcreditnotes" aria-selected="false">View Credit Notes</a>
                    </nav>
                    <div class="tab-content text-left" id="nav-tabContent">
                        <!-- credit notes -->
                        <div class="tab-pane fade show active" id="creditnote" role="tabpanel" aria-labelledby="credit-tab">
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
                        <!-- end of credit note -->

                        <!-- start of view credit notes -->
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
    <script src="../js/creditnote.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</body>
</html>