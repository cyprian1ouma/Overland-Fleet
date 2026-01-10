const validationanchor=$(".validation")
const toggle=$("#nav-toggle")
// toggle.prop("checked",true)
let serverdate

function getserverdate(){
    const dfd=$.Deferred()
    $.get(
        "../controllers/settingsoperations.php",
        {
            getserverdate:true
        },
        (data)=>{
            serverdate=new Date(data)
            dfd.resolve()
        }
   )
   return dfd.promise()
}

// get current server date 
getserverdate()

function setactivemenu(menu){
    menu.addClass("active")
}

const patterns={
    mobile:/^\d{10,12}$/,
    name:/^\[a-zA-z]+$/,
    password:/^[\w@-]{5,20}$/,
    email:/^[a-z\d\.-]+@[a-z\d]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/
}

validationanchor.on("click",function(e){
    const id=$(this).attr("data-id") 
    let pagetonavigate=$(this).attr("href")
    e.preventDefault()
    $.post(
      "../controllers/useroperations.php",
      {
        getuserprivilege:true,
        objectid: id
      },
      function(data){
        const allowed=parseInt($.trim(data.toString()))
        if(allowed==0){
          bootbox.alert({
            message: "Sorry. Your are not authorized to perform this operation.",
          })
        }else{
          window.location.href=pagetonavigate
        }
      }
    )
   })

function validatefielddata(validatevalue,format){
    return patterns[format].test(validatevalue)?true:false
}

function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
}

// Richard
function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
}

function convertNumberToWords(amount) {
    const words = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
        'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Thirty', 'Forty', 'Fifty',
        'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    const getWords = (num) => {
        if (num < 20) return words[num];
        if (num < 100) return words[20 + Math.floor(num / 10) - 2] + (num % 10 ? ' ' + words[num % 10] : '');
        if (num < 1000) return words[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + getWords(num % 100) : '');
        return '';
    };

    if (amount === 0) return 'Zero';
    const integerPart = Math.floor(amount);
    const decimalPart = Math.round((amount - integerPart) * 100);
    let result = getWords(integerPart);
    if (decimalPart > 0) {
        result += ' and ' + getWords(decimalPart) + ' Cents';
    }
    return result;
}

function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

function getloggedinuser(){
    const username=$(".username")
    const role=$(".role")
    const image=$(".profilephoto")

    $.getJSON(
        "../controllers/useroperations.php",
        {
            getloggedinuser:true
        },
        (data)=>{
            username.html(data[0].firstname+' '+data[0].middlename)
            role.html(data[0].systemadmin?'Admin Account':'User Account')
            image.attr("src","../images/blankavatar.jpg")
        }
    )
}


// Logout person
$("#logout").on("click",function(e){
    e.preventDefault()
    window.location.href="../controllers/personoperations.php?logoff"
})

$("#logoutuser").on("click",function(e){
    e.preventDefault()
    window.location.href="../controllers/useroperations.php?logout"
})


function getcountries(obj,option='all'){
    $.getJSON(
        "../controllers/countryoperations.php",
        {
            getcountries:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((country)=>{
                results+=`<option value='${country.nationalityid}'>${country.countryname}</option>`
            })
            obj.html(results)
        }
    )
}

function exporttable(tableid,sheetname,documentname){
    // check if multiple tables are to be exported
    var wb = XLSX.utils.table_to_book(document.getElementById(tableid), {sheet:sheetname});
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `${documentname}.xlsx`);

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}

function exportMultipleTables(tableIds, sheetNames, documentName) {
    // Create a new workbook
    var wb = XLSX.utils.book_new()

    // Convert each table to a worksheet and append to the workbook
    tableIds.forEach((tableId, index) => {
        var tableElement = document.getElementById(tableId)
        var ws = XLSX.utils.table_to_sheet(tableElement)
        XLSX.utils.book_append_sheet(wb, ws, sheetNames[index])
    });

    // Write the workbook to a binary string
    var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'})

    // Convert binary string to ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
        return buf
    }

    // Save the workbook
    saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), `${documentName}.xlsx`);
}

function getusers(obj,option){
    $.getJSON(
        "../controllers/useroperations.php",
        {
            getuserslist:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((user)=>{
                results+=`<option value='${user.id}'>${user.firstname} ${user.middlename} ${user.lastname}</option>`
            })
            obj.html(results)
        }
    )
}

function setDatePicker(controlname,maxdate=true, mindate=false){
    if(maxdate){
        controlname.datepicker({ 
            yearRange: "c-70:c+0",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true,
            maxDate: new Date()
        })
    }else if(mindate){
        controlname.datepicker({ 
            yearRange: "c-0:c+20",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true,
            minDate: new Date()
        })
    }else{
        controlname.datepicker({ 
            yearRange: "c-70:c+20",
            dateFormat: 'dd-M-yy',
            changeMonth:true,
            changeYear:true
        })
    }
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function getglaccountclasses(obj, option='all'){
    $.getJSON(
        "../controllers/glaccountoperations.php",
        {
            getglaccountclasses:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((glclass)=>{
                results+=`<option value='${glclass.id}'>${glclass.classname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getglaccounts(obj, groupid=0,option='all'){
    $.getJSON(
        "../controllers/glaccountoperations.php",
        {
            getglaccounts:true,
            groupid
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((glaccount)=>{
                results+=`<option value='${glaccount.id}' data-accountcode='${glaccount.accountcode}'>${glaccount.accountname}</option>`
            })
            obj.html(results)
        }
    )   
}

function getbranches(obj, option='All'){
    $.getJSON(
        "../controllers/branchoperations.php",
        {
            getbranches:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((branch)=>{
                results+=`<option value='${branch.branchid}'>${branch.branchname}</option>`
            })
            obj.html(results)
        }
    ) 
}
function getuserbranches(obj, option='All'){
    $.getJSON(
        "../controllers/branchoperations.php",
        {
            getbranches:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;All&gt;</option>"
            data.forEach((branch)=>{
                results+=`<option value='${branch.branchid}'>${branch.branchname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function sanitizestring(str){
    return str==''?str:str.replace("'","''").trim()
}


function convertToRoman(num) {
    if (num <= 0 || num >= 4000) {
        return "Invalid input. Please enter a number between 1 and 3999.";
    }

    const romanNumerals = [
        ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
        ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
        ["", "M", "MM", "MMM"]
    ];

    const thousands = Math.floor(num / 1000);
    const hundreds = Math.floor((num % 1000) / 100);
    const tens = Math.floor((num % 100) / 10);
    const ones = num % 10;

    return (
        romanNumerals[3][thousands] +
        romanNumerals[2][hundreds] +
        romanNumerals[1][tens] +
        romanNumerals[0][ones]
    );
}

function convertToAscii(num) {
    if (num < 0 || num > 255) {
        return "Invalid input. Please enter a number between 0 and 255.";
    }

    return String.fromCharCode(num);
}

function convertToNumeric(char) {
    if (char.length !== 1) {
        return "Invalid input. Please enter a single character.";
    }

    const asciiCode = char.charCodeAt(0);
    return asciiCode;
}
  
function isOnlyLetters(text) {
    // Use a regular expression to check if the string contains only letters from a to z
    const regex = /^[a-z]+$/i; // The 'i' flag makes the check case-insensitive

    return regex.test(text);
}


function getvoteheads(obj, option='all'){
    $.getJSON(
        "../controllers/accountoperations.php",
        {
            getvoteheads:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((item)=>{
                results+=`<option value='${item.itemid}'>${item.itemname}</option>`
            })
            obj.html(results)
        }
    ) 
}
function setDateToToday(elementId) {
    function formatDateToCustomFormat(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
    }

    // Set the current date in the desired format
    const today = new Date();
    $(`#${elementId}`).val(formatDateToCustomFormat(today));
}
function getidocuments(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getregistrationdocuments:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0' data-expires='1'>&lt;All&gt;</option>":"<option value='' data-expires='1'>&lt;Choose&gt;</option>"
            let defaultvalue=1
            data.forEach((document)=>{
                if(document.defaultvalue==1){
                    defaultvalue=document.id
                }
                results+=`<option value='${document.documentid}' data-expires=${document.expires}>${document.documenttypename}</option>`
            })
            obj.html(results)
            obj.val(defaultvalue)
        }
    ) 
}

function getmaritalstatuses(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getmaritalstatuses:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            let defaultvalue=1
            data.forEach((maritalstatus)=>{
                if(maritalstatus.defaultvalue==1){
                    defaultvalue=maritalstatus.id
                }
               
                results+=`<option value='${maritalstatus.id}'>${maritalstatus.maritalstatus}</option>`
            })
            obj.html(results)
            obj.val(defaultvalue)
           
        }
    ) 
}

function getreligions(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getreligions:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"

           let defaultvalue=6

            data.forEach((religion)=>{
                if(religion.defaultvalue==6){
                    defaultvalue=religion.religionname
                }
                results+=`<option value='${religion.id}'>${religion.religionname}</option>`
            })
            obj.html(results)
            obj.val(defaultvalue)
        }
    ) 
}

function getsalutations(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getsalutations:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"

            let defaultvalue=1

            data.forEach((salutation)=>{
                if(salutation.defaultvalue==1){
                    defaultvalue=salutation.id
                }
                results+=`<option value='${salutation.id}'>${salutation.salutation}</option>`
            })
            obj.html(results)
            obj.val(defaultvalue)
        }
    ) 
}

function getbanks(obj,option='all'){
    dfd= $.Deferred()
    $.getJSON(
        "../controllers/bankoperations.php",
        {
            getbanks:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((bank)=>{
                results+=`<option value='${bank.bankid}'>${bank.bankname}</option>`
            })
            obj.html(results)
            dfd.resolve()
        }
    ) 
    return dfd.promise()
}

//function for getting a bank branch
function getbankbranches(obj,bankid,option='all'){
    dfd=$.Deferred()
    $.getJSON(
        "../controllers/bankoperations.php",
        {
          getbranches:true,
          bankid
        },
        (data)=>{
            let results = option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((branch)=>{
                results+=`<option value='${branch.branchid}'>${branch.branchname} </option>`
            })
            // console.log(results)
            obj.html(results)
            dfd.resolve()
        }
    )
    return dfd.promise()
}

function gotonotifications(notificationid){
    $('html, body').animate({
        scrollTop: (notificationid.offset().top-300)
      }, 1000)
}


function populatemonths(obj){
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let results=""
    months.forEach((month,i)=>{
        results+=`<option value=${i+1}>${month}</option>`
    })
    obj.html(results)
    getserverdate().done(()=>{
        const currentmonth=serverdate.getMonth()
        obj.val(currentmonth+1) 
    })
}

function populateyears(obj){
    let results=""
    
    for (let i=2010;i<=2050;i++){
        results+=`<option value=${i}>${i}</option>`
    }

    obj.html(results)

    getserverdate().done(()=>{
        const currentyear=serverdate.getFullYear()
         obj.val(currentyear)
    })
}


function generatenumbers(style,startat,units,padzeros=false,prefix="",suffix=""){
    const numbers=[], totalunits=Number(startat)+Number(units)-1

    if(style=="numeric" || style=="roman"){
        if(parseInt(startat)){
            for( let i=startat;i<=totalunits;i++){
                currentno=style=="roman"?decimalToRoman(i):i
                if(padzeros==false){
                    numbers.push(`${prefix}${currentno}${suffix}`)
                }else{
                    let padding="", currnolength=currentnoi.toString().length
                    for(let j=currnolength;j<totalunits.toString().length;j++){
                        padding+=`0`
                    }
                    numbers.push(`${prefix}${padding}${currentno}${suffix}`)
                }
            }
            return numbers
        }else{
            return "invalid start number"
        }
    }else if(style=="alphabetic"){
        // check that start style is a single alphabetic letter
        startat=startat.toUpperCase()
        const pattern=/^[A-Z]$/
        if(pattern.test(startat)){
            const numericstart=convertToNumeric(startat)
            for(i=numericstart;i<totalunits;i++){
                if(padding==false){
                    numbers.push(`${prefix}${convertToAscii(i)}${suffix}`)
                }else{
                    let padding="", currnolength=convertToAscii(i).toString().length
                    for(let j=currnolength;j<totalunits.toString().length;j++){
                        padding+=`0`
                    }
                    numbers.push(`${prefix}${padding}${convertToAscii(i)}${suffix}`)
                }
            }
            return numbers
        }else{
            return "invalid start number"
        }
    }
}

function decimalToRoman(num) {
    // Array of objects containing Roman numeral and corresponding value
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ]
    
    // Initialize result string
    let romanNumeral = ''
    
    // Iterate through the array of objects
    for (const item of romanNumerals) {
        while (num >= item.value) {
            romanNumeral += item.numeral
            num -= item.value
        }
    }
    
    return romanNumeral
}


function getcreditors(obj,option='all'){
    $.getJSON(
        "../controllers/creditoroperations.php",
        {
            getcreditors:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((creditor)=>{
                results+=`<option value='${creditor.creditorid}'>${creditor.creditorname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function renumbertablerows(table){
    table.find("tbody tr").each(function(i){
        $(this).find("td").eq(0).text(Number(i+1))
    })
}


function getTodaysDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()]; // Get month name from the array
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
}

function gettaxlabels(obj,option='all'){
    $.getJSON(
        "../controllers/payrolloperations.php",
        {
            gettaxlabels:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((taxlabel)=>{
                results+=`<option value='${taxlabel.payeid}' ${taxlabel.current==1?'selected': ''}>${taxlabel.label}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getrelationships(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getrelationships:true
        },
        (data)=>{

            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((relationship)=>{
                results+=`<option value='${relationship.relationshipid}'>${relationship.description}</option>`
            })
            obj.html(results)
        }
    ) 
}


function convertDate(dateStr) {
    // Define months array
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Split the input date string
    const [day, monthStr, year] = dateStr.split("-");
    // Find the month index (January is 0, February is 1, etc.)
    const month = months.indexOf(monthStr) + 1;
    // Return formatted date
    return `${year}-${String(month).padStart(2, '0')}-${day}`;
}

    function makedatatable(tableobj,results,pagelength=10, showall=0){
    // destroy datatable bfore re-initialization
    if ($.fn.dataTable.isDataTable(tableobj)) {
    tableobj.DataTable().clear().destroy();
    }

    // update content
    tableobj.find("tbody").html(results)
    // reinitializedatatable
    if(showall==1){
        tableobj.DataTable({
            "autoWidth": false,
            "paging": false,        // disable pagination
            "info": false,          // optional: hide "Showing X of Y entries"
            "lengthChange": false   // optional: hide length dropdown

        }).columns.adjust().draw()
    }else{
            tableobj.DataTable({
            "autoWidth": false,
            "lengthMenu": [[10, 15, 25, 50, 100, -1], [10, 15,25, 50, 100, "All"]],
            "pageLength":pagelength
            // "paging": true,
            // "searching": true,
            // "ordering": true,
            // "info": true
            // Additional options can be added here
        }).columns.adjust().draw()
    } 
}

function getpaymentmethods(obj,option='all'){
    dfd=$.Deferred()
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getpaymentmethods:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            // check if object is an array of objects
             data.forEach((paymentmode)=>{
                results+=`<option value='${paymentmode.paymentmodeid}' data-requiresref='${paymentmode.requiresref}'>${paymentmode.paymentmodename}</option>`
            })

            if(Array.isArray(obj)){
                obj.forEach(element=>{
                    element.html(results)
                }) 
            }else{
                obj.html(results)
            }           
            dfd.resolve()
        }
    )     
    return dfd.promise()
}

function getfirstdateofmonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getlastdateofmonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}


function setDefaultDate(controlname) {
    const today = new Date();

    // Get the day, month, and year
    const day = today.getDate().toString().padStart(2, '0'); 
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    controlname.val(formattedDate);
}

function getCashbookAccounts(selectBox,option='all'){
    $.getJSON(
      "../controllers/glaccountoperations.php",
      {
        getcashbookaccounts:true
      },
      function(data){
        var results=''
        option=='all'?results="<option value='0'>&lt;All&gt;</option>":results="<option value=''>&lt;Choose&gt;</option>"
        for(var i=0;i<data.length;i++){
          results+="<option value='"+data[i].id+"'>"+data[i].accountname+"</option>"
        }
        selectBox.html(results)
      }
    )
}

function getcurrency(obj, option='all'){
    $.getJSON(
        "../controllers/settingsoperations.php",
        {
            getcurrency:true
        },
        (data)=>{
            let results=option=='all'?"<option value='0'>&lt;All&gt;</option>":"<option value=''>&lt;Choose&gt;</option>"
            data.forEach((currency)=>{
                results+=`<option value='${currency.currencyid}'>${currency.currencyname}</option>`
            })
            obj.html(results)
        }
    ) 
}

function getallcurrencies(obj, option = 'all') {
    $.getJSON(
      "../controllers/invoiceoperations.php",
      { getallcurrencies: true },
      (data) => {
        let results = option === 'all'
          ? "<option value='0'>&lt;All&gt;</option>"
          : "<option value=''>Choose</option>";
  
        data.forEach((currency) => {
           results += `<option value='${currency.currencyid}'>${currency.currencyname}(${currency.symbol})</option>`
        });
  
        obj.html(results);
  
        obj.val(1).trigger('change');
      }
    )
  }
  


function checkoruserprivilege(objectcode){
    const dfd =$.Deferred()
    $.getJSON(
      "../controllers/useroperations.php",
      {
          checkprivilageforuser:true,
          objectcode
      },
      (data)=>{
         dfd.resolve(data=data[0].allowed)
      }
    )
    return dfd.promise()
}


function timeawaits(modalelement, notifications, delay=3000){
    const $modal = $(modalelement)        
    const $notif = $(notifications)        
    setTimeout(()=>{
        $modal.modal("hide")
        $notif.html("")
    }, delay)
}


