<?php
require_once(__DIR__ . '/../../models/db.php');
$db = new db();

// Get company details
$sql = "CALL `sp_getcompanytitledetails`()";
$stmt2 = $db->getData($sql);
$companytitle = $stmt2->fetch(PDO::FETCH_ASSOC);
$stmt2->closeCursor();

// Get client details
function mySQLDate($date) {
    if (empty($date)) {
        return date('Y-m-d');
    }
    
    $dateObj = DateTime::createFromFormat('d-M-Y', $date);
    if (!$dateObj) {
        $dateObj = DateTime::createFromFormat('Y-m-d', $date);
    }
    if (!$dateObj) {
        return date('Y-m-d');
    }
    return $dateObj->format('Y-m-d');
}

// Get values from URL
$clientid = isset($_GET['clientid']) ? intval($_GET['clientid']) : 0;
$startdate = isset($_GET['startdate']) ? $_GET['startdate'] : '';
$enddate = isset($_GET['enddate']) ? $_GET['enddate'] : '';

// Convert to MySQL format
$datefrom = mySQLDate($startdate);
$dateto = mySQLDate($enddate);

// Initialize variables
$transactions = [];
$clientdetails = [];
$total_balance = 0;

// Build query safely
$sql = "CALL `sp_getstatement`({$clientid},'{$datefrom}','{$dateto}',1)";
$stmt = $db->getData($sql); 
$stmt = $db->getData($sql); 

// Fetch all transactions
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $transactions[] = $row;
    
    // If this is the first row, it might contain client details
    if (empty($clientdetails) && isset($row['clientname'])) {
        $clientdetails = $row;
    }
    
    // Calculate total balance from transactions
    if (isset($row['amount'])) {
        $total_balance += floatval($row['amount']);
    }
}
$stmt->closeCursor();

// If no transactions found but we have client details from another source
if (empty($clientdetails)) {
    // You might need another query to get client details if not in the transaction results
    $clientSql = "SELECT * FROM clients WHERE clientid = {$clientid}";
    $clientStmt = $db->getData($clientSql);
    $clientdetails = $clientStmt->fetch(PDO::FETCH_ASSOC);
    $clientStmt->closeCursor();
}

// Set dates - use actual dates from parameters
$current_date = date('d/m/Y');
$statement_period = date('d/m/Y', strtotime($startdate)) . " - " . date('d/m/Y', strtotime($enddate));
?>

<!DOCTYPE html>
<html>
<head>
  <title>Client Statement</title>
  <style>
    /* Your existing CSS styles remain the same */
    * {
      box-sizing: border-box;
    }

    @media print {
      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }
      body {
        print-color-adjust: exact;
      }
    }

    html, body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      height: auto;
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 10px;
      margin: 0;
      padding: 20px;
    }

    .container {
      padding: 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 0;
      width: 100%;
    }

    .company-info {
      width: 58%;
      text-align: left;
      font-size: 11px;
    }

    .company-info h3 {
      font-weight: bold;
      margin: 0 0 5px 0;
    }

    .statement-box {
      width: 40%;
      text-align: right;
      margin-top: 0;
    }

    .statement-title {
      font-weight: bold;
      text-align: right;
      margin: 0 0 5px 0;
    }

    .statement-period {
      width: 100%;
      border-collapse: collapse;
      margin-top: 5px;
      font-size: 10px;
    }

    .statement-period th {
      border: 1px solid #000;
      padding: 4px 6px;
      background: #e6e6e6;
      font-weight: bold;
      text-align: center; 
    }

    .statement-period td {
      border: 1px solid #000;
      padding: 4px 6px;
      font-weight: bold;
      text-align: center; 
    }
  
    table.statement-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      font-size: 10px;
      border: none;
    }

    table.statement-table th {
      background: #e6e6e6;
      border: none;
      border-bottom: 2px solid #000;
      padding: 8px 6px;
      font-weight: bold;
      text-align: left;
    }

    table.statement-table td {
      border: none;
      border-bottom: 1px solid #ddd;
      padding: 6px;
      text-align: left;
    }

    table.statement-table,
    table.statement-table th,
    table.statement-table td {
      border-left: none;
      border-right: none;
    }

    table.statement-table tbody tr:hover {
      background-color: #f9f9f9;
    }

    table.statement-table td:nth-child(4) {
      text-align: right;
      font-weight: bold;
    }

    table.statement-table th:nth-child(4) {
      text-align: right;
    }
    
    .balance {
      margin-top: 12px;
      text-align: right;
      font-size: 12px;
      font-weight: bold;
      padding: 8px;
      background: #f0f0f0;
      display: inline-block;
      float: right;
    }

    .notes {
      margin-top: 20px;
      font-size: 10px;
    }

    ol {
      padding-left: 15px;
      margin: 5px 0;
    }

    .client-info {
      font-size: 10px;
      padding-left: 15px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section - Top of page -->
    <div class="header">
      <!-- LEFT SIDE - Top far left -->
      <div class="company-info">
        <h3><?= htmlspecialchars($companytitle['companyname'] ?? '') ?></h3>
        <p><?= htmlspecialchars($companytitle['postaladdress'] ?? '') ?></p>
        <p>Mob1: <?= htmlspecialchars($companytitle['tel1'] ?? '') ?></p>
        <p>Mob2: <?= htmlspecialchars($companytitle['tel2'] ?? '') ?></p>
        <p>Email: <?= htmlspecialchars($companytitle['email'] ?? '') ?></p>
      </div>
      <!-- RIGHT SIDE - Top far right -->
      <div class="statement-box">
        <h1 class="statement-title" style="margin:0;">Statement</h1>
        <table class="statement-period">
          <thead>
            <tr>
              <th>Statement Period</th>
              <th>Statement Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><?php echo $statement_period ?></td>
              <td><?php echo htmlspecialchars($clientdetails['transactdate'] ?? $current_date) ?></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Client Info -->
    <div class="client-info">
      <p style="margin: 10px 0 5px 0;"><strong>To:</strong></p>
      <?php if(!empty($clientdetails)): ?>
        <p style="margin-left:20px"><?php echo htmlspecialchars($clientdetails['clientname'] ?? '') ?></p>
        <p style="margin-left:20px"><?php echo htmlspecialchars($clientdetails['address'] ?? '') ?></p>
        <p style="margin-left:20px"><?php echo htmlspecialchars($clientdetails['telephone'] ?? '') ?></p>
      <?php endif; ?>
    </div>

    <!-- Statement Table -->
    <table class="statement-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Ref</th>
          <th>Transaction Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <?php if(!empty($transactions)): ?>
          <?php foreach($transactions as $transaction): ?>
            <tr>
              <td><?php echo htmlspecialchars($transaction['transactdate'] ?? '') ?></td>
              <td><?php echo htmlspecialchars($transaction['Ref'] ?? '') ?></td>
              <td><?php echo htmlspecialchars($transaction['naration'] ?? '') ?></td>
              <td><?php
                  $amount = floatval($transaction['amount'] ?? 0);
                  echo ($amount < 0) 
                    ? '('.number_format(abs($amount), 2).')'
                    : number_format($amount, 2);
              ?>
              </td>
            </tr>
          <?php endforeach; ?>
        <?php endif; ?>
      </tbody>
    </table>
    
    <!-- Balance Due -->
    <div class="balance">
      <strong>BALANCE DUE: <?php echo number_format($total_balance, 2); ?></strong>
    </div>

    <!-- Notes -->
    <div class="notes">
      <h3 style="margin: 15px 0 5px 0; font-size: 11px;">Notes:</h3>
      <ol>
        <li>All cheques payable to OVERLAND LOGISTICS LTD.</li>
        <li>Please ensure you are issued with an official receipt upon making any payment</li>
        <li>Bounced cheques will be charged a penalty.</li>
      </ol>
    </div>
  </div>

  <script>
     window.print()
  </script>
</body>
</html>