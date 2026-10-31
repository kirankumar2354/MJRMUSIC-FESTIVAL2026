
const loggedIn = sessionStorage.getItem("mjrLoggedIn");

if (loggedIn !== "true") {
    window.location.href = "login.html";
} else {

    const currentUser = JSON.parse(
        sessionStorage.getItem("mjrCurrentUser") || "null"
    );

    if (!currentUser) {
        window.location.href = "login.html";
    } else {

        document.getElementById("userName").textContent =
            currentUser.name;

        // Get all bookings
        const bookings = JSON.parse(
            localStorage.getItem("mjrBookings")
        ) || [];

        // Show only current user's bookings
        const myBookings = bookings.filter(function(item) {
            return item.email === currentUser.email;
        });

        const bookingList = document.getElementById("bookingList");

        if (myBookings.length === 0) {

            bookingList.innerHTML =
                '<div class="empty"><h3>No bookings found!</h3><p>You have not booked any tickets yet.</p></div>';

        } else {

            myBookings.forEach(function(booking) {

                const card = document.createElement("div");
                card.className = "booking-card";

                const ticketName =
                    booking.ticketType === "early"
                    ? "Early Bird"
                    : "Standard";

                card.innerHTML = `
                    <h3>MJR Music Festival 2026</h3>
                    <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
                    <p><strong>Ticket:</strong> ${ticketName}</p>
                    <p><strong>Quantity:</strong> ${booking.quantity}</p>
                    <p><strong>Total Amount:</strong> ₹${booking.total}</p>
                    <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
                    <a href="confirmation.html?id=${encodeURIComponent(booking.bookingId)}"
                       class="view-btn">View Ticket</a>
                `;

                bookingList.appendChild(card);

            });
        }
    }
}
