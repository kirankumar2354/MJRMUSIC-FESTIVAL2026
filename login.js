
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get registered users from Local Storage
    const users = JSON.parse(localStorage.getItem("mjrUsers")) || [];

    // Check email and password
    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    const message = document.getElementById("loginMessage");

    if (user) {
        sessionStorage.setItem("mjrLoggedIn", "true");
        sessionStorage.setItem("mjrCurrentUser", JSON.stringify(user));

        message.style.color = "lightgreen";
        message.textContent = "Login successful!";

        const nextPage = new URLSearchParams(window.location.search).get("next");

        // Allow only local page navigation
        if (nextPage && /^[a-zA-Z0-9_.-]+\.html(?:\?.*)?$/.test(nextPage)) {
            window.location.href = nextPage;
        } else {
            window.location.href = "index.html";
        }

    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password!";
    }
});
