const bannedUsers = [
    {
        username: "Ser",
        reason: "Cheating",
        bannedBy: "Admin001",
        time: "2025-03-10",
        caseID: "BAN-001",
        permanent: true
    },
    {
        username: "SpammerXYZ",
        reason: "Spamming Chat",
        bannedBy: "ModUser",
        time: "2025-03-09",
        caseID: "BAN-002",
        permanent: false
    }
];
document.addEventListener("DOMContentLoaded", function() {
            let username = localStorage.getItem("username");

            if (username) {
                let bannedUser = bannedUsers.find(user => user.username === username);

                if (bannedUser) {
                    showBanPopup(bannedUser);
                }
            }
        });

        function showBanPopup(user) {
            let timeText = user.permanent ? "Permanent" : user.time;
            
            document.getElementById("banReason").textContent = user.reason;
            document.getElementById("bannedBy").textContent = user.bannedBy;
            document.getElementById("banTime").textContent = timeText;
            document.getElementById("caseID").textContent = user.caseID;

            document.getElementById("banPopup").style.display = "block";
            document.getElementById("banOverlay").style.display = "block";
        }