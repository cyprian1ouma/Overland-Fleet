<!DOCTYPE html>
<html lang="en">
<head>
    <?php  require_once("header.txt")?>
    <title>Fleet Management - Admin Dashboard</title>
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
                Admin Dashboard
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
            <div class="card">
                <div class="card-body">
                    <div class="container-fluid px-4 mt-3">
                        <!-- ===== Top Stats Row ===== -->
                        <div class="row g-4">
                            
                            <!-- Clients Overview -->
                            <div class="col-md-3 col-sm-6">
                            <div class="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
                                <div class="card-body text-center py-4">
                                <i class="fas fa-user-friends text-success fa-3x mb-3"></i>
                                <h5 class="fw-bold text-uppercase text-secondary mb-3">Clients Overview</h5>
                                <div class="d-flex justify-content-around mt-3">
                                    <div>
                                    <p class="text-muted mb-1">Active Clients</p>
                                    <span id="activeclinetsdeyails" class="fw-bold fs-5 text-dark">120</span>
                                    </div>
                                    <div>
                                    <p class="text-muted mb-1">Outstanding Debts</p>
                                    <span id="outstandinddepts" class="fw-bold fs-5 text-danger">Ksh 450K</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <!-- Drivers Overview -->
                            <div class="col-md-3 col-sm-6">
                            <div class="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
                                <div class="card-body text-center py-4">
                                <i class="fas fa-user-tie text-primary fa-3x mb-3"></i>
                                <h5 class="fw-bold text-uppercase text-secondary mb-3">Drivers</h5>
                                <span id="totaldriverno" class="fw-bold fs-3 text-dark d-block mb-3">125</span>
                                <div class="row justify-content-center text-center">
                                    <div class="col-6 border-end">
                                    <p class="text-muted mb-1">In Transit</p>
                                    <span id="driversInTransit" class="fw-bold text-success fs-6">82</span>
                                    </div>
                                    <div class="col-6">
                                    <p class="text-muted mb-1">In Yard</p>
                                    <span id="driversInYard" class="fw-bold text-warning fs-6">43</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <!-- Deliveries Overview -->
                            <div class="col-md-3 col-sm-6">
                            <div class="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
                                <div class="card-body text-center py-4">
                                <i class="fas fa-truck-moving text-warning fa-3x mb-3"></i>
                                <h5 class="fw-bold text-uppercase text-secondary mb-3">Deliveries</h5>
                                <span id="activedeliveries" class="fw-bold fs-3 text-dark d-block mb-3">240</span>
                                <div class="row justify-content-center text-center">
                                    <div class="col-6 border-end">
                                    <p class="text-muted mb-1">Invoiced</p>
                                    <span id="invoicedDeliveries" class="fw-bold text-success fs-6">180</span>
                                    </div>
                                    <div class="col-6">
                                    <p class="text-muted mb-1">Pending</p>
                                    <span id="pendingDeliveries" class="fw-bold text-danger fs-6">60</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                            <!-- Active Clients (optional fourth card slot) -->
                            <div class="col-md-3 col-sm-6">
                            <div class="card border-0 shadow-sm rounded-4 h-100 dashboard-card">
                                <div class="card-body text-center py-4">
                                <i class="fas fa-briefcase text-info fa-3x mb-3"></i>
                                <h5 class="fw-bold text-uppercase text-secondary mb-3">Active Clients</h5>
                                <span id="activeclients" class="fw-bold fs-3 text-dark d-block mb-3">120</span>
                                <div class="row justify-content-center text-center">
                                    <div class="col-6 border-end">
                                    <p class="text-muted mb-1">Fully Paid</p>
                                    <span id="clientsPaidUp" class="fw-bold text-success fs-6">95</span>
                                    </div>
                                    <div class="col-6">
                                    <p class="text-muted mb-1">With Debts</p>
                                    <span id="clientsWithDebt" class="fw-bold text-danger fs-6">25</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                        </div>

                        <!-- ===== Charts Row ===== -->
                        <!-- <div class="row g-4 mt-4">

                             -- Clients vs Invoices
                            <div class="col col-sm-12">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h5 class="fw-bold text-primary m-0">Clients vs Invoices</h5>
                                        <select id="chartLimit" class="form-select form-select-sm" style="width:100px;">
                                        <option value="10">Top 10</option>
                                        <option value="25">Top 25</option>
                                        <option value="50">Top 50</option>
                                        <option value="100">Top 100</option>
                                        </select>
                                    </div>
                                    <div class="chart-container" style="height:300px;">
                                        <canvas id="clientsInvoicesChart"></canvas>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                    <div class="row g-4 mt-4">
                        <div class="col col-sm-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="text-center fw-bold text-primary mb-3">Invoices vs Allocations</h5>
                                    <!-- <h5 class="card-title"><i class="fas fa-chart-bar text-info"></i> Clients vs Invoices</h5> style="height:270px;-->
                                    <div class="chart-container" >
                                        <div id="clientsInvoicesChart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4 mt-4">
                        <div class="col col-sm-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="text-center fw-bold text-primary mb-3">Clients Balances Summary</h5>
                                    <div class="card-value" id="balancessummary">View Summary</div>
                                    <!-- <h5 class="card-title"><i class="fas fa-chart-bar text-info"></i> Clients vs Invoices</h5> style="height:270px;-->
                                    <div class="chart-container" >
                                        <div id="balancesSummaryChart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="row g-4 mt-4"> -->
                        <!-- <div class="col-md-4 col-sm-12">
                            <div class="card border-0 shadow-sm rounded-4 h-100">
                                <div class="card-body">
                                    <h5 class="text-center fw-bold text-primary mb-3">Clients Balances Summary</h5>
                                    <div class="chart-container" style="height:320px;">
                                        <div id="balancesSummaryChart"></div>
                                    </div>
                                </div>
                            </div>
                        </div>           -->
                    <!-- </div> -->

                    <!-- ===== CSS Enhancements ===== -->
                    <style>
                    /* ====== Dashboard Base ====== */
                        #dashboard {
                        background-color: #f8f9fa;
                        /* min-height: 100vh; */
                        padding-top: 20px;
                        }

                        /* ====== Header Section ====== */
                        #dashboard h3 {
                        font-weight: 700;
                        color: #007bff;
                        }

                        #dashboard small {
                        color: #6c757d;
                        }

                        /* ====== Card Styling ====== */
                        .dashboard-card {
                        background: #ffffff;
                        border: 1px solid #e9ecef;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                        transition: all 0.3s ease;
                        }

                        .dashboard-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
                        }

                        /* ====== Card Text ====== */
                        .dashboard-card h5 {
                        font-size: 1rem;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #495057;
                        }

                        .dashboard-card p {
                        font-size: 0.9rem;
                        margin-bottom: 0.25rem;
                        color: #6c757d;
                        }

                        .dashboard-card span {
                        font-weight: 600;
                        }

                        /* ====== Card Icons ====== */
                        .dashboard-card i {
                        opacity: 0.9;
                        transition: all 0.3s ease;
                        }

                        .dashboard-card:hover i {
                        transform: scale(1.1);
                        opacity: 1;
                        }

                        /* ====== Chart Containers ====== */
                        .chart-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #fff;
                        border-radius: 20px;
                        padding: 20px;
                        min-height: 280px;
                        }

                        /* ====== Borders and Separators ====== */
                        .border-end {
                        border-color: #dee2e6 !important;
                        }

                        /* ====== Utility Styles ====== */
                        .text-uppercase {
                        letter-spacing: 0.6px;
                        }

                        .text-muted {
                        color: #6c757d !important;
                        }

                        /* ====== Chart Title ====== */
                        .card-body h5.text-primary {
                        color: #007bff !important;
                        font-weight: 600;
                        }

                        /* Adjusr client invoicechart display */
                        #clientsInvoicesChart{
                            width:100%;
                            height:300px;
                        }

                        /* ====== Responsiveness ====== */
                        @media (max-width: 991px) {
                        .dashboard-card {
                            margin-bottom: 1rem;
                        }
                        }

                        @media (max-width: 991px) {
                        .chart-container {
                            height: 450px !important;
                            padding: 20px;
                        }
                        .dashboard-card h5 {
                            font-size: 0.9rem;
                        }
                        .dashboard-card i {
                            font-size: 2.2rem;
                        }
                        }

                        /* === Smooth Counters (Optional if animated)  */
                        .counter {
                        transition: all 0.3s ease-in-out;
                        }

                        /*  Select Dropdown Styling  */
                        #chartLimit {
                        border-radius: 8px;
                        font-size: 0.85rem;
                        padding: 4px 6px;
                        border-color: #ced4da;
                        transition: border 0.3s ease;
                        }

                        #chartLimit:focus {
                        outline: none;
                        border-color: #007bff;
                        box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
                        }

                        /* ====== Animation for Cards ====== */
                        @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        }

                        .dashboard-card {
                        animation: fadeInUp 0.6s ease both;
                        }

                    </style>
                </div>
            </div>        

        </main>
    </div>
    <!-- End of Template -->

      <!-- Clients balances modal -->
    <div class="modal" tabindex="-1" id="balancessummarymodal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Balances Summary</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="balancessummarynotifications"></div>
                    <table class="table table-sm table-striped table-hover" id="balancessummarytable">
                        <thead>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Amount</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

</body>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script> -->
<?php require_once("footer.txt")?>
<script src="../js/apexcharts.min.js"></script>
<script src="../js/dashboard.js"></script> 
</html>