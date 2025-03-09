const StartfishFoxer = document.getElementById("StartButtonFish");
function startFishing(area) {
    let availableFish = fishList[area];
    currentFish = getRandomFish(availableFish); // ✅ Uses the new rarity system

    fishPosition = 130;
    document.getElementById("miniGame").style.display = "block";
    updateFishPosition();
    miniGameLoop();
    console.log("Fishing in", area);
 

    document.getElementById("minusProgressText").innerText = ` -${currentFish.minusProgress}% Progress`;
    Reelerio.play();
document.body.style.overflow = "hidden"; 
}

let cash = parseFloat(localStorage.getItem("cash")) || 0;
let ownedFish = JSON.parse(localStorage.getItem("ownedFish")) || {};
let exp = parseFloat(localStorage.getItem("exp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let fishPosition = 130;
let currentFish = null;
let miniGameInterval;
let lastClickTimes = [];
const maxClicksPerSecond = 10; // Adjust based on tolerance
const maxLevel = 300;
const maxExp = 200;
const mutationChance = 0.2;
const fishList = {
Creek: [
        { name: "Nile Tilapia", rarity: "Common", baseWeight: 5, cashValue: 2, progress: 10, minusProgress: 0, power: 1 },
        { name: "Macquarie Perch", rarity: "Common", baseWeight: 5, cashValue: 2, progress: 10, minusProgress: 0, power: 1 },
        { name: "Brook Trout", rarity: "Common", baseWeight: 2, cashValue: 1.5, progress: 8, minusProgress: 1, power: 1 },
        { name: "Smallmouth Bass", rarity: "Uncommon", baseWeight: 3, cashValue: 2.5, progress: 7, minusProgress: 2, power: 2 },
        { name: "Rainbow Trout", rarity: "Common", baseWeight: 4, cashValue: 2,
        progress: 8, minusProgress: 0, power: 2 },
        { name: "Brown Trout", rarity: "Rare", baseWeight: 5, cashValue: 4,
        progress: 6, minusProgress: 0, power: 3 },
        { name: "Rock Bass", rarity: "Common", baseWeight: 1, cashValue: 1, progress: 9, minusProgress: 0, power: 1 },
        { name: "Creek Chub", rarity: "Common", baseWeight: 0.8, cashValue: 1, progress: 10, minusProgress: 0, power: 1 },
        { name: "Bluegill", rarity: "Common", baseWeight: 1, cashValue: 1, progress: 9, minusProgress: 1, power: 1 },
        { name: "White Sucker", rarity: "Uncommon", baseWeight: 2.5, cashValue: 2, progress: 7, minusProgress: 3, power: 2 },
        { name: "Redbreast Sunfish", rarity: "Uncommon", baseWeight: 1,
        cashValue: 1.5, progress: 0, minusProgress: 2, power: 1.5 },
        { name: "Channel Catfish", rarity: "Rare", baseWeight: 6, cashValue: 5, progress: 6, minusProgress: 4, power: 4 },
        { name: "Trash Bag", rarity: "Junk", baseWeight: 2, cashValue: 0, progress: 5, minusProgress: 10, power: 0 },
        { name: "Old Tire", rarity: "Junk", baseWeight: 10, cashValue: 0, progress: 3, minusProgress: 15, power: 0 },
        { name: "Rock", rarity: "Junk", baseWeight: 5, cashValue: 0, progress: 4, minusProgress: 8, power: 0 },
        { name: "Leaf", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress: 1, minusProgress: 2, power: 0 },
        { name: "Plank", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress: 1, minusProgress: 2, power: 0 }
    ],
    
 ShallowOcean: [
        { name: "Clownfish", rarity: "Common", baseWeight: 0.2, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
        { name: "Damselfish", rarity: "Common", baseWeight: 0.3, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
        { name: "Butterflyfish", rarity: "Common", baseWeight: 0.5, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
        { name: "Blenny", rarity: "Common", baseWeight: 0.4, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
        { name: "Goby", rarity: "Common", baseWeight: 0.2, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
        { name: "Pufferfish", rarity: "Uncommon", baseWeight: 1, cashValue: 5, progress: 8, minusProgress: 2, power: 2 },
        { name: "Sergeant Major", rarity: "Uncommon", baseWeight: 0.8, cashValue: 4, progress: 2, minusProgress: 2, power: 2 },
        { name: "Wrasse", rarity: "Uncommon", baseWeight: 1.5, cashValue: 6, progress: 1, minusProgress: 2, power: 2 },
        { name: "Hogfish", rarity: "Uncommon", baseWeight: 2, cashValue: 7, progress: 1, minusProgress: 3, power: 3 },
        { name: "Trumpetfish", rarity: "Uncommon", baseWeight: 1.8, cashValue: 6, progress: 1, minusProgress: 3, power: 3 },
        { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1, progress: 8, minusProgress: 0, power: 1 },
        { name: "Blue Fin Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 10, progress: 29, minusProgress: 20, power: 14 },
        { name: "Yellow Fin Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 10, progress: 1, minusProgress: 20, power: 14 },
        { name: "Big Eye Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 20, progress: 6, minusProgress: 20, power: 14 },
        { name: "Grouper", rarity: "Legendary", baseWeight: 400, cashValue: 15, progress: 1, minusProgress: 50, power: 99 },
        { name: "Goliath Grouper", rarity: "Legendary", baseWeight: 455, cashValue: 20, progress: 1, minusProgress: 55, power: 99 },
        { name: "Prehistoric SeaSlug", rarity: "Secret", baseWeight: 9000, cashValue: 300, progress: 1, minusProgress: 70, power: 200 }
    ],
 
 HaystackBeach: [
        { name: "Lionfish", rarity: "Rare", baseWeight: 3, cashValue: 10, progress: 7, minusProgress: 4, power: 5 },
        { name: "Scorpionfish", rarity: "Rare", baseWeight: 2.5, cashValue: 9, progress: 7, minusProgress: 4, power: 5 },
        { name: "Needlefish", rarity: "Rare", baseWeight: 2, cashValue: 9, progress: 7, minusProgress: 4, power: 5 },
        { name: "Flying Fish", rarity: "Rare", baseWeight: 2.2, cashValue: 9, progress: 7, minusProgress: 5, power: 5 },
        { name: "Moray Eel", rarity: "Rare", baseWeight: 5, cashValue: 2, progress: 7, minusProgress: 5, power: 6 },
        { name: "Lemon Shark", rarity: "Rare", baseWeight: 26, cashValue: 12, progress: 5, minusProgress: 4, power: 10 },
        { name: "Infant SeaSlug", rarity: "Unusual", baseWeight: 8, cashValue: 1, progress: 5, minusProgress: 1, power: 1 },
        { name: "Matured SeaSlug", rarity: "Unusual", baseWeight: 8, cashValue: 2, progress: 5, minusProgress: 2, power: 1 },
        { name: "Mutated Sardine", rarity: "Unusual", baseWeight: 8, cashValue: 2, progress: 5, minusProgress: 7, power: 1 },
        { name: "Tarpon", rarity: "Unusual", baseWeight: 10, cashValue: 5, progress: 6, minusProgress: 9, power: 9 },
        { name: "Giant Trevally", rarity: "Unusual", baseWeight: 20, cashValue: 5, progress: 6, minusProgress: 12, power: 12 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5, progress: 6, minusProgress: 14, power: 14 }
    ],
HaystackislePound: [
    { name: "Trash Bag", rarity: "Junk", baseWeight: 2, cashValue: 0, progress: 5, minusProgress: 10, power: 0 },
    { name: "Old Tire", rarity: "Junk", baseWeight: 10, cashValue: 0, progress: 3, minusProgress: 15, power: 0 },
    { name: "Rock", rarity: "Junk", baseWeight: 5, cashValue: 0, progress: 4, minusProgress: 8, power: 0 },
    { name: "Leaf", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress: 1, minusProgress: 2, power: 0 },
    { name: "Plank", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress: 1, minusProgress: 2, power: 0 },
    
    { name: "Gold Fish", rarity: "Common", baseWeight: 10, cashValue: 5, progress: 1, minusProgress: 0, power: 1 },
    { name: "Suckermouth", rarity: "Common", baseWeight: 10, cashValue: 5, progress: 1, minusProgress: 0, power: 1 },
    { name: "Bass", rarity: "Common", baseWeight: 15, cashValue: 5, progress: 1, minusProgress: 0, power: 1 },
    { name: "Big Eye Gobi", rarity: "Uncommon", baseWeight: 15, cashValue: 5, progress: 1, minusProgress: 0, power: 1 },
    { name: "Fathead Minnow", rarity: "Common", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },

    { name: "Mud Crab", rarity: "Rare", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
    { name: "Scylla Serrata (Crab)", rarity: "Legendary", baseWeight: 15, cashValue: 5, progress: 1, minusProgress: 25, power: 1 },
    { name: "Slippers", rarity: "Legendary", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 20, power: 1 },
    
    { name: "Greg's Snail", rarity: "Mythical", baseWeight: 5, cashValue: 10, progress: 1, minusProgress: 15, power: 1 },
    { name: "Low Tapered Bass", rarity: "Mythical", baseWeight: 5, cashValue: 10, progress: 1, minusProgress: 15, power: 1 }
],
THEOCEAN: [
    { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 7, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 5, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 15, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 12, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 4,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 20,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 4,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 37,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 5,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 20,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 15,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 27, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        92,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 40,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 90,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 1000,
        progress: 1, minusProgress: 70, power: 0 }
  ],

    //EVENT FISHES
GreatWhiteShark: [
  { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 7, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 5, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 15, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 12, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 4,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 20,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 4,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 37,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 5,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 20,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 15,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 27, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        92,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 40,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 90,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 1000,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Great White Shark", rarity: "Mythical", baseWeight: 1400, cashValue: 580, progress: 1, minusProgress: 45, power: 250 }
    ],
GreatHammerHead: [
  { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 7, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 5, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 15, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 12, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 4,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 20,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 4,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 37,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 5,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 20,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 15,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 27, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        92,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 40,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 90,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 1000,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Great HammerHead Shark", rarity: "Mythical", baseWeight: 1012,
    cashValue: 420, progress: 1, minusProgress: 35, power: 250 }
    ]
};

function getRandomFish(fishList) {
    let fishPool = [];
    fishList.forEach(fish => {
        let chance = 0;
        switch (fish.rarity) {
            case "Junk": chance = 38; break;
            case "Common": chance = 50; break;  // 50% chance
            case "Uncommon": chance = 25; break; // 25% chance
            case "Rare": chance = 15; break; 
            case "Unusual": chance = 10; break;
            case "Legendary": chance = 7; break; // 7% chance
            case "Mythical": chance = 5; break; // 3% chance (very rare)
            case "Exotic": chance = 3; break; // 3% chance (very rare)
            case "Secret": chance = 0.1; break; 
        }
        for (let i = 0; i < chance; i++) {
            fishPool.push(fish);
        }
    });
    return fishPool[Math.floor(Math.random() * fishPool.length)];
}
const fishMutations = [
    { name: "Albino", effect: (fish) => fish.cashValue += 10 },
    { name: "Big", effect: (fish) => fish.baseWeight *= 10 },
    { name: "Shiny", effect: (fish) => fish.cashValue *= 5 },
    { name: "Sparkling", effect: (fish) => fish.cashValue += 6 },
    { name: "Sparkling", effect: (fish) => fish.cashValue += 6 },
    { name: "Electric", effect: (fish) => fish.cashValue += 12 },
    { name: "Negative", effect: (fish) => fish.cashValue += 15 },
    { name: "Fossilized", effect: (fish) => fish.cashValue += 16 },
    { name: "Lunar", effect: (fish) => fish.cashValue += 21 },
    { name: "Solarblaze", effect: (fish) => fish.cashValue += 10 },
    { name: "Translucent", effect: (fish) => fish.cashValue += 5.2},
    { name: "Darkened", effect: (fish) => fish.cashValue += 2 },
    { name: "Hexed", effect: (fish) => fish.cashValue += 11 },
    { name: "Silver", effect: (fish) => fish.cashValue += 9.1 },
    { name: "Ambered", effect: (fish) => fish.cashValue += 30 },
    { name: "Midas", effect: (fish) => fish.cashValue += 7 },
    { name: "Glossy", effect: (fish) => fish.cashValue += 3 },
    { name: "Abbysal", effect: (fish) => fish.cashValue += 20 },
    { name: "Giant", effect: (fish) => fish.baseWeight *= 60 },
];

// Mutation chances
 // 20% chance to get a mutation

function tapButton() {
    if (!currentFish) return;

    let now = Date.now();
    
    // Remove old timestamps beyond 1 second
    lastClickTimes = lastClickTimes.filter(time => now - time < 1000);

    if (lastClickTimes.length >= maxClicksPerSecond) {
      //CHEATDEFENSE BY ONIWA POGI
        CHEATER.play();
        CheaterFuckYou.play();
        alert("Auto-clicking detected! Slow down.");
        confirm("ANTICHEAT:", "You Have Detected as Hacking. you be Redirect to google");
        window.location.href = "google.com"; 
        return; // Prevent further execution
    }

    lastClickTimes.push(now); // Store current click time

    let selectedRod = JSON.parse(localStorage.getItem("selectedRod")) || rods[0];
    let rodPower = selectedRod.power || 1; // Use rod power for tap strength

    fishPosition += rodPower; // Increase fish position based on rod power

    let progressPercent = (fishPosition / 260) * 100;
    document.getElementById("progressBar").style.height = progressPercent + "%";
    document.getElementById("fishIcon").style.bottom = progressPercent + "%";

    if (fishPosition >= 260) {
        Reelerio.pause();
        Succesor.play();
        fishslpash.play();
        fishCaught();
        return;
    }

    let audl = new Audio("Sounds/ui-click-43196.mp3"); // Create a new instance
    audl.play();
    updateFishPosition();
}




function miniGameLoop() {
    miniGameInterval = setInterval(() => {
        fishPosition -= (5 + currentFish.minusProgress);

        if (fishPosition <= 0) {
            clearInterval(miniGameInterval);
failureBro.play();
            document.getElementById("miniGame").style.display = "none";
            showFailedCatchNotification("The fish escaped!");
        document.body.style.overflow = "auto";
fishsail.play();
        } else {
            updateFishPosition();
        }
    }, 500);
}

function updateFishPosition() {
    let progressPercent = (fishPosition / 260) * 100; // Calculate % progress
    document.getElementById("progressBar").style.height = progressPercent + "%"; // ✅ Fix progress bar height update
    document.getElementById("fishIcon").style.bottom = progressPercent + "%"; // ✅ Ensure fish moves properly
}

// Initialize Level & EXP

// EXP Required Per Level (Simple Formula)
function expRequiredForLevel(level) {
    return Math.floor(50 * level * 1); // Scaling EXP requirement
}

// EXP Rewards Per Fish Rarity
const expRewards = {
    "Junk": 0,
    "Common": 2,
    "Uncommon": 6,
    "Unusual": 10,
    "Rare": 15,
   "Legendary": 20,
   "Mythical": 39,
   "Exotic": 100,
   "Secret": 180
};

// Modify fishCaught() to include EXP & leveling
function fishCaught() {
    clearInterval(miniGameInterval);
    document.getElementById("miniGame").style.display = "none";

    let randomWeight = (Math.random() * (currentFish.baseWeight - 1) + 1).toFixed(2);
    let moneyGained = parseFloat(randomWeight) * currentFish.cashValue;
    let fishPower = currentFish.power;
    let expGained = expRewards[currentFish.rarity] || 0; 

    let mutation = null;

    if (Math.random() < mutationChance) {
        mutation = fishMutations[Math.floor(Math.random() * fishMutations.length)];
        mutation.effect(currentFish);
    }

    cash += moneyGained;
    exp += expGained;

    let fishKey = `${currentFish.rarity}_${mutation ? mutation.name + "_" : ""}${currentFish.name}`;

    if (!ownedFish[fishKey]) {
        ownedFish[fishKey] = { 
            name: currentFish.name, 
            rarity: currentFish.rarity, 
            mutation: mutation ? mutation.name : null,
            count: 0,
            totalPower: 0, 
            power: 0,
            weight: 0 
        };
    }

    ownedFish[fishKey].count++;
    ownedFish[fishKey].totalPower += parseFloat(randomWeight);
    ownedFish[fishKey].power += fishPower;
    ownedFish[fishKey].weight += parseFloat(randomWeight);

    showExpNotification(`+${expGained} EXP`);
    checkLevelUp();

let mutationName = mutation ? mutation.name + " " : ""; // Safe check
let catchMessage = `You Caught a ${currentFish.rarity} ${mutationName}${currentFish.name} Weighing ${randomWeight}KG`;
showCatchNotification(currentFish.name, randomWeight, currentFish.rarity);

    showMoneyNotification(`+${moneyGained.toFixed(2)} Coins`);
    document.getElementById("StartButtonFish").disabled = false;
    Reelerio.pause();
    fishslpash.play();
    Succesor.play();
    document.body.style.overflow = "auto";
    updateUI();
    updateExpUI();
    updateInventoryUI(); // ✅ Update Inventory Display
}

// ✅ Move updateInventoryUI() outside of fishCaught()



// Function to Handle Leveling Up
function checkLevelUp() {
    while (exp >= expRequiredForLevel(level) && level < maxLevel) {
        exp -= expRequiredForLevel(level);
        level++;
        showLevelUpNotification(`🎉 Level Up! You are now Level ${level}!`);
    }

    // Save to localStorage
    localStorage.setItem("exp", exp);
    localStorage.setItem("level", level);

    updateUI();
}



function updateExpUI() {
    document.getElementById("levelText").innerHTML = `Level ${level}`;
}

function gainExp(amount) {
    exp += amount;

    if (exp >= maxExp) {
        levelUp();
    }

    updateExpUI();
}

function levelUp() {
    exp = 0;
    level++;
    maxExp += 50; // Increase EXP cap per level (adjust as needed)
}


function updateUI() {
    document.getElementById("cashCount").innerText = cash.toFixed(2);
    localStorage.setItem("cash", cash.toFixed(2));
    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));
    updateInventoryUI();
}

function updateInventoryUI() {
    let inventoryElement = document.getElementById("inventory");
    
    if (!inventoryElement) {
        console.error("Inventory element not found!");
        return; // Stop function if inventory doesn't exist
    }

    let inventoryHTML = "";

    for (let key in ownedFish) {
        let fish = ownedFish[key];

        if (!fish || !fish.name) {
            console.warn(`Invalid fish data:`, fish);
            continue; // Skip broken data
        }

        let mutationText = fish.mutation ? `(${fish.mutation})` : "";
        
        inventoryHTML += `
            <div class="inventory-item">
                <strong>${fish.rarity} ${mutationText} ${fish.name}</strong>
                <br>Count: ${fish.count}
                <br>Weight: ${fish.weight.toFixed(2)} KG
                <br>Power: ${fish.power}
            </div>
        `;
    }

    inventoryElement.innerHTML = inventoryHTML || "<p>No fish caught yet.</p>";
}

// ✅ Call updateUI() properly at the end
updateUI();
updateExpUI()
