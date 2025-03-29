document.addEventListener("DOMContentLoaded", function () {
    let fishSounds = {
        "Shiny Pufferfish": "Sounds/aaughmp3.mp3",
        "Pufferfish": "Sounds/duck-toy-sound.mp3"
    };

    document.querySelectorAll(".inventory-item").forEach(item => {
        item.addEventListener("click", function () {
            let fishName = item.dataset.fishName; // Get fish name from dataset

            if (fishSounds[fishName]) {
                let sound = new Audio(fishSounds[fishName]);
                sound.play();
            } else {
                console.warn("No sound found for:", fishName);
            }
        });
    });
});