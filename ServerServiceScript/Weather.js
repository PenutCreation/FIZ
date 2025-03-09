let isDay = true;

function toggleDayNight() {
    const body = document.body;

    if (isDay) {
        // Smooth transition to Night
        body.style.background = "linear-gradient(to bottom, #1a1a40, #000033)"; // Dark night sky
        showEvent("🌙 Night Time! Chances for big fish are high!");
    } else {
        // Smooth transition to Day
        body.style.background = "linear-gradient(to bottom, #87CEEB, #1E90FF)"; // Bright day sky
        showEvent("🌅 A new day! The sun has risen.");
    }

    isDay = !isDay;
}

// Apply smooth transition to body
document.body.style.transition = "background 5s ease-in-out";

// Automatically cycle every 30 seconds
setInterval(toggleDayNight, 300000);

// Start with the day
toggleDayNight();

