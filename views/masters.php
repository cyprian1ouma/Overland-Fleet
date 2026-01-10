<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>

<title>Fleet Manager</title>
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
                Fleet Manager
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
        <main id="fleetmanager">
            <div class="card containergroup">
                <div class="card-body">
                    <nav class="nav-justified">
                        <div class="nav nav-tabs " id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="vehicles-tab" data-toggle="tab" href="#vehicles" role="tab" aria-controls="pop2" aria-selected="true">Vehicles</a>
                            <a class="nav-item nav-link" id="clients-tab" data-toggle="tab" href="#clients" role="tab" aria-controls="pop2" aria-selected="false">Clients</a>
                            <a class="nav-item nav-link" id="drivers-tab" data-toggle="tab" href="#drivers" role="tab" aria-controls="pop2" aria-selected="false">Drivers</a>
                            <a class="nav-item nav-link" id="chargeableitems-tab" data-toggle="tab" href="#chargeableitems" role="tab" aria-controls="pop2" aria-selected="false">Chargeable Items</a>
                        </div>
                    </nav>

                    <!-- Vehicles View -->
                    <div class="tab-content text-left" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="vehicles" role="tabpanel">
                            <div class="pt-3"></div>
                            <div id="vehiclenotificationstable"></div>
                            <table class="table table-sm table-striped table" id="vehiclestable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Vehicle / Truck No</th>
                                        <th>Trailer #</th>
                                        <th>Model</th>
                                        <th>YOM</th>
                                        <th>Color</th>
                                        <th>Vehicle Type</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <button class="btn btn-sm btn-success" id="addnewvehicle"><i class="fal fa-plus fa-fw fa-lg"></i> Add Vehicle</button>
                        </div>

                        <!-- Clients View -->
                        <div class="tab-pane fade" id="clients" role="tabpanel">
                            <div class="pt-3"></div>
                            <div id="clientnotificaticationstable"></div>
                            <table class="table table-sm table-striped table" id="clientstable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Telephone</th>
                                        <th>Contact Person</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <button class="btn btn-sm btn-success" id="addnewclient"> <i class="fal fa-plus fa-fw fa-lg"></i> Add Client</button>
                        </div>

                        <!-- Drivers View -->
                        <div class="tab-pane fade" id="drivers" role=tabpanel>
                            <div class="pt-3"></div>
                            <div id="drivernotificationstable"></div>
                            <table class="table table-sm table-striped table" id="driverstable">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Driver Names</th>
                                        <th>ID Number</th>
                                        <th>Telephone No</th>
                                        <th>Residence</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                           </table>
                            <button class="btn btn-sm btn-success" id="addnewdriver"><i class="fal fa-plus fa-fw fa-lg"></i> Add Driver</button>
                        </div>
                        <!-- chageable items -->
                        <div class="tab-pane fade" id="chargeableitems" role="tabpanel" aria-labelledby="pop2-tab">
                            <div class="pt-3"></div>
                            <div id="voteheadnotification"></div>
                            <table class="table table-sm table-striped" id="voteheadstable">
                                <thead>
                                    <th>#</th>
                                    <th>Description</th>
                                    <!-- <th class='text-center'>Recurring</th> -->
                                    <!-- <th>Default Amount</th> -->
                                    <th>Date Added</th>
                                    <th>Added By</th>
                                    <th>&nbsp;</th>
                                    <th>&nbsp;</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <button class="btn btn-sm btn-success" id="addnewchargeitem"><i class="fal fa-plus fa-lg fa-fw"></i> New Charge</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Vehicles modal -->
    <div class="modal" tabindex="-1" role="dialog" id="vehiclesmodal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Vehicle Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="vehiclesnotifications"></div>
                    <input type="hidden" value="0" id="vehicleid">
                    <div class="row">
                        <div class="col">
                            <label for="trucknumber">Truck Number</label>
                            <input type="text" id="trucknumber" name="trucknumber" class="form-control form-control-sm">
                        </div>
                        
                        <div class="col">
                            <label for="trailerno">Trailer No:</label>
                            <input type="text" id="trailerno" name="trailerno" class="form-control form-control-sm">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="vehiclemodel">Model</label>
                            <input type="text" id="vehiclemodel" name="vehiclemodel" class="form-control form-control-sm">
                        </div>
                        <div class="col">
                            <label for="yearofmanufacture">Year Of Manufacture</label>
                            <select name="yearofmanufacture" id="yearofmanufacture" class="form-control form-control-sm">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="vehiclecolor"> Color</label>
                            <input type="text" id="vehiclecolor" name="vehiclecolor" class="form-control form-control-sm">
                        </div>
                        <div class="col">
                            <label for="vehicletype">Vehicle Type</label>
                            <select name="vehicletype" id="vehicletype" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                                <!-- <option value="heavycommercial">Heavy Commercial</option>
                                <option value="lightcommercial">Light Commercial</option>
                                <option value="staff">Staff</option> -->
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savevehiclebutton"> Save<i class="fal fa-plus fa-fw fa-lg"></i></button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close <i class="fal fa-times fa-fw fa-lg"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Clients Modal -->
    <div class="modal" tabindex="0" role="dialog" id="clientsmodal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Client Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="clientnotifications"></div>
                    <input type="hidden" value="0" id="clientid">
                        <label for="clientname">Client Name</label>
                        <input type="text" id="clientname" name="clientname" class="form-control form-control-sm">

                        <label for="clientaddress">Address</label>
                        <input type="text" id="clientaddress" name="clientaddress" class="form-control form-control-sm">

                        <label for="clienttelephone">Telephone</label>
                        <input type="text" id="clienttelephone" name="clienttelephone" class="form-control form-control-sm ">

                        <label for="clientcontact">Contact Person</label>
                        <input type="text" id="clientcontact" name="clientcontact" class="form-control form-ontrol-sm">                 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="saveclientbutton">Save <i class="fal fa-plus fa-fw fa-lg"></i> </button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close <i class="fal fa-times fa-fw fa-lg"></i></button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Drivers Modal -->
     <div class="modal" tabindex="1" role="dialog" id="driversmodal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Driver Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="drivernotifications"></div>
                    <input type="hidden" value="0" id="driverid">
                    <div class="form-group">
                        <label for="driverfirstname">First Name</label>
                        <input type="text" name="driverfirstname" id="driverfirstname" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="driverlastname">Last Name</label>
                        <input type="text" name="driverlastname" id="driverlastname" class="form-control form-control-sm">
                    </div>
                    
                    <div class="row">
                        <div class="col form-group">
                            <label for="identificationtype">Identification Type</label>
                            <select name="identificationtype" id="identificationtype" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                            </select>
                        </div>
                        <div class="col form-group">
                            <label for="identificationnumber">Identification Number</label>
                            <input type="text" name="identificationnumber" id="identificationnumber" class="form-control form-control-sm">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="drivertelephone">Telephone</label>
                        <input type="text" name="drivertelephone" id="drivertelephone" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="residence">Residence</label>
                        <input type="text" name="residence" id="residence" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savedriverbutton">Save Driver<i class="fal fa-plus fa-fw fa-lg"></i></button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close <i class="fal fa-times fa-fw fa-lg"></i></button>
                </div>
            </div>
        </div>
     </div>

      <!-- Modal for chargeable items  -->
    <div class="modal" tabindex="-1" role="dialog" id="chargeableitemsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chargeable Item Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="voteheaddetailsnotifications"></div>
                    <input type="hidden" name="chargeableitemid" id="chargeableitemid" value="0">
                    <div class="form-group">
                        <label for="chargeableitemdescription">Description</label>
                        <input type="text" name="chargeableitemdescription" id="chargeableitemdescription" class="form-control form-control-sm">
                    </div>

                    <div class="row">
                        <div class="col form-group">
                            <label for="onetimecharge">Recurring</label>
                            <select name="onetimecharge" id="onetimecharge" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div class="col form-group">
                            <label for="chargeableitemdefaultamount">Default Value</label>
                            <input type="number" name="chargeableitemdefaultamount" id="chargeableitemdefaultamount" class="form-control form-control-sm" value="0" disabled>
                        </div>
                    </div>
                   

                    <!-- <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                            <input type="checkbox" id="refundable" name="refundable">
                            </div>
                        </div>
                        <input type="text" class="form-control form-control-sm" placeholder="Refundable">
                    </div> -->
                    
                    <!-- <div class="row mt-2">
                        <div class="col form-group">
                            <label for="">&nbsp;</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                    <input type="checkbox" id="percentage" name="percentage">
                                    </div>
                                </div>
                                <input type="text" class="form-control form-control-sm" placeholder="Use as percentage?" >
                            </div>
                        </div>
                        
                        <div class="col form-group">
                            <label for="percentageitem">Percentage Item</label>
                            <select name="percentageitem" id="percentageitem" class="form-control form-control-sm">
                                <option value="">&lt;Choose One&gt;</option>
                            </select>
                        </div>
                    </div> -->
                    <div class="pl-4">
                        <input type="checkbox">
                        <label for="chargesvisible">Visible</label>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savevotehead">Save changes <i class="fal fa-save fa-fw fa-lg"></i> </button>
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close  <i class="fal fa-fw fa-lg fa-times"></i></button>
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
    <script src="../js/masters.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</html>