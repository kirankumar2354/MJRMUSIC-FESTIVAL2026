
// Buy Ticket button
const buyButton = document.getElementById("buyTicketBtn");

buyButton.addEventListener("click", function () {

    const user = sessionStorage.getItem("mjrLoggedIn");

    if (user === "true") {
        window.location.href = "booking.html";
    } else {
        window.location.href = "login.html?next=booking.html";
    }

});


// Check ticket links
const ticketLinks = document.querySelectorAll(
    ".price_card a"
);

ticketLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const user = sessionStorage.getItem("mjrLoggedIn");

        if (user === "true") {
            window.location.href = link.getAttribute("href");
        } else {
            const nextPage = link.getAttribute("href");

            window.location.href =
                "login.html?next=" + encodeURIComponent(nextPage);
        }

    });

});
