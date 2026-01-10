<?php
    require_once("db.php");

    class glaccount extends db{

        function checkglgroup($id,$groupname){
            $sql="CALL sp_checkglaccountgroup({$id},'{$groupname}')";
            return $this->getData($sql)->rowCount();
            
        }

        function saveglgroup($id,$glaccountclass,$groupname,$subcategoryof,$cashbookaccount){
            if($this->checkglgroup($id,$groupname)){
                return ["status"=>"exists","message"=>"exists"] ;
            }else{
                $sql="CALL sp_saveglgroupname({$id},{$glaccountclass},'{$groupname}',{$subcategoryof},{$cashbookaccount},{$this->userid})";
                $this->getData($sql);
                return ["status"=>"success","message"=>"glaccount saved successfully"];
            }
           
        }

        function getglgroups($category){
            $sql="CALL sp_getglgroups({$category})";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function deleteglgroup($id){
            $sql="CALL sp_deleteglgroup({$id},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql);
            echo 'success';
        }

        function checkglaccountcode($id,$accountcode){
            $sql="CALL sp_checkglaccount({$id},'{$accountcode}')";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()>0){
                return true;
            }else{
                return false;
            }
        }

        function checkglaccountname($id,$accountname){
            $sql="CALL sp_checkglaccount({$id},'{$accountname}')";
            $rst=$this->connect()->query($sql);
            if($rst->rowCount()>0){
                return true;
            }else{
                return false;
            }
        }

        function saveglaccount($id,$groupid,$accountcode,$accountname,$isbankaccount,$allowoverdraft,$bankname,$branchname,$accountno, $swiftcode){
            if( $this->checkglaccountcode($id,$accountcode)){
                echo "account code exists";
            }else if($this->checkglaccountname($id,$accountname)){
                echo "account name exists";
            }else{
                $sql="CALL sp_saveglaccount({$id},{$groupid},'{$accountcode}','{$accountname}',{$isbankaccount},{$allowoverdraft},'{$bankname}','{$branchname}','{$accountno}','{$swiftcode}',{$this->userid},'{$this->platform}')";
                // echo $sql."<br/>";
                $rst=$this->connect()->query($sql);
                echo 'success';
            }
        }

        function deleteglaccount($id){
            $sql="CALL sp_deleteglaccount({$id},{$_SESSION['userid']})";
            $rst=$this->connect()->query($sql);
            echo 'success';
        }

        function getglaccounts(){
            $sql="CALL sp_getglaccounts()";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getglaccountclasses(){
            $sql="CALL sp_getglaccountclasses()";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getglparentgroups($classid){
            $sql="CALL sp_getparentgroups({$classid})";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getsubgroups($groupid){
            $sql="CALL sp_getglsubgroups({$groupid})";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getCashBookAccounts(){
            $sql="CALL sp_getcashbookaccounts()";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getGLAccountDetails($id){
            $sql="CALL sp_getglaccountdetails({$id})";
            $rst=$this->connect()->query($sql);
            echo json_encode($rst->fetchAll(PDO::FETCH_ASSOC));
        }

        function getglaccountmapping(){
            $sql="CALL `sp_getglaccountmappings`()";
            return $this->getJSON($sql);
        }

        function saveglaccountmapping($category,$itemid,$glaccountid){
            $sql="CALL `sp_saveglaccountmapping`('{$category}',{$itemid},{$glaccountid},{$this->userid},'{$this->platform}',{$this->branchid})";
            // echo $sql."<br/>";
            $this->getData($sql);
            return "success";
        }

        function getpaymentmethods(){
            $sql="CALL `sp_getpaymentmethods`()";
            return $this->getJSON($sql);
        }

        function getpaymentvouchers(){
            $sql = "CALL `sp_getpaymentvouchers`({$this->branchid})";
            return $this->getJSON($sql);
        }

        function getpaymentvoucherdetails($voucherid){
            $sql = "call `sp_getpaymentvoucherdetails`({$voucherid})";
            return $this->getJSON($sql);
        }

        function checkpaymentvoucher($voucherid,$reference) {
            $sql = "CALL sp_checkpaymentvoucher({$voucherid},'{$reference}')";
            return $this->getData($sql)->rowCount();
        }
        

        function savepaymentvoucher($voucherid, $payeename, $description, $paymentmode, $refference, $amount, $crledger, $subaccount,$transactiondate) {
            if ($this->checkpaymentvoucher($voucherid,$refference)) {
                echo "Voucher number already exists!";
            } else {
                $sql = "CALL `sp_savepaymentvoucher`({$voucherid},'{$payeename}','{$description}',{$paymentmode},'{$refference}',{$amount},'{$crledger}','{$subaccount}','{$transactiondate}',{$this->userid},{$this->branchid})";
                $this->getData($sql);
                echo "success";
            }
        }
        
        function deletepaymentvoucher($voucherid){
            $sql = "call `sp_deletepaymentvoucher`({$voucherid},{$this->userid})";
            $rst=$this->connect()->query($sql);
            echo 'success';
        }

        function filterpaymentvoucher($startdate, $enddate, $paymentmode) {
            if (empty($paymentmode)) {
                $paymentmode = "NULL";
            }
        
            $sql = "CALL `sp_filterpaymentvouchers`('{$startdate}', '{$enddate}', {$paymentmode})";
            return $this->getJSON($sql);
        }

        // Function to print the payment voucher
        function printpaymentvoucher($voucherno) {
            $sql = "CALL `sp_printvoucher`('{$voucherno}')";
            $voucherData = $this->getJSON($sql);
            $voucherData = json_decode($voucherData, true);

            if (empty($voucherData)) {
                echo "No data found for voucher number {$voucherno}.";
                return;
            }

            $voucher = $voucherData[0];
            function numberToWords($num) {
                $ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
                $tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
                $thousands = ['', 'thousand', 'million', 'billion'];

                $numStr = '';
                $i = 0;
                while ($num > 0) {
                    if ($num % 1000 != 0) {
                        $numStr = numberToWordsHelper($num % 1000) . $thousands[$i] . ' ' . $numStr;
                    }
                    $num = (int)($num / 1000);
                    $i++;
                }

                return trim($numStr);
            }

            function numberToWordsHelper($num) {
                $ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
                $tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

                $str = '';
                if ($num >= 100) {
                    $str .= $ones[(int)($num / 100)] . ' hundred ';
                    $num = $num % 100;
                }
                if ($num >= 20) {
                    $str .= $tens[(int)($num / 10)] . ' ';
                    $num = $num % 10;
                }
                if ($num > 0) {
                    $str .= $ones[$num] . ' ';
                }

                return $str;
            }

            $telephone = isset($voucher['telephone']) ? htmlspecialchars($voucher['telephone']) : 'N/A';
            $amountInWords = numberToWords($voucher['amount']);
            $amountInWords = ucfirst($amountInWords);

            require_once("../vendor/autoload.php");
            $mpdf = new \Mpdf\Mpdf();

            $html = '
                <style>
                    /* Your CSS styles */
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                    }

                    .header{
                        margin-left: 20rem;
                        text-decoration: underline;
                    }

                    .details{
                        text-align: left;
                    }

                    img {
                        width: 100px;
                        height: auto;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    th, td {
                        padding: 10px;
                        vertical-align: top;
                        text-align: right;
                    }

                    .title{
                        text-align: left;
                    }

                    .details-column {
                        text-align: right;
                    }

                    .table-header {
                        border: 1px solid black;
                    }

                    .tablefooter {
                        border: 1px solid black;
                    }

                    .table tfoot td {
                        font-weight: bold;
                    }

                    .outer-border-table {
                        border: 1px solid black;
                    }

                    .info {
                        padding: 5px;
                        text-align: left;
                    }

                    .amount-column{
                        border-left: 1px solid black;
                    }

                    .info .line-text {
                        display: inline-block;
                        width: 150px;
                    }

                    .info .line {
                        display: inline-block;
                        width: 100%;
                        border-top: 1px solid #000;
                        margin-left: 5px;
                    }
                </style>

                <table>
                    <tr>
                        <td>
                            <img src="../images/tlogo.png" alt="House Icon">
                        </td>
                        <td class="title"><h2>OVERLAND LOGISTICS LIMITED</h2></td>
                        <td>&nbsp;</td>
                        <td class="details-column">
                            NSSF Building 7th Floor<br>
                            P.O Box 12627 Nairobi, 00100<br>
                            Tel: 0719555415<br>
                            Mob: 0733199615<br>
                            info@overlandlogisticsltd.com
                        </td>
                    </tr>
                </table>

                <div class="header"><h3>PAYMENTS VOUCHER</h3></div>

                <table>
                    <tr>
                        <td class="details">
                            <strong>Payee Details / Company</strong><br>
                            <strong>' . htmlspecialchars($voucher['payeename']) . '</strong><br><br>
                            <strong>Telephone: ' . $telephone . '</strong>
                        </td>
                        <td>&nbsp;</td>
                        <td>
                            <strong>Voucher No: ' . htmlspecialchars($voucher['voucherno']) . '</strong><br>
                            <strong>Voucher Date: ' . date('d-M-Y', strtotime($voucher['transactiondate'])) . '</strong>
                        </td>
                    </tr>
                </table>

                <table class="outer-border-table">
                    <thead>
                        <tr class="table-header">
                            <th>PARTICULARS</th>
                            <th>Expense A/c</th>
                            <th class="amount-column">AMOUNT (KSHS)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>&nbsp;</td>
                            <td>'. htmlspecialchars($voucher['description']).'</td>
                            <td class="amount-column">' . number_format($voucher['amount'], 2) . '</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>               
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td> 
                            <td>&nbsp;</td>
                            <td class="amount-column">&nbsp;</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="tablefooter">
                            <td>&nbsp;</td>
                            <td><strong>TOTAL AMOUNT PAYABLE</strong></td>
                            <td class="amount-column"><strong>' . number_format($voucher['amount'], 2) . '</strong></td>
                        </tr>
                    </tfoot>
                </table>

                <p><strong>AMOUNT IN WORDS: ' . $amountInWords . ' SHILLINGS ONLY</strong></p>

                <table>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Prepared By: ______________________________</strong></div>
                        </td>
                        <td class="info">
                            <div class="line-text"><strong>Director/C.E.O Signature:  ______________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Checked By: ______________________________</strong></div>
                        </td>
                        <td class="info">
                            <div class="line-text"><strong>Guarantor: ______________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Authorised By: ________________________________________</strong></div>
                        </td>
                        <td class="info">
                            <div class="line-text"><strong>Sign: ________________________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Pay Mode:</strong>'. htmlspecialchars($voucher['paymentmode']).'</div>
                        </td>
                        <td class="info">
                            <div class="line-text"><strong>Telephone: ________________________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Collected By (Name): ________________________________________</strong></div>
                        </td>
                        <td class="info">
                            <div class="line-text"><strong>ID No: ________________________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Payee Names: ________________________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>Signature of Collector: ________________________________________</strong></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="info">
                            <div class="line-text"><strong>ID No: ________________________________________</strong></div>
                        </td>
                    </tr>
                </table>
            ';

            // Write the HTML content to the PDF
            $mpdf->WriteHTML($html);

            // Output the PDF to the browser
            $mpdf->Output('Payment_Voucher_' . $voucher['voucherno'] . '.pdf', 'I');
            exit;
        }

        // account mapping
        function getglaccountmappingitems(){
            $sql="CALL `sp_getglaccountmapping`()";
            return $this->getJSON($sql);
        }

        function getglaccountmappingchargeableitems(){
            $sql= "CALL `sp_getglaccountmappingchargeableitems`()";
            return $this->getJSON($sql);
        }
        function savemappingaccount($accountid,$itemid){
            $sql="CALL `sp_savemappingaccount`({$accountid},{$itemid},{$this->userid})";
            $this->getData($sql);
            return ["status"=>"success","message"=>"success"];
        }

        function getaccountmapping(){
            $sql="CALL `sp_getaccountmapping`()";
            return $this->getJSON($sql);
        }
        function deletemappingaccount($mappingid){
            $sql =" CALL `sp_deletemapingaccount`({$mappingid},{$this->userid},'{$this->platform}')";
            $this->getData($sql);
            return "success";
        }
    }   
    
?>