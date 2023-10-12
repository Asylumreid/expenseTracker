$(document).ready(async function () {
    // Retrieve existing transaction data from local storage
    // var transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // // Function to save transaction data to local storage
    // function saveTransaction(transaction) {
    //     transactions.push(transaction);
    //     localStorage.setItem('transactions', JSON.stringify(transactions));
    // }

    // // Function to retrieve all transaction data from local storage and update the history page
    // function updateHistoryPage() {
    //     var historyData =
    //         JSON.parse(localStorage.getItem('transactions')) || [];

    //     var historyContainer = $('#historyContainer');
    //     historyContainer.empty();

    //     if (historyData.length === 0) {
    //         historyContainer.append('<p>No transactions recorded.</p>');
    //     } else {
    //         var historyList = $('<ul class="list-group"></ul>');
    //         historyData.forEach(function (transaction) {
    //             var listItem = $('<li class="list-group-item"></li>');
    //             listItem.text(
    //                 transaction.name +
    //                     ' - ' +
    //                     transaction.type +
    //                     ' - ' +
    //                     transaction.category +
    //                     ' - ' +
    //                     transaction.date +
    //                     ' - ' +
    //                     transaction.amount
    //             );
    //             historyList.append(listItem);
    //         });
    //         historyContainer.append(historyList);
    //     }
    // }

    // Submit form event
    const transactionEndpoint = '/api/transactions'; // API endpoint for login

    $('#transactionForm').submit(async function (event) {
        
        event.preventDefault();

        // Get form values
        var transactionName = $('#transactionName').val();
        var transactionType = $("input[name='transactionType']:checked").val();
        var transactionCategory = $('#transactionCategory').val();
        var transactionDate = $('#transactionDate').val();
        var transactionAmount = $('#transactionAmount').val();
        alert(transactionType);
        // Create transaction object
        var transaction = {
            name: transactionName,
            transactionType: transactionType,
            category: transactionCategory,
            date: transactionDate,
            amount: transactionAmount,
        };
        let response = await fetch(transactionEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });
        if(response.ok){
            document.location.href = '/history';
        }
    });

    // Show appropriate category options based on selected transaction type
    $('input[name="transactionType"]').change(function () {
        if (this.value === 'expense') {
            $('#expenseOptions').show();
            $('#incomeOptions').hide();
        } else if (this.value === 'income') {
            $('#expenseOptions').hide();
            $('#incomeOptions').show();
        }
    });

    // Initialize the toast
    $('.toast').toast({
        autohide: false,
    });

    // Update history page on initial load
    // updateHistoryPage();
});
