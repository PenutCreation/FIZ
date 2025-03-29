let abundanceEvents = {
    "AmberJack": { active: false, minDuration: 1200000, maxDuration: 1800000, minCooldown: 120000, maxCooldown: 300000, spawnRate: 0.95 },
    "BullShark": { active: false, minDuration: 1200000, maxDuration: 1800000, minCooldown: 180000, maxCooldown: 400000, spawnRate: 0.85 },
    "Halibut": { active: false, minDuration: 900000, maxDuration: 1500000, minCooldown: 150000, maxCooldown: 350000, spawnRate: 0.9 }
    "Tunas": { active: false, minDuration: 900000, maxDuration: 1500000, minCooldown: 150000, maxCooldown: 350000, spawnRate: 0.9 }
};

// Function to get a random time within a range
function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start a random abundance event
function startRandomAbundance() {
    console.log("Checking for available events...");
    
    let availableEvents = Object.keys(abundanceEvents).filter(fishName => !abundanceEvents[fishName].active);
    if (availableEvents.length === 0) {
        console.log("No available events.");
        return;
    }

    let randomFish = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    console.log(`Starting event for: ${randomFish}`);
    startAbundance(randomFish);
}

// Function to start an abundance event
function startAbundance(fishName) {
    if (!abundanceEvents[fishName]) return console.log(`Event data not found for ${fishName}`);

    let event = abundanceEvents[fishName];
    event.active = true;

    let eventElement = document.getElementById(fishName + "s");  // Ensure ID matches
    if (!eventElement) {
        console.error(`❌ ERROR: Element ID '${fishName}s' not found in HTML`);
        return;
    }

    eventElement.style.display = "block";
    console.log(`🔥 ${fishName} Abundance Started!`);
    showEvent(`🐟 ${fishName} Abundance Spotted`);

    let duration = getRandomTime(event.minDuration, event.maxDuration);
    
    setTimeout(() => endAbundance(fishName), duration);
}

// Function to end an abundance event
function endAbundance(fishName) {
    if (!abundanceEvents[fishName]) return console.log(`Event data not found for ${fishName}`);

    let event = abundanceEvents[fishName];
    event.active = false;

    let eventElement = document.getElementById(fishName + "s");  // Ensure ID matches
    if (!eventElement) {
        console.error(`❌ ERROR: Element ID '${fishName}s' not found in HTML`);
        return;
    }

    eventElement.style.display = "none";
    console.log(`❌ ${fishName} Abundance Ended`);
    ShowEvent(`❌ ${fishName} Abundance Ended`);

    let cooldown = getRandomTime(event.minCooldown, event.maxCooldown);

    // Schedule next random event after cooldown
    setTimeout(startRandomAbundance, cooldown);
}

// Start first random event after a delay
setTimeout(startRandomAbundance, getRandomTime(30000, 90000));

// Manually start AmberJack abundance for testing

