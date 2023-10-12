// Function to handle user login
async function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Define the API endpoint for user login
    const loginEndpoint = '/api/user/login'; // API endpoint for login

    // Construct the request body
    const requestBody = {
        username: email, // Use 'username' or 'email' based on your API requirements
        password: password,
    };
    // Send a POST request to the API for user login
    let res = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    if(res.ok){
      document.location.href = "/";
    }
}

// Function to handle user registration (sign-up)
async function registerUser() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Define the API endpoint for user registration (sign-up)
    const registrationEndpoint = '/api/user/register'; //  API endpoint for registration
    console.log('ok')
    // Construct the request body
    const requestBody = {
        username: email, // Use 'username' or 'email' based on your API requirements
        password: password,
    };

    // Send a POST request to the API for user registration (sign-up)
    let res = await fetch(registrationEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });
    if(res.ok){
      document.location.href = '/';
    } else {
      alert(res.err);
    }
}
