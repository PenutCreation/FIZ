ned for ${banCount >= maxBans ? "permanently" : `${banDuration} days`} due to auto-clicking.`);

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
