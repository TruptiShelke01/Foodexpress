document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    const signupFormSubmit = document.getElementById('signupFormSubmit');

    // Show login modal
    loginBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
    });

    // Show signup modal
    signupBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.getElementById('signupForm').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Switch to signup form
    switchToSignup.addEventListener('click', function() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
    });

    // Switch to login form
    switchToLogin.addEventListener('click', function() {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Handle Login Form Submission
    loginFormSubmit.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        // Here you would typically send the login data to a server
        console.log(`Logging in as ${role}:`, email, password);

        // Redirect or change views based on role
        if (role === 'customer') {
            window.location.href = 'customer_dashboard.html'; // Example
        } else if (role === 'restaurantOwner') {
            window.location.href = 'restaurant_dashboard.html'; // Example
        }
    });

    // Handle Signup Form Submission
    signupFormSubmit.addEventListener('submit', function(e) {
        e.preventDefault();
        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;

        // Here you would typically send the signup data to a server
        console.log('Signing up as Customer:', newEmail, newPassword);
        
        // Redirect or change views after successful signup
        window.location.href = 'customer_dashboard.html'; // Example
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const menuSection = document.getElementById('menuSection');
    const recipeContainer = document.getElementById('recipeContainer');

    const recipes = [
        { name: 'Pizza', description: 'Delicious cheese and pepperoni pizza.', price: '$12.99', imgSrc: 'pizza.jpg' },
        { name: 'Burger', description: 'Classic beef burger with all the toppings.', price: '$8.99', imgSrc: 'burger.jpg' },
        { name: 'Pasta', description: 'Creamy Alfredo pasta with chicken.', price: '$10.99', imgSrc: 'pasta.jpg' },
        // Add more recipes here
    ];

    // Show the menu when the "Menu" button is clicked
    menuBtn.addEventListener('click', function() {
        menuSection.style.display = 'block'; // Show the menu section
        recipeContainer.innerHTML = ''; // Clear any existing recipes

        // Dynamically load recipes into the menu
        recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');
            recipeItem.innerHTML = `
                <img src="${recipe.imgSrc}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <p>${recipe.price}</p>
                <button>Add to Cart</button>
            `;
            recipeContainer.appendChild(recipeItem);
        });
    });
});
