
function showCombo(message) {
    let tapButton = document.getElementById("tapButton");

    // Create a new combo message element
    let comboElement = document.createElement("div");
    comboElement.innerText = message;
    comboElement.style.position = "fixed"; // Fixed position to overlay everything
    comboElement.style.fontSize = "10px";
    comboElement.style.fontWeight = "bold";
    comboElement.style.color = "gold";
    comboElement.style.textShadow = "0px 0px 10px gold";
    comboElement.style.pointerEvents = "none";
    comboElement.style.opacity = "1";
    comboElement.style.transition = "transform 1s ease-out, opacity 1s ease-out";
    comboElement.style.zIndex = "9999"; // Ensures it overlays everything

    // Append to the document
    document.body.appendChild(comboElement);

    // Get tap button position
    let rect = tapButton.getBoundingClientRect();
    let offsetX = Math.random() * 40 - 20; // Randomize X position
    let offsetY = -50; // Appear above the button

    // Position it near the tap button
    comboElement.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
    comboElement.style.top = `${rect.top + offsetY}px`;

    // Animate upward and fade out
    setTimeout(() => {
        comboElement.style.transform = "translateY(-100px)";
        comboElement.style.opacity = "0";
    }, 10);

    // Remove from DOM after animation
    setTimeout(() => {
        comboElement.remove();
    }, 1000);
}


function showExpNotification(expGained) {
    // Create notification element
    let notification = document.createElement("div");
    notification.classList.add("exp-notification");

    // Create inner span for dynamic content
    let span = document.createElement("span");
    span.innerHTML = `+${expGained} EXP`; // ✅ Dynamic content
    notification.appendChild(span);

    // Append to body
    document.body.appendChild(notification);

    // Animate: Fade In → Stay → Fade Out
    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translate(-50%, -55%)"; 
    }, 50);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translate(-50%, -70%)"; 
    }, 1500);

    setTimeout(() => {
        notification.remove(); // Remove after animation
    }, 2000);
}
 
function showCatchNotification(fishName, fishWeight, fishRarity, mutationName = "") {
    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "90%";
    notification.style.left = "50%";
    notification.style.transform = "translate(-50%, -50%) scale(0)";
    notification.style.padding = "10px 15px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "8px";
    notification.style.color = "white";
    notification.style.fontSize = "16px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.animation = "popIn 1.3s ease-out, fadeOut 6s forwards";

    // Notification text
    notification.innerHTML = `
      <small>  You caught a <span style="color: yellow;">${fishRarity}
      ${mutationName}${fishName}</span> weighing <span style="color:
      cyan;">${fishWeight}KG</span></small>!
    `;

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 5300); // Adjusted time to match the fadeOut duration
}

// CSS animations (add to your style or in a <style> tag)
const styles = `
@keyframes popIn {
    0% { transform: translate(-50%, -50%) scale(0); }
    100% { transform: translate(-50%, -50%) scale(1); }
}

@keyframes fadeOut {
    0% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


function showFailedCatchNotification(reason) {
Reelerio.pause();
    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "50%";
    notification.style.left = "50%";
    notification.style.transform = "translate(-50%, -50%)";
    notification.style.padding = "15px 20px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "10px";
    notification.style.color = "white";
    notification.style.fontSize = "18px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.animation = "fadeOut 3s forwards";

    // Notification text
    notification.innerHTML = `
        <span style="color: red;">Failed to catch the fish!</span> <br> 
        <span style="color: gray;">${reason}</span>
    `;

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
function RodMessage(reason) {
let fisj = new Audio("./Sounds/fishts.mp3");
    fisj.play();

    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "50%";
    notification.style.left = "50%";
    notification.style.transform = "translate(-50%, -50%)";
    notification.style.padding = "15px 20px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "10px";
    notification.style.color = "white";
    notification.style.fontSize = "18px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.animation = "fadeOut 3s forwards";

    // Notification text
    notification.innerHTML = `
        <span style="color: gray;">${reason}</span>
    `;

    document.body.appendChild(notification);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 300);
}
function showMoneyNotification(amount) {
    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "50px"; // Appears at the top
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "10px 20px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "8px";
    notification.style.color = "white";
    notification.style.fontSize = "18px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999"; 
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.opacity = "1";
    notification.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    
    // Notification text with gold color for coins
    notification.innerHTML = `<span style="color: gold;">+${amount} Coins!</span>`;

    document.body.appendChild(notification);

    // Fade out and move up after a delay
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(-20px)";
    }, 2500);

    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showEvent(message) {
    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "120px"; // Appears at the top
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "10px 20px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "8px";
    notification.style.color = "white";
    notification.style.fontSize = "18px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.opacity = "1";
    notification.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    
    // Notification text with gold color for coins
    notification.innerHTML = message;

    document.body.appendChild(notification);

    // Fade out and move up after a delay
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(-20px)";
    }, 2500);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
function showSeason(message) {
    let notification = document.createElement("div");
    notification.style.position = "fixed";
    notification.style.top = "90px"; // Appears at the top
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "10px 20px";
    notification.style.background = "rgba(0, 0, 0, 0.8)";
    notification.style.borderRadius = "8px";
    notification.style.color = "white";
    notification.style.fontSize = "18px";
    notification.style.fontWeight = "bold";
    notification.style.textAlign = "center";
    notification.style.zIndex = "9999";
    notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.5)";
    notification.style.opacity = "1";
    notification.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    
    // Notification text with gold color for coins
    notification.innerHTML = message;

    document.body.appendChild(notification);

    // Fade out and move up after a delay
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(-20px)";
    }, 2500);
    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

