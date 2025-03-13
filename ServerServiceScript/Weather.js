let isDay = false;
let isRaining = false;
let isFoggy = false;
let isWindy = false;
let currentSeason = getRandomSeason(); // Start with a random season
let rainAudio = new Audio("Sounds/rain/mixkit-rain-long-loop-2394.wav");
let thunderAudio = new Audio("Sounds/thunder/THUNDER1.wav");
let windAudio = new Audio("Sounds/wind/windy-hut-fx-64675.mp3");

let fogContainer = null;

rainAudio.loop = true;
windAudio.loop = true;

function toggleDayNight() {
    const body = document.body;
    if (isDay) {
        body.style.background = "linear-gradient(to bottom, #1a1a40, #000033)";
        showEvent("🌙 Night Time! Chances for big fish are high!");
    } else {
        body.style.background = "linear-gradient(to bottom, #87CEEB, #1E90FF)";
        showEvent("🌅 A new day! The sun has risen.");
    }
    isDay = !isDay;
}

document.body.style.transition = "background 5s ease-in-out";
setInterval(toggleDayNight, 300000);
toggleDayNight();

// **Season System (Changes every 7 days)**
function getRandomSeason() {
    const seasons = ["Spring", "Summer", "Autumn"];
    return seasons[Math.floor(Math.random() * seasons.length)];
}

function changeSeason() {
    currentSeason = getRandomSeason();
    showEvent(`🌍 The season has changed to ${currentSeason}!`);
    setTimeout(changeSeason, 7 * 24 * 60 * 60 * 1000); // Every 7 days
}

setTimeout(changeSeason, 30000); // First change (for testing)

// **Rain System (30-60s rain, then 30-60s wait)**
function startRain() {
    if (isRaining) return;
    isRaining = true;
    showEvent("🌧️ It's raining! Rare fish might appear!");
    rainAudio.play();

    let rainContainer = document.createElement("div");
    rainContainer.classList.add("rain-container");
    document.body.appendChild(rainContainer);

    for (let i = 0; i < 100; i++) {
        let drop = document.createElement("div");
        drop.classList.add("raindrop");
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        rainContainer.appendChild(drop);
    }

    setTimeout(stopRain, Math.random() * 30000 + 30000); // Rain lasts 30-60s
}

function stopRain() {
    isRaining = false;
    showEvent("☀️ The rain has stopped.");
    let rainContainer = document.querySelector(".rain-container");
    if (rainContainer) rainContainer.remove();
    rainAudio.pause();
    rainAudio.currentTime = 0;
    setTimeout(startRain, Math.random() * 30000 + 30000); // Wait 30-60s, then rain again
}

// **Fog System (Starts every 5-10 minutes)**
function startFog() {
    if (isFoggy) return;
    isFoggy = true;
    showEvent("🌫️ A thick fog covers the water! Visibility is low.");
    
    fogContainer = document.createElement("div");
    fogContainer.classList.add("fog-container");
    document.body.appendChild(fogContainer);
    
    for (let i = 0; i < 50; i++) {
        let fog = document.createElement("div");
        fog.classList.add("fog");
        fog.style.left = `${Math.random() * 100}%`;
        fog.style.animationDuration = `${Math.random() * 5 + 3}s`;
        fogContainer.appendChild(fog);
    }
    setTimeout(stopFog, Math.random() * 30000 + 30000); // Fog duration 30-60s
}

function stopFog() {
    isFoggy = false;
    showEvent("🌞 The fog has cleared.");
    if (fogContainer) fogContainer.remove();
    setTimeout(startFog, Math.random() * 300000 + 300000); // Start fog every 5-10 minutes
}

// **Wind System (Starts every 20-50 minutes)**
function startWind() {
    if (isWindy) return;
    isWindy = true;
    showEvent("💨 The wind is strong! Casting might be harder.");
    windAudio.play();

    document.body.classList.add("windy");
    setTimeout(stopWind, Math.random() * 60000 + 60000); // Wind duration 1-2 minutes
}
function updateWeatherInfo() {
    document.getElementById("timeOfDay").textContent = isDay ? "Day" : "Night";
    document.getElementById("currentSeason").textContent = currentSeason;
    
    let weather = "Clear";
    if (isRaining) weather = "Rain 🌧️";
    else if (isFoggy) weather = "Fog 🌫️";
    else if (isWindy) weather = "Wind 💨";

    document.getElementById("currentWeather").textContent = weather;
}

// Call update function whenever weather or time changes


function stopWind() {
    isWindy = false;
    showEvent("🍃 The wind has calmed down.");
    windAudio.pause();
    document.body.classList.remove("windy");
    setTimeout(startWind, Math.random() * 1200000 + 1800000); // Start wind every 20-50 minutes
}

// **Start Weather Systems**
setTimeout(startRain, Math.random() * 30000 + 30000); // First rain in 30-60s
setTimeout(startFog, Math.random() * 300000 + 300000); // First fog in 5-10 mins
setTimeout(startWind, Math.random() * 1200000 + 1800000); // First wind in 20-50 mins

// **CSS for Effects**
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
        from { transform: translateY(-100vh); }
        to { transform: translateY(100vh); }
    }

    .fog-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(200, 200, 200, 0.3);
        pointer-events: none;
    }

    .fog {
        position: absolute;
        width: 200px;
        height: 100px;
        background: rgba(200, 200, 200, 0.5);
        border-radius: 50%;
        animation: fog-move linear infinite;
    }

    @keyframes fog-move {
        from { transform: translateY(-20px); opacity: 0.8; }
        to { transform: translateY(20px); opacity: 0.4; }
    }

    .windy {
        animation: wind-blow 2s linear infinite;
    }

    @keyframes wind-blow {
        0% { transform: translateX(-3px); }
        50% { transform: translateX(3px); }
        100% { transform: translateX(-3px); }
    }
`;
document.head.appendChild(style);


setInterval(updateWeatherInfo, 1000);
updateWeatherInfo();
