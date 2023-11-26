let antalPlankor = 0;
let zombieClickCounter = 0;
let antalPengar = 0;
let antalMaterial = 0;
let antalVapendelar = 0;
let zombieTyp = Math.floor(Math.random() * 3) + 1; // Slumpa en zombie

const reqClicks = 10;
let clicksTKill = reqClicks; // Sätt initialt antal klick att döda till reqClicks

const zombieImage = document.querySelector(".left-section");
const clicksToKillElement = document.querySelector(".clicks-to-kill");
const plankorElement = document.querySelector(".wood-resources");
const pengarElement = document.querySelector(".money-resources");
const materialElement = document.querySelector(".material-resources");
const vapendelarElement = document.querySelector(".weapon-parts");
const stats = document.querySelector(".stats");

const baseUpgradeBtn = document.querySelector(".upgrade-base");
const weaponUpgradeBtn = document.querySelector(".upgrade-weapon");

const baseUpgradeSection = document.querySelector(".baseUpgrades");
const weaponUpgradeSection = document.querySelector(".weaponUpgrades");

//Uppgradering visuellt
weaponUpgradeSection.style.display = "none";

baseUpgradeBtn.addEventListener("click", function () {
  baseUpgradeSection.style.display = "block";
  weaponUpgradeSection.style.display = "none";
});

weaponUpgradeBtn.addEventListener("click", function () {
  baseUpgradeSection.style.display = "none";
  weaponUpgradeSection.style.display = "block";
});
// ------------------------------

const baseUpgrade1 = document.querySelector(".baseUpgrade1");
const baseUpgrade2 = document.querySelector(".baseUpgrade2");
let plankGainInterval;
let baseUpgradeCount = 0;

baseUpgrade1.addEventListener("click", function () {
  const upgradeCost = calculateUpgradeCost(baseUpgradeCount);

  if (antalPlankor >= upgradeCost) {
    const bUpg1Text = document.querySelector(".bUpg1");

    antalPlankor -= 6;
    plankorElement.textContent = antalPlankor;
    bUpg1Text.textContent = upgradeCost;

    plankGainInterval = setInterval(function () {
      antalPlankor += 1;
      plankorElement.textContent = antalPlankor;
    }, 1000);

    baseUpgradeCount += 1;
  }
});

function calculateUpgradeCost(count) {
  return Math.ceil(6 * Math.pow(1.05, count));
}

let killCount = 0;
let kills = document.querySelector(".kills");

function genereraSlumpadeResurser(zombieTyp) {
  switch (zombieTyp) {
    case 1:
      return {
        plankor: Math.floor(Math.random() * 3) + 1,
        pengar: 100,
        material: Math.floor(Math.random() * 3) + 3,
        vapendelar: Math.floor(Math.random() * 3) + 1,
      };
    case 2:
      return {
        plankor: Math.floor(Math.random() * 4) + 3,
        pengar: 300,
        material: Math.floor(Math.random() * 7) + 9,
        vapendelar: Math.floor(Math.random() * 4) + 3,
      };
    case 3:
      return {
        plankor: 9,
        pengar: 500,
        material: Math.floor(Math.random() * 6) + 15,
        vapendelar: Math.floor(Math.random() * 3) + 9,
      };
    default:
      return {
        plankor: 0,
        pengar: 0,
        material: 0,
        vapendelar: 0,
      };
  }
}

// Funktion för att öka antalet plankor
function ökaAntalPlankor() {
  antalPlankor += 1;
  plankorElement.textContent = antalPlankor;
}

// Funktion för att hantera klick på zombien
function hanteraZombieKlick() {
  zombieClickCounter++;
  clicksTKill -= 1;

  clicksToKillElement.textContent = clicksTKill;

  if (clicksTKill === 0) {
    const slumpadeResurser = genereraSlumpadeResurser(zombieTyp);

    antalPlankor += slumpadeResurser.plankor;
    antalPengar += slumpadeResurser.pengar;
    antalMaterial += slumpadeResurser.material;
    antalVapendelar += slumpadeResurser.vapendelar;

    plankorElement.textContent = antalPlankor;
    pengarElement.textContent = antalPengar;
    materialElement.textContent = antalMaterial;
    vapendelarElement.textContent = antalVapendelar;

    zombieClickCounter = 0;

    zombieTyp = Math.floor(Math.random() * 3) + 1;

    clicksTKill = reqClicks;
    clicksToKillElement.textContent = clicksTKill;
  }

  if (zombieClickCounter === reqClicks) {
    ökaAntalPlankor();
    zombieClickCounter = 0;
    kills.textContent = killCount += 1;
    console.log(killCount);
  }
}

// Funktion som körs när sidan har laddats helt
function init() {
  zombieImage.addEventListener("click", hanteraZombieKlick);
}

// Lyssna på "load"-händelsen för att köra init-funktionen
window.addEventListener("load", init);
