<!DOCTYPE html>
<html lang="en">
<head>
   
    <?php  require_once("header.txt")?>
    <title>Rentwise - Admin Dashboard</title>
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
                Finance
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

        <main id="financedetails">
            <div class="card">
                <div class="card-body">
                    <div class="container-fluid">
                        <nav class="nav-justified ">
                            <div class="nav nav-tabs " id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="pop1-tab" data-toggle="tab" href="#chartofaccounts" role="tab" aria-controls="pop1" aria-selected="false">Chart of Accounts</a>
                                <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#journals" role="tab" aria-controls="pop2" aria-selected="false">Journals</a>
                                <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#payments" role="tab" aria-controls="pop2" aria-selected="false">Payments</a>
                                <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#cashbook" role="tab" aria-controls="pop2" aria-selected="false">Cashbook</a>
                                <!-- <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#suppliers" role="tab" aria-controls="pop2" aria-selected="false">Suppliers</a> -->
                                <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#financialperiods" role="tab" aria-controls="pop2" aria-selected="false">Financial Periods</a>
                                <a class="nav-item nav-link" id="pop2-tab" data-toggle="tab" href="#accountmappings" role="tab" aria-controls="pop2" aria-selected="false">Account Mapping</a>
                                <a class="nav-item nav-link" id="financialreports-tab" data-toggle="tab" href="#financialreports" role="tab" aria-controls="pop2" aria-selected="false">Reports</a>
                                <a class="nav-item nav-link" id="paymentmodes-tab" data-toggle="tab" href="#paymentmodes" role="tab" aria-controls="pop2" aria-selected="false">Payment Modes</a>
                                <a class="nav-item nav-link" id="otherreceipts-tab" data-toggle="tab" href="#otherreceipts" role="tab" aria-controls="pop2" aria-selected="false">Other Receipts</a>
                            </div>
                        </nav>

                        <div class="tab-content text-left" id="nav-tabContent">
                            <div id="financemodaldetailsnotification" class="mt-3"></div>
                            <div class="tab-pane fade show active" id="chartofaccounts" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                <div class="row">
                                    <div class="col-md-3" id="chartofaccountslist">
                                        <button class="btn btn-success btn-sm  w-100 mb-1" data-toggle='modal' data-target='#glgroups'><i class="fal fa-plus-circle fa-lg fa-fw"></i> Add GL group</button>
                                        <button class="btn btn-danger btn-sm  w-100 mb-1"><i class="fal fa-minus-circle fa-lg fa-fw"></i> Delete GL Account</button>
                                        <div id="accordion" class="myaccordion" id="myaccordion">
                                        </div>
                                    </div>

                                  
                                    <div class="col containergroup" id="chartofaccountsdetail">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>Account Details</h5>
                                            </div>

                                            <div class="card-body">
                                                <input type="hidden" id="id" name="id" value="0">
                                                <div id="accounterrordiv" class="accounterrordiv"></div>
                                                <div class="form-group">
                                                    <label for="accountclass">Account Class</label>
                                                    <select name="accountclass" id="accountclass" class="form-control form-control-sm"></select>
                                                </div>

                                                <div class="row">
                                                    <div class="col form-group">
                                                        <label for="accountgroup">Parent Group</label>
                                                        <select name="accountgroup" id="accountgroup" class="form-control form-control-sm">
                                                            <option value="">&lt;Choose&gt;</option>
                                                        </select>
                                                    </div>

                                                    <div class="col from-group">
                                                        <label for="subgroupname">Subgroup</label>
                                                        <select name="accountsubgroup" id="accountsubgroup" class="form-control form-control-sm">
                                                            <option value="">&lt;Choose&gt;</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div class="row">
                                                    <div class="col form-group">
                                                        <label for="accountcode">Account Code</label>
                                                        <input type="text" id="accountcode" name="accountcode" class='form-control form-control-sm'>
                                                    </div>

                                                    <div class="col form-group">
                                                        <label for="accountname">Account Name</label>
                                                        <input type="text" id="accountname" name="accountname" class="form-control form-control-sm">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col form-group">
                                                        <label for="glisbankaccount">Bank Account</label>
                                                            <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text">
                                                                <input type="checkbox" id="glisbankaccount">
                                                                </div>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm "  value="Is Bank account?">
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col form-group">
                                                        <label for="glallowoverdraft">Overdraft Option</label>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text">
                                                                <input type="checkbox" id="glallowoverdraft">
                                                                </div>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm"  id="glallowoverdraftlabel" value="Allow Overdraft?">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">

                                                    <div class="col form-group">
                                                        <label for="glbankname">Bank Name</label>
                                                        <input type="text" name="glbankname" id="glbankname" class="form-control form-control-sm">
                                                    </div>

                                                    <div class="col form-goup">
                                                        <label for="glbranchname">Branch Name</label>
                                                        <input type="text" name="glbranchname" id="glbranchname" class="form-control form-control-sm">
                                                    </div>

                                                </div>

                                                <div class="row">
                                                    <div class="col form-group">
                                                        <label for="glaccountnumber">Account Number</label>
                                                        <input type="number" name="glaccountnumber" id="glaccountnumber" class="form-control form-control-sm">
                                                    </div>
                                                    <div class="col form-group">
                                                        <label for="glswiftcode">Swift Code</label>
                                                        <input type="text" name="glswiftcode" id="glswiftcode" class="form-control form-control-sm">
                                                    </div>
                                                </div>

                                                <div id="glsubaccountsection" style="display: none">
                                                    <h5>Sub Accounts</h5>
                                                    <div id="glsubaccountslist"></div>
                                                </div>

                                                <!-- <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center"> -->
                                                <div class="row">
                                                        <!-- Column 1: Checkbox with text input -->
                                                    <div class="col">
                                                        <label for="isadebtor">Is a debtor</label>
                                                        <div class="input-group">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-text"><input type="checkbox" id="isadebtor"></div>
                                                            </div>
                                                            <input type="text" class="form-control form-control-sm" value="Is a Debtor?" >
                                                        </div>
                                                    </div>

                                                    <!-- Column 2: Save GL Account Button -->
                                                    <div class="col">
                                                        <button class="btn btn-success btn-sm  mb-sm-0 mr-sm-2 mt-4" id="savebutton">
                                                        <i class="fal fa-save fa-lg fa-fw"></i> Save GL Account
                                                        </button>
                                                    </div>
                                                    <!-- Column 4: Clear Form Button -->
                                                    <div class="col">
                                                        <button class="btn btn-outline-danger btn-sm mb-sm-0 mt-4" id="clearbutton">
                                                        <i class="fal fa-hand-sparkles fa-lg fa-fw"></i> Clear Form
                                                        </button>
                                                    </div>
                                                    <!-- Column 3: Save GL Sub Account Button -->
                                                    <div class="col">
                                                        <button class="btn btn-success btn-sm mb-sm-0 mr-sm-2 mt-4" id="saveglsubaccountbutton" style="display: none;">
                                                        <i class="fal fa-save fa-lg fa-fw"></i> Save GL Sub Account
                                                        </button>
                                                    </div>

                                                    
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-3 containergroup">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>GL Account Summary</h5>
                                            </div>
                                            <div class="card-body">
                                                <div id="financialyearsummary" class='mb-2 alert alert-primary d-flex justify-content-between'>
                                                    <span>Financial Year:</span>
                                                    <span id="fy" class='text-right lead'></span>
                                                </div>

                                                <div id="debitssummary"  class='mb-2 alert alert-success d-flex justify-content-between'>
                                                    <span>Debits</span>
                                                    <span id="debits" class='text-right lead'>0.00</span>
                                                </div>

                                                <div id="creditssummary"  class='mb-2 alert alert-secondary d-flex justify-content-between'>
                                                    <span>Credits</span>
                                                    <span id="credits" class='text-right lead'>0.00</span>
                                                </div>

                                                <div id="balancesummary"  class='alert alert-danger d-flex justify-content-between'>
                                                    <span>Balance</span>
                                                    <span id="balance" class='text-right lead'>0.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="tab-pane fade" id="journals" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                    <table class="table table-sm table-striped" id="journalslist">
                                        <thead>
                                            <th>#</th>
                                            <th>Journal No</th>
                                            <th>Reference</th>
                                            <th>Narration</th>
                                            <th>Date Added</th>
                                            <th>Added By</th>
                                            <th>&nbsp;</th> <!-- Show journal details-->
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                <button class="btn btn-sm btn-success" id="addnewjournalentry"><i class="fal fa-plus fa-lg fa-fw"></i>Add New Entry</button>
                            </div>

                            <div class="tab-pane fade" id="payments" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                <div id="paymentvouchersdetailesnotifications"></div>
                                <h3>Payment Vouchers</h3>
                                <!-- Filter Section -->
                                <div class="row mb-3">
                                    <div class="col-md-3">
                                        <label for="filterstartdate">Start Date</label>
                                        <input type="text" id="filterstartdate" name="filterstartdate" class="form-control form-control-sm">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="filterenddate">End Date</label>
                                        <input type="text" id="filterenddate" name="filterenddate" class="form-control form-control-sm">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="paymentmethod">Payment Mode</label>
                                        <select name="filterpaymentmethod" id="filterpaymentmethod" class="form-control form-control-sm" aria-describedby="paymentmethodHelp">
                                            <option value="">&lt;Choose&gt;</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 mt-4">
                                        <button class="btn btn-sm btn-primary" id="filterpaymentvoucher"><i class="fal fa-search fa-lg fa-fw"></i> Filter</button>
                                    </div>
                                </div>
                                    <table class="table table-sm table-striped" id="paymentvouchertable">
                                        <thead>
                                            <th>#</th>
                                            <th>Voucher Number</th>
                                            <th>Payee Name</th>
                                            <th>Payment Mode</th>
                                            <th>Reference</th>
                                            <th>Amount</th>
                                            <th>Added By</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                <button class="btn btn-sm btn-success" id="addnewpaymentvoucher"><i class="fal fa-plus fa-lg fa-fw"></i>Add New Payment Voucher</button>
                            </div>
                                                      
                            <div class="tab-pane fade" id="cashbook" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                <h3>Cashbook Transfer</h3>
                                <div class='container-fluid '>
                                    <input type="hidden" name="id" id="id">
                                    <p class='lead text-center  mb-3'>Cashbook Funds Transfer</p>  
                                    <div id="cberrors" class="mt-1"></div>
                                    <div class="form-group">
                                        <label for="sourceaccount">Source GL Account:</label>
                                        <select id="sourceaccount" name="sourceaccount" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="destinationaccount">Destination GL Account:</label>
                                        <select id="destinationaccount" name="destinationaccount" class="form-control form-control-sm"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="reference">Reference Number:</label>
                                        <input type="text" id="cbreference" name="cbreference"  class="form-control form-control-sm">
                                    </div>
                                    <div class="form-group">
                                        <label for="amount">Amount:</label>
                                        <input type="number" id="cbamount" name="cbamount"  class="form-control form-control-sm">
                                    </div>

                                    <div class="form-group">
                                        <label for="cashbookdate">Transfer Date</label>
                                        <input type="text" name="cashbookdate" id="cashbookdate" class="form-control form-control-sm">
                                    </div>
                                    <button type="button" id="transferfunds" name="transferfunds" class="btn btn-success btn-sm"><i class="fas fa-exchange-alt fa-fw fa-sm"></i> Transfer Funds</button>
                                </div>
                            </div>

                            

                            <div class="tab-pane fade" id="financialperiods" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                <div id="financialperiodnotifications"></div>
                                    <table class="table table-sm table-striped" id="financialperiodlist">
                                        <thead>
                                            <th>#</th>
                                            <th>Label</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Current</th>
                                            <th>Date Added</th>
                                            <th>Added By</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                <button class="btn btn-sm btn-success mt-2" id="addnewfinancialperiod"> <i class="fal fa-plus fa-lg fa-fw"></i> Add New</button>
                            </div>

                            <div class="tab-pane fade" id="accountmappings" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="card">
                                    <div class="card-body">
                                    <div id="accountmappingnotificationdetails"></div>
                                        <div class="row">
                                            <div class="col">
                                                <label for="glaccountmapping">GL Account Mapping</label>
                                                <select name="glaccountmapping" id="glaccountmapping" class="form-control form-control-sm">
                                                    <option value="">&lt;Choose&gt;</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <label for="glaccountchargeableitems"> Chargeable Items</label>
                                                <div class="input-group">
                                                  <select name="glaccountchargeableitems" id="glaccountchargeableitems" class="form-control form-control-sm">
                                                    <option value="">&lt;Choose&gt;</option>
                                                </select>  
                                                    <div class="input-append">
                                                        <button type="button" class="btn btn-success btn-fw btn-sm" id="addglaccountitems">Map<i class="fas fa-plus fa-fw fa-lg"></i></button>
                                                    </div> 
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-3"></div>
                                    <table class="table table-sm table-striped" id="mappedaccountslist">
                                        <thead>
                                            <th><input type="checkbox" name="selectallmappingaccounts" id="selectallmappingaccount"></th>
                                            <th>GL Account</th>
                                            <th>Chargeable Item</th>
                                            <!-- <th>Account Mapped</th> -->
                                            <th>&nbsp;</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                <!-- <button class="btn btn-sm btn-success" id="mapmultipleitems"><i class="fal fa-link fa-lg fa-fw"></i> Map Account</button> -->
                            </div>

                            <div class="tab-pane fade" id="landlordfinance" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                    <table class="table table-sm table-striped" id="">
                                        <thead>
                                            <th>#</th>
                                            <th>Voucher Number</th>
                                            <th>Landlord Name</th>
                                            <th>Payment Mode</th>
                                            <th>Total Collections</th>
                                            <th>Commission</th>
                                            <th>Additions</th>
                                            <th>Deductions</th>
                                            <th>Loan/Advance</th>
                                            <th>Total Payable</th>
                                            <th>Status</th>
                                            <th>Voucher Date</th>
                                            <th>Period</th>
                                            <th>Added By</th>
                                            <th>&nbsp;</th> <!-- download landlord voucher -->
                                            <th>&nbsp;</th> <!-- edit landlord voucher -->
                                            <th>&nbsp;</th> <!-- delete landlord voucher -->
                                        </thead>
                                        <tbody id="landlordvoucherstable"></tbody>
                                    </table>
                                <button class="btn btn-sm btn-success mt-2" id="addlandlordvoucherbutton"> <i class="fal fa-plus fa-lg fa-fw"></i> Add New Landlord Voucher</button>
                            </div>

                            <!-- finance report -->
                            <div class="tab-pane fade" id="financialreports" role="tabpanel" aria-labelledby="pop1-tab">
                                <div class="pt-3"></div>
                                <div class="card containergroup mt-2">
                                    <div class="card-header"><h5>Filter Options</h5></div>
                                    <div class="card-body">
                                        <div id="filternotifications"></div>
                                        <div class="row">
                                            <div class="col">
                                                <div class="form-group">
                                                    <label for="filterreporttype">Report Type</label>
                                                    <select name="filterreporttype" id="filterreporttype" class="form-control form-control-sm">
                                                        <option value="trialbalance">Trial Balance</option>
                                                        <option value="ledgers">Ledgers</option>
                                                        <option value="profitloss">Profit & Loss</option>
                                                        <!-- <option value="balancesheet">Balance Sheet</option> -->
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col form-group" style="display:none" id="statementledgertypediv">
                                                <label for="statementledgertype">Ledger Type</label>
                                                <select name="statementledgertype" id="statementledgertype" class="form-control form-control-sm"></select>
                                            </div>

                                            <div class="col form-group">
                                                <label for="filterreportstartdate">Start Date</label>
                                                <input type="text" name="filterreportstartdate" id="filterreportstartdate" class="form-control form-control-sm">
                                            </div>

                                            <div class="form-group col">
                                                <label for="filterreportenddate">End Date</label>
                                                <input type="text" name="filterreportenddate" id="filterreportenddate" class="form-control form-control-sm">
                                            </div>

                                            <div class="form-group col col-md-1">
                                                <label for="">&nbsp;</label>
                                                <button type="button" class="btn btn-primary btn-sm d-block mr-2" id="generate" name="generate">
                                                    Generate <i class="fal fa-search fa-lg fa-fw"></i>
                                                </button>                                                                                            
                                            </div>                                          
                                        </div>
                                    </div>                                    
                                </div>
                            
                                <div class="col" id="receiptlist">
                                    <div class="card containergroup mt-4">
                                        <div class="card-body">
                                            <div id="statementlist"></div>
                                        </div>
                                    </div>
                                </div>

                                <label for="">&nbsp;</label>
                                <button class="btn btn-sm btn-outline-primary mr-2 ml-2 mt-3" id="exportlist">
                                    <i class="fal fa-file-export fa-lg fa-fw"></i>Export List
                                </button>
                            </div>

                            <div class="tab-pane fade" id="paymentmodes" role="tabpanel" aria-labelledby="paymentmodes-tab">
                                <div id="paymentmodenotificationsdetails" class="mt-3">
                                    <table class="table table-striped table-hover" id="paymentmodetable">
                                        <thead>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Require Ref</th>
                                            <th>Account</th>
                                            <th>&nbsp;</th>
                                            <th>&nbsp;</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <button type="button" id="addpaymentmodebutton" class="btn btn-sm btn-success">Add Payment Mode <i class="fal fa-lg fa-fw fa-plus"></i> </button>
                                </div>
                            </div>

                            <!-- other receipts -->
                            <div class="tab-pane fade" id="otherreceipts" role="tabpanel" aria-labelledby="otherreceipts-tab">
                                <div class="pt-3"></div>
                                <div id="otherreceiptnotificationsdetails"></div>
                                    <table class="table table-sm table-striped" id="otherreceiptstable">
                                        <thead>
                                            <th>#</th>
                                            <th>Receipt Number</th>
                                            <th>Payer Name</th>
                                            <th>Payment Mode</th>
                                            <th>Reference</th>
                                            <th>Amount</th>
                                            <th>Added By</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                    <button class="btn btn-sm btn-success mt-2" id="addnewotherreceipt"><i class="fal fa-plus fa-lg fa-fw"></i>Add New Other Receipt</button>
                                    <button class="btn btn-sm btn-primary mt-2" id="exportotherreceipts"><i class="fal fa-plus fa-lg fa-fw"></i>Export To Excel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </main>
    </div>
    <!-- End of Template -->

    <!-- Modal for GL Account group details -->
    <div class="modal fade alert-dismissable fade" id="glgroups">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h6>GL Group Details</h6>
                </div>
                <div class="modal-body">

                    <div id="grouperrors"></div>

                    <div class="form-group">
                        <label for="glgroupclass">Group Class</label>
                        <select name="groupclass" id="groupclass" class="form-control form-control-sm"></select>
                    </div>

                    <div class="form-group">
                        <label for="subgroupof">Sub Group Of</label>
                        <select name="subgroupof" id="subgroupof" class='form-control form-control-sm'>
                            <option value="">&lt;Choose&gt;</option>
                        </select>
                    </div>

                    <div class="from-group mb-2">
                        <label for="groupname">GL Group Name</label>
                        <input type="text" id="groupname" name="groupname" class='form-control form-control-sm'>
                    </div>

                    <div class="form-group">
                        <label for="cashbookgroup">Cashbook Account</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="cashbookgroup" name="cashbookgroup">
                                </div>
                            </div>
                            <input type="text" class="form-control form-control-sm" value="This is a cashbook group?">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm " id="savegroup"><i class="fal fa-save fa-lg fa-fw"></i> Save GL Group</button>
                    <button type="button" class="btn btn-danger btn-sm " id="close" data-dismiss="modal"><i class="fal fa-times-circle fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for selecting map account -->
    <div class="modal" tabindex="-1" role="dialog" id="accountmappingmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Select Mapping Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="mappingnotification"></div>
                    <div id="mappingitemid" class="alert alert-info d-flex justify-content-between" data-id="">
                        <div>
                            <small>Category</small>
                            <div id="mappingitemcategory"></div>
                        </div>
                        <div>
                            <small>Description</small>
                            <div id="mappingitemdescription"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mappingaccountclass">Account Class</label>
                        <select name="mappingaccountclass" id="mappingaccountclass" class="form-control form-control-sm"></select>
                    </div>
                    <div class="form-group">
                        <label for="mappingaccountparentgroup">Parent Group</label>
                        <select name="mappingaccountparentgroup" id="mappingaccountparentgroup" class="form-control form-control-sm">
                            <option value="">&lt;Choose&gt;</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mappingsubgroup">Sub Group</label>
                        <select name="mappingsubgroup" id="mappingsubgroup" class="form-control form-control-sm">
                            <option value="">&lt;Choose&gt;</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="mappingaccount">Account mapped</label>
                        <select name="mappingaccount" id="mappingaccount" class="form-control form-control-sm">
                            <option value="">&lt;Choose&gt;</option>
                        </select>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savemappedaccount"><i class="fal fa-save fa-lg fa-fw"></i> Save changes</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal"><i class="fal fa-times fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for financial Period details -->
    <div class="modal" tabindex="-1" role="dialog" id="financialperiodmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Financial Period Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="financialperioddetailnotification"></div>
                    <input type="hidden" name="financialperiodid" id="financialperiodid" value="0">
                    <div class="form-group">
                        <label for="financialperiodlabel">Label</label>
                        <input type="text" name="financialperiodlabel" id="financialperiodlabel" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="financialperiodstartdate">Start Date</label>
                        <input type="text" name="financialperiodstartdate" id="financialperiodstartdate" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="financialperiodenddate">End Date</label>
                        <input type="text" name="financialperiodenddate" id="financialperiodenddate" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="financialperiodcurrentperiod">Current Period</label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                <input type="checkbox" id="financialperiodcurrentperiod">
                                </div>
                            </div>
                            <input type="text" class="form-control form-control-sm" value="Use as Current Period">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savefinancialperiod"><i class="fal fa-save fa-lg fa-fw"></i> Save changes</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal"><i class="fal fa-lg fa-fw fa-times"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Jounal Entries -->
    <div class="modal" tabindex="-1" role="dialog" id="journaldetailsmodal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Journal Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="journaldetailnotification"></div>
                    <div class="row">
                        <div class="col form-group col-md-4">
                            <label for="journalref">Reference Number</label>
                            <input type="text" name="journalref" id="journalref" class="form-control form-control-sm">
                        </div>

                        <div class="col col-md-2 form-group">
                            <label for="jounaldate">Jounal Date</label>
                            <input type="text" id="jounaldate" name="jounaldate" class="form-control form-control-sm">
                        </div>

                        <div class="col col-md-6 form-group">
                            <label for="journaldescription">Journal Description</label>
                            <input type="text" name="journaldescription" id="journaldescription" class="form-control form-control-sm">
                        </div>
                        
                    </div>

                    <div class="row" id="journalaccountdetails">
                        <div class="col form-group">
                            <label for="journalaccount">Account</label>
                            <select name="journalaccount" id="journalaccount" class="form-control form-control-sm">
                                <option value="">&lt;Choose&gt;</option>
                            </select>
                        </div>

                        <div class="col form-group">
                            <label for="journalnarration">Narrative</label>
                            <input type="text" name="journalnarration" id="journalnarration" class="form-control form-control-sm">
                        </div>

                        <div class="col col-md-2 form-group">
                            <label for="journaldebit">Debit</label>
                            <input type="number" name="journaldebit" id="journaldebit" class="form-control form-control-sm">
                        </div>

                        <div class="col col-md-2 form-group">
                            <label for="journalcredit">Credit</label>
                            
                            <div class="input-group">
                            <input type="number" name="journalcredit" id="journalcredit" class="form-control form-control-sm">
                                <div class="input-group-append">
                                    <button class="btn btn-sm btn-primary" id="addjournalentry"><i class="fal fa-plus fa-lg fa-fw"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-sm table-striped" id="journalentrieslist">
                        <thead>
                            <th>#</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Narrative</th>
                            <th class='text-right'>Dr</th>
                            <th class='text-right'>Cr</th>
                            <th>&nbsp;</th>
                            <th>&nbsp</th>
                        </thead>
                        <tbody></tbody>
                        <tfoot>
                            <tr>
                                <td colspan='4' class='font-weight-bold text-right'>
                                    <small>Balance</small>  <span id="journaldifference" > 0.00</span>
                                </td>
                                <td id="totaldebits" class='font-weight-bold text-right'>0.00</td>
                                <td id="totalcredits" class='font-weight-bold text-right'>0.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table> 
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savejournal"> <i class="fal fa-save fa-lg fa-fw"></i> Save changes</button>
                    <button type="button" class="btn btn-sm btn-outline-primary" id="clearjournal"> <i class="fal fa-hand-sparkles fa-lg fa-fw"></i> Clear</button>
                    <button type="button" class="btn btn-sm btn-outline-danger" data-dismiss="modal"> <i class="fal fa-times fa-lg fa-fw"></i> Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Adding or Updating Payment Voucher -->
    <div class="modal fade" id="paymentvouchermodal" tabindex="-1" role="dialog" aria-labelledby="paymentVoucherModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="paymentVoucherModalLabel">Add Payment Voucher</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="paymentvouchernotification"></div>
                    <div class="card">
                        <div class="card-body">
                            <input type="hidden" id="voucherid" name="voucherid" value="0">
                            <!-- <input type="hidden" id="branchid" name="branchid" value="2"> -->

                            <div class="row">
                                <div class="col form-group col-md-12">
                                    <label for="payeename">Payee Name</label>
                                    <input type="text" name="payeename" id="payeename" class="form-control form-control-sm" aria-describedby="payeenameHelp">
                                </div>                                
                            </div>

                            <div class="row">
                                <div class="col form-group col-md-12">
                                    <label for="description">Description</label>
                                    <textarea name="description" id="description" class="form-control form-control-sm" rows="5" aria-describedby="descriptionHelp"></textarea>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col form-group col-md-6">
                                    <label for="paymentmethod">Payment Mode</label>
                                    <select name="paymentmethod" id="paymentmethod" class="form-control form-control-sm" aria-describedby="paymentmethodHelp">
                                        <option value="">&lt;Choose&gt;</option>
                                    </select>
                                </div>
                                <div class="col form-group col-md-6">
                                    <label for="reference">Reference</label>
                                    <input type="text" name="reference" id="reference" class="form-control form-control-sm" aria-describedby="referenceHelp">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col form-group col-md-6">
                                    <label for="amount">Amount</label>
                                    <input type="number" name="amount" id="amount" class="form-control form-control-sm" step="0.01" min="0" aria-describedby="amountHelp">
                                </div>
                                <div class="col form-group col-md-6">
                                    <label for="transactiondate">Transaction Date</label>
                                    <input type="text" name="transactiondate" id="transactiondate" class="form-control form-control-sm" aria-describedby="transactiondateHelp">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col form-group col-md-6">
                                    <label for="crledger">Account</label>
                                    <select name="crledger" id="crledger" class="form-control form-control-sm" aria-describedby="subaccountHelp">
                                        <option value="">&lt;Choose&gt;</option>
                                    </select>
                                </div>
                                <div class="col form-group col-md-6">
                                    <label for="subactegoryof">Sub Account</label>
                                    <select name="glsubaccount" id="glsubaccount" class="form-control form-control-sm" aria-describedby="accountHelp">
                                        <option value="">&lt;Choose&gt;</option>
                                    </select>
                                </div>                                
                            </div>

                            <input type="hidden" id="dracc" name="dracc" value="1001">

                            <button class="btn btn-success btn-sm" id="savevoucherbutton">
                                <i class="fal fa-save fa-lg fa-fw"></i> Save Payment Voucher
                            </button>
                            <button class="btn btn-outline-primary btn-sm" id="clearvoucherbutton">
                                <i class="fal fa-hand-sparkles fa-lg fa-fw"></i> Clear Form
                            </button>

                            <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal">
                                <i class="fal fa-lg fa-fw fa-times"></i> Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for GL Sub Accounts -->
    <div class="modal" tabindex="-1" role="dialog" id="glsubaccountsmodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">GL Sub Accounts</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="glsubaccountnotification"></div>
                    <input type="hidden" name="glsubaccountid" id="glsubaccountid" value="0">
                    <input type="hidden" name="accountcode" id="accountcode">
                    <div class="form-group">
                        <label for="glsubaccountname">GL Sub Account Name</label>
                        <input type="text" name="glsubaccountname" id="glsubaccountname" class="form-control form-control-sm">
                    </div>
                    <!-- Checkbox to extend options -->
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="extendOptions">
                        <label class="form-check-label" for="extendOptions">
                            Add Banks and Telephone details
                        </label>
                    </div>

                    <!-- Extended fields hidden by default -->
                    <div id="extendedFields" style="display: none;">
                        <!-- New bank row with 3 columns -->
                        <div class="form-row mt-3">
                            <div class="form-group col-md-4">
                                <label for="bankName">Select Bank Name</label>
                                <select class="form-control form-control-sm" id="subglaccountbankname" name="bankName">
                                    <option value="">Select a bank</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="branchName">Select Branch Name</label>
                                <select class="form-control form-control-sm" id="subglaccountbranchname" name="branchName">
                                    <option value="">Select a branch</option>
                                </select>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="subglaccountnumber">Account Number</label>
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" id="subglaccountnumber" name="accountNumber">
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-success" id="addglsubaccountbanks">
                                            Add <i class="fal fa-plus fa-fw"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- gl sub account bank table -->
                             <table class="table table-responsive table-striped table-hover mt-3"  id="glsubaccountbanktable">
                                <thead>
                                    <tr>
                                        <th>Bank Name</th>
                                        <th>Branch Name</th>
                                        <th>Account Number</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                             </table>
                        </div>
                        <div class="row mt-2">
                            <div class="form-group col-12">
                                <label for="glsubaccountstelephone">GL Sub Accounts Telephone</label>
                                <div class="input-group input-group-sm">
                                <input type="text" name="glsubaccountstelephone" id="glsubaccountstelephone" class="form-control form-control-sm">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-success btn-sm" id="addglsubaccountstelephone">
                                    Add <i class="fal fa-plus fa-fw"></i>
                                    </button>
                                </div>
                                </div>
                                <!-- gl sub account phone number table -->
                                <table class="table table-responsive table-striped table-hover mt-3" id="glsubaccountstelephonetable">
                                <thead>
                                    <tr>
                                    <th>Telephone</th>
                                    <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="saveglsubaccount">
                        <i class="fal fa-save fa-lg fa-fw"></i> Save GL Subaccount
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal">
                        <i class="fal fa-lg fa-fw fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for landlord voucher -->
    <div class="modal fade" tabindex="-1" role="dialog" id="landlordfinancemodal">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Landlord Voucher</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="landlordvoucherid" id="landlordvoucherid" value="0">
                    <input type="hidden" name="landlordvoucherbranchid" id="landlordvoucherbranchid" value="2">
                    <div id="landlordpaymentvouchernotification"></div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="card-header bg-primary text-white">
                                Payments Form
                            </div>
                            <div class="form-group">
                                <label for="ownername">Owner Name</label>
                                <select class="form-control form-control-sm" id="ownername">
                                    <option value="">&lt;choose&gt;</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="paymode">Pay Mode</label>
                                <select class="form-control form-control-sm" id="paymode">
                                    <option value="">&lt;choose&gt;</option>
                                </select>
                            </div>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="arrearscheckbox">
                                <label class="form-check-label" for="arrearscheckbox">Arrears</label>
                            </div>
                            <div class="form-group">
                                <label for="ownertelephone">Telephone</label>
                                <select class="form-control form-control-sm" id="ownertelephone">
                                    <option value="">&lt;choose&gt;</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="monthYear">Period</label>
                                <div class="d-flex align-items-center">
                                    <div class="me-3">
                                        <select class="form-control form-control-sm" id="month">
                                        </select>
                                    </div>
                                    <div>
                                        <select class="form-control form-control-sm" id="year">
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="bankname">Bank Name</label>
                                <select class="form-control form-control-sm" id="bankname">
                                    <option value="">&lt;choose&gt;</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="owneraccountnumber">Account No</label>
                                <select class="form-control form-control-sm" id="owneraccountnumber"></select>
                            </div>
                            <div class="form-group">
                                <label for="voucherpayeename">Payee Name</label>
                                <input type="text" class="form-control form-control-sm" id="voucherpayeename">
                            </div>
                            <div class="form-group">
                                <label for="voucherreference">Reference</label>
                                <input type="text" class="form-control form-control-sm" id="voucherreference">
                            </div>
                            <div class="form-group">
                                <label for="voucherdescription">Description</label>
                                <textarea class="form-control form-control-sm" id="voucherdescription" rows="3"></textarea>
                            </div>
                        </div>


                        <div class="col-md-5">
                            <div class="card-header bg-primary text-white">
                                Select Properties
                            </div>
                            <table class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Property Name</th>
                                        <th>Block Name</th>
                                    </tr>
                                </thead>
                                <tbody id="attachedpropertytable"></tbody>
                            </table>
                            <div class="card-header bg-primary text-white">
                                Loans / Advances
                            </div>
                            <table class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Type</th>
                                        <th>Deduction Date</th>
                                        <th>Principal</th>
                                        <th>Interest</th>
                                        <th>Amount</th>
                                        <th>Paid</th>
                                    </tr>
                                </thead>
                                <tbody id="propertyownerloantable"></tbody>
                            </table>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <label for="receipts">Receipts</label>
                                    <input type="text" class="form-control form-control-sm" id="receipts" value="0.00" readonly>
                                </div>
                                <div class="col-md-4">
                                    <label for="total">Total</label>
                                    <input type="text" id="totalloanamount" class="form-control form-control-sm" id="total" value="0.00" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card-header bg-primary text-white">
                                Additions
                            </div>
                            <div class="form-group">
                                <label for="voucheradditiondescription">Description</label>
                                <textarea class="form-control" id="voucheradditiondescription" rows="3"></textarea>
                            </div>
                            <div class="d-flex align-items-center">
                                <div>
                                    <label for="voucheradditionamount" class="form-label">Amount</label>
                                    <input type="number" class="form-control form-control-sm" id="voucheradditionamount">
                                </div>
                                <div class="ml-5">
                                    <button type="button" id= "addadditionbutton" class="btn btn-outline-primary btn-sm mt-4">Add</button>
                                </div>
                            </div>
                            <table class="table table-sm table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="voucheradditiontable"></tbody>
                            </table>
                            <div class="row mt-3 align-items-center">
                                <div class="col-md-4 d-flex justify-content-start">
                                    <button type="button" class="btn btn-outline-primary btn-sm">Refresh</button>
                                </div>
                                <div class="col-md-6 d-flex justify-content-center">
                                    <label for="totaladditions" class="form-label mb-0 me-2">Total: </label>
                                    <input type="text" class="form-control form-control-sm" id="totaladditions" value="0.00" readonly>
                                </div>
                            </div>

                            <div class="pt-3"></div>

                            <div class="row mt-3">
                                <button type="button" class="btn btn-light">Deductions</button>
                                <button type="button" class="btn btn-light">Other Expenses</button>
                                <button type="button" class="btn btn-light">Find House</button>
                            </div>
                            
                            <div class="pt-3"></div>
                            
                            <div class="form-group">
                                <label for="voucherdeductiondescription">Description</label>
                                <textarea class="form-control" id="voucherdeductiondescription" rows="3"></textarea>
                            </div>
                            <div class="d-flex align-items-center">
                                <div>
                                    <label for="voucherdeductionamount" class="form-label">Amount</label>
                                    <input type="number" class="form-control form-control-sm" id="voucherdeductionamount">
                                </div>
                                <div class="ml-5">
                                    <button type="button" id="adddeductionbutton" class="btn btn-outline-primary btn-sm mt-4">Add</button>
                                </div>
                            </div>
                            <table class="table table-sm table-striped mt-3">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="voucherdeductiontable"></tbody>
                            </table>
                            <div class="row mt-3 align-items-center">
                                <div class="col-md-4 d-flex justify-content-start">
                                    <button type="button" class="btn btn-outline-primary btn-sm">Refresh</button>
                                </div>
                                <div class="col-md-6 d-flex justify-content-center">
                                    <label for="totaldeductions" class="form-label mb-0 me-2">Total: </label>
                                    <input type="text" class="form-control form-control-sm" id="totaldeductions" value="0.00" readonly>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tenants Table -->
                    <div class="table-responsive mt-3">
                        <table class="table table-sm table-striped">
                            <thead>
                                <tr>
                                    <!-- <th>Tenant ID</th> -->
                                    <th>Tenant Number</th>
                                    <th>Tenant Name</th>
                                    <!-- <th>Door No</th> -->
                                    <!-- <th>Property ID</th>
                                    <th>Unit ID</th> -->
                                    <th>Unit Name</th>
                                    <!-- <th>Pay Mode</th> -->
                                    <th>Rent</th>
                                    <th>Notice</th>
                                </tr>
                            </thead>
                            <tbody id="tenantdetailstable"></tbody>
                        </table>
                    </div>

                    <!-- Totals Section -->
                    <div class="row mt-3">
                        <div class="col-md-2">
                            <label for="tenantstotalrent">Total</label>
                            <input type="text" class="form-control form-control-sm" id="tenantstotalrent" value="0.00" readonly>
                        </div>
                        <div class="col-md-2">
                            <label for ="agencycommission">Commission</label>
                            <input type="text" class="form-control form-control-sm" id="agencycommission" value="0.00" readonly>
                        </div>
                        <div class="col-md-2">
                            <label>Total Payable</label>
                            <input type="text" class="form-control form-control-sm" id="vouchertotalpayable" value="0.00" readonly>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success btn-sm" id="savelandlordvoucherbutton">
                        <i class="fal fa-save fa-lg fa-fw"></i> Save Landlord Voucher
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal">
                        <i class="fal fa-lg fa-fw fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- modal for payment modes -->
    <div class="modal fade" id="paymodemodal" tabindex="-1" role="dialog" aria-labelledby="paymodemodalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <!-- Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="paymodemodalLabel">Payment Mode Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <!-- Body -->
            <div class="modal-body">
                <div class="mb-3" id="paymentmodenotifications" ></div>
                <input type="hidden" name="paymentmodeid" id="paymentmodeid" value="0">

                <div class="form-group">
                    <label for="paymentmodename">Payment Mode Name</label>
                    <input type="text" name="paymentmodename" id="paymentmodename" class="form-control form-control-sm">
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="requireref" name="requireref">
                    <label class="form-check-label" for="requireref">Require Reference</label>
                </div>

                <div class="form-group">
                    <label for="paymentmodeaccount">Account</label>
                    <select name="paymentmodeaccount" id="paymentmodeaccount" class="form-control form-control-sm">
                        <option value=""> &lt;Choose&gt; </option>
                    </select>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-success" id="savepaymentmode">
                Save changes <i class="fal fa-save fa-fw fa-lg"></i>
                </button>
                <button type="button" class="btn btn-sm btn-outline-danger" data-dismiss="modal">
                Close <i class="fal fa-times fa-fw fa-lg"></i>
                </button>
            </div>
            </div>
        </div>
    </div>

    <!-- modal for other receipts -->
    <div class="modal fade" id="othertransactionmodal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content shadow-lg">

            <!-- Header -->
            <div class="modal-header bg-light">
                <h5 class="modal-title">Other Receipt</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <!-- Body -->
            <div class="modal-body">
                <div id="othertransactionnotification" class="mb-3"></div>
                <input type="hidden" name="othertransactionid" id="othertransactionid" value="0">

                <!-- Payment Info -->
                <div class="card">
                <div class="card-header"><strong>Payment Information</strong></div>
                <div class="card-body">

                    <div class="row">
                        <div class="col">
                            <label for="transactiontype" class="form-label">Transaction Type</label>
                            <select name="transactiontype" id="transactiontype" class="form-control form-control-sm">
                                <option value="">Choose</option>
                                <option value="staffs">Staffs</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="recievedfrom" class="form-label">Received From</label>
                            <select name="recievedfrom" id="recievedfrom" class="form-control form-control-sm">
                            <option value="">Choose</option>
                            </select>
                            <input type="text" name="otherreceivedfrom" id="otherreceivedfrom" class="form-control form-control-sm mt-2" style="display:none;">
                        </div>
                    </div>

                    <div class="form-group mt-2">
                    <label for="otherreceiptdescription" class="form-label">Description</label>
                    <textarea name="otherreceiptdescription" id="otherreceiptdescription"  class="form-control form-control-sm" rows="3"></textarea>
                    </div>

                    <div class="row">
                    <div class="col">
                        <label for="paymentmodereference" class="form-label">Reference</label>
                        <input type="text" name="paymentmodereference" id="paymentmodereference"
                            class="form-control form-control-sm">
                    </div>
                    <div class="col">
                        <label for="receiptdate" class="form-label">Date</label>
                        <input type="text" name="receiptdate" id="receiptdate"
                            class="form-control form-control-sm">
                    </div>
                    </div>

                    <div class="row mt-2">
                    <div class="col">
                        <label for="otherpaymentmode" class="form-label">Payment Mode</label>
                        <select name="otherpaymentmode" id="otherpaymentmode" class="form-control form-control-sm">
                        <option value="">Choose</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="otherscurrency" class="form-label">Currency</label>
                        <select name="otherscurrency" id="otherscurrency" class="form-control form-control-sm">
                        <option value="">Choose</option>
                        </select>
                    </div>
                    </div>

                    <div class="row mt-2">
                    <div class="col">
                        <label for="otherreceiptamount" class="form-label">Amount</label>
                        <input type="number" name="otherreceiptamount" id="otherreceiptamount"
                            class="form-control form-control-sm" step="0.01" min="0">
                    </div>
                    <div class="col">
                        <label for="loanamount" class="form-label">Loan Amount</label>
                        <input type="number" name="loanamount" id="loanamount"
                            class="form-control form-control-sm" step="0.01" min="0">
                    </div>
                    </div>

                    <div class="row mt-2">
                    <div class="col">
                        <label for="othersaccountcredited" class="form-label">Account Credited</label>
                        <select name="othersaccountcredited" id="othersaccountcredited" class="form-control form-control-sm">
                        <option value="">Choose</option>
                        </select>
                    </div>
                    <div class="col">
                        <label for="otherssubaccount" class="form-label">Sub Account</label>
                        <select name="otherssubaccount" id="otherssubaccount" class="form-control form-control-sm">
                        <option value="">Choose</option>
                        </select>
                    </div>
                    </div>

                    <!-- Landlord Section -->
                    <div id="othertransactionlandlord" style="display:none;" class="mt-3">
                    <div class="card mb-4">
                        <div class="card-header"><strong>Loans / Advance (Landlord)</strong></div>
                        <div class="card-body">
                        <table class="table table-sm table-hover table-striped" id="othertransactionlandlordloantable">
                            <thead class="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Deduction Date</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div class="mt-2"><span id="totallandlordtransaction">Total: </span></div>
                        </div>
                    </div>
                    </div>

                    <!-- Staff Section -->
                    <div id="othertransactionstaffs" style="display:none;" class="mt-3">
                    <div class="card">
                        <div class="card-header"><strong>Loans / Advance (Staff)</strong></div>
                        <div class="card-body">
                        <table class="table table-sm table-hover table-striped" id="othertransactionstaffloantable">
                            <thead class="thead-light">
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Deduction Date</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Amount</th>
                                <th>Paid</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div class="mt-2"><span id="totalstafftransaction">Total: </span></div>
                        </div>
                    </div>
                    </div>

                </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success btn-sm" id="saveothertransactions"><i class="fas fa-save mr-1"></i> Save changes</button>
                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" id="closeothertransactionmodal"><i class="fas fa-times mr-1"></i> Close</button>
            </div>

            </div>
        </div>
    </div>
     
</body>
<?php require_once("footer.txt")?>
<script src="../js/finance.js"></script> 
</html>