<!DOCTYPE html>
<html lang="en">
<head>
   
    <?php  require_once("header.txt")?>
    <title>Vehicle- Admin Dashboard</title>
</head>
<body>
    <input type="checkbox" name="nav-toggle" id="nav-toggle">
    <?php require_once("sidebar.txt"); ?>
    <div class="main-content">
        <div class="header">
            <h2>
                <label for="nav-toggle">
                    <i class="fas fa-bars"></i>
                </label>
                Settings
            </h2>

            <div class="search-wrapper">
               <i class="fas fa-search"></i>
                <input type="text" name="search" id="search" placeholder="Search here ...">
            </div>

            <div class="user-wrapper">
                <img src="../images/blankavatar.jpg"  height="40px" width="40px"alt="" class="profilephoto">
                <div>
                    <h4 class="username">System Administrator</h4>
                    <small class="role">Admin Account</small>
                </div>
            </div>
        </div>

        <main id="settingdetails">
            <div class="container-fluid mt-3">
                <div class="card ">
                    <div class="card-body">
                        <div class="col-md-12">
                            <nav class="nav-justified text-center">
                                <div class="nav nav-tabs " id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" id="pop2-tab" data-toggle="tab" href="#pop2" role="tab" aria-controls="pop2" aria-selected="false">Email</a>
                                    <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#pop3" role="tab" aria-controls="pop3" aria-selected="false">SMS Gateway</a>
                                    <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#pop4" role="tab" aria-controls="pop4" aria-selected="false">MPESA</a>
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#pop5" role="tab" aria-controls="pop5" aria-selected="false">Loan Types</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#countries" role="tab" aria-controls="pop6" aria-selected="false">Countries</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#idocuments" role="tab" aria-controls="pop7" aria-selected="false">ID Documents</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#relationships" role="tab" aria-controls="pop8" aria-selected="false">Relationships</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#companies" role="tab" aria-controls="pop9" aria-selected="false">Companies</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#policies" role="tab" aria-controls="pop9" aria-selected="false">Policies</a> -->
                                    <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#institution" role="tab" aria-controls="pop9" aria-selected="false">Institution</a> -->
                                </div>
                            </nav>
                            <div class="tab-content text-left " id="nav-tabContent">

                                <!-- Tab for Email Settings  -->
                                <div class="tab-pane fade show active align-self-center" id="pop2" role="tabpanel" aria-labelledby="pop2-tab">
                                    <div class="pt-3"></div>
                                    <div class="row">
                                        <div class="col">
                                            <div id="emailerrors"></div>
                                            <div class="form-group">
                                                <label for="senderemail">Sender Email Address</label>
                                                <input type="email" id="senderemail" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" name="password" id="password" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="smtp">SMTP Server</label>
                                                <input type="text" id="smtp" class="form-control form-control-sm">
                                            </div>
                                            <div class="from-group">
                                                <label for="smtpport">SMTP Port</label>
                                                <input type="number" id="smtpport" class="form-control form-control-sm">
                                            </div>
                                            <div class="mt-3 mb-2">
                                                <input type="checkbox" name="usessl" id="usessl">
                                                <label for="usessl">Use SSL ?</label>
                                            </div>

                                            <button id="saveemail" class="btn btn-sm btn-success">Save Configuration</button>
                                        </div>
                                        <div class="col">
                                            <div id="testmailerrors"></div>
                                            <div class="form-group">
                                                <label for="testemailaddress">Recipient Email Address</label>
                                                <input type="text" id="testemailaddress" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="testemailsubject">Email Subject</label>
                                                <input type="text" id="testemailsubject" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="testemailmessage">Message</label>
                                                <textarea name="" id="testemailmessage" class="form-control form-control-sm"></textarea>
                                            </div>
                                            <button id="sendtestemail" class="btn btn-danger btn-sm">Send Test Email</button>
                                        </div>
                                    </div>
                                    
                                </div>

                                <!-- Tab for SMS Settings  -->
                                <div class="tab-pane fade" id="pop3" role="tabpanel" aria-labelledby="pop3-tab">
                                    <div class="pt-3"></div>
                                    <div class="row">
                                        <div class="col">
                                            <div id="smserrors"></div>
                                            <div class="row">
                                                <div class="col form-group">
                                                    <!-- <label for="loanpolicyenforceguaranteeship">Guarantors</label> -->
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <div class="input-group-text">
                                                                <input type="radio"  name="apiused" value="old" id="oldapiused" checked>
                                                            </div>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm" value="Use old API">
                                                    </div>
                                                </div>

                                                <div class="col form-group">
                                                    <!-- <label for="loanpolicyenforceguaranteeship">Guarantors</label> -->
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <div class="input-group-text">
                                                                <input type="radio"  name="apiused" value="new" id="newapiused" >
                                                            </div>
                                                        </div>
                                                        <input type="text" class="form-control form-control-sm" value="Use New API">
                                                    </div>
                                                </div>
                                            </div>
                                            

                                            <div id="oldapi">
                                                <div class="form-group">
                                                    <label for="smsclientid">Client ID</label>
                                                    <input type="text" id="smsclientid" class="form-control form-control-sm">
                                                </div>
                                                
                                                <div class="form-group">
                                                    <label for="smsapikey">API Key</label>
                                                    <input type="text" name="" id="smsapikey" class="form-control form-control-sm">
                                                </div>
                                               
                                            </div>

                                            <div id="newapi" style="display:none">
                                                <div class="form-group">
                                                    <label for="token">Token</label>
                                                    <input type="text" name="token" id="token" class="form-control form-control-sm">
                                                </div>
                                            </div>

                                            <div class="form-group">
                                                <label for="smssenderid">Sender ID</label>
                                                <input type="text" id="smssenderid" class="form-control form-control-sm">
                                            </div>

                                            <div class="form-group">
                                                <label for="smsurl">URL</label>
                                                <input type="text" id="smsurl" class="form-control form-control-sm">
                                            </div>
                                            
                                            <button id="savesms" class="btn btn-sm btn-success">Save Configuration</button>
                                        </div>

                                       

                                        <div class="col">
                                            <div id="testsmserrors"></div>
                                            <div class="form-group">
                                                <label for="testsmsrecipient">Message Recipient</label>
                                                <input type="text" id="testsmsrecipient" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="testsmsmessage">Test Message</label>
                                                <textarea name="testsmsmessage" id="testsmsmessage"  class="form-control form-control-sm"></textarea>
                                            </div>
                                            <button id="sendtestmessage" class="btn btn-sm btn-success">Send Test Message</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- To for MPESA  -->
                                <div class="tab-pane fade show" id="pop4" role="tabpanel" aria-labelledby="pop4-tab">
                                    <div class="pt-3"></div>
                                    <div class="row">
                                        <div class="col">
                                            <div id="mpesaerrors"></div>
                                            <div id="mpesaerrors2"></div>
                                            <div class="form-group">
                                                <label for="consumerkey">Consumer Key</label>
                                                <input type="text" id="consumerkey" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="consumersecret">Consumer Secret</label>
                                                <input type="text" id="consumersecret" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="paybillnumber">Paybill  Number</label>
                                                <input type="text" id="paybillnumber" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="validationurl">Validation URL</label>
                                                <input type="text" id="validationurl" class="form-control form-control-sm">
                                            </div>
                                            <div class="form-group">
                                                <label for="confirmationurl">Confirmation URL</label>
                                                <input type="text" id="confirmationurl" class="form-control form-control-sm">
                                            </div>
                                            <button id="savempesa" class="btn btn-sm btn-success">Save Configuration</button>
                                        </div>

                                        <div class="col">
                                            <div id="simulatec2berrors" class="simulatec2berrors"></div>
                                            
                                            <div class="form-group">
                                                <label for="c2bmsisdn">Customer's Mobile Number: </label>
                                                <input type="text" name="c2bmsisdn" id="c2bmsisdn" class='form-control form-control-sm'>
                                            </div>
                                            <div class="form-group">
                                                <label for="c2breference">Reference #:</label>
                                                <input type="text" name="c2breference" id="c2breference" class='form-control form-control-sm'>

                                            </div>
                                            <div class="form-group">
                                                <label for="c2bamount">Amount:</label>
                                                <input type="number" name="c2bamount" id="c2bamount" class='form-control form-control-sm'>
                                            </div>
                                            <button id="simulatec2bapi" class="btn btn-sm btn-success">Simulate C2B Transaction</button>
                                            <button id="simulatestkpushapi" class="btn btn-sm btn-success">Simulate STK Push</button>
                                        </div> 
                                    </div>
                                </div>

                                <!-- Tab for Companies  -->
                                <div class="tab-pane fade show align-self-center" id="companies" role="tabpanel" aria-labelledby="pop5-tab">
                                    <!-- <div class="pt-3"></div> -->
                                    <div class="row">
                                        <div class="col">
                                            <div id="companynotifications"></div>
                                            <div class="scrollable scrollable-fullheight mb-2">
                                                <table class="table table-sm table-striped" id="companylist">
                                                    <thead>
                                                        <th>#</th>
                                                        <th>Company Code</th>
                                                        <th>Company Name</th>
                                                        <th>Numbering Prefix</th>
                                                        <th>Current #</th>
                                                        <th>Check Off</th>
                                                        <th>Date Added</th>
                                                        <th>Added By</th>
                                                        <th>&nbsp;</th><!-- Edit -->
                                                        <th>&nbsp;</th><!-- Delete -->
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            
                                            <button id="addnewcompany" class="btn btn-sm btn-success"><i class="fal fa-plus-circle fa-fw fa sm"></i> Add New</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tab for ID documents  -->
                                <div class="tab-pane fade show align-self-center" id="idocuments" role="tabpanel" aria-labelledby="pop5-tab">
                                    <!-- <div class="pt-3"></div> -->
                                    <div class="row">
                                        <div class="col">
                                            <div id="iddocumentnotification"></div>
                                            <div class="scrollable scrollable-fullheight mb-2">
                                                <table class="table table-sm table-striped" id="iddocumentlist">
                                                    <thead>
                                                        <th>#</th>
                                                        <th>ID Document</th>
                                                        <th>Exipres</th>
                                                        <th>Date Added</th>
                                                        <th>Added By</th>
                                                        <th>&nbsp;</th><!-- Edit -->
                                                        <th>&nbsp;</th><!-- Delete -->
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                           
                                            <button id="addnewiddocument" class="btn btn-sm btn-success"><i class="fal fa-plus-circle fa-fw fa sm"></i> Add New</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tab for Relationships  -->
                                <div class="tab-pane fade show align-self-center" id="relationships" role="tabpanel" aria-labelledby="pop5-tab">
                                    <!-- <div class="pt-3"></div> -->
                                    <div class="row">
                                        <div class="col">
                                            <div id="relationshipnotifications"></div>
                                            <div class="scrollable scrollable-fullheight mb-2">
                                                <table class="table table-sm table-striped" id="relationshiplist">
                                                    <thead>
                                                        <th>#</th>
                                                        <th>Relationship</th>
                                                        <th>Date Added</th>
                                                        <th>Added By</th>
                                                        <th>&nbsp;</th><!-- Edit -->
                                                        <th>&nbsp;</th><!-- Delete -->
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                            
                                            <button id="addrelationship" class="btn btn-sm btn-success"><i class="fal fa-plus-circle fa-fw fa sm"></i> Add New</button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Tab for Institution details  -->
                                <div class="tab-pane fade show align-self-center" id="institution" role="tabpanel" aria-labelledby="pop5-tab">    
                                    <div class="pt-3"></div>
                                    <div id="institutiondetailnotification"></div>
                                    <div class="card containergroup mb-3">
                                        <div class="card-header">
                                            <h5>Bio Data</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col">
                                                    <img src="../images/noimage.jpg" alt="institution logo" class='institutionlogo'>
                                                    <input type="file" name="institutionlogo" id="institutionlogo" class="form-control form-control-sm">
                                                </div>

                                                <div class="col">

                                                    <div class="form-group">
                                                        <label for="institutionname">Institution Name</label>
                                                        <input type="text" name="institutionname" id="institutionname" class="form-control form-control-sm">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutionphysicallocation">Physical Location</label>
                                                        <input type="text" name="institutionphysicallocation" id="institutionphysicallocation" class="form-control form-control-sm">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutioncategory">Category</label>
                                                        <select type="text" name="institutioncategory" id="institutioncategory" class="form-control form-control-sm"></select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutiongpscoordinates">GPS Coordinates</label>
                                                        <div class="input-group">
                                                        <input type="text" name="institutiongpscoordinates" id="institutiongpscoordinates" class="form-control form-control-sm">
                                                            <div class="input-group-append">
                                                                <button class="btn btn-secondary btn-sm" id="institutionmarklocation"><i class="fal fa-location fa-lg fa-fw"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text">
                                                                    <input type="checkbox" id="enablememberportal">
                                                                </div>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm" placeholder="Enable members portal">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">

                                                    <div class="form-group">
                                                        <label for="institutionregdoc">Registration Document</label>
                                                        <select name="institutionregdoc" id="institutionregdoc" class="form-control form-control-sm"></select>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutionregno">Registration Number</label>
                                                        <input type="text" name="institutionregno" id="institutionregno" class="form-control form-control-sm">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutionpinno">PIN Number</label>
                                                        <input type="text" name="institutionpinno" id="institutionpinno" class="form-control form-control-sm">
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="institutionsasraregno">SASRA Registration Number</label>
                                                        <input type="text" name="institutionsasraregno" id="institutionsasraregno" class="form-control form-control-sm">
                                                    </div>

                                                </div>

                                            </div>
                                    
                                        </div>
                                    </div> 

                                    <div class="card containergroup mb-3">
                                        <div class="card-header">
                                            <h5>Contact Info</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                
                                                <div class="col form-group">
                                                    <label for="insitutionmobile">Mobile</label>
                                                    <input type="text" name="institutionmobile" id="institutionmobile" class="form-control form-control-sm">
                                                </div>
                                                <div class="col form-group">
                                                    <label for="institutionemail">Email</label>
                                                    <input type="email" name="institutionemail" id="institutionemail" class="form-control form-control-sm">
                                                </div>
                                                <div class="col form-group">
                                                    <label for="institutionwebsite">Website</label>
                                                    <input type="text" name="institutionwebsite" id="institutionwebsite" class="form-control form-control-sm">
                                                </div>

                                            </div>   

                                            <div class="row">

                                                <div class="col form-group">
                                                    <label for="institutionpostaladdress">Postal Address</label>
                                                    <input type="text" name="institutionpostaladdress" id="institutionpostaladdress" class="form-control form-control-sm">
                                                </div>

                                                <div class="col form-group">
                                                    <label for="institutiontown">Town</label>
                                                    <input type="text" name="institutiontown" id="institutiontown" class="form-control form-control-sm">
                                                </div>

                                                <div class="col form-group">
                                                    <label for="institutionpostalcode">Postal Code</label>
                                                    <input type="text" name="institutionpostalcode" id="institutionpostalcode" class="form-control form-control-sm">
                                                </div>
                                            </div>

                                        </div>
                                    </div>   

                                    <div class="card containergroup">
                                        <div class="card-header">
                                            <h5>Location on Map</h5>
                                        </div>
                                        <div class="card-body">
                                            <canvas class="map">

                                            </canvas>
                                        </div>
                                    </div>

                                    <button class="button btn btn-sm btn-success mt-3" id="saveinstitution"><i class="fal fa-save fa-lg fa-fw"></i> Save Changes</button>

                                </div>
                            </div>
                        </div>  
                    </div>
                </div> 
            </div>
        </main>
    </div>
    <!-- End of Template -->

    <!-- Modal for uploadable document -->
    <div class="modal" tabindex="-1" role="dialog" id="uplodabledocumentsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Document Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="uploadabledocumentsnotifications"></div>
                    <input type="hidden" name="documentid" id="documentid" value="0">
                    <div class="form-group">
                        <label for="documentname">Document Name</label>
                        <input type="text" name="documentname" id="documentname" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="documentappliesto">Applies to ...</label>
                        <select name="documentappliesto" id="documentappliesto" class="form-control form-control-sm">
                            <option value="">&lt;Choose&gt;</option>
                            <option value="tenants">Tenants</option>
                            <option value="employees">Employees</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="documentdirectoryname">Directory Name</label>
                        <input type="text" name="directoryname" id="directoryname" class="form-control form-control-sm">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" id="clearuploadabledocument"><i class="fal fa-hand-sparkles fa-lg fa-fw"></i> Clear Fields</button>
                    <button type="button" class="btn btn-success btn-sm" id="saveuploadabledocument"><i class="fal fa-save fa-lg fa-fw"></i> Save Document</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lg fa-fw"></i> Close Window</button>
                </div>
            </div>
        </div>
    </div>
</body>
<?php require_once("footer.txt")?>
<script src="../js/settings.js"></script> 
</html>