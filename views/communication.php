<!DOCTYPE html>
<html lang="en">
<head>
<?php require_once("header.txt")?>

<title>Rentwise - Property</title>
</head>
<body>
<input type="checkbox" name="nav-toggle" id="nav-toggle">
    <div class="sidebar">
        <div class="sidebar-brand">
            <h2>
                <i class="fas fa-warehouse"></i><span>Revman 1.0</span>
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
                Vehicles
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

        <main id="communication">
            <div class="card containergroup">
                <div class="card-body">
                    <nav class="nav-justified ">
                        <div class="nav nav-tabs " id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="pop1-tab" data-toggle="tab" href="#email" role="tab" aria-controls="pop1" aria-selected="true">Feet Manager</a>
                            <a class="nav-item nav-link" id="statement-tab" data-toggle="tab" href="#sms" role="tab" aria-controls="pop2" aria-selected="false">Allocations</a>
                            <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#whatsapp" role="tab" aria-controls="pop2" aria-selected="false">Invoicing</a>
                            <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#templates" role="tab" aria-controls="pop3" aria-selected="false">Templates</a>
                        </div>
                    </nav>

                    <div class="tab-content text-left" id="nav-tabContent">

                        <div class="tab-pane fade show active" id="email" role="tabpanel" aria-labelledby="pop2-tab">
                            <div class="pt-3"></div>
                            <!-- <h4>Email</h4> -->
                            <div class="row">
                                <div class="col col-md-2 ">
                                    <div class="scrollablelist">
                                        <table class="table table-sm table-borderless" id="emailmemberslist">
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                    
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="selectallforemail">
                                        <label class="form-check-label" for="selectallforemail">Select All</label>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="row">
                                        <div class="col from-group">
                                            <label for="selectemailtemplate">Template</label>
                                            <select name="selectemailtemplate" id="selectemailtemplate" class="form-control form-control-sm"></select>
                                        </div>
                                        <div class="col form-group">
                                            <label for="emailsubject">Subject</label>
                                            <input type="text" name="emailsubject" id="emailsubject" class="form-control form-control-sm">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <!-- <label for="emailbody">Email Body</label> -->
                                        <textarea name="emailbody" id="emailbody" class="form-control form-control-sm" data-datasource=""></textarea>
                                    </div>
                                    
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-sm btn-secondary" id="previewemail">Preview</button>
                                        <button class="btn btn-sm btn-success" id="sendemail">Send Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="sms" role="tabpanel" aria-labelledby="pop2-tab">
                            <div class="pt-3"></div>
                            <h4>SMS</h4>
                        </div>

                        <div class="tab-pane fade" id="whatsapp" role="tabpanel" aria-labelledby="pop2-tab">
                            <div class="pt-3"></div>
                            <h4>Whatsapp</h4>
                        <div class="tab-pane fade" id="templates" role="tabpanel" aria-labelledby="pop2-tab">
                            <div class="pt-3"></div>
                            <table class="table table-sm table-striped" id="templateslist">
                                <thead>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Template Name</th>
                                    <th>Data Source</th>
                                    <th>Date Added</th>
                                    <th>Added By</th>
                                    <th>&nbsp;</th>
                                </thead>
                                <tbody></tbody>
                            </table> 
                            <button class="btn btn-sm btn-success" id="addtemplate"><i class="fal fa-plus fa lg fa fw"></i> Add New Template</button>
                            <button class="btn btn-sm btn-danger" id="deletetemplate"> Delete <i class="fal fa-times fa lg fa fw"></i> </button>
                        </div>

                    </div>
                </div>
            </div>
        </main>
        <!-- modal for whatsaap -->

        <div id="whatsappModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="whatsappModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content whatsapp-modal-content">
                    <div class="modal-header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp Logo" class="whatsapp-logo" style="width: 30px; margin-right: 10px;">
                    <h5 class="modal-title" id="whatsappModalLabel">Chat with John</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <!-- Chat Body -->
                    <div id="chatBody" class="whatsapp-chat-body">
                        <div class="message left">
                        <p>Hi, how are you?</p>
                        </div>
                        <div class="message right">
                        <p>I'm good! How about you?</p>
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <!-- Message Input and Send Button -->
                        <input type="text" id="messageInput" class="whatsapp-input" placeholder="Type a message...">
                        <button id="sendMessage" class="whatsapp-send-btn">Send</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for Template Details -->
        <div class="modal" tabindex="-1" role="dialog" id="templatedetails" class="ml-3">
            <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Template Details</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="templatenotifications"></div>
                        <input type="hidden" name="templateid" id="templateid" value="0">
                        <div class="row">

                            <div class="col form-group">
                                <label for="templatename">Template Name</label>
                                <input type="text" name="templatename" id="templatename" class="form-control form-control-sm">
                            </div>

                            <div class="col form-group">
                                <label for="templatecategory">Category</label>
                                <select name="templatecategory" id="templatecategory" class="form-control form-control-sm">
                                    <option value="">&lt;Choose&gt;</option>
                                    <option value="sms">SMS</option>
                                    <option value="email">Email</option>
                                    <option value="whatsapp">Whatsapp</option>
                                </select>
                            </div>

                            <div class="col form-group">
                                <label for="templatedatasource">Data Source</label>
                                <select name="templatedatasource" id="templatedatasource" class="form-control form-control-sm"></select>
                            </div>

                            <div class="col form-group">
                                <label for="templatefields">Field Names</label>
                                <select name="templatefields" id="templatefields" class="form-control form-control-sm">
                                    <option value="">&lt;Choose&gt;</option>
                                </select>
                            </div>

                        </div>

                        <div class="form-group">
                            <!-- <label for="templatebody">Template Body</label> -->
                             <hr>
                            <textarea name="templatebody" id="templatebody" class="form-control form-control-sm"></textarea>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success btn-sm" id="savetemplate"><i class="fal fa-save fa-lg fa-fw"></i> Save Template</button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lg fa-fw"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Template -->
</body>
    <?php require_once("footer.txt")?>
    <script src="../plugins/fullcalendar-6.1.14/index.global.js"></script>
    <script src="../plugins/xlsx.full.min.js"></script>
    <script src="../plugins/filesaver.js"></script>
    <script src="../plugins/tinymce/tinymce.min.js"></script>
    <script src="../js/communication.js"></script>
    <!-- <script src="../js/smsmailer.js"></script> -->
</html>