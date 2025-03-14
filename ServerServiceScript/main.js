const StartfishFoxer = document.getElementById("StartButtonFish");
function startFishing(area) {
    let availableFish = fishList[area];
    currentFish = getRandomFish(availableFish);

    fishPosition = 130;
    document.getElementById("miniGame").style.display = "block";
    updateFishPosition();
    miniGameLoop();
    console.log("Fishing in", area);

    document.getElementById("minusProgressText").innerText = ` -${currentFish.minusProgress}% Progress`;
    Reelerio.play();
    document.getElementById("StartButtonFish").disabled = true;
    document.body.style.overflow = "hidden";

    // ✅ Show Aurora effect if Aaoura Totem is active
    if (localStorage.getItem("mythicalBoost") === "active") {
        let aurora = document.createElement("div");
        aurora.classList.add("aurora-effect");
        aurora.id = "auroraEffect";
        document.body.appendChild(aurora);
    }
}

// ✅ Remove Aurora Effect when fishing ends
function stopFishing() {
    document.getElementById("miniGame").style.display = "none";
    let aurora = document.getElementById("auroraEffect");
    if (aurora) aurora.remove();
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
const mutationChance = 0.1;
const fishList = {
  
Creek: [
        { name: "Nile Tilapia", rarity: "Common", baseWeight: 5, cashValue: 1, progress: 10, minusProgress: 0, power: 1 },
        { name: "Macquarie Perch", rarity: "Common", baseWeight: 5, cashValue: 1, progress: 10, minusProgress: 0, power: 1 },
        { name: "Brook Trout", rarity: "Common", baseWeight: 2, cashValue: 1, progress: 10, minusProgress: 1, power: 1 },
        { name: "Smallmouth Bass", rarity: "Uncommon", baseWeight: 3, cashValue:
        1, progress: 10, minusProgress: 0, power: 2 },
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
        10, minusProgress: 2, power: 0 },
        { name: "Leaf", rarity: "Junk", baseWeight: 0.1, cashValue: 0, progress:
        10, minusProgress: 0, power: 0 },
        { name: "Plank", rarity: "Junk", baseWeight: 0.1, cashValue: 0,
        progress: 10, minusProgress: 0, power: 0 }
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
        { name: "Barrel's of Fish", rarity: "Rare", baseWeight: 5, cashValue:
        2, progress: 1, minusProgress: 5, power: 1 },
        { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1, progress: 8, minusProgress: 0, power: 1 },
        { name: "Blue Fin Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 10, progress: 29, minusProgress: 20, power: 14 },
        { name: "Yellow Fin Tuna", rarity: "Legendary", baseWeight: 100, cashValue: 10, progress: 1, minusProgress: 20, power: 14 },
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
        { name: "Tarpon", rarity: "Unusual", baseWeight: 10, cashValue: 2, progress: 6, minusProgress: 9, power: 9 },
        { name: "Giant Trevally", rarity: "Unusual", baseWeight: 20, cashValue:
        2, progress: 6, minusProgress: 12, power: 12 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 2, progress: 6, minusProgress: 14, power: 14 }
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
    { name: "Scylla Serrata (Crab)", rarity: "Legendary", baseWeight: 15, cashValue: 5, progress: 1, minusProgress: 5, power: 1 },
    { name: "Slippers", rarity: "Legendary", baseWeight: 1, cashValue: 1, progress: 1, minusProgress: 20, power: 1 },
    
    { name: "Greg's Snail", rarity: "Mythical", baseWeight: 5, cashValue: 10, progress: 1, minusProgress: 15, power: 1 },
    { name: "Low Tapered Bass", rarity: "Mythical", baseWeight: 5, cashValue: 10, progress: 1, minusProgress: 15, power: 1 }
],
SNOWISLES: [
    { name: "Antarctic Cods", rarity: "Common", baseWeight: 0.1, cashValue: 1,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Mackerel Icefish", rarity: "Common", baseWeight: 2, cashValue: 2,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Fish", rarity: "Common", baseWeight: 6, cashValue: 2,
    progress: 1, minusProgress: 0, power: 0 },
    { name: "Polar Mackerel", rarity: "Common", baseWeight: 3, cashValue: 1,
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
    { name: "(🚜)Hay Fish", rarity: "Limited", baseWeight: 10, cashValue: 5,
    progress: 1, minusProgress: 20, power: 0 },
    { name: "(🚜)FishLeafer", rarity: "Limited", baseWeight: 10, cashValue: 1,
    progress: 1, minusProgress: 20, power: 0 },
    { name: "(🚜)Pumkin Eel", rarity: "Limited", baseWeight: 35, cashValue: 8,
    progress: 1, minusProgress: 45, power: 0 },
    { name: "(🚜)Big MudSkipper", rarity: "Limited", baseWeight: 35, cashValue: 8,
    progress: 1, minusProgress: 45, power: 0 },
    { name: "(🚜)Rice Leaf", rarity: "Limited", baseWeight: 35, cashValue: 8,
    progress: 1, minusProgress: 10, power: 0 },
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
//DEFUALT FISHON
THEOCEAN: [
    { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 5, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 }
  ],

    //EVENT FISHES
CursedMeg: [
    { name: "Cursed Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 5, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Cursed Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Cursed Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cursed Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Cursed Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Cursed Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Cursed Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Cursed Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Cursed Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cursed Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Cursed Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Cursed Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Cursed Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Cursed Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Cursed Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Cursed Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Cursed Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Cursed Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Cursed Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "Cursed SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Cursed Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "Cursed OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Cursed Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Cursed Megalodon", rarity: "Exotic", baseWeight: 120000 , cashValue: 5000,
    progress: 1, minusProgress: 80, power: 250 }
  ],
MEGPOOLAES: [
     { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 2, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 2,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Megalodon", rarity: "Exotic", baseWeight: 120000 , cashValue: 5000,
    progress: 1, minusProgress: 80, power: 250 }
],
MEGPOOLAESOANHAY: [
     { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mullet", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Porgy", rarity: "Common", baseWeight: 6, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Sea Bass", rarity: "Common", baseWeight: 20, cashValue: 2, progress:
    1, minusProgress: 0, power: 0 },
   { name: "Sardine", rarity: "Uncommon", baseWeight: 1.1, cashValue: 1,
   progress: 1, minusProgress: 0, power: 1 },
    { name: "Amberjack", rarity: "Uncommon", baseWeight: 99.9, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 2,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Seasonal Megalodon", rarity: "Exotic", baseWeight: 1200000
    , cashValue: 9000,
    progress: 1, minusProgress: 85, power: 509 }
],
GreatWhiteShark: [
   { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
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
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Great White Shark", rarity: "Mythical", baseWeight: 1400, cashValue: 580, progress: 1, minusProgress: 45, power: 250 }
    ],
GreatHammerHead: [
    { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
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
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Great HammerHead Shark", rarity: "Mythical", baseWeight: 1012,
    cashValue: 420, progress: 1, minusProgress: 35, power: 250 }
    ],
WhaleShark: [
    { name: "Haddock", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Mackerel", rarity: "Common", baseWeight: 4, cashValue: 1, progress:
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
    { name: "Cod", rarity: "Uncommon", baseWeight: 24, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Crab", rarity: "Uncommon", baseWeight: 3, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Oyster", rarity: "Uncommon", baseWeight: 1, cashValue: 1, progress:
    1, minusProgress: 0, power: 0 },
    { name: "Salmon", rarity: "Uncommon", baseWeight: 11, cashValue: 3, progress:
    1, minusProgress: 0, power: 0 },
        { name: "Barracuda", rarity: "Unusual", baseWeight: 25, cashValue: 5,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Lobster", rarity: "Unusual", baseWeight: 3, cashValue: 3,
        progress: 1, minusProgress: 1, power: 14 },
        { name: "Nurse Shark", rarity: "Unusual", baseWeight: 125, cashValue: 2,
        progress: 1, minusProgress: 10, power: 14 },
        { name: "Angler Fish", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 2, power: 0 },
        { name: "Sea Urchin", rarity: "Rare", baseWeight: 1, cashValue: 1,
        progress: 1, minusProgress: 0, power: 0 },
        { name: "Cookiecutter Shark", rarity: "Rare", baseWeight: 1, cashValue: 2,
        progress: 1, minusProgress: 1, power: 0 },
        { name: "Coelacanth", rarity: "Rare", baseWeight: 10, cashValue: 1,
        progress: 1, minusProgress: 8, power: 0 },
        { name: "Sting Ray", rarity: "Rare", baseWeight: 2, cashValue: 1,
        progress: 1, minusProgress: 3, power: 0 },
        { name: "Halibut", rarity: "Rare", baseWeight: 461, cashValue: 2,
        progress: 1, minusProgress: 25, power: 0 },
        { name: "Pufferfish", rarity: "Rare", baseWeight: 2, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Bull Shark", rarity: "Legendary", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 30, power: 0 },
        { name: "Crown Bass", rarity: "Legendary", baseWeight: 3, cashValue: 5,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Dolphin", rarity: "Legendary", baseWeight: 451, cashValue: 2,
        progress: 1, minusProgress: 5, power: 0 },
        { name: "Flying Fish", rarity: "Legendary", baseWeight: 14, cashValue: 3, progress: 1, minusProgress: 26, power: 0 },
        { name: "Moon Fish", rarity: "Legendary", baseWeight: 1003, cashValue:
        5,
        progress: 1, minusProgress: 50, power: 0 },
        { name: "SawFish", rarity: "Legendary", baseWeight: 50, cashValue: 5,
        progress: 1, minusProgress: 21, power: 0 },
        { name: "Sea Pickle", rarity: "Mythical", baseWeight: 1, cashValue: 6,
        progress: 1, minusProgress: 42, power: 0 },
        { name: "OarFish", rarity: "Mythical", baseWeight: 10, cashValue: 2,
        progress: 1, minusProgress: 35, power: 0 },
        { name: "Colossal Squid", rarity: "Mythical", baseWeight: 3300,
        cashValue: 15,
        progress: 1, minusProgress: 70, power: 0 },
    { name: "Whale Shark", rarity: "Mythical", baseWeight: 21000,
    cashValue: 650, progress: 1, minusProgress: 75, power: 250 }
    ],
    
Event: [

    { name: "Great HammerHead Shark", rarity: "Mythical", baseWeight: 1012,
    cashValue: 420, progress: 1, minusProgress: 35, power: 250 },
    { name: "Great White Shark", rarity: "Mythical", baseWeight: 1400,
    cashValue: 580, progress: 1, minusProgress: 45, power: 250 },
    { name: "Whale Shark", rarity: "Mythical", baseWeight: 21000,
    cashValue: 650, progress: 1, minusProgress: 75, power: 250 },
 
    { name: "Megalodon", rarity: "Exotic", baseWeight: 120000 , cashValue: 5000,
    progress: 1, minusProgress: 80, power: 250 },
    { name: "Seasonal Megalodon", rarity: "Exotic", baseWeight: 1200000
    , cashValue: 9000,
    progress: 1, minusProgress: 85, power: 509 }
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
function updateFishList(searchTerm) {
    const fishListContainer = document.getElementById("fishListContainer");
    fishListContainer.innerHTML = ""; // Clear previous list

    const inventory = document.getElementById("inventory").textContent; // Get inventory content
    const allowedLocations = ["Creek", "ShallowOcean", "HaystackBeach",
        "HaystackislePound", "SNOWISLES", "HayBay", "SkullLands", "SunkenCity", " THEOCEAN", "Event"]; // ✅ Only show these locations

    allowedLocations.forEach(location => {
        if (fishList[location]) {
            const filteredFish = fishList[location].filter(fish =>
                fish.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredFish.length > 0) {
                const locationHeader = document.createElement("h2");
                locationHeader.textContent = location;
               locationHeader.id = location.replace(/\s+/g, "-");
                fishListContainer.appendChild(locationHeader);
            }

            filteredFish.forEach(fish => {
                const isCaught = inventory.includes(fish.name); // Check if fish is in inventory
                const displayName = isCaught ? fish.name : "???";
                const displayRarity = isCaught ? fish.rarity : "???";
                const displayBaseWeight = isCaught ? `${fish.baseWeight} KG` : "???";
                const displayCashValue = isCaught ? `${fish.cashValue} Coins` : "???";
                const displayPower = isCaught ? fish.power : "???";
                const displayProgress = isCaught ? fish.progress : "???";

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
}


// ✅ Handle Input Search
function searchFish() {
    const searchTerm = document.getElementById("fishSearch").value;
    updateFishList(searchTerm);
}
function getRandomFish(fishList) {
    let fishPool = [];
    let mythicalBoost = localStorage.getItem("mythicalBoost") === "active"; // ✅ Check if Aaoura Totem is active

    fishList.forEach(fish => {
        let chance = 0;
        switch (fish.rarity) {
            case "Junk": chance = 30; break;
            case "Common": chance = 50; break;
            case "Uncommon": chance = 25; break;
            case "Rare": chance = 5; break;
            case "Limited": chance = 3; break;
            case "Unusual": chance = 2; break;
            case "Legendary": chance = 6; break;
            case "Mythical": chance = mythicalBoost ? 10 : 5; break; // ✅ Doubled chance if boost is active
            case "Exotic": chance = 1; break;
            case "Secret": chance = 0.1; break;
        }

        for (let i = 0; i < chance; i++) {
            fishPool.push(fish);
        }
    });

    return fishPool[Math.floor(Math.random() * fishPool.length)];
}
const fishMutations = [
    { name: "Albino", effect: (fish) => fish.cashValue += 5 },
    { name: "Big", effect: (fish) => fish.baseWeight *= 10 },
    { name: "Shiny", effect: (fish) => fish.cashValue *= 5 },
    { name: "Sparkling", effect: (fish) => fish.cashValue += 1 },
    { name: "Sparkling", effect: (fish) => fish.cashValue += 2 },
    { name: "Electric", effect: (fish) => fish.cashValue += 2 },
    { name: "Negative", effect: (fish) => fish.cashValue += 3 },
    { name: "Fossilized", effect: (fish) => fish.cashValue += 5 },
    { name: "Lunar", effect: (fish) => fish.cashValue += 10 },
    { name: "Solarblaze", effect: (fish) => fish.cashValue += 10 },
    { name: "Translucent", effect: (fish) => fish.cashValue += 5.2},
    { name: "Darkened", effect: (fish) => fish.cashValue += 2 },
    { name: "Hexed", effect: (fish) => fish.cashValue += 3 },
    { name: "Silver", effect: (fish) => fish.cashValue += 2 },
    { name: "Ambered", effect: (fish) => fish.cashValue += 6 },
    { name: "Midas", effect: (fish) => fish.cashValue += 7 },
    { name: "Glossy", effect: (fish) => fish.cashValue += 3 },
    { name: "Abbysal", effect: (fish) => fish.cashValue += 3 },
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
        alert("Anti Cheat: Your Rod Had Been Broken for AutoClicking to fast. You Have Kicked From the server");
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

// 🎣 Call the function when a fish is caught
function fishCaught() {
    clearInterval(miniGameInterval);
    document.getElementById("miniGame").style.display = "none";

    let cash = parseFloat(localStorage.getItem("cash")) || 0;
    let randomWeight = (Math.random() * (currentFish.baseWeight - 1) + 1).toFixed(2);
    let moneyGained = parseFloat(randomWeight) * currentFish.cashValue;

    let expGained = expRewards[currentFish.rarity] || 0;
    let mutation = Math.random() < mutationChance ? fishMutations[Math.floor(Math.random() * fishMutations.length)] : null;
    if (mutation) mutation.effect(currentFish);

    cash += moneyGained;
    localStorage.setItem("cash", cash.toFixed(2));
    exp += expGained;

    let mutationName = mutation ? `${mutation.name} ` : "";
    let fishKey = `${currentFish.rarity}_${mutationName}${currentFish.name}`;

    if (!ownedFish[fishKey]) {
        ownedFish[fishKey] = { name: currentFish.name, rarity: currentFish.rarity, mutation: mutation ? mutation.name : null, count: 0, totalPower: 0, power: 0, weight: 0 };
    }

    ownedFish[fishKey].count++;
    ownedFish[fishKey].totalPower += parseFloat(randomWeight);
    ownedFish[fishKey].power += currentFish.power;
    ownedFish[fishKey].weight += parseFloat(randomWeight);

    showExpNotification(`+${expGained} EXP`);
    checkLevelUp();
    showCatchNotification(`${mutationName}${currentFish.name}`, randomWeight, currentFish.rarity);
    showMoneyNotification(`+${moneyGained.toFixed(2)} Coins`);

    document.getElementById("StartButtonFish").disabled = false;
    Reelerio.pause();
    fishslpash.play();
    Succesor.play();
    document.body.style.overflow = "auto";
    stopFishing();

    updateUI();
    updateExpUI();
    updateInventoryUI();

    triggerInventoryItemAnimation(fishKey);
    spawnJumpingFishStats(fishKey, ownedFish[fishKey]);

    // ✅ Spawn particles at the center of the screen (adjust as needed)
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    spawnCaughtParticles(centerX, centerY);
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


function triggerMegalodonDialogue(jumpingStats) {
    let dialogueBox = document.createElement("div");
    dialogueBox.classList.add("megalodon-dialogue");
    dialogueBox.innerHTML = `<p>Woah, what's this?</p><button onclick="nextMegalodonText(1)">Next</button>`;
    document.body.appendChild(dialogueBox);
    
    window.nextMegalodonText = function(step) {
        if (step === 1) {
            dialogueBox.innerHTML = `<p>Oh my...</p><button onclick="nextMegalodonText(2)">Next</button>`;
        } else if (step === 2) {
            dialogueBox.remove();
            triggerMegalodonCutscene(jumpingStats);
        }
    };
}

function triggerMegalodonCutscene(jumpingStats) {
    // ✅ Darken the screen
    let overlay = document.createElement("div");
    overlay.classList.add("megalodon-overlay");
    document.body.appendChild(overlay);

    // ✅ Camera Shake Effect
    document.body.classList.add("shake-hard");

    // ✅ Play deep ocean sound
    let oceanSound = new Audio("deep_ocean.mp3");
    oceanSound.volume = 0.7;
    oceanSound.play();

    // ✅ Play distant roar after 2 seconds
    setTimeout(() => {
        let roarSound = new Audio("megalodon_roar.mp3");
        roarSound.volume = 1;
        roarSound.play();
    }, 2000);

    // ✅ Create dramatic text
    let textPopup = document.createElement("div");
    textPopup.classList.add("megalodon-text");
    textPopup.innerText = "The Legend Rises...";
    document.body.appendChild(textPopup);

    // ✅ Make the Megalodon appear BIG and jump SLOWER
    jumpingStats.classList.add("megalodon-jump");

    // ✅ Splash Effect
    setTimeout(() => {
        let splash = document.createElement("div");
        splash.classList.add("megalodon-splash");
        document.body.appendChild(splash);

        // Remove splash after 3s
        setTimeout(() => {
            splash.remove();
        }, 3000);
    }, 3500);

    // ✅ Remove everything after 5 seconds
    setTimeout(() => {
        document.body.classList.remove("shake-hard");
        overlay.remove();
        textPopup.remove();
        jumpingStats.remove();
    }, 5000);
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
    let cash = parseFloat(localStorage.getItem("cash")) || 0; // Fetch updated cash
    document.getElementById("cashCount").innerText = cash.toFixed(2);
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

        let mutationText = fish.mutation ? `(${fish.mutation})` : "";
        let mutationEffect = "";
        let mutationClass = "";
        let rarityColor = ""; // Color for rarity

        // ✅ Assign colors based on rarity
        switch (fish.rarity) {
            case "Common":
                rarityColor = "blue";
                break;
            case "Uncommon":
                rarityColor = "lightblue";
                break;
            case "Unusual":
                rarityColor = "mediumslateblue";
                break;
            case "Rare":
                rarityColor = "lightgreen";
                break;
            case "Limited":
                rarityColor = "limited-text";
                break;
            case "Legendary":
                rarityColor = "legendary";
                break;
            case "Mythical":
                rarityColor = "mythical";
                break;
            case "Exotic":
                rarityColor = "rainbow-text"; // Special CSS for rainbow effect
                break;
            case "Secret":
                rarityColor = "black-white-text"; // Special CSS for black & white effect
                break;
            default:
                rarityColor = "white"; // Default color
        }

        let mutation = fishMutations.find(m => m.name === fish.mutation);
        if (mutation) {
            let effectMatch = mutation.effect.toString().match(/[\d.]+/);
            let effectValue = effectMatch ? effectMatch[0] : "";

            if (mutation.name === "Big" || mutation.name === "Giant") {
                mutationEffect = `Weight x${effectValue}`;
            } else {
                mutationEffect = `Cash +${effectValue}`;
            }

            if (["Shiny", "Sparkling", "Glossy"].includes(mutation.name)) {
                mutationClass = "sparkle-effect";
            } else if (["Lunar", "Solarblaze", "Electric"].includes(mutation.name)) {
                mutationClass = "glow-effect";
            } else if (["Darkened", "Abyssal"].includes(mutation.name)) {
                mutationClass = "dark-aura";
            } else if (["Hexed"].includes(mutation.name)) {
                mutationClass = "hexer";
            } else if (mutation.name === "Translucent") {
                mutationClass = "translucent-effect";
            } else if (mutation.name === "Electric") {
                mutationClass = "electric-effect";
            } else if (mutation.name === "Fossilized") {
                mutationClass = "fossilized-effect";
            } else if (mutation.name === "Abyssal") {
                mutationClass = "abyssal-effect";
            } else if (mutation.name === "Silver") {
                mutationClass = "silver-effect";
            } else if (mutation.name === "Ambered") {
                mutationClass = "ambered-effect";
            } else if (mutation.name === "Albino") {
                mutationClass = "Albino-Color";
            } else if (mutation.name === "Negative") {
                mutationClass = "minusFishhahaha";
            }
        }

        inventoryHTML += `
            <div id="fish-${key}" class="inventory-item ${mutationClass}">
                <strong class="${rarityColor}">${fish.rarity} ${mutationText} ${fish.name}</strong>
                <br>Count: ${fish.count}
                <br>Weight: ${fish.weight.toFixed(2)} KG
                <br>Power: ${fish.power}
                ${mutationEffect ? `<br><b>Effect:</b> ${mutationEffect}` : ""}
            </div>
        `;
    }

    inventoryElement.innerHTML = inventoryHTML || "<p>No fish found.</p>";
}

updateUI();
updateExpUI();
