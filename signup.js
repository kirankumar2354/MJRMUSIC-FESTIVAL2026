
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("signupMessage");

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("mjrUsers")) || [];

    // Check whether email already exists
    const existingUser = users.find(function(item) {
        return item.email === email;
    });

    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Email already registered!";
        return;
    }

    // Create new user
    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    users.push(newUser);

    // Save user details
    localStorage.setItem("mjrUsers", JSON.stringify(users));

    message.style.color = "lightgreen";
    message.textContent = "Account created successfully!";

    signupForm.reset();

    setTimeout(function() {
        window.location.href = "login.html";
    }, 1500);
});
