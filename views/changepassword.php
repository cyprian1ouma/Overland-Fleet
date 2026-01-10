<!DOCTYPE html>
<html lang="en">
<head>
    <?php  require_once("header.txt")?>
    <title>Fleet Admin Password</title>
	<link rel="icon" href="../images/tlogo.png"/>
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
                Change Admin Password
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

        <main id="dashboard">
            <div class='col-md-5 card container-fluid loginform'>
                <div class="card-header text-center">
                    <h5>Change Your Password</h5>
                </div>
                <div class="card-body">
                    <div id="changepasswordnotifications" name="changepasswordnotifications"></div>
                    <input type="hidden" name="userid" id="userid">
                    <div class="row">
                        <div class="col col-form-group">
                            <label for="oldpassword">Current Password:</label>
                            <input type="password" id="oldpassword" name="oldpassword" class="form-control form-control-sm">
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col col-form-group">
                            <label for="newpassword">New Password:</label>
                            <input type="password" id="newpassword" name="newpassword"  class="form-control form-control-sm">
                        </div>
                    </div>  
                    <div class="row">
                        <div class="col col-form-group">
                            <label for="confirmnewpassword">Confirm New Password:</label>
                            <input type="password" id="confirmnewpassword" name="confirmnewpassword"  class="form-control form-control-sm">
                        </div>
                    </div>  
                    <div class="row mt-3">
                        <div class="col col-form-group">
                            <button type="button" id="changepassword" name="changepassword" class="btn btn-success">Change Password <i class="fa fa-arrow-circle-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </div>
    <!-- End of Template -->
</body>
<?php require_once("footer.txt")?>
<script src="../js/changepassword.js"></script>
<!-- <script src="../js/smsmailer.js"></script> -->
</html>