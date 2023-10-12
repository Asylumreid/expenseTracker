$(document).ready(async function () {
    const transactionEndpoint = '/api/transactions'; // API endpoint for login

    let response = await fetch(transactionEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    let transactionHistory = await response.json();
        let table = document.getElementById('911');

    transactionHistory.forEach((transaction) => {
        let createtr = document.createElement('tr');
        let createtd = document.createElement('td');
        let createtd2 = document.createElement('td'); 
        let createtd3 = document.createElement('td');
        let createtd4 = document.createElement('td');
        let createp = document.createElement('td');
        let createp2 = document.createElement('td');
        let createp3 = document.createElement('td');
        let createp4 = document.createElement('td');
        createtd.appendChild(createp);
        createtd2.appendChild(createp2);
        createtd3.appendChild(createp3);
        createtd4.appendChild(createp4);
        createp.innerHTML = transaction.name;
        createp2.innerHTML = transaction.date;
        createp3.innerHTML = '&#36;  ' + transaction.amount;
        if (transaction.type == 'expense') {
            createp4.innerHTML =
                '<svg class="status" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#DB2719" fill-opacity="0.3"/><circle cx="8" cy="8" r="4" fill="#DB2719"/></svg>' +
                transaction.type;
        } else {
            createp4.innerHTML =
                '<svg class="status" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="8" fill="#DBA32A" fill-opacity="0.14"/><circle cx="8" cy="8" r="4" fill="#7FB519"/></svg>' +
                transaction.type;
        }
        createtd.appendChild(createp);
        createtd2.appendChild(createp2);
        createtd3.appendChild(createp3);
        createtd4.appendChild(createp4);
        createtr.appendChild(createtd);
        createtr.appendChild(createtd2);
        createtr.appendChild(createtd3);
        createtr.appendChild(createtd4);
        table.appendChild(createtr);
    });
});