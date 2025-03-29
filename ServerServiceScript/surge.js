const events = {
    "Mutation Surge": { 
        effect: "doubleMutation", 
        duration: 1800, // 30 minutes
        stage: 1, // Starts at Stage 1
        maxStage: 5 // Can increase up to Stage 5
    },
    "Shiny Surge": { 
        effect: "doubleShiny", 
        duration: 1800 
    },
    "Lucky Surge": { 
        effect: "doubleRare", 
        duration: 1800 
    },
    "Night of the Fireflies": { 
        effect: "doubleMutation", 
        duration: 3600 // 1 hour
    },
    "Night of the Luminous": { 
        effect: "increaseSparkling", 
        duration: 3600 
    },
    "Moonlit Mirage": { 
        effect: "moonlitBonus", 
        duration: "night" // Lasts until morning
    }
};

let activeEvent = null;

function startRandomEvent() {
    let eventNames = Object.keys(events);
    let randomEvent = eventNames[Math.floor(Math.random() * eventNames.length)];
    let eventData = events[randomEvent];

    activeEvent = {
        name: randomEvent,
        effect: eventData.effect,
        expiresAt: Date.now() + (eventData.duration * 1000)
    };

    if (eventData.stage) {
        activeEvent.stage = eventData.stage;
        activeEvent.maxStage = eventData.maxStage;
    }

    localStorage.setItem("activeEvent", JSON.stringify(activeEvent));
    ShowEvent(`🔥 **${randomEvent} Started!** ${getEventMessage(activeEvent)}`);

    setTimeout(() => {
        endEvent();
    }, eventData.duration * 1000);
}

function endEvent() {
    if (activeEvent) {
        ShowEvent(`⚠️ **${activeEvent.name} has ended!**`);
        activeEvent = null;
        localStorage.removeItem("activeEvent");
    }
}

function checkEventExpiration() {
    let storedEvent = JSON.parse(localStorage.getItem("activeEvent"));
    if (storedEvent && Date.now() >= storedEvent.expiresAt) {
        endEvent();
    } else {
        activeEvent = storedEvent;
    }
}

function applyEventEffects(fish) {
    if (!activeEvent) return fish; // No active event

    switch (activeEvent.effect) {
        case "doubleMutation":
            fish.mutationRate *= 2;
            break;
        case "doubleShiny":
            fish.shinyChance *= 2;
            break;
        case "doubleRare":
            fish.rarityBoost *= 2;
            break;
        case "increaseSparkling":
            fish.sparklingChance += 10; // Increases by 10%
            break;
        case "moonlitBonus":
            if (fish.hasMutation) {
                giveMoonlitBonus();
            }
            break;
    }

    return fish;
}

function giveMoonlitBonus() {
    console.log("🌕 You gained a Moonlit Bonus until morning!");
}

function getEventMessage(event) {
    switch (event.effect) {
        case "doubleMutation": return "Mutation rates are doubled!";
        case "doubleShiny": return "Shiny catch rates are doubled!";
        case "doubleRare": return "Rare fish appear more often!";
        case "increaseSparkling": return "Sparkling catch rates increased!";
        case "moonlitBonus": return "Catch a mutated fish to gain a Moonlit Bonus!";
        default: return "";
    }
}

function ShowEvent(message) {
    alert(message);
}

// Start a new event every 2 hours
setInterval(() => {
    if (!activeEvent) {
        startRandomEvent();
    }
}, 7200000); // 2 hours

// Check for expired events on page load
checkEventExpiration();
