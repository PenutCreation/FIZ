let isDay = true;
let isRaining = false;
let rainAudio = new Audio("Sounds/rain/mixkit-rain-long-loop-2394.wav"); // Replace with your rain sound file
let thunderAudio = new Audio("Sounds/thunder/THUNDER1.wav"); // Replace with your thunder sound file

rainAudio.loop = true; // Make rain sound loop

function toggleDayNight() {
    const body = document.body;

    if (isDay) {
        body.style.background = "linear-gradient(to bottom, #1a1a40, #000033)"; // Dark night sky
        showEvent("🌙 Night Time! Chances for big fish are high!");
    } else {
        body.style.background = "linear-gradient(to bottom, #87CEEB, #1E90FF)"; // Bright day sky
        showEvent("🌅 A new day! The sun has risen.");
    }

    isDay = !isDay;
}

document.body.style.transition = "background 5s ease-in-out";
setInterval(toggleDayNight, 300000);
toggleDayNight();

// Rain System
function startRain() {
    if (isRaining) return; // Prevent multiple rain instances

    isRaining = true;
    showEvent("🌧️ It's raining! Rare fish might appear!");

    // Play rain sound
    rainAudio.play();

    const rainContainer = document.createElement("div");
    rainContainer.classList.add("rain-container");
    document.body.appendChild(rainContainer);

    for (let i = 0; i < 100; i++) {
        let drop = document.createElement("div");
        drop.classList.add("raindrop");
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        rainContainer.appendChild(drop);
    }

    // Random thunder sounds every 5-25 seconds
    function playThunder() {
        if (!isRaining) return; // Stop thunder if rain ends
        thunderAudio.currentTime = 0; // Reset sound
        thunderAudio.play();
        setTimeout(playThunder, Math.random() * 20000 + 5000); // Schedule next thunder
    }
    setTimeout(playThunder, Math.random() * 20000 + 5000);

    // Stop rain after 1-2 minutes
    setTimeout(stopRain, Math.random() * 60000 + 60000);
}

function stopRain() {
    isRaining = false;
    showEvent("☀️ The rain has stopped.");

    const rainContainer = document.querySelector(".rain-container");
    if (rainContainer) rainContainer.remove();

    // Stop rain sound
    rainAudio.pause();
    rainAudio.currentTime = 0; // Reset audio

    // Schedule next rain at a random interval (30-90 seconds)
    setTimeout(startRain, Math.random() * 60000 + 30000);
}

setTimeout(startRain, Math.random() * 60000 + 30000);

// CSS Styles
const style = document.createElement("style");
style.textContent = `
    .rain-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }

    .raindrop {
        position: absolute;
        width: 2px;
        height: 15px;
        background: blue;
        animation: fall linear infinite;
    }

    @keyframes fall {
        from {
            transform: translateY(-100vh);
        }
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);
