document.addEventListener('DOMContentLoaded', () => {
    const dailyPrayerText = document.getElementById('daily-prayer-text');

    if (dailyPrayerText) {
        const prayers = [
            "Señor, que en este día tu luz ilumine cada uno de mis pasos y decisiones. Amén.",
            "Dios de misericordia, te pido fortaleza para enfrentar los desafíos de hoy con fe y esperanza.",
            "Padre celestial, gracias por el don de la vida. Ayúdame a vivir este día para tu gloria.",
            "Espíritu Santo, inspírame para ser un instrumento de tu paz y amor en el mundo.",
            "Señor Jesús, te entrego mis preocupaciones y te pido que me guíes por el camino de la serenidad.",
            "Gracias, Señor, por tu amor incondicional. Que nunca olvide que siempre estás a mi lado.",
            "Te pido, Señor, por mi familia y amigos. Protégelos y bendícelos siempre.",
            // Añade más oraciones aquí para tener una mayor variedad
            "Que la fe sea el motor que impulse mis acciones y la esperanza la luz que guíe mi camino.",
            "Señor, enséñame a perdonar como Tú perdonas y a amar como Tú amas.",
            "En tus manos, Señor, pongo este día. Que se haga tu voluntad y no la mía."
        ];

        const getDayOfYear = () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 0);
            const diff = now - start;
            const oneDay = 1000 * 60 * 60 * 24;
            return Math.floor(diff / oneDay);
        };

        const dayOfYear = getDayOfYear();
        const prayerIndex = dayOfYear % prayers.length;

        dailyPrayerText.textContent = prayers[prayerIndex];
    }
});
