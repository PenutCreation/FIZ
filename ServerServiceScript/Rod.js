




const rods = [
  { name: "Wooden Rod", price: 0, lucky: 1, power: 3, resilience: 0, lureSpeed: 25, passive: "None" },
  { name: "Steel Rod", price: 1000, lucky: 2, power: 3, resilience: 10, lureSpeed: 24, passive: "None" },
  { name: "Carbon Rod", price: 1500, lucky: 3, power: 9, resilience: 15, lureSpeed: 23, passive: "None" },
  { name: "Lucky Rod", price: 2000, lucky: 5, power: 5, resilience: 20, lureSpeed: 22, passive: "None" },
  { name: "Plant Rod", price: 2500, lucky: 6, power: 6, resilience: 25, lureSpeed: 21, passive: "None" },
  { name: "Dark Rod", price: 3100, lucky: 7, power: 7, resilience: 30, lureSpeed: 20, passive: "None" },
  { name: "Kimber Rod", price: 5000, lucky: 10, power: 8, resilience: 35,
  lureSpeed: 19, passive: "None" },
  { name: "Lost Rod", price: 2000, lucky: 30, power: 9, resilience: 35,
  lureSpeed: 19, passive: "None" },
  { name: "Zehim Rod", price: 9000, lucky: 10, power: 15, resilience: 35,
  lureSpeed: 19, passive: "None" },
  { name: "Zehim Rod", price: 9000, lucky: 10, power: 15, resilience: 35,
  lureSpeed: 19, passive: "Electric Mutation" },
  { name: "Rock Rod", price: 20000, lucky: -1, power: 19, resilience: 35,
  lureSpeed: 19, passive: "3x Chance Mutations" },
  { name: "Squid's Fang Rod", price: 50000, lucky: 30, power: 25, resilience: 5,
  lureSpeed: 19, passive: "Per 10 Catches Double Power " },
  { name: "ProsTem Rod", price: 65000, lucky: 23, power: 21, resilience: 60,
  lureSpeed: 19, passive: "2x Exp Per Mythical" },
  { name: "Darkness Rod", price: 6000, lucky: 100, power: 17, resilience: 0,
  lureSpeed: 19, passive: "2x Exp Per Mythical" },
  { name: "Zero Rod", price: 500000, lucky: 100, power: 30, resilience: 10,
  lureSpeed: 19, passive: "Mutation Chances Improvement" }
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

  rods.forEach(rod => {
      let rodDiv = document.createElement("div");
      rodDiv.classList.add("shop-item");
      rodDiv.innerHTML = `
          <h3>${rod.name}</h3>
         <p> <b>Lucky</b>:${rod.lucky}</p>
           <p><b>Resilience</b>: ${rod.resilience}</p>
           <p><b>Power</b>: ${rod.power}</p>
          <p><b>Price</b>: $${rod.price}</p>
          <button onclick="buyRod('${rod.name}', ${rod.price})">Buy</button>
      `;
      shopContainer.appendChild(rodDiv);
  });
}

// Handle rod purchases
function buyRod(rodName, price) {
    let cash = parseFloat(localStorage.getItem("cash")) || 0; // ✅ Load cash from storage
    let ownedRods = JSON.parse(localStorage.getItem("ownedRods")) || ["Wooden Rod"];

    if (ownedRods.includes(rodName)) {
        showAlert(`❌ You already own the ${rodName}!`);
        return;
    }

    if (cash >= price) {
        cash -= price; // ✅ Subtract price
        localStorage.setItem("cash", cash.toFixed(2)); // ✅ Save updated cash
        ownedRods.push(rodName);
        localStorage.setItem("ownedRods", JSON.stringify(ownedRods));

        showAlert(`✅ You bought the ${rodName}!`);
        updateUI(); // ✅ Make sure UI updates
        updateRodDropdown();
    } else {
        showAlert("❌ Not enough cash!");
    }
}


// Update the rod selection dropdown to only show purchased rods
function updateRodDropdown() {
    let rodSelect = document.getElementById("rodSelect");
    rodSelect.innerHTML = ""; // Clear old options

    let ownedRods = JSON.parse(localStorage.getItem("ownedRods")) || ["Wooden Rod"];

    ownedRods.forEach(rodName => {
        let option = document.createElement("option");
        option.value = rodName;
        option.textContent = rodName;
        rodSelect.appendChild(option);
    });

    // Update selected rod when dropdown changes
    rodSelect.addEventListener("change", () => {
        let chosenRod = rods.find(rod => rod.name === rodSelect.value);
        if (chosenRod) {
            selectedRod = chosenRod;
            localStorage.setItem("selectedRod", JSON.stringify(selectedRod));
        }
    });

    // Set the dropdown to the current selected rod
    let savedRod = JSON.parse(localStorage.getItem("selectedRod"));
    if (savedRod) {
        rodSelect.value = savedRod.name;
    }
}


// Custom alert popup
function showAlert(message) {
  let alertBox = document.getElementById("customAlert");
  let alertMessage = document.getElementById("alertMessage");

  alertMessage.textContent = message;
  alertBox.style.display = "block";
}
