
<!DOCTYPE html>
<html lang="en">
<head>
    <?php  require_once("header.txt")?>
    <title>Fleet Manager - Users</title>
</head>
<body>
    <input type="checkbox" name="nav-toggle" id="nav-toggle" checked>
    <?php require_once("sidebar.txt"); ?>
    <div class="main-content">
        <div class="header">
            <h2>
                <label for="nav-toggle">
                    <i class="fas fa-bars"></i>
                </label>
                Users
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

        <main id="usersmanager">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col col-md-3 mt-1">
                                <section class=" ">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-12 text-center ">
                                                <nav class="nav-justified ">
                                                    <div class="nav nav-tabs " id="nav-tab" role="tablist">
                                                        <a class="nav-item nav-link active" id="pop1-tab" data-toggle="tab" href="#pop1" role="tab" aria-controls="pop1" aria-selected="true">Users</a>
                                                        
                                                    </div>
                                                </nav>
                                                <div class="tab-content text-left" id="nav-tabContent">
                                                    
                                                    <div class="tab-pane fade show active" id="pop1" role="tabpanel" aria-labelledby="pop1-tab">
                                                        <div class="pt-3"></div>
                                                        <div class="form-group">
                                                            <label for="userslist">User</label>
                                                            <select name="userslist" id="userslist" class='form-control form-control-sm mb-2'></select>
                                                            <button class="btn btn-primary btn-sm" id="changestatusbutton"><i class="fal fa-user-slash fa-lg fa-fw"></i> Disable</button>
                                                            <button class="btn btn-danger btn-sm" id="changepasswordbutton"><i class="fal fa-user-lock fa-lg fa-fw"></i> Reset Password</button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="tab-pane fade" id="pop2" role="tabpanel" aria-labelledby="pop2-tab">
                                                        <div class="pt-3"></div>
                                                        <div id="roles" class="roles"></div>
                                                        <div class="roleusers mt-3" id="roleusers"></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            
                            <div class="col">
                                <div id="userdetails" class="mt-2">
                                    <div class="card containergroup">
                                        <div class="card-header">
                                            <h5>User Details</h5>
                                        </div>
                                        <div class="card-body">
                                            <div id="errordiv"></div>
                                            
                                            <div class="row"> 
                                                <div class="col">
                                                    <div class="form-group">
                                                        <input type="hidden" id="userid" name="userid" value="0">
                                                        <input type="hidden" id="accountactive" value="0">
                                                        <label for="username">Username:</label>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-user fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="text" name="username" id="username" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="firstname">First Name:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-user-tie  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="text" name="firstname" id="firstname" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div> 
                                                    </div>
                                                </div>
                                                
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="middlename">Middle Name:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-user-tie  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="text" name="middlename" id="middlename" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>  
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="lastname">Last Name:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-user-tie  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="text" name="lastname" id="lastname" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>   
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="password">Password:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-key  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="password" name="password" id="password" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>  
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="confirmpassword">Confirm Password:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-key  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="password" name="confirmpassword" id="confirmpassword" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>
                                                    
                                                    </div>      
                                                </div>
                                                
                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="email">Email:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-at  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="email" name="email" id="email" class="form-control  form-control-sm"  autocomplete="off">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col">
                                                    <div class="form-group">
                                                        <label for="mobile">Mobile:</label>
                                                        <div class="input-group">
                                                                <div class="input-group-prepend">
                                                                <span class="input-group-text"><i class="fas fa-phone  fa-sm fa-fw"></i></span>
                                                            </div>
                                                            <input type="number" name="mobile" id="mobile" class="form-control  form-control-sm"  autocomplete="off"> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col md-6 mt-4">
                                                    <div class="check-group">
                                                        <input type="checkbox" class="check-control" id="systemadmin" name="systemadmin">
                                                        <label for="systemadmin" class="check-label">System Administrator</label>
                                                    </div>
                                                </div>
                                                <div class="col mt-4">
                                                    <div class="check-group">
                                                        <input type="checkbox" class="check-control" id="changepasswordonlogon" name="changepasswordonlogon">
                                                        <label for="changepasswordonlogon" class="check-label">Change password on Logon</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="card">
                                        </div>
                                        <div class="col btn-group mt-2 btn-group-toggle" id="filterprivileges" data-toggle="buttons">
                                        
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" id="userprivileges">  
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <div class="check-group">
                                                <input type="checkbox" class="check-control" id="selectalluserprivileges" name="selectalluserprivileges">
                                                <label for="selectalluserprivileges" class="check-label">Select All</label>
                                            </div>
                                        </div>
                                        <div>
                                            <button class='btn btn-success btn-sm' id='saveuser' name="saveuser"><i class="fal fa-save fa-lg fa-fw"></i> Save User</button>
                                            <button class='btn btn-info btn-sm' id='clearuser'><i class="fal fa-eraser fa-lg fa-fw"></i> Clear Fields</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div> 
        </main>
    </div>
    <!-- End of Template -->
</body>
<?php require_once("footer.txt")?>
<script src="../js/users.js"></script>
<!-- <script src="../js/smsmailer.js"></script> -->
</html>
