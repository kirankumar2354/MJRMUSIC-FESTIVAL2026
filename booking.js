
// Check whether the user is logged in
const loggedIn = sessionStorage.getItem("mjrLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html?next=booking.html";
}

// Ticket prices
const prices = {
    early: 999,
    standard: 1499
};

const ticketType = document.getElementById("ticketType");
const quantity = document.getElementById("quantity");
const totalAmount = document.getElementById("totalAmount");

// Get selected ticket type from URL
const urlParams = new URLSearchParams(window.location.search);
const selectedType = urlParams.get("type");

if (selectedType === "early" || selectedType === "standard") {
    ticketType.value = selectedType;
}

// Calculate total price
function calculateTotal() {
    const price = prices[ticketType.value];
    const count = Number(quantity.value);

    totalAmount.textContent = price * count;
}

ticketType.addEventListener("change", calculateTotal);
quantity.addEventListener("input", calculateTotal);

calculateTotal();

// Fill customer details from login
const currentUser = JSON.parse(
    sessionStorage.getItem("mjrCurrentUser") || "null"
);

if (currentUser) {
    document.getElementById("customerName").value = currentUser.name;
    document.getElementById("customerEmail").value = currentUser.email;
}

// Confirm booking
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const count = Number(quantity.value);

    if (!Number.isInteger(count) || count < 1 || count > 10) {
        alert("Please select between 1 and 10 tickets.");
        return;
    }

    const booking = {
        bookingId: "MJR" + Date.now(),
        name: document.getElementById("customerName").value,
        email: document.getElementById("customerEmail").value,
        ticketType: ticketType.value,
        quantity: count,
        total: prices[ticketType.value] * count,
        bookingDate: new Date().toLocaleString()
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem("mjrBookings")) || [];

    bookings.push(booking);

    localStorage.setItem("mjrBookings", JSON.stringify(bookings));

    // Go to confirmation page
    window.location.href = "confirmation.html?id=" + booking.bookingId;
});
