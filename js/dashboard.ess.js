$(document).ready(()=>{
    // highlight current selection
    // $(document).ready(function(){
        const currentmenu=$("#dashboard")
        setactivemenu(currentmenu)
        // getloggedinuser()
    // })

    const employeesummarychart= document.getElementById('employeepaymentsummarychart').getContext('2d')

    // Data for the chart
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Gross',
            data: [5000, 5500, 6000, 6200, 6400, 6700,5000, 5500, 6000, 6200, 6400, 6700],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1
          },
          {
            label: 'Deductions',
            data: [1000, 1200, 1100, 1150, 1300, 1250,1000, 1200, 1100, 1150, 1300, 1250],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            tension: 0.1
          },
          {
            label: 'Net',
            data: [4000, 4300, 4900, 5050, 5100, 5450,4000, 4300, 4900, 5050, 5100, 5450],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false,
            tension: 0.1
          }
        ]
      };
  
      // Configuration options
      const config = {
        type: 'line',
        data: data,
        options: {
            title: {
                display: true,       // Enable title display
                text: 'Earnings Summary',  // Title text
                font: {
                    size: 20,
                    family: 'Poppins',  // Font family for the title
                    weight: '600'       // Font weight for the title
                },
                color: '#333',        // Title text color
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            font: {
                family: 'Poppins'
            },        
            responsive: true,
                layout: {
                    padding: {
                    top: 20,
                    right: 10,
                    bottom: 10,
                    left: 10
                    },
                
                },
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                        size: 12,
                        family: 'Poppins'
                        //   style: 'italic',
                        },
                        padding: 10,
                        color: '#333',
                        boxWidth: 20,
                        usePointStyle: true
                    }
                }
            }
        } 
      }
  
      // Create the chart
      new Chart(employeesummarychart, config);
    
      //   get employee dashboard summary  
    const employeedependants=$("#dependants"),
        employeebeneficiaries=$("#beneficiaries")
   
    $.getJSON(
        "../controllers/employeeoperations.php",
        {
            getemployeedashbaordsummary:true
        },
        (data)=>{
            employeedependants.html(data[0].dependant)
            employeebeneficiaries.html(data[0].beneficiaries)
        }
    )
   
    })