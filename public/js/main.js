(function ($) {
    'use strict';

    var fullHeight = function () {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
})(jQuery);

let income = 0;
let expense = 0;
async function getTransaction() {
    const transactionEndpoint = '/api/transactions'; // API endpoint for login

    let response = await fetch(transactionEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let transactionHistory = await response.json();
    transactionHistory.forEach((transaction) => {
        if (transaction.type === '1') {
            expense += transaction.amount;
        } else {
            income += transaction.amount;
        }
        // return expense, income;
    });
    var incomeElement = document.getElementById('income');
    var expenseElement = document.getElementById('expense');
    var balanceElement = document.getElementById('balance');

    incomeElement.innerHTML = incomeElement.innerHTML + income;
    expenseElement.innerHTML = expenseElement.innerHTML + expense;
    balanceElement.innerHTML =
        incomeElement.innerHTML - expenseElement.innerHTML;

    // console.log(income);
}
getTransaction();

function getPreviousMonthNames(numOfMonths) {
    const monthNames = [];
    const currentDate = new Date();
    for (let i = 0; i < numOfMonths; i++) {
        const previousMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i - 1,
            1
        );
        const monthName = previousMonth.toLocaleString('default', {
            month: 'long',
        });
        monthNames.push(monthName);
    }
    // console.log(monthNames);
    return monthNames;
}

document.getElementById('greeting').innerHTML =
    " <i class='fa fa-user'></i> Welcome!";
// Add innerHTML to the income and expense elements which have 'badge' class
const elements = document.getElementsByClassName('badge');
for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML =
        '<span> ' +
        new Date().toLocaleString('default', { month: 'long' }) +
        '</span>';
}

google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawPieChart);
function drawChart() {
    // Retrieve the monthly data from local storage
    const months = getPreviousMonthNames(new Date().getMonth());
    const monthlyData = {};
    months.forEach((month) => {
        const existingData = JSON.parse(localStorage.getItem(month));
        monthlyData[month] = existingData;
    });
    // console.log(monthlyData);
    // console.log(months);
    // Prepare the chart data array
    const chartData = [['Month', 'Expense', 'Income']];
    months.forEach((month) => {
        const expense = monthlyData[month].expense;
        const income = monthlyData[month].income;
        chartData.push([month, expense, income]);
    });
    var data = google.visualization.arrayToDataTable(chartData);
    var options = {
        title: 'Expenses and Income',
        curveType: 'function',
        legend: { position: 'bottom' },
    };
    var chart = new google.visualization.LineChart(
        document.getElementById('curve_chart')
    );
    chart.draw(data, options);
}
function drawPieChart() {
    var data = new google.visualization.DataTable();
    let incomePercentage;
    let expensePercentage;
    if (income !== 0 && expense !== 0){
        incomePercentage = (income / (income + expense)) * 100;
        expensePercentage = (expense / (income + expense)) * 100;
    } 
    if(income === 0 ) {
        incomePercentage = 0;
        expensePercentage = 1;
    } else {
        incomePercentage = 1;
        expensePercentage = 0;
    }
    
    console.log(expensePercentage)
    data.addColumn('string', 'Money');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['Expense', expensePercentage],
        ['Income', incomePercentage],
    ]);

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(
        document.getElementById('curve_chart')
    );
    chart.draw(data, null);
}
