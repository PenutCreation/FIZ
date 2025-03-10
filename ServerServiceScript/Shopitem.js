
        let ownedBaits = JSON.parse(localStorage.getItem("ownedBaits")) || {}; // Load owned baits
        let activeBait = null;
        
     
        function openBaitShop() {
            document.getElementById("baitShopPopup").style.display = "block";
        }

        function closeBaitShop() {
            document.getElementById("baitShopPopup").style.display = "none";
        }
function buyBait(baitName, price) {
            if (cash >= price) {
                cash -= price;
                ownedBaits[baitName] = (ownedBaits[baitName] || 0) + 1;
                localStorage.setItem("cash", cash.toFixed(2));
                localStorage.setItem("ownedBaits", JSON.stringify(ownedBaits));
                updateBaitDropdown();
                document.getElementById("cashCount").innerText = cash.toFixed(2);
                alert(`You bought ${baitName}!`);
            } else {
                alert("Not enough cash!");
            }
        }

        function updateBaitDropdown() {
            let baitSelect = document.getElementById("baitSelect");
            baitSelect.innerHTML = "";
            for (let bait in ownedBaits) {
                if (ownedBaits[bait] > 0) {
                    let option = document.createElement("option");
                    option.value = bait;
                    option.textContent = `${bait} (${ownedBaits[bait]})`;
                    baitSelect.appendChild(option);
                }
}
        }

        function useBait() {
            let baitSelect = document.getElementById("baitSelect");
            let selectedBait = baitSelect.value;

            if (!selectedBait) {
                alert("No bait selected!");
                return;
            }

            ownedBaits[selectedBait]--;
            if (ownedBaits[selectedBait] <= 0) delete ownedBaits[selectedBait];

            localStorage.setItem("ownedBaits", JSON.stringify(ownedBaits));
            updateBaitDropdown();

            activeBait = selectedBait;
            document.getElementById("activeBaitMessage").innerText = `🪄 Using ${selectedBait}!`;
        }

        updateBaitDropdown(); 
function openShopq() {
    document.getElementById("shopPopupq").style.display = "block";
}

function closeShopq() {
    document.getElementById("shopPopupq").style.display = "none";
}

function buyTotem(itemName, price) {
    let cash = parseFloat(localStorage.getItem("cash")) || 0;

    if (cash < price) {
        alert("❌ Not enough cash!");
        return;
    }

    cash -= price;
    localStorage.setItem("cash", cash.toFixed(2));
    updateUI();

    if (itemName === "C³ Totem") {
        showEvent("⚡ You purchased the C³ Totem! It will be used automatically.");
    } else if (itemName === "Aaoura Totem") {
        showEvent("✨ Aaoura Totem Activated! Mythical fish chance increased for 15 minutes.");
        activateAaouraTotem();
    } else if (itemName === "Eclipse Totem") {
        showEvent("🌑 You purchased the Eclipse Totem! It will be used automatically.");
    }
}

function activateAaouraTotem() {
    localStorage.setItem("mythicalBoost", "active");

    setTimeout(() => {
        localStorage.removeItem("mythicalBoost"); // ✅ Remove boost after 15 minutes
        showEvent("Aaoura Totem has expired.");
    }, 15 * 60 * 1000); // 15 minutes
}

