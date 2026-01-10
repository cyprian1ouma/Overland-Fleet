<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>


<title>Fleet Manager - Allocation</title>
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
                Allocations
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
        <main id="allocations">
            <div class="card containergroup">
                <div class="card-body">
                    <nav class="nav-justified ">
                        <div class="nav nav-tabs " id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="allocatevehicle-tab" data-toggle="tab" href="#allocatevehicles" role="tab" aria-controls="pop2" aria-selected="true">Allocate Vehicles</a>
                        </div>
                    </nav>

                    <div class="tab-content text-left" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="allocatevehicles" role="tabpanel" aria-labelledby="pop1-tab">
                            <div class="mt-4"></div>
                            <div class="row">
                                <div class="col">
                                    <div class="card containergroup">
                                        <!-- <div class="card-header">
                                            <h6>Filter Allocation</h6>
                                        </div> -->
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="filternotifications" id="filternotifications"></div>
                                                <div class="col-md-4 col-form-group">
                                                    <label for="allocatedvehiclefrom" class="form-label"><b>Start Date</b></label>
                                                    <div class="input-group input-group-sm">
                                                        <div class="input-group-text">
                                                            <input type="checkbox" id="allocationalldates">
                                                        </div>
                                                        <input type="text"  id="allocatedvehiclefrom" name="allocatedvehiclefrom" class="form-control" placeholder="dd-mm-yy">
                                                    </div>
                                                </div>

                                                <div class="col col-form-group">
                                                    <label for="allocatedvehicleto"><b>EndDate</b></label>
                                                    <input type="text" id="allocatedvehicleto" name="allocatedvehicleto" class="form-control form-control-sm" placeholder="dd--mm--yy">
                                                    
                                                </div>
                                                <div class="col col-form-group">
                                                    <label for="allocationstatus">Status</label>

                                                    <div class="input-group">
                                                        <select name="allocationstatus" id="allocationstatus" class="form-control form-control-sm" >
                                                            <option value="all">&lt;All&gt;</option>
                                                            <option value="In Transit" selected>In Transit</option>
                                                            <option value="In Yard">In Yard</option>
                                                            <option value="In Garage">In Garage</option>
                                                        </select>
                                                        <div class="input-group-append">
                                                            <button type="button" class="btn btn-sm btn-fw btn-success form-control form-control-sm" id="allocationvehiclesrefreshbutton">
                                                               Filter <i class="fas fa-filter fa-lg fa-fw"></i>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- end of filter card -->
                            <!-- allocated vehicles table -->
                            <div class="mt-4" >
                                <div id = "allocatedvehiclesnotificationstable"></div>
                                    <table class="table table-striped table-hover" id="allocatedvehiclestable">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Delivery</th>
                                                <th>Truck No</th>
                                                <th>Driver Name</th>
                                                <th>Client Name</th>
                                                <th>Destination</th>
                                                <th>Date Out</th>
                                                <th>Expected Date</th>
                                                <th>Actual Date</th>
                                                <th>Container Name</th>
                                                <th>Container No</th>
                                                <th>Expense?</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                                <th>&nbsp;</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <button type="button" id="addallocationvehicle" class="btn btn-success btn-sm">Allocate Vehicle <i class="fal fa-lg fa-fw fa-plus"></i></button>
                                    <!-- <button type="button" class="btn btn-success">Export <i class="fal fa-lg fa-fw fa-file-export"></i></button> -->
                                </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </main>

        <!-- modals -->
        <div class="modal" tabindex="-1" id="allocatevehiclemodal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Allocate Vehicles</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <div id="allocationnotifications" name="allocationnotifications"></div>
                <div id="statusnotifications" name="statusnotifications"></div>
                <input type="hidden" id="allocationid" name="allocationid" value="0">
                    <!-- Allocation Section -->
                    <div class="row">
                        <div class="col-md-7">
                            <div class="card containergroup" id="allocationcontainer">
                                <div class="card-header">
                                    <h5><strong>Allocation</strong></h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <label for="deliveryordernumber1">Delivery Order Number</label>                     
                                            <input type="text" id="deliveryordernumber1" name="deliveryordernumber1" class="form-control form-control-sm" data-allocationid="0" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="deliverytype"> Delivery Type</label>
                                            <select name="deliverytype" id="deliverytype" class="form-control form-control-sm">
                                                <option value="local">Local</option>
                                                <option value="return">Return</option>
                                                <option value="export">Export</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col">
                                            <label for="truckno">Truck Number</label>                     
                                            <select name="truckno" id="truckno" name="truckno" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label for="trailerno">Trailerno</label>
                                            <input type="text" name="trailerno" id="trailerno" class="form-control form-control-sm " disabled>
                                        </div>
                                    </div>

                                    <div class="row mt-2">
                                        <div class="col">
                                            <label for="driverid">Driver Name</label>
                                            <select name="driverid" id="driverid" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                            </select>
                                        </div>

                                        <div class="col">
                                            <label for="kilometers">Kilometers</label>
                                            <input type="text" id="kilometers" name="kilometers" class="form-control form-control-sm">
                                        </div>

                                    </div>

                                    <div class="row mt-2">
                                        <div class="col">
                                            <label for="route">Route</label>
                                            <select name="route" id="route" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                                <option value="Local">Local</option>
                                                <option value="Upcountry">Upcountry</option>
                                                <option value="Transit">Transit</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label for="destination">Destination</label>
                                            <input type="text" id="destination" name="destination" class="form-control form-control-sm">
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <!-- Other Details Section -->
                        <div class="col-md-5">
                            <div class="card containergroup" id="otherscontainer">
                                <div class="card-header">
                                    <h5><strong>Other Details</strong></h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-7 col-form-group">
                                            <label for="dateout">Date Out</label>
                                            <input type="text" name="dateout" id="dateout" class="form-control form-control-sm" placeholder="yy-mm-dd">
                                        </div>
                                        <div class="col col-form-group">
                                            <label for="stddays">Std Days</label>
                                            <input type="number" name="stddays" id="stddays" class="form-control form-control-sm" placeholder="2">
                                        </div>
                                    </div>
                                    <div class="form-group mt-2">
                                        <label for="expecteddatein">Expected Date In</label>
                                        <input type="text" name="expecteddatein" id="expecteddatein" class="form-control form-control-sm" placeholder="dd--mm--yy" disabled>
                                    </div> 
                                </div>
                            </div>

                            <div class="card containergroup mt-2" id="statuscontainer">
                                <div class="card-header">
                                    <h5><strong>Status</strong></h5>
                                    <input type="checkbox" id="statuscheckbox" class="algn-right"name="statuscheckbox">
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col col-form-group">
                                            <label for="unallocateddrivers">Drivers</label>
                                            <select name="unallocateddrivers" id="unallocateddrivers" class=" form-control form-control-sm">
                                                <option value="0">&lt;Choose&gt;</option>
                                            </select>
                                        </div>
                                        <div class="col col-form-group">
                                            <label for="driverstatus">Status</label>
                                            <select id="driverstatus" name="driverstatus" class="form-control form-control-sm">
                                                <option value="0">&lt;Choose&gt;</option>
                                                <option value="Available">Available</option>
                                                <option value="Not Available">Not Available</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-form-group">
                                        <label for="unallocatedvehicles">Vehicles</label>
                                            <select name="unallocatedvehicles" id="unallocatedvehicles" class=" form-control form-control-sm">
                                                <option value="0">&lt;Choose&gt;</option>
                                               
                                            </select>
                                        </div>
                                        <div class="col col-form-group">
                                            <label for="vehiclestatus">Status</label>
                                            <select id="vehiclestatus" name="vehiclestatus" class="form-control form-control-sm">
                                                <option value="0">&lt;Choose&gt;</option>
                                                <option value="1">Available</option>
                                                <option value="2">Allocated</option>
                                                <option value="3">In Maintenance</option>
                                                <option value="4">Returned</option>
                                            </select>
                                        </div>
                                        
                                    </div>     
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Particulars Section -->
                    <div class="row mt-1">
                        <div class="col">
                            <div class="card containergroup" id="particularscontainer">
                                <div class="card-header">
                                    <h5><strong>Particulars</strong></h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="clientid" class="mr-2">Client</label>
                                                <select name="clientid" id="clientid" class="form-control form-control-sm">
                                                    <option value="">&lt;Choose&gt;</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <label for="particular" class="mr-2">Particulars</label>
                                            <input type="text" id="particular" name="particular"class="form-control form-control-sm">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <input type="radio" name="optradio" checked="checked">
                                            <label for="containerid" class="mr-2">Container</label>
                                            <select name="containerid" id="containerid" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                            </select>
                                        </div>


                                        <div class="col">
                                            <label for="containernumber" class="mr-2">Container Number</label>
                                            <input type="text" id="containernumber" name="containernumber" class="form-control form-control-sm">
                                        </div>
                                    </div>


                                    <div class="form-group mt-2">
                                        <input type="radio" name="optradio">
                                        <label for="others"class="mr-2">Others</label>
                                        <input type="text" id="others" name="others" class="form-control form-control-sm">
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <label for="amount" class="mr-2">Amount</label>
                                            <input type="text" id="amount" name="amount" class="form-control form-control-sm">
                                        </div>
                                        <div class="col">
                                            <label for="currency">Currency</label>
                                            <select name="currency" id="currency" class="form-control form-control-sm">
                                                <option value="">&lt;Choose&gt;</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="exchangerate" class="mr-2"> Ex.Rate</label>
                                            <input type="text" id="exchangerate" name="exchangerate" class="form-control form-control-sm" placeholder="1">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <label for="remarks" class="mr-2">Remarks</label>
                                            <textarea name="remarks" id="remarks" class="form-control form-control-sm" placeholder="Write a remarks on the provided Area"></textarea>
                                            <p>Words: 0/500</p>
                                        </div>
                                        <div class="col" id="statusremarkscontainer">
                                            <label for="statusremarks" class="mr-2">Status Remarks</label>
                                            <textarea name="statusremarks" id="statusremarks" class="form-control form-control-sm" placeholder="Provide reasons for new Allocation"></textarea>
                                            <p>Words: 0/500</p>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>       
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-info btn-sm" id="refreshallocation"><i class="fal fa-fw fa-lg fa-hand-sparkles"></i> Refresh</button>
                    <button type="button" class="btn btn-success btn-sm" id="saveallocatedvehicle">Allocated<i class="fal fa-save fa-fw fa-lg"></i></button>
                    <!-- <button type="button" class="btn btn-success" id="updateallocatedvehicle">Update Allocated Vehicle <i class="fal fa-plus fa-fw fa-lg"></i></button> -->
                    <button type="button" class="btn btn-outline-danger btn-sm" id="modalclosebutton" data-dismiss="modal">Close <i class="fal fa-times fa-fw fa-lg"></i></button>
                </div>
                </div>
            </div>
        </div>
        <!--Allocate Vehicle Expenses Modal -->
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#expensemodal"></button> -->
        <div class="modal fade" id="expensemodal" tabindex="-1" role="dialog" aria-labelledby="expensemodalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="expensemodalLabel">Allocated Vehicle Assign Expenses</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <nav class="nav-justified ">
                        <div class="nav nav-tabs " id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="assignexpenses-tab" data-toggle="tab" href="#assignexpenses" role="tab" aria-controls="pop2" aria-selected="true">Assign Expenses</a>
                            <a class="nav-item nav-link" id="addexpenses-tab" data-toggle="tab" href="#addexpenses" role="tab" aria-controls="pop2" aria-selected="false">Add Expenses</a>
                        </div>
                    </nav>
                    <div class="tab-content text-left" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="assignexpenses" role="tabpanel" aria-labelledby="pop1-tab">
                            <div id="expensenotifications" class="mt-1" name="expensenotifications"></div>
                            <input type="hidden" id="expenseid" name="expenseid" value="0">
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="card containergroup shadow" id="expensescard">
                                        <div class="card-header">
                                            <h5>Expenses</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6 col-form-group">
                                                    <label for="deliveryordernumber">Delivery Order Number</label>
                                                    <input type="text" id="deliveryordernumber" name="deliveryordernumber" class="form-control form-control-sm" disabled data-allocationid="">
                                                </div>
                                                <div class="col-md-6 col-form-group">
                                                    <label for="expensetruckno">Truck Number</label>
                                                    <input type="text" id="expensetruckno" name="expensetruckno" class="form-control form-control-sm" disabled>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12 col-form-group">
                                                    <label for="expensename">Expense Name</label>
                                                    <select name="expensename" id="expensename" class="form-control form-control-sm">
                                                        <option value="">&lt;Choose&gt;</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col col-form-group">
                                                    <label for="expenseamount">Expense Amount</label>
                                                    <div class="input-group">
                                                        <input type="text" id="expenseamount" name="expenseamount" class="form-control form-control-sm" name="expenseamount">
                                                        <div class="input-group-append">
                                                            <button type="button" class="btn btn-success btn-sm" id="allocateexpensebutton"><i class="fal fa-fw fa-sm fa-plus "></i> Add</button>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <!-- <div class="col-md-4 mt-2 col-form-group">
                                                    <label for="allocateexpensebutton" class=""></label>
                                                    
                                                </div> -->
                                            </div>

                                        </div>
                                        <div class="card-footer bg-light">
                                            <div class="row">
                                                <div class="col col-form-group">
                                                    <!-- <button type="button" class="btn btn-success btn-block btn-sm" id="allocateexpensebutton"><i class="fal fa-fw fa-sm fa-book "></i>Allocate Expense</button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mt-3">
                                    <div class="table-responsive">
                                        <table class="table table-striped" id="allocatedvehicleexpensetable">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Expense Id</th>
                                                    <th>Expense Description</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 col-form-group"></div>
                                        <div class="col-md-6 col-form-group">
                                            <strong><label for="totalamount1">Total Amount:</label></strong>
                                            <strong><div id="totalamount1"></div></strong>
                                        </div>

                                        <div class="col-md-6 col-form-group text-center">
                                            <strong><label for="totalamount">Total Amount:</label></strong>
                                            <strong><div id="totalamount"></div></strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show" id="addexpenses" role="tabpanel" aria-labelledby="pop1-tab">
                            <div id="addexpensenotifications" class="mt-1" name="addexpensenotifications"></div>
                            <input type="hidden" id="addexpenseid" name="addexpenseid" value="0">
                            <div class="row mt-2">
                                <div class="col-md-12">
                                    <div class="card containergroup shadow">
                                        <div class="card-header">
                                            <h5>Add an Expense</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-9 col-form-group">
                                                    <label for="allocatedexpensename">Expense Name</label>
                                                    <input type="text" id="allocatedexpensename" name="allocatedexpensename" class="form-control form-control-sm">
                                                </div>
                                                <div class="col-md-3 col-form-group">
                                                    <label for="saveallocatedexpensename"></label>
                                                    <button type="button" id="saveallocatedexpensename" name="saveallocatedexpensename" class="btn btn-sm btn-block btn-success form-control form-control-sm"><i class="fal fa-fw fa-sm fa-plus"></i> add</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-footer bg-light">
                                            <div class="row">
                                                <div class="col col-form-group">
                                                    <!-- <button type="button" class="btn btn-success btn-block btn-sm" id="allocateexpensebutton"><i class="fal fa-fw fa-sm fa-book "></i>Allocate Expense</button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer bg-light" id="expensestabfooter">
                     <button type="button" class="btn btn-sm btn-success btn-sm" id="saveallocatedexpense"><i class="fal fa-save fa-fw fa-lg"></i>Save</button> 
                     <button type="button" class="btn  btn-sm btn-outline-info btn-sm" id="refreshexpenses"><i class="fal fa-fw fa-lg fa-hand-sparkles "></i>Refresh</button>
                     <button type="button" class="btn  btn-sm btn-outline-danger btn-sm" id="modalclosebutton" data-dismiss="modal"><i class="fal fa-times fa-fw fa-lg "></i>Close </button>
                </div>
                </div>
            </div>
        </div>

        <!--Add Expense Modal -->
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addexpensemodal"></button> -->
        <div class="modal fade" id="allocationreceivable" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Vehicle Recievable Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> 
                    </div>
                    <div class="modal-body"> 
                        <div class="mt-3"></div>
                        <div id="allocationreceivablenotifications"></div>
                        <input type="hidden" name="recievableid" id="recievableid">
                        <div class="col-form-group">
                            <label for="receivableallocationno">Allocation No</label>
                            <input type="text" id="receivableallocationno" name="receivableallocationno" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="receivabletruckno">Truck No</label>
                            <input type="text" id="receivabletruckno" name="receivabletruckno" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="receivabledrivername">Driver Name</label>
                            <input type="text" id="receivabledrivername" name="receivabledrivername" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="receivabledateout">Date Out</label>
                            <input type="text" id="receivabledateout" name="receivabledateout" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="receivableexpecteddatein">Expected Date</label>
                            <input type="text" id="receivableexpecteddatein" name="receivableexpecteddatein" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="receivableoverduedays">Overdue Days</label>
                            <input type="text" id="receivableoverduedays" name="receivableoverduedays" class="form-control form-control-sm">
                        </div>
                        <div class="col-form-group">
                            <label for="recievablesactualdatein">Actual Date In</label>
                            <input type="text" id="recievablesactualdatein" name="recievablesactualdatein" class="form-control form-control-sm">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" id="saveallocationrecievable">Recieve <i class="fas fa-save fa-lg fa-fw"></i> </button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close <i class="fas fa-times fa-fw fa-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
    <?php require_once("footer.txt")?>
    <script src="../plugins/fullcalendar-6.1.14/index.global.js"></script>
    <script src="../plugins/xlsx.full.min.js"></script>
    <script src="../plugins/filesaver.js"></script>
    <script src="../plugins/tinymce/tinymce.min.js"></script>
    <!--<script src="../js/communication.js"></script>-->
    <script src="../js/allocation.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</html>