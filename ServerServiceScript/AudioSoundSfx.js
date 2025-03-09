
var CHEATER = new Audio("Sounds/cheater_DdEy13p.mp3"); 
var CheaterFuckYou = new Audio("Sounds/slap-oh_LGvkhyt.mp3"); 
var failureBro = new Audio("Sounds/failsnap.mp3"); 
var Succesor = new Audio("Sounds/success-68578.mp3"); 
var Reelerio = new Audio("Sounds/SoundReeler.mp3"); 
var fishslpash = new Audio("Sounds/splash-6213.mp3");
var fishsail = new Audio("Sounds/failsnap.mp3");

Reelerio.volume = 0.2; // Set volume to 20%
Reelerio.loop = true; // Enable looping

document.addEventListener("DOMContentLoaded", function () {
    var audio1 = document.getElementById("musicgameSFX");
    var audio2 = document.getElementById("Music-Background");
    startEventLoop();
    if (!audio1 || !audio2) {
        console.error("Audio elements not found! Check your HTML IDs.");
        return;
    }

    // Lower volume (0.5 = 50% volume, adjust as needed)
    audio1.volume = 0.3;
    audio2.volume = 0.2;

    // Enable looping
    audio1.loop = true;
    audio2.loop = true;

    // Try playing audio with user interaction fallback
    var playPromise1 = audio1.play();
    var playPromise2 = audio2.play();

    if (playPromise1 !== undefined) {
        playPromise1.catch(() => {
            console.warn("Autoplay blocked for SFX. Waiting for user interaction.");
            document.addEventListener("click", playAudioOnce);
        });
    }

    if (playPromise2 !== undefined) {
        playPromise2.catch(() => {
            console.warn("Autoplay blocked for BGM. Waiting for user interaction.");
            document.addEventListener("click", playAudioOnce);
        });
    }

    function playAudioOnce() {
        audio1.play();
        audio2.play();
        document.removeEventListener("click", playAudioOnce);
    }
});

// Function to play click sound
function playClickSound() {
    let clickSound = new Audio("Sounds/ui-click-43196.mp3");
    clickSound.play().catch(err => console.warn("Click sound failed:", err));
}

