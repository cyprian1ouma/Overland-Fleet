$(document).ready(function(){
    const currentmenu=$("#dashboard")
    setactivemenu(currentmenu)

     // Clients vs Invoices Chart
    function getclientinvoicesummary(){
        const invoiced=[],
            allocated=[],
            categories=[]
        $.getJSON(
            "../controllers/dashboardoperations.php",
            {
                getclientinvoicesummary:true
            },
            (data)=>{
                data.forEach(invoice=>{
                    invoiced.push(invoice.invoiced)
                    allocated.push(invoice.allocated)
                    // totalinvoiced.push(invoice.totalinvoiced)
                    categories.push(invoice.codename)
                })

                var invoiceOptions = {
                series: [{
                    name: 'Invoiced but Pending Payments',
                    data: invoiced
                },{
                    name: 'Allocated but not Invoiced',
                    data: allocated
                }],
                chart: {
                    type: 'bar',
                    height: '100%',
                    width:'100%',
                    stacked: true
                },
                colors: ['rgba(220, 53, 69, 0.8)', 'rgba(40, 167, 69, 0.8)'],
                // colors: ['#1cc88a', '#f6c23e', '#e74a3b'],
                plotOptions: {
                    bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 0.5,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: categories,
                },
                legend: {
                    position: 'bottom'
                }
                };
                var clientsInvoicesChart = new ApexCharts(document.querySelector("#clientsInvoicesChart"), invoiceOptions);
                clientsInvoicesChart.render();
            }
        )
    }

    getclientinvoicesummary()
    getclientsbalances()

    function getclientsbalances(){
        const seriesdata=[],
            categories=[]
        $.getJSON(
            "../controllers/dashboardoperations.php",
            {
                getclientsbalances:true
            },
            (data)=>{
                data.forEach((balances)=>{
                    seriesdata.push(balances.balance)                    
                    categories.push(balances.codename)
                })

                const balancesSummaryOptions = {
                    series: [{
                        name: 'Clients',
                        data: seriesdata
                    }],
                    chart: {
                        type: 'bar',
                        height: '100%'
                    },
                    colors: ['#f6c23e'],
                    plotOptions: {
                        bar: {
                        borderRadius: 4,
                        horizontal: false,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        categories: categories,
                    },
                    yaxis: {
                        title: {
                        text: 'Balances'
                        }
                    }
                }

                const balancesSummaryChart = new ApexCharts(document.querySelector("#balancesSummaryChart"), balancesSummaryOptions);
                balancesSummaryChart.render();
            }
        )
       
    }

    const balancessummaryicon=$("#balancessummary"),
    balancessummarymodal=$("#balancessummarymodal"),
    balancessummarynotifications=$("balancessummarynotifications"),
    balancessummarytable=$("#balancessummarytable")

    balancessummaryicon.on("click",()=>{
        balancessummarymodal.modal("show")
        balancessummarynotifications.html(showAlert("processing","Processing. Please wait ...",1))
        // get balances
        $.getJSON(
           "../controllers/dashboardoperations.php",
            {
                getclientsbalances:true
            },
            
        ).done(
            (data)=>{
                let results=""
                data.forEach((balances,i)=>{
                    results+=`<tr><td>${$.number(i+1)}</td>`
                    results+=`<td>${balances.codename}</td>`
                    results+=`<td>${$.number(balances.balance)}</td></tr>`
                })
                // balancessummarytable.find("tbody").html(results)
                makedatatable(balancessummarytable,results,15,0)
                balancessummarynotifications.html("")
            }
        ).fail((response,status,error)=>{
            balancessummarynotifications.html(showAlert("danger",`Sorry an error occured ${response.responseText}`))
        })
    })
});