// Open modal on Login/Signup button click
document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
});

document.getElementById('signupBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
});

// Close modal when the "x" is clicked
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Switch to the Signup form
document.getElementById('switchToSignup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
});

// Switch to the Login form
document.getElementById('switchToLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Handle form submission (just logging for now)
document.getElementById('loginFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    console.log('Login details:', email, password, role);
    // Make an AJAX request to the backend here
});

document.getElementById('signupFormSubmit').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('newEmail').value;
    const password = document.getElementById('newPassword').value;
    console.log('Signup details:', email, password);
    // Make an AJAX request to the backend here
});
