document.addEventListener("DOMContentLoaded", () => {
    let token = "";
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
    const audio = document.getElementById("bg-music");

    function playMusic() {
        audio
            .play()
            .then(() => {
                console.log("Музыка қосылды");
            })
            .catch((err) => {
                console.error("Қате:", err);
            });

        // Удаляем слушатели, чтобы не запускать повторно
        window.removeEventListener("touchstart", playMusic);
        window.removeEventListener("mousedown", playMusic);
    }

    // Для телефонов — touchstart, для компьютеров — mousedown
    window.addEventListener("touchstart", playMusic, { once: true });
    window.addEventListener("mousedown", playMusic, { once: true });
    setInterval(updateCountdown, 1000);

    const TOKEN = "6515245927:AAExFk8USVwQ2IVcwtqszfutM-hqgbfp0Dg";
    const CHAT_ID = "-4962856658"; // ← сюда вставь свой Telegram chat ID
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    document
        .getElementById("weddingForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.querySelector(".userName").value;
            const attendance = document.querySelector(
                'input[name="attendance"]:checked'
            )?.value;

            let message = `<b>🎉 Жауап тойға шақыруға:</b>\n`;
            message += `<b>👤 Аты-жөні:</b> ${name}\n`;
            message += `<b>✅ Жауабы:</b> ${attendance}`;

            axios
                .post(URI_API, {
                    chat_id: CHAT_ID,
                    parse_mode: "html",
                    text: message,
                })
                .then((res) => {
                    alert("Рахмет! Жауабыңыз қабылданды.");
                    document.getElementById("weddingForm").reset();
                })
                .catch((err) => {
                    console.error("Ошибка отправки в Telegram:", err);
                    alert("Қате пайда болды. Қайтадан көріңіз.");
                });
        });
});
