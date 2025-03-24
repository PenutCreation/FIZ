const bannedUsers = JSON.parse(localStorage.getItem("bannedUsers")) || [];

document.addEventListener("DOMContentLoaded", function() {
    let username = localStorage.getItem("username");

    if (username) {
        let bannedUser = bannedUsers.find(user => user.username === username);

        if (bannedUser) {
            let banExpiry = new Date(bannedUser.expiry).getTime();
            let now = Date.now();

            if (bannedUser.permanent || now < banExpiry) {
                showBanPopup(bannedUser);
            } else {
                // Remove expired ban
                let updatedBannedUsers = bannedUsers.filter(user => user.username !== username);
                localStorage.setItem("bannedUsers", JSON.stringify(updatedBannedUsers));
            }
        }
    }
});

function showBanPopup(user) {
    let timeText = user.permanent ? "Permanent" : new Date(user.expiry).toLocaleString();
    
    document.getElementById("banReason").textContent = user.reason;
    document.getElementById("bannedBy").textContent = user.bannedBy;
    document.getElementById("banTime").textContent = timeText;
    document.getElementById("caseID").textContent = user.caseID;

    document.getElementById("banPopup").style.display = "block";
    document.getElementById("banOverlay").style.display = "block";
}

// **⚠️ Auto-Clicker Detection System**
let warningCount = parseInt(localStorage.getItem("warningCount")) || 0;
let banCount = parseInt(localStorage.getItem("banCount")) || 0;
const maxWarnings = 3;
const maxBans = 10;
let lastClickTime = 0;
let clickCount = 0;
let detectedAutoClicker = false;
const clickCooldown = 500; // 300ms cooldown per click
const maxClicks = 30; // Max allowed clicks in detection window
const detectionWindow = 5000; // 5-second window

const blockTime = 5000; // Click block time

setInterval(() => {
    if (!detectedAutoClicker) clickCount = 0;
}, detectionWindow);

document.addEventListener("click", (event) => {
    const now = Date.now();

    if (detectedAutoClicker) return;

    if (now - lastClickTime < clickCooldown) {
        console.warn("⚠️ Click ignored: Too fast.");
        return;
    }

    lastClickTime = now;
    clickCount++;

    if (clickCount >= maxClicks) {
        detectedAutoClicker = true;
        warningCount++;
        localStorage.setItem("warningCount", warningCount);
        
        if (warningCount >= maxWarnings) {
            issueBan();
        } else {
            showEvent(`⚠️ Anti-Cheat: Auto-clicking detected! Warning ${warningCount}/${maxWarnings}.`);
            console.error(`🚨 Warning ${warningCount}: Auto-clicking detected!`);
        }

        setTimeout(() => {
            detectedAutoClicker = false;
            clickCount = 0;
        }, blockTime);
    }
});

function issueBan() {
    let username = localStorage.getItem("username");
    if (!username) return;

    banCount++;
    localStorage.setItem("banCount", banCount);
    warningCount = 0;
    localStorage.setItem("warningCount", warningCount);

    let banDuration = Math.min(2 ** (banCount - 1), 1024); // 1-day, 2-day, 4-day, ... 10th ban = permanent
    let expiryDate = new Date(Date.now() + banDuration * 24 * 60 * 60 * 1000);

    let newBan = {
        username: username,
        reason: "Auto-clicking detected",
        bannedBy: "Anti-Cheat System",
        time: new Date().toLocaleString(),
        expiry: expiryDate.toISOString(),
        caseID: `BAN-${String(banCount).padStart(3, "0")}`,
        permanent: banCount >= maxBans
    };

    let updatedBannedUsers = bannedUsers.filter(user => user.username !== username);
    updatedBannedUsers.push(newBan);
    localStorage.setItem("bannedUsers", JSON.stringify(updatedBannedUsers));

    showEvent(`🚨 You have been banned for ${banCount >= maxBans ? "permanently" : `${banDuration} days`} due to auto-clicking.`);

    window.location.href = "google.com"; // Redirect after ban
}
function manuallyBanUser(username, reason, days = 0) {
    let bannedUsers = JSON.parse(localStorage.getItem("bannedUsers")) || [];

    let expiryDate = days > 0 ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString() : null;
    let newBan = {
        username: username,
        reason: reason,
        bannedBy: "Admin",
        time: new Date().toLocaleString(),
        expiry: expiryDate,
        caseID: `BAN-${String(bannedUsers.length + 1).padStart(3, "0")}`,
        permanent: days === 0
    };

    bannedUsers.push(newBan);
    localStorage.setItem("bannedUsers", JSON.stringify(bannedUsers));

    showEvent(`✅ ${username} has been banned for ${days === 0 ? "PERMANENTLY" : `${days} days`}!`);
}
