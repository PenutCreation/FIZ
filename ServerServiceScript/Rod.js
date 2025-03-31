const rods = [
  { name: "Wooden Rod", price: 0, lucky: 1, power: 3, resilience: 0, lureSpeed: 25, passive: "None", limited: false, available: true },
  { name: "Steel Rod", price: 1000, lucky: 2, power: 3, resilience: 10, lureSpeed: 24, passive: "None", limited: false, available: true },
  { name: "Lews Rod", price: 1000, lucky: 2, power: 3, resilience: 12, lureSpeed: 24, passive: "None", limited: false, available: true },
  { name: "Steady Rod", price: 1000, lucky: 2, power: 3, resilience: 50, lureSpeed: 24, passive: "None", limited: false, available: true },
  { name: "Carbon Rod", price: 1500, lucky: 3, power: 9, resilience: 15, lureSpeed: 23, passive: "None", limited: false, available: true },
  { name: "Lucky Rod", price: 2000, lucky: 5, power: 5, resilience: 20, lureSpeed: 22, passive: "None", limited: false, available: true },
  { name: "Plant Rod", price: 2500, lucky: 6, power: 6, resilience: 25, lureSpeed: 21, passive: "None", limited: false, available: true },
  { name: "Dark Rod", price: 3100, lucky: 7, power: 7, resilience: 30, lureSpeed: 20, passive: "None", limited: false, available: true },
  { name: "Kimber Rod", price: 5000, lucky: 10, power: 8, resilience: 35, lureSpeed: 19, passive: "None", limited: false, available: true },
  { name: "Lost Rod", price: 2000, lucky: 170, power: 13, resilience: 20, lureSpeed: 19, passive: "None", limited: false, available: true },
  { name: "Zehim Rod", price: 9000, lucky: 90, power: 12, resilience: 5, lureSpeed: 19, passive: "Electric Mutation", limited: false, available: true },
  { name: "Rock Rod", price: 20000, lucky: -1, power: 15, resilience: 35, lureSpeed: 19, passive: "3x Chance Mutations", limited: false, available: true },
  { name: "🦑Squid‘s Fang Rod", price: 50000, lucky: 120, power: 14, resilience: 400, lureSpeed: 19, passive: "Per 10 Catches Double Power", limited: false, available: true },
  { name: "ProsTem Rod", price: 65000, lucky: 23, power: 13, resilience: 60, lureSpeed: 19, passive: "2x Exp Per Mythical", limited: false, available: true },
  { name: "Darkness Rod", price: 6000, lucky: 10, power: 11, resilience: 0, lureSpeed: 19, passive: "2x Exp Per Mythical", limited: false, available: true },
  { name: "▪️Zero Rod", price: 500000, lucky: 100, power: 13, resilience: 10,
  lureSpeed: 19, passive: "Mutation Chances Improvement", limited: false,
  available: true },
  { name: "☠️Skull Rod", price: 59000, lucky: 250, power: 14, resilience: 10,
  lureSpeed: 19, passive: "Mutation Chances Improvement", limited: false,
  available: true },
  { name: "🪙Treasure Rod", price: 700000, lucky: 180, power: 16, resilience: 200,
  lureSpeed: 19, passive: "Double Cash", limited: false,
  available: true },
  { name: "🦈Great White‘s Fang Rod🎣", price: 1600000, lucky: 300, power: 14,  resilience: 253,
  lureSpeed: 19, passive: "2.5x Rate Meg Chance", limited: false,
  available: true },
{ name: "Trident", price: 4400000, lucky: 150, power: 14, resilience: 750,  
  lureSpeed: 12, passive: "50+ Resilience Per 5 seconds", limited: false,  
  available: true },
  { name: "Meg Master Rod", price: 5000000000, lucky: 500, power: 21, resilience:
  1000, lureSpeed: 9, passive: "Plus Power Meg Catching", limited: false,
  available: true },
  { name: "💎Crystalized Rod", price: 160000000, lucky: 600, power: 14,  resilience:
  0,  lureSpeed: 19, passive: "💎Crystalized Mutations Per 100 Catch", limited: true,
  available: true },
{ name: "🛠️Cybernetic Rod[2025]", price: 15000000, lucky: 200, power: 22, resilience: 850,  
  lureSpeed: 10, passive: "Cyber Mutation (Every 50 Catches)", limited: true,
  available: false },
  { name: "(🌻)Season‘s Rod [2025]", price: 50999999, lucky: 300, power: 15, resilience:
  600, lureSpeed: 9, passive: "5x Amber Mutation Rate", limited: true,
  available: false },
  { name: "(💫)Lily Heavens Luck Rod[2025]", price: 700000000, lucky: 9000,
  power: 15, resilience:
  600, lureSpeed: 9, passive: "5x Giant Mutation Rate", limited: true,
  available: false },
  { name: "Pickle Rick Rod", price: 2514199109, lucky: 300, power: 15, resilience:
  600, lureSpeed: 9, passive: "Pickle Rick!", limited: false,
  available: false }
];

// Ensure players start with the Wooden Rod
let ownedRods = JSON.parse(localStorage.getItem("ownedRods")) || ["Wooden Rod"];
localStorage.setItem("ownedRods", JSON.stringify(ownedRods));

// Load selected rod from storage or default to Wooden Rod
let selectedRod = JSON.parse(localStorage.getItem("selectedRod")) || rods[0];
localStorage.setItem("selectedRod", JSON.stringify(selectedRod));

window.onload = function () {
  const openShopBtn = document.getElementById("openShop");
  const closeShopBtn = document.getElementById("closeShop");
  const shopPopup = document.getElementById("shopPopup");
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");
  const closeAlertBtn = document.getElementById("closeAlert");
  const rodSelect = document.getElementById("rodSelect");

  if (openShopBtn) {
      openShopBtn.addEventListener("click", () => {
          shopPopup.style.display = "block";
      });
  }
  if (closeShopBtn) {
      closeShopBtn.addEventListener("click", () => {
          shopPopup.style.display = "none";
      });
  }
  if (closeAlertBtn) {
      closeAlertBtn.addEventListener("click", () => {
          alertBox.style.display = "none";
      });
  }

  updateRodDropdown();
  createShopItems();
};

// Create the shop items in the shop window
function createShopItems() {
    let shopContainer = document.getElementById("shopItems");
    shopContainer.innerHTML = ""; // Clear previous shop items

    // Filter rods to exclude unavailable ones
    let availableRods = rods.filter(rod => rod.available);

    availableRods.forEach(rod => {
        let rodDiv = document.createElement("div");
        rodDiv.classList.add("shop-item");

        // Show (LIMITED) if the rod is limited
        let limitedTag = rod.limited ? `<span style="color: red; font-weight: bold;">(LIMITED)</span>` : "";

        rodDiv.innerHTML = `
            <h3>${rod.name} ${limitedTag}</h3>
            <p><b>Lucky:</b> ${rod.lucky}</p>
            <p><b>Resilience:</b> ${rod.resilience}</p>
            <p><b>Power:</b> ${rod.power}</p>
            <p><b>Price:</b> $${rod.price}</p>
            <p><b>Passive:</b> ${rod.passive}</p>
            <button onclick="buyRod('${rod.name}', ${rod.price})">Buy</button>
        `;
        shopContainer.appendChild(rodDiv);
    });
}



// Handle rod purchases
function buyRod(rodName, price) {
    let cash = parseFloat(localStorage.getItem("cash")) || 0; // Load cash from storage
    let ownedRods = JSON.parse(localStorage.getItem("ownedRods")) || ["Wooden Rod"];

    if (ownedRods.includes(rodName)) {
        showAlert(`❌ You already own the ${rodName}!`);
        return;
    }

    let rod = rods.find(r => r.name === rodName);
    if (!rod || !rod.available) {
        showAlert("❌ This rod is no longer available!");
        return;
    }

    if (cash >= price) {
        cash -= price; // Subtract price
        localStorage.setItem("cash", cash.toFixed(2)); // Save updated cash
        ownedRods.push(rodName);
        localStorage.setItem("ownedRods", JSON.stringify(ownedRods));

        showAlert(`✅ You bought the ${rodName}!`);
        updateUI();
        updateRodDropdown();
    } else {
        showAlert("❌ Not enough cash!");
    }
}

// Update the rod selection dropdown to only show purchased rods
function updateRodDropdown() {
    let rodSelect = document.getElementById("rodSelect");
    let rodStats = document.getElementById("rodStats"); // Rod stats display
    rodSelect.innerHTML = ""; // Clear old options

    let ownedRods = JSON.parse(localStorage.getItem("ownedRods")) || ["Wooden Rod"];

    ownedRods.forEach(rodName => {
        let option = document.createElement("option");
        option.value = rodName;
        option.textContent = rodName;
        rodSelect.appendChild(option);
    });

    // Function to update rod stats display
    function updateRodStats(selectedRod) {
        if (selectedRod) {
            let limitedTag = selectedRod.limited ? "(Limited)" : "";
            rodStats.innerHTML = `
                <h3>${selectedRod.name} ${limitedTag}</h3>
                <p><b>Lucky:</b> ${selectedRod.lucky}</p>
                <p><b>Resilience:</b> ${selectedRod.resilience} KG</p>
                <p><b>Power:</b> ${selectedRod.power}</p>
                <p><b>Price:</b> $${selectedRod.price}</p>
                <p><b>Passive:</b> ${selectedRod.passive || "None"}</p>
            `;
        }
    }

    // Update selected rod when dropdown changes
    rodSelect.addEventListener("change", () => {
        let chosenRod = rods.find(rod => rod.name === rodSelect.value);
        if (chosenRod) {
            selectedRod = chosenRod;
            localStorage.setItem("selectedRod", JSON.stringify(selectedRod));
            updateRodStats(selectedRod);
        }
    });

    // Set the dropdown to the current selected rod
    let savedRod = JSON.parse(localStorage.getItem("selectedRod"));
    if (savedRod) {
        rodSelect.value = savedRod.name;
        updateRodStats(savedRod);
    }
}


// Custom alert popup
function showAlert(message) {
  let alertBox = document.getElementById("customAlert");
  let alertMessage = document.getElementById("alertMessage");

  alertMessage.textContent = message;
  alertBox.style.display = "block";
}
