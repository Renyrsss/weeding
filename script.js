// script.js
function updateCountdown() {
    const weddingDate = new Date("2025-07-05T00:00:00");
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById("countdown").textContent =
            "Свадьба уже состоялась!";
        return;
    }

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("weeks").textContent = weeks;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
