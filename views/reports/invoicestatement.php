<?php
require_once(__DIR__ . '/../../models/db.php');
  $db = new db();

  /* Fetch company title */
  $sql = "CALL `sp_getcompanytitledetails`()";
  $stmt2 = $db->getData($sql);
  $companytitle = $stmt2->fetch(PDO::FETCH_ASSOC);
  $stmt2->closeCursor();

  /* Invoice ID */
  $invoiceid = $_GET['invoiceid'] ?? null;
  if (!$invoiceid) {
      echo "No invoice ID supplied.";
      exit;
  }

  /* Fetch invoice data */
  $sql = "CALL `sp_getinvoicedetails` ('{$invoiceid}')";
  $stmt = $db->getData($sql);
  $invoicedetails = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt->closeCursor();

  if (count($invoicedetails) > 0) {
      // First row contains all invoice header metadata
      $header = $invoicedetails[0]; 

      $subtotal     = $header['subtotal'];
      $vat          = $header['vat'];
      $total_amount = $header['total_amount'];
      $currency     = $header['currencyname'];
      $amountinwords = convertNumberToWords($total_amount);
  } else {
      echo "No invoice data found.";
      exit;
  }

  // fetchbank detaild

  $bankstatus = $_GET['bankstatus'] ?? null;
  $bankdetails = null;

  if ($bankstatus !== null && $bankstatus !== "") {
      $sql = "CALL `sp_getinvoicebankdetails`({$bankstatus})";
      $stmt1 = $db->getData($sql);

      if ($bankstatus == 2) {
          $bankdetails = $stmt1->fetchAll(PDO::FETCH_ASSOC); 
      } else {
          $bankdetails = $stmt1->fetch(PDO::FETCH_ASSOC);     
      }

      $stmt1->closeCursor();
  }

  /* Number to words function */
  function convertNumberToWords($number) {
    $hyphen      = '-';
    $conjunction = ' and ';
    $separator   = ', ';
    $negative    = 'negative ';
    $decimal     = ' point ';
    $dictionary  = array(
        0                   => 'zero',
        1                   => 'one',
        2                   => 'two',
        3                   => 'three',
        4                   => 'four',
        5                   => 'five',
        6                   => 'six',
        7                   => 'seven',
        8                   => 'eight',
        9                   => 'nine',
        10                  => 'ten',
        11                  => 'eleven',
        12                  => 'twelve',
        13                  => 'thirteen',
        14                  => 'fourteen',
        15                  => 'fifteen',
        16                  => 'sixteen',
        17                  => 'seventeen',
        18                  => 'eighteen',
        19                  => 'nineteen',
        20                  => 'twenty',
        30                  => 'thirty',
        40                  => 'forty',
        50                  => 'fifty',
        60                  => 'sixty',
        70                  => 'seventy',
        80                  => 'eighty',
        90                  => 'ninety',
        100                 => 'hundred',
        1000                => 'thousand',
        1000000             => 'million',
        1000000000          => 'billion',
        1000000000000       => 'trillion',
        1000000000000000    => 'quadrillion',
        1000000000000000000 => 'quintillion'
    );

    if (!is_numeric($number)) {
        return false;
    }

    if ($number < 0) {
        return $negative . convertNumberToWords(abs($number));
    }

    $string = $fraction = null;

    if (strpos($number, '.') !== false) {
        list($number, $fraction) = explode('.', $number);
    }

    switch (true) {
        case $number < 21:
            $string = $dictionary[$number];
            break;
        case $number < 100:
            $tens   = ((int) ($number / 10)) * 10;
            $units  = $number % 10;
            $string = $dictionary[$tens];
            if ($units) {
                $string .= $hyphen . $dictionary[$units];
            }
            break;
        case $number < 1000:
            $hundreds  = floor($number / 100);
            $remainder = $number % 100;
            $string = $dictionary[$hundreds] . ' ' . $dictionary[100];
            if ($remainder) {
                $string .= $conjunction . convertNumberToWords($remainder);
            }
            break;
        default:
            $baseUnit = pow(1000, floor(log($number, 1000)));
            $numBaseUnits = (int) ($number / $baseUnit);
            $remainder = $number % $baseUnit;
            $string = convertNumberToWords($numBaseUnits) . ' ' . $dictionary[$baseUnit];
            if ($remainder) {
                $string .= $remainder < 100 ? $conjunction : $separator;
                $string .= convertNumberToWords($remainder);
            }
            break;
    }

    if (null !== $fraction && is_numeric($fraction) && (int)$fraction > 0) {
        $string .= $decimal;
        $words = array();
        foreach (str_split((string) $fraction) as $number) {
            $words[] = $dictionary[$number];
        }
        $string .= implode(' ', $words);
    }

    return $string;
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>Invoice Statement for <?= $header['invoiceid'] ?></title>
  <style>
    * {
      box-sizing: border-box;
    }

    @media print {
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      body {
        print-color-adjust: exact;
      }
    }

    body {
      font-family: Arial, sans-serif;
      font-size: 10px;
      margin: 0;
      padding: 20px;
    }

    .container {
      width: 100%;
      position: relative;
    }

    /* INVOICE title outside frame - positioned above */
    .invoice-title {
      position: absolute;
      top: -25px;
      right: 0;
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }

    /* Thin black frame for main content */
    .main-content {
      border: 1px solid #000;
      padding: 15px;
      margin-bottom: 10px;
      margin-top: 25px;
      position: relative;
    }

    /* Header with two columns */
    .header-container {
      display: flex;
      width: 100%;
      position: relative;
    }

    .left-column {
      width: 60%;
      padding-right: 15px;
      position: relative;
    }

    .right-column {
      width: 40%;
      padding-left: 15px;
      position: relative;
    }

    /* Middle vertical line that touches top and bottom frames */
    .header-container::before {
      content: '';
      position: absolute;
      top: -15px;
      bottom: -15px;
      left: 60%;
      width: 1px;
      background: #000;
    }

    .company-info {
      text-align: left;
      display: flex;
      align-items: flex-start;
      padding-bottom: 10px;
      position: relative;
    }

    /* Horizontal line under company info that touches left frame and middle line */
    .company-info::after {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      bottom: 0;
      height: 1px;
      background: #000;
    }

    .company-logo {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f8f8;
    }

    .company-logo img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .company-details {
      flex: 1;
    }

    .company-info h3 {
      margin: 0;
      font-weight: bold;
    }

    .client-info {
      padding: 10px 0;
      position: relative;
    }

    /* Horizontal line under client info that touches left frame and right frame */
    .client-info::after {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      bottom: 0;
      height: 1px;
      background: #000;
    }

    /* Right column grid layout */
    .info-grid {
      width: 100%;
    }

    .info-row {
      display: flex;
      width: 100%;
      position: relative;
    }

    .info-row:first-child::after {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      bottom: 0;
      height: 1px;
      background: #000;
    }

    /* .info-row:last-child::after {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      bottom: -10px;
      height: 1px;
      background: #000;
    } */

    .info-cell {
      flex: 1;
      padding: 5px;
      position: relative;
    }

    /* Vertical line between cells in right column */
    .info-cell:first-child::after {
      content: '';
      position: absolute;
      top: -10px;
      bottom: -10px;
      right: 0;
      width: 1px;
      background: #000;
    }

    .info-label {
      font-weight: normal;
      margin: 0;
    }

    .info-value {
      font-weight: bold;
      margin: 2px 0 0 0;
      font-size: 11px;
    }

    .terms-delivery {
      padding: 5px;
      font-weight: bold;
      margin-top: 15px;
      position: relative;
    }

    /* Line above terms that touches middle line and right frame */
    .terms-delivery::before {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      top: 0;
      height: 1px;
      background: #000;
    }

    /* Table section with proper line connections */
    .table-section {
      position: relative;
      margin-top: 15px;
    }

    .table-section::before {
      content: '';
      position: absolute;
      left: -15px;
      right: -15px;
      top: -5px;
      height: 1px;
      background: #000;
    }

    /* Details table styling */
    .details-table {
      width: calc(100% + 30px);
      margin-left: -15px;
      margin-right: -15px;
      border-collapse: collapse;
      margin-top: 15px;
      margin-bottom: 20px;
      min-height: 200px;
    }

    /* Horizontal line below thead that touches frames */
    .details-table thead {
      position: relative;
    }

    .details-table thead::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #000;
    }

    .details-table th {
      background: transparent;
      border: none;
      border-right: 1px solid #000;
      padding: 12px 8px;
      font-weight: bold;
      text-align: left;
    }

    /* .details-table th:last-child {
      border-right: 1px solid #000;
    } */

    /* Horizontal line below tbody that touches frames */
    .details-table tbody {
      position: relative;
      font-size: 11px;
    }

    .details-table tbody::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background: #000;
    }

    .details-table td {
      border: none;
      border-right: 1px solid #000;
      padding: 15px 8px;
      text-align: left;
      height: 50px;
    }


    /* Make amount column bold */
    .details-table td:nth-child(4) {
      font-weight: bold;
    }

    /* Amount section with reduced spacing */
    .amount-section {
      margin-top: 5px;
      float: right;
      width: 250px;
      border: none;
      padding: 0;
    }

    .amount-section table {
      width: 100%;
      border-collapse: collapse;
    }

    .amount-section td {
      padding: 2px 2px; 
      text-align: right;
      font-weight: bold;
      font-size: 10px;
    }

    .amount-section td.label {
      text-align: left;
    }

    /* Amount words section bold */
    .amount-words-section {
      margin-top: 10px;
      clear: both;
      /* font-weight: bold; */
      font-size: 11px;
    }

    /* Declaration with header */
    .declaration {
      margin-top: 30px;
      font-size: 10px;
      line-height: 1.4;
      float: left;
      width: 60%;
    }

    .declaration-header {
      font-weight: bold;
      /* margin-bottom: 2px; */
    }

    /* Authorised signatory and signature line on same line */
    .signature-section {
      margin-top: 110px;
      float: right;
      width: 35%;
      text-align: right;
      white-space: nowrap;
    }

    .signature-line {
      border-bottom: 1px solid #000;
      width: 150px;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }

    /* Bank details not in table form, far left */
    .bank-details {
      margin-top: 10px;
      clear: both;
      font-size: 10px;
      width: 60%;
    }

    .bank-details p {
      margin: 3px 0;
    }

    /* Footer with generated by and on same line */
    .footer {
      margin-top: 20px;
      font-size: 10px;
      clear: both;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .footer p {
      margin: 0;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="invoice-title">INVOICE</div>

    <!-- MAIN CONTENT -->
    <div class="main-content">

      <div class="header-container">
        
        <!-- LEFT -->
        <div class="left-column">
          <div class="company-info">
              <div class="company-logo">
                <img src="../../images/logo.jpeg" alt="Company Logo">
              </div>
              <div class="company-details">
                  <h3><?= $companytitle['companyname'] ?></h3>
                  <p><?= $companytitle['postaladdress'] ?></p>
                  <p>Mob1: <?= $companytitle['tel1'] ?></p>
                  <p>Mob2: <?= $companytitle['tel2'] ?></p>
                  <p>Email: <?= $companytitle['email'] ?></p>
              </div>
          </div>

          <div class="client-info">
              <p><strong>Client Name:</strong> <?= $header['clientname'] ?></p>
              <p><strong>Address:</strong> <?= $header['address'] ?></p>
              <p><strong>Telephone:</strong> <?= $header['telephone'] ?></p>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="right-column">
          <div class="info-grid">

            <div class="info-row">
              <div class="info-cell">
                <p class="info-label">Invoice No</p>
                <p class="info-value"><?= $header['invoiceno'] ?></p>
              </div>
              <div class="info-cell">
                <p class="info-label">Date</p>
                <p class="info-value">
                  <?= date('jS - M - Y', strtotime($header['invoicedate'])) ?>
                </p>
              </div>
            </div>

            <div class="info-row">
              <div class="info-cell">
                <p class="info-label">Delivery #</p>
                <p class="info-value"><?= $header['deliveryorderno'] ?></p>
              </div>
              <div class="info-cell">
                <p class="info-label">Payment Mode</p>
                <p class="info-value"><?= $header['paymentmodename'] ?? 'Cash / Cheque' ?></p>
              </div>
            </div>

          </div>

          <div class="terms-delivery">Terms of Delivery</div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-section">
        <table class="details-table">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Rate</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach($invoicedetails as $row): ?>
              <tr>
                <td>
                  <?= $row['particular'] ?>
                  Container #: <?= $row['containernumber'] ?>
                  Destination: <?= $row['destination'] ?>
                  Truck No: <?= $row['trucknumber'] ?>
                </td>
                <td><?= number_format($row['subtotal'],2) ?></td>
                <td><?= $row['qty'] ?></td>
                <td><?= number_format($row['subtotal'],2) ?></td>
              </tr>
            <?php endforeach; ?>

            <tr><td colspan="4">&nbsp;</td></tr>
            <tr><td colspan="4">&nbsp;</td></tr>
          </tbody>
        </table>
      </div>

      <!-- TOTALS -->
      <div class="amount-section">
        <table>
          <tr>
            <td class="label">Sub Total (<?= $currency ?>)</td>
            <td><?= number_format($subtotal,2) ?></td>
          </tr>
          <tr>
            <td class="label">VAT (16%) (<?= $currency ?>)</td>
            <td><?= number_format($vat,2) ?></td>
          </tr>
          <tr>
            <td class="label">Total Value (<?= $currency ?>)</td>
            <td><?= number_format($total_amount,2) ?></td>
          </tr>
        </table>
      </div>
      <div style="clear: both;"></div>

    </div> <!-- End MAIN CONTENT -->

    <div class="amount-words-section">
      <p><strong>Amount in Words:</strong> <?= strtoupper($amountinwords) . " " . strtoupper($currency) ?> ONLY.</p>
    </div>

    <!-- DECLARATION -->
    <div class="declaration">
      <div class="declaration-header">Declaration</div>
      <p>We declare that this invoice shows the actual</p>
      <p>Price of the services provided and that all</p>
      <p>Particulars are true and correct.</p>
    </div>

    <div class="signature-section">
       Authorised Signatory
      <span class="signature-line"></span>
    </div>

    <div style="clear:both;"></div>

    <?php if ($bankstatus !== null && $bankstatus !== ""): ?>
      <div class="bank-details">
          <p><strong>Bank Details</strong></p>

          <?php 
            // If both banks selected → array of rows
            if ($bankstatus == 2 && is_array($bankdetails)): 
                foreach ($bankdetails as $bank): ?>
                    <p><strong><?= $bank['banktype'] ?> Bank: </strong></p>
                    <p style="padding-left: 5px;"><?= $bank['bankname'] ?> Bank</p>
                    <p style="padding-left: 5px;"><?= $bank['accountno'] ?></p>
                    <?php if (!empty($bank['swiftcode'])): ?>
                        <p style="padding-left: 5px;">Swift Code: <?= $bank['swiftcode'] ?></p>
                    <?php endif; ?>
                    <hr>
                <?php endforeach; ?>

            <?php 
            // Single bank selected → single associative array
            elseif (is_array($bankdetails)): ?>
                <!-- <p><strong><?= ($bankstatus == 1 ? "USD" : "KES") ?> Bank</strong></p> -->
                <p><?= $bankdetails['bankname'] ?> Bank</p>
                <p><?= $bankdetails['accountno'] ?></p>
                <?php if (!empty($bankdetails['swiftcode'])): ?>
                    <p>Swift Code: <?= $bankdetails['swiftcode'] ?></p>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    <?php endif; ?>



    <div class="footer">
      <p><strong>Generated on:</strong> <?= date('d-m-Y') ?></p>
      <p><strong>Generated by:</strong> Admin</p>
    </div>

  </div>

  <script>
    window.print();
  </script>

  </body>
</html>
