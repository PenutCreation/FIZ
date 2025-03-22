
var CHEATER = new Audio("Sounds/cheater_DdEy13p.mp3"); 
var CheaterFuckYou = new Audio("Sounds/slap-oh_LGvkhyt.mp3"); 
var failureBro = new Audio("Sounds/failsnap.mp3"); 
var Succesor = new Audio("Sounds/success-68578.mp3"); 
var Reelerio = new Audio("Sounds/SoundReeler.mp3"); 
var fishslpash = new Audio("Sounds/splash-6213.mp3");
var fishsail = new Audio("Sounds/failsnap.mp3");

Reelerio.volume = 0.2;
Reelerio.loop = true;
let musicTracks = [
    "./Sounds/BGM.mp3",
    "./Sounds/BGM2.mp3",
    "./Sounds/BGM3.mp3",
    "./Sounds/BGM4.mp3",
    "./Sounds/BGM5.mp3",
    "./Sounds/BGM6.mp3"
];

let currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
let bgMusic = new Audio(musicTracks[currentTrackIndex]);
bgMusic.loop = false;
bgMusic.volume = 0.9;


bgMusic.addEventListener("ended", playNextTrack);

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    bgMusic.src = musicTracks[currentTrackIndex];
    bgMusic.load(); // Ensure the new track is loaded
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
    });
}

// ** Start Playing Music with Autoplay Handling **
bgMusic.addEventListener("canplaythrough", () => {
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked. Waiting for user interaction.");
        document.addEventListener("click", enableMusic, { once: true });
    });
});

// ** Handle User Interaction to Start Music (If Needed) **
function enableMusic() {
    bgMusic.play().then(() => {
        console.log("Music started after user interaction.");
    }).catch(error => {
        console.error("Failed to start music:", error);
    });
}

let musicgameSFX = new Audio("./Sounds/sfx-bg.mp3");
musicgameSFX.loop = true; 
musicgameSFX.volume = 0.2;

musicgameSFX.addEventListener("canplaythrough", () => {
    musicgameSFX.play().catch(() => {
        console.log("Autoplay blocked for SFX. Waiting for interaction.");
        document.addEventListener("click", enableSFX, { once: true });
    });
});

function enableSFX() {
    musicgameSFX.play().catch(error => {
        console.error("Failed to play SFX:", error);
    });
}

// Function to play click sound
function playClickSound() {
    let clickSound = new Audio("Sounds/ui-click-43196.mp3");
    clickSound.play().catch(err => console.warn("Click sound failed:", err));
}

