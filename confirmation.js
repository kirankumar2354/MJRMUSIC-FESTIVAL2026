
const urlParams = new URLSearchParams(window.location.search);
const bookingId = urlParams.get("id");

// Get all saved bookings
const bookings = JSON.parse(localStorage.getItem("mjrBookings")) || [];

// Find the selected booking
const booking = bookings.find(function(item) {
    return item.bookingId === bookingId;
});

if (!booking) {
    document.querySelector(".confirmation-container").innerHTML =
        "<h2>Booking Not Found</h2><p>Please check your booking details.</p><a href='index.html'>Back to Home</a>";
} else {

    document.getElementById("bookingId").textContent = booking.bookingId;
    document.getElementById("customerName").textContent = booking.name;
    document.getElementById("customerEmail").textContent = booking.email;

    document.getElementById("ticketType").textContent =
        booking.ticketType === "early" ? "Early Bird" : "Standard";

    document.getElementById("quantity").textContent = booking.quantity;
    document.getElementById("total").textContent = booking.total;
    document.getElementById("bookingDate").textContent = booking.bookingDate;

    // Generate QR Code
    if (typeof QRCode !== "undefined") {
        new QRCode(document.getElementById("qrcode"), {
            text: "MJR Festival Booking ID: " + booking.bookingId,
            width: 180,
            height: 180
        });
    } else {
        document.getElementById("qrcode").textContent =
            "QR code library could not load. Please check your internet connection.";
    }
}
