document.addEventListener("DOMContentLoaded", () => {
    const backendURL = "https://foodiehub-backend-j0kb.onrender.com";

    function showMessage(message) {
        let modal = document.createElement("div");
        modal.classList.add("custom-modal");
        modal.innerHTML = `
            <div class="custom-modal-content">
                <p>${message}</p>
                <button id="closeModal">OK</button>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById("closeModal").addEventListener("click", () => modal.remove());
    }

    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    // ==============================
    // ORDER PAGE
    // ==============================
    const orderForm = document.querySelector(".order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const phone = document.getElementById("phone").value.trim();
            if (!isValidPhone(phone)) return showMessage("Please enter a valid 10-digit phone number.");

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone,
                items: document.getElementById("items").value,
                address: document.getElementById("address").value,
            };

            try {
                const res = await fetch(`${backendURL}/api/orders`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.success) showMessage(result.message);
                else showMessage("Error: " + result.message);

                orderForm.reset();
            } catch {
                showMessage("⚠️ Server error, please try again later.");
            }
        });
    }

    // ==============================
    // PAYMENT PAGE
    // ==============================
    const paymentBtn = document.getElementById("paymentBtn");
    if (paymentBtn) {
        paymentBtn.addEventListener("click", async () => {
            const data = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                method: document.querySelector("input[name='method']:checked")?.value || "Unknown",
            };

            try {
                const res = await fetch(`${backendURL}/api/payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.success) showMessage(result.message);
                else showMessage("Error: " + result.message);
            } catch {
                showMessage("⚠️ Payment failed, please try again.");
            }
        });
    }

    // ==============================
    // RESERVATION PAGE
    // ==============================
    const reservationForm = document.querySelector(".reservation-form");
    if (reservationForm) {
        reservationForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const phone = document.getElementById("phone").value.trim();
            if (!isValidPhone(phone)) return showMessage("Please enter a valid 10-digit phone number.");

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value,
                guests: document.getElementById("guests").value,
            };

            try {
                const res = await fetch(`${backendURL}/api/reservation`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.success) showMessage(result.message);
                else showMessage("Error: " + result.message);

                reservationForm.reset();
            } catch {
                showMessage("⚠️ Unable to book table, please try again later.");
            }
        });
    }

    // ==============================
    // CONTACT PAGE
    // ==============================
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value,
                rating: document.getElementById("rating")?.value || 5,
            };

            try {
                const res = await fetch(`${backendURL}/api/contacts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                const result = await res.json();
                if (result.success) showMessage(result.message);
                else showMessage("Error: " + result.message);

                contactForm.reset();
            } catch {
                showMessage("⚠️ Server error, please try again later.");
            }
        });
    }
});