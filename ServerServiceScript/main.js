

let cash = parseFloat(localStorage.getItem("cash")) || 0;
console.log("Loaded Cash:", cash);

let ownedFish = JSON.parse(localStorage.getItem("ownedFish")) || {};
let favoriteFish = JSON.parse(localStorage.getItem("favoriteFish")) || {};
let level = parseInt(localStorage.getItem("level")) || 1;
let exp = parseInt(localStorage.getItem("exp")) || 0;
let maxExp = parseInt(localStorage.getItem("maxExp")) || 10; 
console.log("Loaded Level:", level);
console.log("Loaded Level:", exp);
let fishPosition = 130;
let currentFish = null;
let miniGameInterval;
let lastClickTimes = [];
const maxClicksPerSecond = 10; // Adjust based on tolerance
const maxLevel = 300;
const mutationChance = 0.1;
let fishCaughtCount = 0; // Track total fish caught
let isBlocked = false;
let blockDuration = 3000;
let comboCount = 0;
let lastTapTime = 0;
let currentLocation = ""; // Stores the player's current fishing area

let caughtStreak = parseInt(localStorage.getItem("caughtStreak")) || 0;
console.log(`🔄 Loaded caught streak: ${caughtStreak}`);

let lastLoginDate = localStorage.getItem("lastLoginDate") || "";

const fishList = {
  
Creek: [
        { name: "Nile Tilapia", rarity: "Common", baseWeight: 5, cashValue: 1,
        progress: 20, minusProgress: 0, power: 1 },
        { name: "Macquarie Perch", rarity: "Common", baseWeight: 5, cashValue: 1, progress: 20, minusProgress: 0, power: 1 },
        { name: "Brook Trout", rarity: "Common", baseWeight: 2, cashValue: 1, progress: 20, minusProgress: 1, power: 1 },
        { name: "Smallmouth Bass", rarity: "Uncommon", baseWeight: 3, cashValue:
        1, progress: 20, minusProgress: 0, power: 2 },
        { name: "Rainbow Trout", rarity: "Common", baseWeight: 4, cashValue: 2,
        progress: 10, minusProgress: 0, power: 2 },
        { name: "Brown Trout", rarity: "Rare", baseWeight: 5, cashValue: 4,
        progress: 6, minusProgress: 0, power: 3 },
        { name: "Rock Bass", rarity: "Common", baseWeight: 1, cashValue: 1, progress: 9, minusProgress: 0, power: 1 },
        { name: "Creek Chub", rarity: "Common", baseWeight: 0.8, cashValue: 1, progress: 10, minusProgress: 0, power: 1 },
        { name: "Bluegill", rarity: "Common", baseWeight: 1, cashValue: 1, progress: 10, minusProgress: 1, power: 1 },
        { name: "White Sucker", rarity: "Uncommon", baseWeight: 2.5, cashValue:
        2, progress: 10, minusProgress: 0, power: 2 },
        { name: "Redbreast Sunfish", rarity: "Uncommon", baseWeight: 1,
        cashValue: 1.5, progress: 10, minusProgress: 0, power: 1.5 },
        { name: "Channel Catfish", rarity: "Rare", baseWeight: 6, cashValue: 5,
        progress: 10, minusProgress: 0, power: 4 },
        { name: "Trash Bag", rarity: "Junk", baseWeight: 2, cashValue: 0,
        progress: 10, minusProgress: 10, power: 0 },
        { name: "Old Tire", rarity: "Junk", baseWeight: 10, cashValue: 0,
        progress: 10, minusProgress: 0, power: 0 },
        { name: "Rock", rarity: "Junk", baseWeight: 5, cashValue: 0, progress:
        10, minusProgress: 0, power: 0 },
        { name: "Leaf", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress:
        10, minusProgress: 0, power: 0 },
        { name: "Plank", rarity: "Junk", baseWeight: 0.1, cashValue: 0,
        progress: 10, minusProgress: 0, power: 0 }
    ],

 ShallowOcean: [
        { name: "Clownfish", rarity: "Common", baseWeight: 0.2, cashValue: 1,
        progress: 10, minusProgress: 0, power: 1 },
        { name: "Damselfish", rarity: "Common", baseWeight: 0.3, cashValue: 1,
        progress: 10, minusProgress: 0, power: 1 },
        { name: "Butterflyfish", rarity: "Common", baseWeight: 0.5, cashValue:
        1, progress: 10, minusProgress: 0, power: 1 },
        { name: "Blenny", rarity: "Common", baseWeight: 0.4, cashValue: 1,
        progress: 10, minusProgress: 0, power: 1 },
        { name: "Goby", rarity: "Common", baseWeight: 0.2, cashValue: 1,
        progress: 10, minusProgress: 0, power: 1 },
        { name: "Pufferfish", rarity: "Uncommon", baseWeight: 1, cashValue: 5, progress: 8, minusProgress: 2, power: 2 },
        { name: "Sergeant Major", rarity: "Uncommon", baseWeight: 0.8, cashValue: 4, progress: 2, minusProgress: 2, power: 2 },
        { name: "Wrasse", rarity: "Uncommon", baseWeight: 1.5, cashValue: 6,
        progress: 10, minusProgress: 2, power: 2 },
        { name: "Hogfish", rarity: "Uncommon", baseWeight: 2, cashValue: 7,
        progress: 10, minusProgress: 3, power: 3 },
        { name: "Trumpetfish", rarity: "Uncommon", baseWeight: 1.8, cashValue:
        6, progress: 10, minusProgress: 3, power: 3 },
        { name: "Barrel‘s of Fish", rarity: "Rare", baseWeight: 5, cashValue:
        30, progress: 10, minusProgress: 0, power: 1 },
        { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1, progress: 8, minusProgress: 0, power: 1 },
        { name: "Blue Fin Tuna", rarity: "Legendary", baseWeight: 100,
        cashValue: 100, progress: 29, minusProgress: 20, power: 14 },
        { name: "Yellow Fin Tuna", rarity: "Legendary", baseWeight: 100,
        cashValue: 100, progress: 1, minusProgress: 20, power: 14 },
        { name: "Big Eye Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 20, progress: 6, minusProgress: 20, power: 14 },
        { name: "Grouper", rarity: "Legendary", baseWeight: 400, cashValue: 5, progress: 1, minusProgress: 50, power: 99 },
        { name: "Goliath Grouper", rarity: "Legendary", baseWeight: 455,
        cashValue: 9, progress: 1, minusProgress: 55, power: 99 },
        { name: "Prehistoric SeaSlug", rarity: "Secret", baseWeight: 9000, cashValue: 300, progress: 1, minusProgress: 70, power: 200 }
    ],
 
 HaystackBeach: [
        { name: "Lionfish", rarity: "Rare", baseWeight: 3, cashValue: 2, progress: 7, minusProgress: 4, power: 5 },
        { name: "Scorpionfish", rarity: "Rare", baseWeight: 2.5, cashValue: 2, progress: 7, minusProgress: 4, power: 5 },
        { name: "Needlefish", rarity: "Rare", baseWeight: 2, cashValue: 2, progress: 7, minusProgress: 4, power: 5 },
        { name: "Western Flying Fish", rarity: "Rare", baseWeight: 2.2, cashValue: 9, progress: 7, minusProgress: 5, power: 5 },
        { name: "Moray Eel", rarity: "Rare", baseWeight: 5, cashValue: 2, progress: 7, minusProgress: 5, power: 6 },
        { name: "Lemon Shark", rarity: "Rare", baseWeight: 26, cashValue: 3, progress: 5, minusProgress: 4, power: 10 },
        { name: "Infant SeaSlug", rarity: "Unusual", baseWeight: 8, cashValue: 1, progress: 5, minusProgress: 1, power: 1 },
        { name: "Matured SeaSlug", rarity: "Unusual", baseWeight: 8, cashValue: 2, progress: 5, minusProgress: 2, power: 1 },
        { name: "Mutated Sardine", rarity: "Unusual", baseWeight: 8, cashValue: 2, progress: 5, minusProgress: 7, power: 1 },
        { name: "Tarpon", rarity: "Unusual", baseWeight: 10, cashValue: 30, progress: 6, minusProgress: 9, power: 9 },
        { name: "Giant Trevally", rarity: "Unusual", baseWeight: 20, cashValue:
        302, progress: 6, minusProgress: 12, power: 12 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 282, progress: 6, minusProgress: 14, power: 14 }
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
    { name: "Scylla Serrata (Crab)", rarity: "Legendary", baseWeight: 15,
    cashValue: 50, progress: 1, minusProgress: 5, power: 1 },
    { name: "Slippers", rarity: "Legendary", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 20, power: 1 },
    
    { name: "Greg‘s Snail", rarity: "Mythical", baseWeight: 5, cashValue: 10, progress: 1, minusProgress: 15, power: 1 },
    { name: "Low Tapered Bass", rarity: "Mythical", baseWeight: 5, cashValue:
    1000, progress: 1, minusProgress: 15, power: 1 }
],
SNOWISLES: [
    { name: "Antarctic Cods", rarity: "Common", baseWeight: 0.1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Mackerel Icefish", rarity: "Common", baseWeight: 2, cashValue: 28,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Fish", rarity: "Common", baseWeight: 6, cashValue: 28,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Mackerel", rarity: "Common", baseWeight: 3, cashValue: 21,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar eel", rarity: "Common", baseWeight: 2, cashValue: 2,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Bass", rarity: "Rare", baseWeight: 10, cashValue: 4,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Lobster", rarity: "Rare", baseWeight: 10, cashValue: 5,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Oyster", rarity: "Unusual", baseWeight: 10, cashValue: 5,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Shark", rarity: "Legendary", baseWeight: 35, cashValue: 3,
    progress: 1, minusProgress: 5, power: 0 },
    { name: "Polar Smetch Shark", rarity: "Mythical", baseWeight: 80,
    cashValue: 5,
    progress: 1, minusProgress: 16, power: 0 }
  ],
HayBay: [
    { name: "Farm Sish", rarity: "Common", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sertio Fish", rarity: "Common", baseWeight: 5, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Mud Skipper", rarity: "Common", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Hay Crab", rarity: "Common", baseWeight: 5, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Cribal Fish", rarity: "Common", baseWeight: 2, cashValue: 2,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Cray Fish", rarity: "Uncommon", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Fresh Water Clams", rarity: "Uncommon", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Wheat Fish", rarity: "Uncommon", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Crabbians Lobster", rarity: "Unusual", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Crabbians Clams", rarity: "Unusual", baseWeight: 1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "HayShark", rarity: "Mythical", baseWeight: 80,
    cashValue: 10,
    progress: 1, minusProgress: 40, power: 0 }
  ],
  SkullLands: [
    { name: "Skull Fish", rarity: "Common", baseWeight: 4,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Skull Salmon", rarity: "Common", baseWeight: 4,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Ghost Octopos", rarity: "Common", baseWeight: 4,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Snail Fish", rarity: "Uncommon", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sundian Fish", rarity: "Uncommon", baseWeight: 4,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Cat Fish", rarity: "Unusual", baseWeight: 10,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "(☠️)Kings of The Skull", rarity: "Limited", baseWeight: 500,
    cashValue: 1,
    progress: 1, minusProgress: 45, power: 0 }
    ],
    
    SunkenCity: [
    { name: "Fish Bones", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Fish", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Tuna", rarity: "Common", baseWeight: 70,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Sardine", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Dolphin", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Haddock", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Mullet", rarity: "Common", baseWeight: 2,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sunken Crates", rarity: "Common", baseWeight: 6,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Amberjack", rarity: "Common", baseWeight: 30,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Crab", rarity: "Common", baseWeight: 1,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Sunfish", rarity: "Uncommon", baseWeight: 20,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Prawn", rarity: "Uncommon", baseWeight: 1,
    cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Sloppy Shark", rarity: "Legendary", baseWeight: 1,
    cashValue: 1,
    progress: 1, minusProgress: 30, power: 0 },
    { name: "Sloppy Bull Shark", rarity: "Legendary", baseWeight: 111,
    cashValue: 5,
    progress: 1, minusProgress: 30, power: 0 },
    { name: "Sloppy RabbitFish", rarity: "Legendary", baseWeight: 3,
    cashValue: 1,
    progress: 1, minusProgress: 30, power: 0 },
    { name: "Sloppy OarFish", rarity: "Mythical", baseWeight: 11,
    cashValue: 1,
    progress: 1, minusProgress: 40, power: 0 },
    { name: "Sloppy Sea Pickle", rarity: "Mythical", baseWeight: 11,
    cashValue: 1,
    progress: 1, minusProgress: 40, power: 0 },
    { name: "Sloppy Colossal Squid", rarity: "Mythical", baseWeight: 1001,
    cashValue: 2,
    progress: 1, minusProgress: 50, power: 0 },
      ],

SHARKLAND: [
    { name: "Long Eater Shark", rarity: "Common", baseWeight: 4, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Sand Shark", rarity: "Common", baseWeight: 4, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Willow Shark", rarity: "Common", baseWeight: 4, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Mist Shark", rarity: "Uncommon", baseWeight: 6, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Tiger Shark", rarity: "Uncommon", baseWeight: 20, cashValue: 5, progress: 1, minusProgress: 0, power: 0 },
    { name: "Panther Shark", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1, progress: 1, minusProgress: 0, power: 1 },
    { name: "Minnow Shark", rarity: "Uncommon", baseWeight: 99.9, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Elf Shark", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "LedShark", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Hon Shark", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Deli Shark", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress: 1, minusProgress: 0, power: 0 },
    { name: "Arjov Shark", rarity: "Unusual", baseWeight: 25, cashValue: 5, progress: 1, minusProgress: 1, power: 14 },
    { name: "Lobster Shark", rarity: "Unusual", baseWeight: 3, cashValue: 3, progress: 1, minusProgress: 1, power: 14 },
    { name: "Blue Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2, progress: 1, minusProgress: 10, power: 14 },
    { name: "Brow Shark", rarity: "Rare", baseWeight: 1, cashValue: 2, progress: 1, minusProgress: 2, power: 0 },
    { name: "Spiked Shark", rarity: "Rare", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 0, power: 0 },
    { name: "Tradded Shark", rarity: "Rare", baseWeight: 1, cashValue: 2, progress: 1, minusProgress: 1, power: 0 },
    { name: "Snail Shark", rarity: "Rare", baseWeight: 10, cashValue: 1, progress: 1, minusProgress: 8, power: 0 },
    { name: "Octopos Shark", rarity: "Rare", baseWeight: 2, cashValue: 1, progress: 1, minusProgress: 3, power: 0 },
    { name: "Goblin Shark", rarity: "Rare", baseWeight: 461, cashValue: 2, progress: 1, minusProgress: 25, power: 0 },
    { name: "XenoTage Shark", rarity: "Rare", baseWeight: 2, cashValue: 2, progress: 1, minusProgress: 5, power: 0 },
    { name: "Seam Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2, progress: 1, minusProgress: 30, power: 0 },
    { name: "Milk Shark", rarity: "Legendary", baseWeight: 3, cashValue: 5, progress: 1, minusProgress: 35, power: 0 },
    { name: "Locked Shark", rarity: "Legendary", baseWeight: 451, cashValue: 2, progress: 1, minusProgress: 5, power: 0 },
    { name: "Spart Shark", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
    { name: "Deep Shark", rarity: "Legendary", baseWeight: 1003, cashValue: 5, progress: 1, minusProgress: 50, power: 0 },
    { name: "Antarctic Shark", rarity: "Legendary", baseWeight: 50, cashValue:
    500, progress: 1, minusProgress: 21, power: 0 },
    { name: "Grand Shark", rarity: "Mythical", baseWeight: 293, cashValue: 5000,
    progress: 1, minusProgress: 55, power: 0 }
  ],
  DEEPSEACANYON: [
    { name: "Angler", rarity: "Common", baseWeight: 2, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Humpback Angler", rarity: "Common", baseWeight: 2, cashValue: 10,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Stoplight loosejaw", rarity: "Common", baseWeight: 2, cashValue: 15,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Footballfish", rarity: "Common", baseWeight: 2, cashValue: 50,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Black seadevil", rarity: "Common", baseWeight: 2, cashValue: 100,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Rattail", rarity: "Uncommon", baseWeight: 3, cashValue: 110,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Kartel Fish", rarity: "Uncommon", baseWeight: 7, cashValue: 120,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Ectacted Octopos", rarity: "Uncommon", baseWeight: 7, cashValue:
    230,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Fathead Angler", rarity: "Uncommon", baseWeight: 7, cashValue: 425,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Fathead Angler", rarity: "Uncommon", baseWeight: 7, cashValue: 234,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "⚫Void Angler", rarity: "Uncommon", baseWeight: 7, cashValue: 582,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Death Angler", rarity: "Uncommon", baseWeight: 7, cashValue: 284,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Membraned Angler", rarity: "Uncommon", baseWeight: 7, cashValue:
    392,
    progress: 1, minusProgress: 0, power: 0 }
    ],
TWILIGHTTRENCH: [
    { name: "Infant Lanternfish", rarity: "Common", baseWeight: 7, cashValue: 291,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Hatchetfish", rarity: "Uncommon", baseWeight: 7, cashValue: 294,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Plankton Colony", rarity: "Uncommon", baseWeight: 7, cashValue: 921,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Viperfish", rarity: "Rare", baseWeight: 7, cashValue: 281,
    progress: 1, minusProgress: 5, power: 0 },
    { name: "Deepfin Eel", rarity: "Legendary", baseWeight: 50, cashValue: 182,
    progress: 1, minusProgress: 35, power: 0 }
      ],
   MIDNIGHTTRENCH: [
    { name: "Fangtooth", rarity: "Uncommon", baseWeight: 7, cashValue: 129,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Gulper Eel", rarity: "Uncommon", baseWeight: 7, cashValue: 482,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Abbence Eel", rarity: "Uncommon", baseWeight: 7, cashValue: 294,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Golaith Antar Angler", rarity: "Legendary", baseWeight: 20,
    cashValue: 262,
    progress: 1, minusProgress: 64, power: 0 },
    { name: "Abyssal Dragonfish", rarity: "Mythical", baseWeight: 6000,
    cashValue: 839,
    progress: 1, minusProgress: 65, power: 0 }
  ],
  PHERISTORICSHIFTTRENCH: [
  { name: "Dunkleosteus", rarity: "Common", baseWeight: 1000, cashValue: 31, progress: 1, minusProgress: 5, power: 1 },  
  { name: "Ammonite", rarity: "Common", baseWeight: 500, cashValue: 81, progress: 1, minusProgress: 4, power: 1 },  
  { name: "Elasmosaurus", rarity: "Common", baseWeight: 2000, cashValue: 183, progress: 1, minusProgress: 6, power: 1 },  
  { name: "Xiphactinus", rarity: "Common", baseWeight: 800, cashValue: 382, progress: 1, minusProgress: 4, power: 1 },  
  { name: "Mawsonia", rarity: "Common", baseWeight: 600, cashValue: 482, progress: 1, minusProgress: 4, power: 1 },  
  { name: "Cretoxyrhina", rarity: "Common", baseWeight: 1500, cashValue: 583, progress: 1, minusProgress: 5, power: 1 },  
  { name: "Belemnite", rarity: "Common", baseWeight: 300, cashValue: 628, progress: 1, minusProgress: 3, power: 1 },  
  { name: "Coelacanth", rarity: "Common", baseWeight: 700, cashValue: 283, progress: 1, minusProgress: 4, power: 1 },  
  { name: "Pachycormus", rarity: "Common", baseWeight: 900, cashValue: 382, progress: 1, minusProgress: 5, power: 1 },  
  { name: "Stethacanthus", rarity: "Common", baseWeight: 1200, cashValue: 288, progress: 1, minusProgress: 5, power: 1 },  
  { name: "Giant Squid", rarity: "Unusual", baseWeight: 5000, cashValue: 293, progress: 1, minusProgress: 10, power: 1 },  
  { name: "Snappers", rarity: "Rare", baseWeight: 50, cashValue: 1, progress:
  283, minusProgress: 8, power: 1 },  
  { name: "Lizard Fish", rarity: "Uncommon", baseWeight: 5, cashValue: 281, progress: 1, minusProgress: 6, power: 1 },  
  { name: "Kronosaurus", rarity: "Mythical", baseWeight: 12000, cashValue: 18282, progress: 1, minusProgress: 50, power: 1 },  
  { name: "Black Demon Shark", rarity: "Legendary", baseWeight: 8000, cashValue:
  1828, progress: 1, minusProgress: 40, power: 1 },  
  { name: "Hydrothermal Octopus", rarity: "Unusual", baseWeight: 3000,
  cashValue: 9273, progress: 1, minusProgress: 11, power: 1 },  
  { name: "Abyssal Leviathan", rarity: "Mythical", baseWeight: 15000, cashValue:
  48291, progress: 1, minusProgress: 77, power: 1 },  
  { name: "Shadow Eel", rarity: "Legendary", baseWeight: 6000, cashValue: 371, progress: 1, minusProgress: 30, power: 1 },  
  { name: "Deep Sea Titan", rarity: "Mythical", baseWeight: 18000, cashValue:
  183, progress: 1, minusProgress: 80, power: 1 },  
  { name: "Frost Serpent", rarity: "Legendary", baseWeight: 7000, cashValue: 2891, progress: 1, minusProgress: 35, power: 1 },  
  { name: "Crimson Fangtooth", rarity: "Unusual", baseWeight: 4000, cashValue:
  1828, progress: 1, minusProgress: 10, power: 1 },  
  { name: "Thunderfin Leviathan", rarity: "Mythical", baseWeight: 16000,
  cashValue: 2891, progress: 1, minusProgress: 60, power: 1 },  
  { name: "Void Angler", rarity: "Legendary", baseWeight: 9000, cashValue: 1388, progress: 1, minusProgress: 40, power: 1 },  
  { name: "Eclipse Ray", rarity: "Unusual", baseWeight: 5500, cashValue: 8281, progress: 1, minusProgress: 15, power: 1 },  
  { name: "Aether Jellyfish", rarity: "Mythical", baseWeight: 11000, cashValue:
  2831, progress: 1, minusProgress: 55, power: 1 },  
  { name: "Molten Fangray", rarity: "Legendary", baseWeight: 8500, cashValue:
  8329, progress: 1, minusProgress: 20, power: 1 },  
  { name: "Spectral Plesiosaur", rarity: "Mythical", baseWeight: 14000,
  cashValue: 2847, progress: 1, minusProgress: 60, power: 1 },  
  { name: "Abyss Serpent", rarity: "Legendary", baseWeight: 7500, cashValue: 1, progress: 1, minusProgress: 35, power: 1 },  
  { name: "Stormcaller Nautilus", rarity: "Unusual", baseWeight: 5000,
  cashValue: 82891, progress: 1, minusProgress: 40, power: 1 },  
  { name: "Leviadragon", rarity: "Mythical", baseWeight: 20000, cashValue: 1728, progress: 1, minusProgress: 60, power: 1 },  
  { name: "Leviathan", rarity: "Exotic", baseWeight: 1000000, cashValue: 38740, progress: 1, minusProgress: 77, power: 1 },  
  { name: "Ghost Leviathan", rarity: "Exotic", baseWeight: 1000000, cashValue:
  4830, progress: 1, minusProgress: 80, power: 1 },  
  { name: "Infant Gargantuan", rarity: "Secret", baseWeight: 10, cashValue: 2288, progress: 1, minusProgress: 80, power: 1 },  
  { name: "🗝️The Lost Key", rarity: "Secret", baseWeight: 0, cashValue: 5000000, progress: 1, minusProgress: 100, power: 1 }
    ],
    SWAMPY: [
        { name: "Mire Catfish", rarity: "Common", baseWeight: 2.5, cashValue: 10, progress: 5, minusProgress: 1, power: 2 },
        { name: "Bog Eel", rarity: "Uncommon", baseWeight: 1.8, cashValue: 15, progress: 6, minusProgress: 1.2, power: 3 },
        { name: "Mud Perch", rarity: "Common", baseWeight: 1.2, cashValue: 8, progress: 4, minusProgress: 0.8, power: 2 },
        { name: "Swamp Gar", rarity: "Rare", baseWeight: 4.5, cashValue: 25, progress: 7, minusProgress: 1.5, power: 4 },
        { name: "Toadfish", rarity: "Uncommon", baseWeight: 2.0, cashValue: 12, progress: 5, minusProgress: 1.1, power: 3 },
        { name: "Ghost Minnow", rarity: "Rare", baseWeight: 0.8, cashValue: 30, progress: 8, minusProgress: 1.7, power: 5 },
        { name: "Frog", rarity: "Rare", baseWeight: 0.8, cashValue: 30, progress: 8, minusProgress: 1.7, power: 5 },
        { name: "Leechfish", rarity: "Epic", baseWeight: 3.2, cashValue: 50, progress: 9, minusProgress: 2.0, power: 6 },
        { name: "Blackwater Croc", rarity: "Legendary", baseWeight: 9.0, cashValue: 150, progress: 12, minusProgress: 3.0, power: 8 },
        { name: "Swamp Snapper", rarity: "Epic", baseWeight: 6.5, cashValue: 80, progress: 10, minusProgress: 2.5, power: 7 },
        { name: "Mossback Gator", rarity: "Mythical", baseWeight: 14.0, cashValue: 400, progress: 16, minusProgress: 4.5, power: 10 }
    ],

//DEFUALT FISHON
THEOCEAN:[
  // COMMON (Easiest to catch)
  { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 5, progress: 1, minusProgress: 0, power: 0 },
  { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 7, progress: 1, minusProgress: 0, power: 0 },
  { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 6, progress: 1, minusProgress: 0, power: 0 },
  { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 12, progress: 1, minusProgress: 0, power: 0 },
  { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 25, progress: 1, minusProgress: 1, power: 2 },

  { name: "Moon Fish", rarity: "Legendary", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },
  { name: "Crab", rarity: "Uncommon", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },
    { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },
    { name: "Dolphin", rarity: "Legendary", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },
    { name: "Sea Urchin", rarity: "Rare", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },
  { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 9, progress: 0.9, minusProgress: 2, power: 5 },
  { name: "Amberjack", rarity: "Uncommon", baseWeight: 20, cashValue: 15, progress: 0.8, minusProgress: 3, power: 7 },
  { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 14, progress: 0.8, minusProgress: 3, power: 7 },
  { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 20, progress: 0.7, minusProgress: 3, power: 8 },
  { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 18, progress: 0.8, minusProgress: 3, power: 7 },

  // UNUSUAL (Getting difficult)
  { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 50, progress: 0.7, minusProgress: 5, power: 15 },
  { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 40, progress: 0.7, minusProgress: 5, power: 14 },
  { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 60, progress: 0.6, minusProgress: 7, power: 20 },

  // RARE (Hard to catch)
  { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 85, progress: 0.6, minusProgress: 10, power: 25 },
  { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 200, progress: 0.5, minusProgress: 15, power: 30 },
  { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 95, progress: 0.5, minusProgress: 12, power: 27 },
  { name: "Halibut", rarity: "Rare", baseWeight: 41, cashValue: 150, progress: 0.5, minusProgress: 15, power: 30 },

  // LEGENDARY (Very hard to catch)
  { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 250, progress: 0.4, minusProgress: 30, power: 50 },
  { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 530, progress: 0.4, minusProgress: 35, power: 55 },
  { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 300, progress: 0.4, minusProgress: 30, power: 50 },
  { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 600, progress: 0.3, minusProgress: 40, power: 60 },

  // MYTHICAL (Extremely hard)
  { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 800, progress: 0.2, minusProgress: 45, power: 70 },
  { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 1000, progress: 0.2, minusProgress: 50, power: 80 },

  // COLOSSAL SQUID (Ultimate Challenge)
  { 
    name: "Colossal Squid", 
    rarity: "Mythical", 
    baseWeight: 500000, // Big, but balanced
    cashValue: 500000, // Less than before to prevent easy money
    progress: 5, // Very slow progress
    minusProgress: 70, // Fast escape
    power: 100 // Insanely hard to catch
  }
],



    //EVENT FISHES

  CURSEDMEG: [
    { name: "Cursed Haddock", rarity: "Common", baseWeight: 4, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Mackerel", rarity: "Common", baseWeight: 4, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Mullet", rarity: "Common", baseWeight: 4, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Porgy", rarity: "Common", baseWeight: 6, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue:
    666, progress: 1, minusProgress: 0, power: 1 },
    { name: "Cursed Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue:
    666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Barracuda", rarity: "Unusual", baseWeight: 25, cashValue:
    666, progress: 1, minusProgress: 1, power: 14 },
    { name: "Cursed Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 666, progress: 1, minusProgress: 1, power: 14 },
    { name: "Cursed Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue:
    666, progress: 1, minusProgress: 10, power: 14 },
    { name: "Cursed Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 666, progress: 1, minusProgress: 2, power: 0 },
    { name: "Cursed Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 666, progress: 1, minusProgress: 0, power: 0 },
    { name: "Cursed Cookiecutter Shark", rarity: "Rare", baseWeight: 1,
    cashValue: 666, progress: 1, minusProgress: 1, power: 0 },
    { name: "Cursed Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 666, progress: 1, minusProgress: 8, power: 0 },
    { name: "Cursed Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 666, progress: 1, minusProgress: 3, power: 0 },
    { name: "Cursed Halibut", rarity: "Rare", baseWeight: 461, cashValue: 666, progress: 1, minusProgress: 25, power: 0 },
    { name: "Cursed Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 666, progress: 1, minusProgress: 5, power: 0 },
    { name: "Cursed Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue:
    666, progress: 1, minusProgress: 30, power: 0 },
    { name: "Cursed Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue:
    666, progress: 1, minusProgress: 35, power: 0 },
    { name: "Cursed Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2, progress: 1, minusProgress: 5, power: 0 },
    { name: "Cursed Flying Fish", rarity: "Legendary", baseWeight: 14,
    cashValue: 666, progress: 1, minusProgress: 26, power: 0 },
    { name: "Cursed Moon Fish", rarity: "Legendary", baseWeight: 1003,
    cashValue: 666, progress: 1, minusProgress: 50, power: 0 },
    { name: "Cursed SawFish", rarity: "Legendary", baseWeight: 50, cashValue:
    666, progress: 1, minusProgress: 21, power: 0 },
    { name: "Cursed Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue:
    666, progress: 1, minusProgress: 42, power: 0 },
    { name: "Cursed OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 666, progress: 1, minusProgress: 35, power: 0 },
    { name: "Cursed Colossal Squid", rarity: "Mythical", baseWeight: 3300,
    cashValue: 6666, progress: 1, minusProgress: 70, power: 0 },
    { name: "Cursed Megalodon", rarity: "Exotic", baseWeight: 120000, cashValue:
    273238800, progress: 1, minusProgress: 90, power: 250 }
  ],
 
MEGPOOLAES: [
    { name: "Megalodon", rarity: "Exotic", baseWeight: 120000 , cashValue: 534000,
    progress: 1, minusProgress: 80, power: 250 },
],
MEGPOOLAESOANHAY: [
    
    { name: "Seasonal Megalodon", rarity: "Exotic", baseWeight: 1200000
    , cashValue: 9000,
    progress: 1, minusProgress: 85, power: 509 }
],
GreatWhiteShark: [

    { name: "Great White Shark", rarity: "Mythical", baseWeight: 1400, cashValue: 580, progress: 1, minusProgress: 45, power: 250 }
    ],
    
GreatHammerHead: [
    { name: "Great HammerHead Shark", rarity: "Mythical", baseWeight: 10812,
    cashValue: 420, progress: 1, minusProgress: 35, power: 250 }
    ],
WhaleShark: [
    { name: "Whale Shark", rarity: "Mythical", baseWeight: 21000,
    cashValue: 23400, progress: 1, minusProgress: 75, power: 250 }
    ],
    
Event: [

    { name: "Great HammerHead Shark", rarity: "Mythical", baseWeight: 1012,
    cashValue: 420, progress: 1, minusProgress: 35, power: 250 },
    { name: "Great White Shark", rarity: "Mythical", baseWeight: 1400,
    cashValue: 10000, progress: 1, minusProgress: 45, power: 250 },
    { name: "Whale Shark", rarity: "Mythical", baseWeight: 21000,
    cashValue: 23400, progress: 1, minusProgress: 75, power: 250 },
 
    { name: "Megalodon", rarity: "Exotic", baseWeight: 120000 , cashValue: 534000,
    progress: 1, minusProgress: 80, power: 250 },
    { name: "Seasonal Megalodon", rarity: "Exotic", baseWeight: 1200000
    , cashValue: 9000,
    progress: 1, minusProgress: 85, power: 509 },
    { name: "Cursed Megalodon", rarity: "Exotic", baseWeight: 120000, cashValue:
    273238800, progress: 1, minusProgress: 90, power: 250 }
 ],
 
 SECRETANDLIMITED: [
{ name: "Patrick Star", rarity: "Secret", baseWeight: 1, cashValue: 30000,
progress:1, minusProgress: 45, power: 0 },
{ name: "🐊Salt Crocodile", rarity : "Secret", baseWeight: 100, cashValue:55000, progress: 1, minusProgress: 65, power: 0 },
{ name: "🍀Lucki Megalodon", rarity: "Secret", baseWeight: 777777, cashValue: 777777777777, progress:1, minusProgress: 77, power: 0 },
{ name: "🍀Green Fish", rarity: "Secret", baseWeight: 7000, cashValue: 5000000, progress: 1, minusProgress: 70, power: 0 }


   ]
};

// ✅ Open Fish Index (ONLY Creek & Ocean)


// ✅ Open Fish Index (ONLY Creek & Ocean)
function openFishIndex() {
    document.getElementById("fishIndexOverlay").style.display = "flex";
    updateFishList(""); // Load all fish initially
}

// ✅ Close Fish Index
function closeFishIndex() {
    document.getElementById("fishIndexOverlay").style.display = "none";
}
// Load caught fish from localStorage
let caughtFish = JSON.parse(localStorage.getItem("caughtFish")) || {};

// Function to save caught fish
function saveCaughtFish(fishName, location) {
    if (!caughtFish[location]) {
        caughtFish[location] = [];
    }
    if (!caughtFish[location].includes(fishName)) {
        caughtFish[location].push(fishName);
        localStorage.setItem("caughtFish", JSON.stringify(caughtFish));
    }
}

// Function to update the fish bestiary
function updateFishList(searchTerm = "") {
    const fishListContainer = document.getElementById("fishListContainer");
    fishListContainer.innerHTML = ""; // Clear previous list

    const allowedLocations = ["Creek", "ShallowOcean", "HaystackBeach",
        "HaystackislePound", "SNOWISLES", "HayBay", "SkullLands", "SunkenCity",
        "THEOCEAN", "DEEPSEACANYON", "MIDNIGHTTRENCH", "TWILIGHTTRENCH",
        "PHERISTORICSHIFTTRENCH", "Event"];

    allowedLocations.forEach(location => {
        if (fishList[location]) {
            const filteredFish = fishList[location].filter(fish =>
                fish.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredFish.length > 0) {
                const locationHeader = document.createElement("h2");
                locationHeader.textContent = `${location} - ${getCompletionPercentage(location)}% Complete`;
                locationHeader.id = location.replace(/\s+/g, "-");
                fishListContainer.appendChild(locationHeader);
            }

            filteredFish.forEach(fish => {
                const isDiscovered = caughtFish[location] && caughtFish[location].includes(fish.name);
                const displayName = isDiscovered ? fish.name : "???";
                const displayRarity = isDiscovered ? fish.rarity : "???";
                const displayBaseWeight = isDiscovered ? `${fish.baseWeight} KG` : "???";
                const displayCashValue = isDiscovered ? `${fish.cashValue} Coins` : "???";
                const displayPower = isDiscovered ? fish.power : "???";
                const displayProgress = isDiscovered ? fish.progress : "???";

                const fishCard = document.createElement("div");
                fishCard.classList.add("fish-card");
                fishCard.innerHTML = `
                    <h3>${displayName} (${displayRarity})</h3>
                    <p><strong>Location:</strong> ${location}</p>
                    <p><strong>Base Weight:</strong> ${displayBaseWeight}</p>
                    <p><strong>Value:</strong> ${displayCashValue}</p>
                    <p><strong>Power:</strong> ${displayPower}</p>
                    <p><strong>Progress:</strong> ${displayProgress}</p>
                `;
                fishListContainer.appendChild(fishCard);
            });
        }
    });

    createAreaButtons(); // Update area buttons after list updates
}

// Function to calculate Completion Percentage for Each Location
function getCompletionPercentage(location) {
    const totalFish = fishList[location] ? fishList[location].length : 0;
    const caughtCount = caughtFish[location] ? caughtFish[location].length : 0;
    return totalFish > 0 ? Math.floor((caughtCount / totalFish) * 100) : 0;
}

// Create Buttons to Scroll to Specific Areas
function createAreaButtons() {
    const buttonContainer = document.getElementById("areaButtons");
    buttonContainer.innerHTML = ""; // Clear previous buttons

    const allowedLocations = ["Creek", "ShallowOcean", "HaystackBeach",
        "HaystackislePound", "SNOWISLES", "HayBay", "SkullLands", "SunkenCity",
        "THEOCEAN", "DEEPSEACANYON", "MIDNIGHTTRENCH", "TWILIGHTTRENCH",
        "PHERISTORICSHIFTTRENCH", "Event"];

    allowedLocations.forEach(location => {
        const btn = document.createElement("button");
        btn.textContent = location;
        btn.onclick = () => scrollToArea(location);
        buttonContainer.appendChild(btn);
    });
}

// Scroll to Specific Area
function scrollToArea(area) {
    const section = document.getElementById(area.replace(/\s+/g, "-"));
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
window.onload = function() {
    currentLocation = localStorage.getItem("currentLocation") || "";
    console.log(`🔄 Loaded location: ${currentLocation}`);
};
function changeFishingArea(newLocation) {
    currentLocation = newLocation;
    localStorage.setItem("currentLocation", currentLocation); // Save for persistence
    console.log(`📍 Moved to: ${currentLocation}`);
}

function startFishing(source) {
    let area;
    
    // Check if source is a button (element) or direct area name (string)
    if (typeof source === "string") {
        area = source;  // Direct area name
    } else if (source.closest) {
        let fieldset = source.closest("fieldset");
        area = fieldset ? fieldset.id : null; // Get fieldset ID safely
    }

    // If no area found, show an error
    if (!area) {
        console.warn("⚠️ No fishing location selected!");
        alert("Please select a fishing area first!");
        return;
    }

    // Handle special case before setting default fishPool
    let fishPool;
if (area === "GreatHammerHead-pool") {
    fishPool = [...fishList.THEOCEAN, ...fishList.GreatHammerHead]; // Merge pools
} else if (area === "Meg-pool") {
    fishPool = [...fishList.THEOCEAN, ...fishList.MEGPOOLAES]; // Add Megalodon pool
} else if (area === "SeasonalMeg-pool") {
    fishPool = [...fishList.THEOCEAN, ...fishList.MEGPOOLAESOANHAY]; // Add Seasonal Meg
} else if (area === "GreatWhite-pool") {
    fishPool = [...fishList.THEOCEAN, ...fishList.GreatWhiteShark]; // Add Great White Shark
} else {
    fishPool = Array.isArray(fishList[area]) && fishList[area].length > 0 ? fishList[area] : fishList.THEOCEAN;
}


    // Select a random fish
currentFish = applyMutation(getRandomFish(fishPool));
currentFish = applyMutation(currentFish);

    // Start the fishing mini-game
    fishPosition = 130;
    document.getElementById("miniGame").style.display = "block";
    updateFishPosition();
    miniGameLoop();
    console.log(`🎣 Fishing in: ${area}`);

    // Update UI elements
    document.getElementById("minusProgressText").innerText = ` -${currentFish.minusProgress}% Progress`;
    Reelerio.play();
    document.getElementById("StartButtonFish").disabled = true;
    document.body.style.overflow = "hidden";

    // ✅ Prevent multiple Aurora effects
    if (localStorage.getItem("mythicalBoost") === "active") {
        let existingAurora = document.getElementById("auroraEffect");
        if (existingAurora) existingAurora.remove();
        let aurora = document.createElement("div");
        aurora.classList.add("aurora-effect");
        aurora.id = "auroraEffect";
        document.body.appendChild(aurora);
    }

    // Save location
    currentLocation = area;
    localStorage.setItem("currentLocation", currentLocation);
}


// ✅ Remove Aurora Effect when fishing ends
function stopFishing() {
    document.getElementById("miniGame").style.display = "none";
    let aurora = document.getElementById("auroraEffect");
    if (aurora) aurora.remove();
}







// ✅ Handle Input Search
function searchFish() {
    const searchTerm = document.getElementById("fishSearch").value;
    updateFishList(searchTerm);
}
function fishFightBack(resilience) {
    let baseChance = 0.4; // Default fight chance (40%)
    let strongFightChance = 0.02; // Strong fight chance (2%)

    // Reduce fight chance based on rod resilience
    let adjustedChance = baseChance - (resilience * 0.01);
    let adjustedStrongChance = strongFightChance - (resilience * 0.0005); // Small adjustment for stronger fights

    // Prevent negative chances
    adjustedChance = Math.max(0.05, adjustedChance); // Min 5% chance for normal fights
    adjustedStrongChance = Math.max(0.002, adjustedStrongChance); // Min 0.2% chance for strong fights

    let randomChance = Math.random(); // Generate a random value between 0 and 1

    if (randomChance < adjustedChance) { // Normal fight
        let fightPower = Math.floor(Math.random() * 31) + 10; // Random -10% to -40%
        fishPosition -= fightPower; 
        RodMessage(`🐟 Fish Fights Back! -${fightPower}% Progress`);
    } else if (randomChance < adjustedStrongChance) { // Strong fight
        let fightPower = Math.floor(Math.random() * 50) + 10; // Random -10% to -50%
        fishPosition -= fightPower; 
        RodMessage(`❗FISH FIGHT FULL POWER❗`);
    }
}

function getRandomFish(fishList) {
    let fishPool = [];
    let mythicalBoost = localStorage.getItem("mythicalBoost") === "active"; // ✅ Check if Aaoura Totem is active

fishList.forEach(fish => {
    let chance = 0;
    switch (fish.rarity) {
        case "Junk": chance = 25; break; // Slightly less common
        case "Common": chance = 45; break; // Still frequent
        case "Uncommon": chance = 20; break; // Less than before
        case "Rare": chance = 5; break; // Lower chance
        case "Limited": chance = 2; break; // Harder to get
        case "Unusual": chance = 1.5; break; // Very rare now
        case "Legendary": chance = 4; break; // Balanced, still very rare
        case "Mythical": chance = mythicalBoost ? 8 : 4; break; // Nerfed base chance
        case "Exotic": chance = 0.5; break; // Almost impossible
        case "Secret": chance = 0.05; break; // Extremely rare!
    }

    for (let i = 0; i < chance; i++) {
        fishPool.push(fish);
    }
});


    return fishPool[Math.floor(Math.random() * fishPool.length)];
}
const fishMutations = [
    { name: "Albino", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 5 }) },
    { name: "Big", effect: (fish) => ({ ...fish, baseWeight: fish.baseWeight * 10 }) },
    { name: "Shiny", effect: (fish) => ({ ...fish, cashValue: fish.cashValue * 5 }) },
    { name: "Sparkling", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 2 }) },
    { name: "Electric", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 2 }) },
    { name: "Negative", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 3 }) },
    { name: "Fossilized", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 5 }) },
    { name: "Lunar", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 10 }) },
    { name: "Solarblaze", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 10 }) },
    { name: "Translucent", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 5.2 }) },
    { name: "Darkened", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 2 }) },
    { name: "Hexed", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 3 }) },
    { name: "Silver", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 2 }) },
    { name: "Ambered", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 6 }) },
    { name: "Midas", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 7 }) },
    { name: "Glossy", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 3 }) },
    { name: "Abbysal", effect: (fish) => ({ ...fish, cashValue: fish.cashValue + 3 }) },
    { name: "Giant", effect: (fish) => ({ ...fish, baseWeight: fish.baseWeight * 60 }) }
];


function tapButton() {
    if (!currentFish) return;

    let now = Date.now();
    lastClickTimes = lastClickTimes.filter(time => now - time < 1000);

    // Overheat Block
    if (lastClickTimes.length >= maxClicksPerSecond) {
        if (!isBlocked) {
            isBlocked = true;
            showEvent("☝️🤓: Your rod has overheated! Please wait.");
            
            document.getElementById("tapButton").disabled = true;
            setTimeout(() => {
                isBlocked = false;
                document.getElementById("tapButton").disabled = false;
                showEvent("✅ Your rod has cooled down. You can fish again!");
            }, blockDuration);
        }
        return;
    }

    lastClickTimes.push(now);
    
    let selectedRod = JSON.parse(localStorage.getItem("selectedRod")) || rods[0];
    
    // **Combo Bonus: Faster tapping = more power**
    if (now - lastTapTime < 500) {
        comboCount++;
    } else {
        comboCount = 1;
    }
    lastTapTime = now;

    let comboBonus = Math.min(comboCount * 0.2, 3); // Max 3 bonus power
    let rodPower = (selectedRod.power || 1) + comboBonus;

    fishPosition += rodPower;
    
    showCombo(`🔥 Combo x${comboCount}! Power: +${comboBonus.toFixed(1)}`);

    // **Get Resilience Value**
    let resilience = selectedRod.resilience || 0; // Default to 0 if not set
    let fightChanceReduction = resilience * 0.001; // Higher resilience = lower fight chance

    // **Random Event Triggers with Resilience Factor**
    let randomChance = Math.random();

    if (randomChance < 0.002) { // 2% chance (Very rare)
        showEvent("✨ Fight Didn't Happen! Free Catch!");
    } else if (randomChance < 0.0001) { // 10% chance (Rare)
        fishPosition += 30; // Lucky Catch  
        showEvent("🍀 Lucky Catch Free +30% Progress");
    } else if (randomChance < (0.05 - fightChanceReduction)) { // 10% base chance, reduced by resilience
        let fightPower = Math.floor(Math.random() * 31) + 10; // Random between -10 and -40
        fishPosition -= fightPower; 
        RodMessage(`🐟 Fish Fights Back! -${fightPower}% Progress`);
    } else if (randomChance < (0.02 - fightChanceReduction)) { // 2% base chance, reduced by resilience
        let fightPower = Math.floor(Math.random() * 50) + 10; // Random between -10 and -50
        fishPosition -= fightPower; 
        RodMessage(`❗FISH FIGHT FULL POWER❗`);
    }

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

    let miniGame = document.getElementById("miniGame");

    // Add shake effect
    miniGame.classList.add("shakeMiniGame");

    // Remove shake after animation ends
    setTimeout(() => miniGame.classList.remove("shakeMiniGame"), 200);

    let audl = new Audio("Sounds/ui-click-43196.mp3");
    audl.play();
    updateFishPosition();

    if (selectedRod.name === "Trident") {
        TRIDEMTEFFECT();
    }
    if (selectedRod.name === "☠️Skull Rod") {
        SKULLRODD();
    }
}


//ROD EFFECTS & PASSIVE
function SKULLRODD() {
    let fishIcon = document.getElementById("fishIcon");

    if (!fishIcon) return;

    // Create a scratch effect element
    let scratchEffect = document.createElement("div");
    scratchEffect.classList.add("BONER-EFFECT");

    // Randomize the position slightly for variation
    let randomX = Math.floor(Math.random() * 20) - 10; // Shift left/right
    let randomY = Math.floor(Math.random() * 20) - 10; // Shift up/down
    let randomRotation = Math.floor(Math.random() * 30) - 15; // Slight rotation

    scratchEffect.style.left = `calc(50% + ${randomX}px)`;
    scratchEffect.style.top = `calc(50% + ${randomY}px)`;
    scratchEffect.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;

    fishIcon.appendChild(scratchEffect);

    // Play slash sound
    let slashSound = new Audio("./Sounds/SKULLRODIMPACT.mp3");
    slashSound.play();

    // Remove scratch effect after animation ends
    setTimeout(() => {
        scratchEffect.remove();
    let fsk = new Audio("./Sounds/SKULLRODCOMPELTE.mp3");
    fsk.volume = 0.3;
    fsk.play();
    triggerExplosion();
    }, 950);
}

function TRIDEMTEFFECT() {
    let fishIcon = document.getElementById("fishIcon");

    if (!fishIcon) return;

    // Create a scratch effect element
    let scratchEffect = document.createElement("div");
    scratchEffect.classList.add("scratch-effect");

    // Randomize the position slightly for variation
    let randomX = Math.floor(Math.random() * 20) - 10; // Shift left/right
    let randomY = Math.floor(Math.random() * 20) - 10; // Shift up/down
    let randomRotation = Math.floor(Math.random() * 30) - 15; // Slight rotation

    scratchEffect.style.left = `calc(50% + ${randomX}px)`;
    scratchEffect.style.top = `calc(50% + ${randomY}px)`;
    scratchEffect.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;

    fishIcon.appendChild(scratchEffect);

    // Play slash sound
    let slashSound = new Audio("./Sounds/Trident-soundSlash.mp3");
    slashSound.play();

    // Remove scratch effect after animation ends
    setTimeout(() => {
        scratchEffect.remove();
        
    }, 150);
}


//EFFECTEXPLODED
function triggerExplosion() {
    let fishIcon = document.getElementById("fishIcon");

    for (let i = 0; i < 20; i++) {
        let particle = document.createElement("div");
        particle.classList.add("explosion-particle");
        particle.innerHTML = "☠️";

        let angle = Math.random() * 360; // Random explosion direction
        let distance = Math.random() * 80 + 20; // Spread distance

        let x = Math.cos(angle * (Math.PI / 180)) * distance;
        let y = Math.sin(angle * (Math.PI / 180)) * distance;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);

        fishIcon.appendChild(particle);

        // Remove particles after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


//MINI GAME

function miniGameLoop() {
    miniGameInterval = setInterval(() => {
        fishPosition -= (5 + currentFish.minusProgress);

        if (fishPosition <= 0) {
            clearInterval(miniGameInterval);
failureBro.play();
            document.getElementById("miniGame").style.display = "none";
            resetCaughtStreak();
            showFailedCatchNotification("The fish escaped!");
        document.body.style.overflow = "auto";
fishsail.play();
document.getElementById("StartButtonFish").disabled = false;
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
function spawnCaughtParticles(x, y) {
    for (let i = 0; i < 15; i++) { // Creates 15 particles
        let particle = document.createElement("div");
        particle.classList.add("particle");

        // ✅ Randomize particle movement
        let xMove = (Math.random() - 0.5) * 200 + "px"; // Left or right
        let yMove = (Math.random() - 0.5) * 200 + "px"; // Up or down
        let xMove2 = (Math.random() - 0.5) * 300 + "px"; // More variance
        let yMove2 = (Math.random() - 0.5) * 300 + "px";

        particle.style.setProperty("--x", xMove);
        particle.style.setProperty("--y", yMove);
        particle.style.setProperty("--x2", xMove2);
        particle.style.setProperty("--y2", yMove2);

        // ✅ Position near the fish
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        document.body.appendChild(particle);

        // ✅ Remove after animation ends
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}
// Load the caught streak and last login time from localStorage


// Function to check if the player logged in today
function checkDailyLogin() {
    let today = new Date().toISOString().split("T")[0]; 
    let lastLoginDate = localStorage.getItem("lastLoginDate") || "";

    console.log(`🕵️ Last login date: ${lastLoginDate}`);
    console.log(`🕒 Today's date: ${today}`);

    if (lastLoginDate && lastLoginDate !== today) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        let yesterdayStr = yesterday.toISOString().split("T")[0];

        console.log(`🕒 Yesterday's date: ${yesterdayStr}`);

        if (lastLoginDate !== yesterdayStr) {
            console.warn("⚠️ Skipped a day! Resetting streak...");
            showEvent("Your Caught Streak Loss( You Skipped A Day)")
            caughtStreak = 0;
            localStorage.setItem("caughtStreak", caughtStreak);
            updateCaughtStreakUI();
        } else {
            console.log("✅ Logged in yesterday! Streak is safe.");
        }
    }

    // ✅ Save the current login date
    localStorage.setItem("lastLoginDate", today);
    console.log("📅 Last login date updated.");
}
function createSplash() {
    let fishStats = document.querySelector(".jumping-fish-stats");
    if (!fishStats) return; // Exit if element doesn't exist

    let rect = fishStats.getBoundingClientRect();
    let offsetX = rect.left + rect.width / 2 + window.pageXOffset; // Account for scrolling
    let offsetY = rect.top + rect.height / 2 + window.pageYOffset;

    for (let i = 0; i < 8; i++) { 
        let splash = document.createElement("div");
        splash.style.position = "absolute";
        splash.style.width = `${Math.random() * 35 + 20}px`;
        splash.style.height = splash.style.width;
        splash.style.background = "rgba(173, 216, 230, 0.9)";
        splash.style.borderRadius = "50%";
        splash.style.left = `${offsetX + (Math.random() * 60 - 30)}px`;
        splash.style.top = `${offsetY + (Math.random() * 30 - 15)}px`;
        splash.style.opacity = "1";
        splash.style.pointerEvents = "none";
        splash.style.zIndex = "1000";
        splash.style.transform = "scale(1)";
        document.body.appendChild(splash);

        let moveX = Math.random() * 50 - 25;
        let moveY = Math.random() * 40 - 20;

        setTimeout(() => {
            splash.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
            splash.style.transform = `translate(${moveX}px, ${moveY}px) scale(2.5)`;
            splash.style.opacity = "0";
        }, 10);

        setTimeout(() => splash.remove(), 800);
    }
}

function spawnCaughtParticles() {
    let fishStats = document.querySelector(".jumping-fish-stats");
    if (!fishStats) return; // Exit if element doesn't exist

    let rect = fishStats.getBoundingClientRect();
    let offsetX = rect.left + rect.width / 2 + window.pageXOffset;
    let offsetY = rect.top + rect.height / 2 + window.pageYOffset;

    for (let i = 0; i < 10; i++) {
        let particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "8px";
        particle.style.height = "8px";
        particle.style.background = "rgba(135, 206, 250, 0.9)";
        particle.style.borderRadius = "50%";
        particle.style.left = `${offsetX}px`;
        particle.style.top = `${offsetY}px`;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "999";
        document.body.appendChild(particle);

        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 70 + 20;
        let moveX = Math.cos(angle) * distance;
        let moveY = Math.sin(angle) * distance;
        let rotate = Math.random() * 360;

        setTimeout(() => {
            particle.style.transition = "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.9s ease-out";
            particle.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg) scale(0)`;
            particle.style.opacity = "0";
        }, 10);

        setTimeout(() => particle.remove(), 900);
    }
}

function fishCaught() {
    fishCaughtCount++;
    caughtStreak++;
    localStorage.setItem("caughtStreak", caughtStreak);
    console.log(`🎣 Fish caught! Streak increased to: ${caughtStreak}`);

    updateCaughtStreakUI();
    clearInterval(miniGameInterval);
    document.getElementById("miniGame").style.display = "none";

    let randomWeight = (Math.random() * (currentFish.baseWeight - 1) + 1).toFixed(2);
    let expGained = expRewards[currentFish.rarity] || 0;
    let mutations = [...currentFish.mutations]; // Keep existing mutations

    // Apply special rod-based mutations
    if (selectedRod.name === "🛠️Cybernetic Rod[2025]" && fishCaughtCount % 50 === 0) {
        let cyberMutation = { name: "Cyber", effect: (fish) => {
            fish.cashValue *= 2;
            fish.power += 5;
        }};
        mutations.push(cyberMutation.name);
        cyberMutation.effect(currentFish);
        console.log("Cyber Mutation Applied: " + currentFish.name);
    }
    if (selectedRod.name === "💎Crystalized Rod" && fishCaughtCount % 50 === 0) {
        let crystalMutation = { name: "Crystalized", effect: (fish) => {
            fish.cashValue *= 2;
            fish.power += 5;
        }};
        mutations.push(crystalMutation.name);
        crystalMutation.effect(currentFish);
        console.log("Crystalized Mutation Applied: " + currentFish.name);
    }

    // Generate unique fish key
    let mutationNames = mutations.length > 0 ? mutations.join(" ") : "";
    let fishKey = `${currentFish.rarity}_${mutationNames}_${currentFish.name}`.trim();

    // Get base cash value
    let fishData = fishList[currentLocation]?.find(f => f.name === currentFish.name);
    let cashValue = fishData ? fishData.cashValue : 0;

    // Ensure fish exists in ownedFish
    if (!ownedFish[fishKey]) {
        ownedFish[fishKey] = {
            name: currentFish.name,
            rarity: currentFish.rarity,
            mutations: mutations,
            count: 0,
            totalPower: 0,
            power: currentFish.power,
            weight: 0,
            cashValue: cashValue
        };
    }

    // Update fish stats in inventory
    ownedFish[fishKey].count++;
    ownedFish[fishKey].totalPower += parseFloat(randomWeight);
    ownedFish[fishKey].power += currentFish.power;
    ownedFish[fishKey].weight += parseFloat(randomWeight);

    // Save inventory to localStorage
    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));

    // Notify player of their catch
    showExpNotification(`+${expGained} EXP`);
    gainExp(expGained);
    checkLevelUp();
    showCatchNotification(`${mutationNames} ${currentFish.name}`, randomWeight, currentFish.rarity);

    document.getElementById("StartButtonFish").disabled = false;
    Reelerio.pause();
    fishslpash.play();
    
    let FLASHER = new Audio("./Sounds/success-68578.mp3");
    FLASHER.play();
    
    document.body.style.overflow = "auto";
    stopFishing();

    // Save the caught fish with the correct location
    saveCaughtFish(currentFish.name, currentLocation);

    updateUI();
    updateExpUI();
    updateInventoryUI();
    triggerInventoryItemAnimation(fishKey);
    spawnJumpingFishStats(fishKey, ownedFish[fishKey]);
}


// Function to reset streak if the player loses
function resetCaughtStreak() {
    if (caughtStreak > 0) {
        let username = localStorage.getItem("username") || "Unknown Player";
        showEvent(`${username} lost their caught streak to ${currentFish.name}!`);
    }

    caughtStreak = 0;
    localStorage.setItem("caughtStreak", caughtStreak);
    updateCaughtStreakUI();
}

// Call `resetCaughtStreak()` if the player **loses** the event
function updateCaughtStreakUI() {
    document.getElementById("caughtStreakDisplay").textContent = `Caught Streak: ${caughtStreak}`;
}


function applyMutation(fish) {
    let mutatedFish = { ...fish }; // Clone the fish
    mutatedFish.mutations = [];  // Ensure mutations exist

    if (Math.random() < mutationChance) { 
        let mutation = fishMutations[Math.floor(Math.random() * fishMutations.length)];
        mutation.effect(mutatedFish);  // Apply mutation effect
        mutatedFish.mutations.push(mutation.name);
    }

    console.log(`🎭 Applied Mutation: ${mutatedFish.mutations.join(", ") || "None"}`);
    return mutatedFish;
}

function applyCyberMutation() {
    let fishKeys = Object.keys(ownedFish); // Get all caught fish keys
    if (fishKeys.length === 0) return; // Safety check

    let mutatedFishKey = fishKeys[Math.floor(Math.random() * fishKeys.length)];
    let mutatedFish = ownedFish[mutatedFishKey];

    // Apply Cyber Mutation
    mutatedFish.name = "Cyber " + mutatedFish.name;
    mutatedFish.cashValue *= 2; // Double its sell value
    mutatedFish.power += 5; // Make it harder to catch if caught again

    console.log("Cyber Mutation Activated! " + mutatedFish.name + " is now a Cyber fish!");

    // Save updated inventory
    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));
}


function spawnJumpingFishStats(fishKey, fishData) {
    let jumpingStats = document.createElement("div");
    jumpingStats.classList.add("jumping-fish-stats");

    // ✅ Copy fish stats
    jumpingStats.innerHTML = `
        <strong class="${fishData.rarity}">${fishData.rarity} ${fishData.mutation || ''} ${fishData.name}</strong>
        <br>Count: ${fishData.count}
        <br>Weight: ${fishData.weight.toFixed(2)} KG
        <br>Power: ${fishData.power}
        ${fishData.mutation ? `<br><b>Effect:</b> ${fishData.mutation}` : ""}
    `;

    document.body.appendChild(jumpingStats);

    // ✅ Randomized launch position
    let startX = Math.random() * (window.innerWidth - 200);
    jumpingStats.style.left = `${startX}px`;

    // ✅ Randomized rotation & fling direction
    let randomAngle = Math.random() * 60 - 30; // Between -30° to 30°
    jumpingStats.style.transform = `rotate(${randomAngle}deg)`;

    // ✅ Apply animation
    jumpingStats.style.animation = `fishFling 2s ease-out`;

    // ✅ Remove after animation ends
    setTimeout(() => {
        jumpingStats.remove();
    }, 2000);
}


function triggerInventoryItemAnimation(fishKey) {
    // Find the newly added fish element in the inventory
    let fishElement = document.getElementById(`fish-${fishKey}`);
    if (fishElement) {
        // Add the jump class to trigger animation
        fishElement.classList.add('jump');

        // Remove the jump class after the animation ends to allow it to be triggered again
        fishElement.addEventListener('animationend', () => {
            fishElement.classList.remove('jump');
        });
    }
}

// Initialize variables (load from localStorage if available)


// Function to calculate required EXP per level
function expRequiredForLevel(level) {
    return 10 + (level * 5); // Increase requirement per level
}

// Function to handle EXP gain and leveling up
function gainExp(amount) {
    exp += amount; 
    console.log(`Gained ${amount} EXP, Total EXP: ${exp}/${maxExp}`);

    checkLevelUp(); // Check if player levels up

    // Save EXP progress
    localStorage.setItem("exp", exp);
    updateExpUI();
}

// Function to check and handle leveling up
function checkLevelUp() {
    console.log(`Checking Level Up: EXP = ${exp}, Required = ${maxExp}, Level = ${level}`);

    while (exp >= maxExp && level < maxLevel) {
        exp -= maxExp; // Carry over excess EXP
        level++;
        maxExp += 5; // Increase EXP cap per level
        console.log(`🎉 Level Up! New Level: ${level}, New Max EXP: ${maxExp}`);

        showExpNotification(`🎉 Level Up! You are now Level ${level}!`);
    let LEVELUPFIZJCHSH = new Audio("./Sounds/LEVEL.mp3");
    LEVELUPFIZJCHSH.play();
    }

    // Save updated EXP and Level
    localStorage.setItem("exp", exp);
    localStorage.setItem("level", level);
    localStorage.setItem("maxExp", maxExp);

    updateExpUI();
}

// Function to update UI
function updateExpUI() {
    document.getElementById("levelText").innerHTML = `
    Level ${level}
    EXP: ${exp}/${maxExp}
    `;

}






function updateUI() {
    let cash = parseFloat(localStorage.getItem("cash")) || 0; // Fetch updated cash
    document.getElementById("cashCount").innerText = cash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));
    updateInventoryUI();
}
function updateInventoryUI() {
    let inventoryElement = document.getElementById("inventory");
    let searchQuery = document.getElementById("inventorySearch").value.toLowerCase();

    if (!inventoryElement) {
        console.error("Inventory element not found!");
        return;
    }

    let inventoryHTML = "";

    for (let key in ownedFish) {
        let fish = ownedFish[key];

        if (!fish || !fish.name) {
            console.warn(`Invalid fish data:`, fish);
            continue;
        }

        if (!fish.name.toLowerCase().includes(searchQuery)) {
            continue;
        }

        // ✅ Ensure mutations are properly formatted
        let mutationText = (Array.isArray(fish.mutations) && fish.mutations.length > 0) 
            ? `(${fish.mutations.join(", ")})` 
            : "";

        let mutationEffect = "";
        let mutationClass = "";
        let rarityColor = "";

        switch (fish.rarity) {
            case "Common": rarityColor = "blue"; break;
            case "Uncommon": rarityColor = "lightblue"; break;
            case "Unusual": rarityColor = "mediumslateblue"; break;
            case "Rare": rarityColor = "lightgreen"; break;
            case "Limited": rarityColor = "limited-text"; break;
            case "Legendary": rarityColor = "legendary"; break;
            case "Mythical": rarityColor = "mythical"; break;
            case "Exotic": rarityColor = "rainbow-text"; break;
            case "Secret": rarityColor = "black-white-text"; break;
            default: rarityColor = "white";
        }

        // ✅ Apply mutation effects properly
        if (Array.isArray(fish.mutations) && fish.mutations.length > 0) {
            let effects = [];
            let mutationClasses = [];

            fish.mutations.forEach(mutationName => {
                let mutation = fishMutations.find(m => m.name === mutationName);
                if (mutation) {
                    // Extract effect value if available
                    let effectText = mutation.effect.toString();
                    let effectValue = effectText.match(/[\d.]+/) ? effectText.match(/[\d.]+/)[0] : "";

                    // Differentiate effect types
                    if (mutation.name === "Big" || mutation.name === "Giant") {
                        effects.push(`Weight x${effectValue}`);
                    } else if (mutation.name === "Cyber" || mutation.name === "Crystalized") {
                        effects.push(`Cash +${effectValue}, Power +5`);
                    } else {
                        effects.push(`Cash +${effectValue}`);
                    }

                    // Mutation class mapping
                    let classMap = {
                        "Shiny": "sparkle-effect",
                        "Sparkling": "sparkle-effect",
                        "Glossy": "sparkle-effect",
                        "Lunar": "glow-effect",
                        "Solarblaze": "glow-effect",
                        "Electric": "glow-effect",
                        "Darkened": "dark-aura",
                        "Abyssal": "abyssal-effect",
                        "Hexed": "hexer",
                        "Translucent": "translucent-effect",
                        "Fossilized": "fossilized-effect",
                        "Silver": "silver-effect",
                        "Ambered": "ambered-effect",
                        "Albino": "Albino-Color",
                        "Negative": "minusFishhahaha",
                        "Cyber": "cyber-design-mutstion",
                        "Crystalized": "crystalized-design"
                    };

                    if (classMap[mutation.name]) {
                        mutationClasses.push(classMap[mutation.name]);
                    }
                }
            });

            mutationEffect = effects.length > 0 ? `<br><b>Effects:</b> ${effects.join(", ")}` : "";
            mutationClass = mutationClasses.join(" ");
        }

        // ✅ Display mutations, effects, and class styles correctly
        inventoryHTML += `
            <div id="fish-${key}" class="inventory-item ${mutationClass}" data-fish-name="${fish.name}">
                <strong class="${rarityColor}">${fish.rarity} ${mutationText} ${fish.name}</strong>
                <br>Count: ${fish.count}
                <br>Weight: ${fish.weight.toFixed(2)} KG
                <br>Power: ${fish.power}
                ${mutationEffect ? `<br><b>Effect:</b> ${mutationEffect}` : ""}
                <br>
                <button class="sell-button" onclick="sellFish('${key}')">Sell</button>
                <button class="sell-all-button" onclick="sellAllOfType('${key}')">Sell All</button>
                <button class="favorite-button" onclick="toggleFavorite('${key}')">
                    ${favoriteFish[key] ? "★ Unfavorite" : "☆ Favorite"}
                </button>
            </div>
        `;
    }

inventoryElement.innerHTML = inventoryHTML || "<p>No fish found.</p>";

// 🛠 Fix: Remove bugged fish
document.querySelectorAll("[id^='fish-']").forEach(fish => {
    let fishName = fish.getAttribute("data-fish-name");
    let sellButton = fish.querySelector(".sell-button");
    let sellAllButton = fish.querySelector(".sell-all-button");

    // If the fish is missing a name or sell buttons, remove it
    if (!fishName || fishName.trim() === "" || !sellButton || !sellAllButton) {
        console.log("Removing bugged fish:", fish.id);
        fish.remove();
    }
});
}


function toggleFavorite(key) {
    favoriteFish[key] = !favoriteFish[key]; // Toggle favorite status
    localStorage.setItem("favoriteFish", JSON.stringify(favoriteFish)); // Save to storage
    updateInventoryUI(); // Refresh UI
}
function getFishData(fishName) {
    for (let location in fishList) {
        let foundFish = fishList[location].find(f => f.name === fishName);
        if (foundFish) return foundFish;
    }
    return null;
}

function calculateSellPrice(fish, fishData) {
    let basePrice = fishData.cashValue || 1; // Default base price if missing
    let weightModifier = Math.min(3, Math.max(0.75, fish.weight / fishData.baseWeight)); // Adjusted scaling  
    let rarityMultiplier = {
        "Common": 1,
        "Uncommon": 1.2,
        "Rare": 1.5,
        "Epic": 2,
        "Legendary": 3,
        "Mythical": 4,
        "Exotic": 5,
        "Secret": 7
    }[fishData.rarity] || 1;  
    let mutationBonus = (fish.mutationValue || 0) * 0.5; // Reduced mutation influence  

    return ((basePrice * weightModifier) + mutationBonus) * rarityMultiplier;
}

function sellAllExceptRare() {
    let excludedRarities = ["Legendary", "Limited", "Mythical", "Exotic", "Secret"];
    let favoriteFish = JSON.parse(localStorage.getItem("favoriteFish")) || {};
    
    let totalSellPrice = 0;
    let fishSold = 0;

    for (let key in ownedFish) {
        let fish = ownedFish[key];
        let fishData = getFishData(fish.name);
        
        if (!fishData) {
            console.log(`Fish data not found for ${fish.name}`);
            continue;
        }

        // Debug: Check fish rarity
        console.log(`Checking fish: ${fish.name}, Rarity: ${fishData.rarity}`);

        // Skip excluded rarities and favorited fish
        if (excludedRarities.includes(fishData.rarity) || favoriteFish[key]) {
            console.log(`Skipping ${fish.name} (Rarity: ${fishData.rarity}, Favorite: ${favoriteFish[key]})`);
            continue;
        }

        let sellPrice = calculateSellPrice(fish, fishData) * fish.count;
        totalSellPrice += sellPrice;
        fishSold += fish.count;

        delete ownedFish[key]; // Remove sold fish
    }

    if (fishSold === 0) {
        alert("No eligible fish to sell!");
        return;
    }

    let confirmSell = confirm(
        `Sell ${fishSold} fish for ${totalSellPrice.toFixed(2)} Coins?`
    );

    if (!confirmSell) return;

    let cash = parseFloat(localStorage.getItem("cash")) || 0;
    cash += totalSellPrice;
    localStorage.setItem("cash", cash.toFixed(2));

    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));
    updateInventoryUI();
    updateUI();
    showMoneyNotification(`Sold ${fishSold} fish for +${totalSellPrice.toFixed(2)} Coins`);

    new Audio("Sounds/CASHSDSSS.mp3").play();
}

function sellFish(key) {
    if (!ownedFish[key]) {
        console.log(`Fish not found: ${key}`);
        return;
    }

    let fish = ownedFish[key];
    let fishData = getFishData(fish.name);
    if (!fishData) {
        console.log(`Fish data not found for ${fish.name}`);
        return;
    }

    // Debug: Check fish data and sell price
    console.log(`Selling fish: ${fish.name}, Rarity: ${fishData.rarity}`);

    let sellPrice = calculateSellPrice(fish, fishData);

    let confirmSell = confirm(
        `Sell "${fish.name}" for ${sellPrice.toFixed(2)} Coins?`
    );

    if (!confirmSell) return;

    let cash = parseFloat(localStorage.getItem("cash")) || 0;
    cash += sellPrice;
    localStorage.setItem("cash", cash.toFixed(2));

    if (fish.count > 1) {
        fish.count--;
    } else {
        delete ownedFish[key];
    }

    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));
    updateInventoryUI();
    updateUI();
    showMoneyNotification(`Sold ${fish.name} for +${sellPrice.toFixed(2)} Coins`);

    new Audio("Sounds/CASHSDSSS.mp3").play();
}
function sellAllOfType(key) {
    // Check if the fish exists in the ownedFish object
    if (!ownedFish[key]) {
        console.log(`No fish found with key: ${key}`);
        return;
    }

    let fish = ownedFish[key];
    let fishData = getFishData(fish.name);
    
    // If fish data is missing, return
    if (!fishData) {
        console.log(`Fish data not found for ${fish.name}`);
        return;
    }

    // Debugging: Log fish details
    console.log(`Selling fish: ${fish.name}, Count: ${fish.count}, Rarity: ${fishData.rarity}`);

    // Calculate the total selling price
    let totalSellPrice = calculateSellPrice(fish, fishData) * fish.count;

    // Ask the user to confirm the sale
    let confirmSell = confirm(
        `Sell ALL ${fish.count}x "${fish.name}" for ${totalSellPrice.toFixed(2)} Coins?`
    );

    if (!confirmSell) return;

    // Get current cash from localStorage
    let cash = parseFloat(localStorage.getItem("cash")) || 0;
    cash += totalSellPrice;

    // Update cash in localStorage
    localStorage.setItem("cash", cash.toFixed(2));

    // Remove the sold fish from ownedFish
    delete ownedFish[key];

    // Save updated ownedFish to localStorage
    localStorage.setItem("ownedFish", JSON.stringify(ownedFish));

    // Update UI and inventory after selling
    updateInventoryUI();
    updateUI();
    showMoneyNotification(`Sold ${fish.name} (${fish.count}) for +${totalSellPrice.toFixed(2)} Coins`);

    // Play sound after the sale
    new Audio("Sounds/CASHSDSSS.mp3").play();
}




document.addEventListener("DOMContentLoaded", checkDailyLogin);
updateCaughtStreakUI();
updateUI();
updateExpUI();
createAreaFilterButtons();
updateFishList();
updateFishList();