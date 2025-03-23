function registerUser() {
    let username = document.getElementById("register-username").value.trim();
    let email = document.getElementById("register-email").value.trim();
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById("register-confirm-password").value;
    let errorMsg = document.getElementById("register-error");

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (!username || !email || !password || !confirmPassword) {
        errorMsg.textContent = "⚠️ All fields are required.";
        console.log("Error: Missing fields");
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "❌ Passwords do not match.";
        console.log("Error: Passwords do not match");
        return;
    }

    // Retrieve stored users or initialize empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate username
    let userExists = users.some(user => user.username === username);

    if (userExists) {
        errorMsg.textContent = "🚫 Username already exists. Choose a different one.";
        console.log("Error: Duplicate username");
        return;
    }

    // Store the new user
    let newUser = {
        username: username,
        email: email,
        password: btoa(password)  // Encrypt the password before storing
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    console.log("New user registered:", newUser);

    alert("✅ Registration successful! You can now log in.");
    window.location.href = "login.html";  // Redirect to login page
}

let loginBtn = document.getElementById("login-btn");
let errorMsg = document.getElementById("login-error");

// Store the original button position
let originalX = 0;
let originalY = 0;

window.addEventListener("load", () => {
    let rect = loginBtn.getBoundingClientRect();
    originalX = rect.left;
    originalY = rect.top;

    // Add event listeners for real-time field validation
    document.getElementById("login-username").addEventListener("input", checkFields);
    document.getElementById("login-password").addEventListener("input", checkFields);
});

// Emoji messages 🎯
let messages = [
    "fuck you",   
    "mag buhat pata sa project",   
    "fill up the form daw",     
    
];

function validateLogin() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    errorMsg.textContent = "";

    if (!username || !password) {
        dodgeButton();  // Trigger dodge effect when fields are empty
        let randomIcon = messages[Math.floor(Math.random() * messages.length)];
        errorMsg.textContent = randomIcon;  
        return;
    }

    // Check if the username and password are correct
    let validUser = users.find(user => 
        user.username === username && atob(user.password) === password
    );

    if (validUser) {
        alert("🚀 Login successful!");
        window.location.href = "dashboard.html";
    } else {
        errorMsg.textContent = "❌ Invalid username or password.";
    }
}

// Dodge Button Function
function dodgeButton() {
    let randomX = Math.random() * 300 - 150; // Move between -150px and 150px
    let randomY = Math.random() * 200 - 100; // Move between -100px and 100px

    loginBtn.style.position = "relative";
    loginBtn.style.transition = "0.3s ease-out";
    loginBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Reset Button to Original Position
function resetButtonPosition() {
    loginBtn.style.transition = "0.3s ease-out";
    loginBtn.style.transform = `translate(0, 0)`;  // Return to original position
}

// Check fields and dodge if empty
function checkFields() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value;

    if (username && password) {
        resetButtonPosition();  // Reset when both fields are filled
    } else {
        dodgeButton();  // Dodge while fields are empty
    }
}




