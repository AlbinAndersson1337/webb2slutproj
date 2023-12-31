// initiera grundläggande variabler
let antalPlankor = 0;
let zombieClickCounter = 0;
let antalPengar = 0;
let antalMaterial = 0;
let antalVapendelar = 0;
let zombieTyp = Math.floor(Math.random() * 3) + 1; // Slumpa en zombie
let killCount = 0;
const reqClicks = 10;
let clicksTKill = reqClicks;
// element för spelområdet och resurser
const zombieImage = document.querySelector(".left-section");
const clicksToKillElement = document.querySelector(".clicks-to-kill");
const plankorElement = document.querySelector(".wood-resources");
const pengarElement = document.querySelector(".money-resources");
const materialElement = document.querySelector(".material-resources");

const resourceReferences = [plankorElement, pengarElement, materialElement];

const vapendelarElement = document.querySelector(".weapon-parts");
const stats = document.querySelector(".stats");

//uppgradeingsknappar
const baseUpgradeBtn = document.querySelector(".upgrade-base");
const weaponUpgradeBtn = document.querySelector(".upgrade-weapon");
// inställningar för intervalluppgradering

let resourcesInterval = null;
let testInterval = null;

const baseUpgradeSection = document.querySelector(".baseUpgrades");
const weaponUpgradeSection = document.querySelector(".weaponUpgrades");
//lagrar all resurs info
const allInfo = {
  resurser: {
    plankor: {
      value: 0,
      inc: 0,
      ref: plankorElement,
      faktor: 1,
    },
    pengar: {
      value: 0,
      inc: 0,
      ref: pengarElement,
      faktor: 1,
    },
    material: {
      value: 0,
      inc: 0,
      ref: materialElement,
      faktor: 1,
    },
    vapendelar: {
      value: 0,
      inc: 0,
      ref: vapendelarElement,
      faktor: 1,
    },
  },
};
// lagrar info för hur många klick för att döda zombie
const clicksToKillobj = {
  zombies: {
    zombie1: {
      clicksTKill: 10,
    },
    zombie2: {
      clicksTKill: 30,
    },
    zombie3: {
      clicksTKill: 50,
    },
  },
};

//döljer uppgraderingar för vapen och vice versa
weaponUpgradeSection.style.display = "none";

baseUpgradeBtn.addEventListener("click", function () {
  baseUpgradeSection.style.display = "block";
  weaponUpgradeSection.style.display = "none";
});

weaponUpgradeBtn.addEventListener("click", function () {
  baseUpgradeSection.style.display = "none";
  weaponUpgradeSection.style.display = "block";
});

// basfunktionen för uppgraderingarna
function handleUpgrade(upgradeElement, resources, cost, rate) {
  let count = 0;

  upgradeElement.addEventListener("click", function () {
    const upgradeCost = calculateUpgradeCost(cost, count);

    if (resourcesAreSufficient(upgradeCost)) {
      spendResources(upgradeCost);
      startResourceGainInterval(rate);

      count += 1;
      updateUpgradeCost(upgradeElement, cost, count);
      displayResourceValues();
    } else {
    }
  });
}
// kalkulerar uppgraderingskostnaden
function calculateUpgradeCost(baseCost, count) {
  let ret = [];
  for (let i = 0; i < baseCost.length; i++) {
    ret.push(Math.ceil(baseCost[i] * Math.pow(1.05, count)));
    console.log(ret);
  }
  return ret;
  return Math.ceil(baseCost * Math.pow(1.05, count));
}
// kollar om man har tillräckligt med resurser
function resourcesAreSufficient(cost) {
  return Object.keys(allInfo.resurser).every(
    (r, i) => allInfo.resurser[r].value >= cost[i]
  );
}
// spenderar resurser
function spendResources(cost) {
  Object.keys(allInfo.resurser).forEach(
    (r, i) => (allInfo.resurser[r].value -= cost[i])
  );
}
// startar intervallet för att öka resurserna
function startResourceGainInterval(rate) {
  // Update inc
  Object.keys(allInfo.resurser).forEach(
    (r, i) => (allInfo.resurser[r].inc += rate[i])
  );
  if (!testInterval) {
    testInterval = setInterval(() => {
      Object.keys(allInfo.resurser).forEach((r) => {
        allInfo.resurser[r].value += allInfo.resurser[r].inc;
      });
      // update Resource Display in similar manner.
      displayResourceValues();
    }, 1000);
  }
}
// visar resursvärdena
function displayResourceValues() {
  Object.keys(allInfo.resurser).forEach((r) => {
    allInfo.resurser[r].ref.textContent = allInfo.resurser[r].value;
  });
}
// uppdaterar displayen för resurserna
function updateResourceDisplay(index, value) {
  const resourceReference = resourceReferences[index];
  if (resourceReference) {
    resourceReference.textContent = value;
  }
}
//  uppdaterar uppgraderingskostnaden
function updateUpgradeCost(upgradeElement, baseCost, count) {
  // Update the display for the upgrade cost
  const costElement = upgradeElement.querySelector(".bUpg1");
  if (costElement) {
    const upgradeCost = calculateUpgradeCost(baseCost, count);
    costElement.textContent = upgradeCost;
  }
}
// basfunktionen för uppgraderingarna
let baseUpgrade1 = document.querySelector(".baseUpgrade1");
let baseUpgrade2 = document.querySelector(".baseUpgrade2");
// kallar på funktionen för uppgraderingarna
handleUpgrade(
  baseUpgrade1,
  [antalPlankor, antalPengar, antalMaterial],
  [6, 20, 10, 0], // New 0 for vapendelar
  [1, 5, 3, 0] // New 0 for vapendelar
);
handleUpgrade(
  baseUpgrade2,
  [antalPlankor, antalPengar, antalMaterial],
  [10, 30, 20, 0],
  [2, 10, 5, 0]
);
// funktion för uppgradering av vapen
function handleWepUpgrade(upgradeElement, resources, cost, factors) {
  let count = 0;

  upgradeElement.addEventListener("click", function () {
    const upgradeCost = calculateUpgradeCost(cost, count);

    if (resourcesAreSufficient(upgradeCost)) {
      spendResources(upgradeCost);

      resources.forEach((resource, i) => {
        allInfo.resurser[resource].faktor =
          allInfo.resurser[resource].faktor * factors[i];
      });

      count += 1;
      updateUpgradeCost(upgradeElement, cost, count);
    } else {
      console.log("Broke");
    }
  });
}
// kallar på funktionen för uppgradering av vapen
const weaponUpgrade1 = document.querySelector(".weaponUpgrade1");
const weaponUpgrade2 = document.querySelector(".weaponUpgrade2");
handleWepUpgrade(
  weaponUpgrade1,
  ["plankor", "pengar", "material"],
  [10, 30, 20, 40],
  [1.2, 1.1, 1.5, 1.3]
);
handleWepUpgrade(
  weaponUpgrade2,
  ["plankor", "pengar", "material"],
  [20, 40, 30, 50],
  [1.3, 1.2, 1.6, 1.4]
);
// hämtar element för att visa antal dödade zombies
let kills = document.querySelector(".kills");
// funktion för att generera slumpade resurser
function genereraSlumpadeResurser(zombieTyp) {
  switch (zombieTyp) {
    case 1:
      return {
        plankor: Math.floor(Math.random() * 3) + 1,
        pengar: 100,
        material: Math.floor(Math.random() * 3) + 3,
        vapendelar: Math.floor(Math.random() * 3) + 1,
        clicksTKill: 10,
      };
    case 2:
      return {
        plankor: Math.floor(Math.random() * 4) + 3,
        pengar: 300,
        material: Math.floor(Math.random() * 7) + 9,
        vapendelar: Math.floor(Math.random() * 4) + 3,
        clicksTKill: 30,
      };
    case 3:
      return {
        plankor: 9,
        pengar: 500,
        material: Math.floor(Math.random() * 6) + 15,
        vapendelar: Math.floor(Math.random() * 3) + 9,
        clicksTKill: 50,
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
    // Generera slumpade resurser
    const slumpadeResurser = genereraSlumpadeResurser(zombieTyp);
    const clickTest = clicksToKillobj.zombies["zombie" + zombieTyp].clicksTKill;
    console.log("Innan justering");
    console.log(slumpadeResurser);
    // Justera resurserna med faktorerna
    slumpadeResurser.plankor = Math.floor(
      (slumpadeResurser.plankor =
        slumpadeResurser.plankor * allInfo.resurser.plankor.faktor)
    );
    slumpadeResurser.plankor = Math.floor(
      (slumpadeResurser.plankor =
        slumpadeResurser.plankor * allInfo.resurser.pengar.faktor)
    );
    slumpadeResurser.plankor = Math.floor(
      (slumpadeResurser.plankor =
        slumpadeResurser.plankor * allInfo.resurser.material.faktor)
    );
    slumpadeResurser.plankor = Math.floor(
      (slumpadeResurser.plankor =
        slumpadeResurser.plankor * allInfo.resurser.vapendelar.faktor)
    );
    console.log("Efter justering");
    console.log(slumpadeResurser);

    console.log(clickTest);
    antalPlankor += slumpadeResurser.plankor;
    antalPengar += slumpadeResurser.pengar;
    antalMaterial += slumpadeResurser.material;
    antalVapendelar += slumpadeResurser.vapendelar;
    clicksTKill = slumpadeResurser.clicksTKill;

    allInfo.resurser["plankor"].value += slumpadeResurser.plankor;
    allInfo.resurser["pengar"].value += slumpadeResurser.pengar;
    allInfo.resurser["material"].value += slumpadeResurser.material;
    allInfo.resurser["vapendelar"].value += slumpadeResurser.vapendelar;
    clicksToKillobj["zombies"].value += slumpadeResurser.clicksTKill;

    plankorElement.textContent = antalPlankor;
    pengarElement.textContent = antalPengar;
    materialElement.textContent = antalMaterial;
    vapendelarElement.textContent = antalVapendelar;
    clicksTKill.textContent = clicksTKill;

    zombieClickCounter = 0;

    zombieTyp = Math.floor(Math.random() * 3) + 1;

    kills.textContent = killCount += 1;

    clicksTKill = clickTest;
    clicksToKillElement.textContent = clicksTKill;
  }
}

// hämta ljud
const backgroundMusic = document.querySelector("#backgroundMusic");
const toggleButton = document.querySelector("#toggleButton");

toggleButton.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    toggleButton.textContent = "Pause music";
  } else {
    backgroundMusic.pause();
    toggleButton.textContent = "Play music";
  }
});
// hämta bild
const zmbImg = document.querySelector(".left-section");
let state = false;
// ändra bild
zmbImg.addEventListener("click", () => {
  if (clicksTKill > 0) {
    if (zombieTyp === 1) {
      zombieImage.style.backgroundImage = "url('images/zombie1.jpg')";
    } else if (zombieTyp === 2) {
      zombieImage.style.backgroundImage = "url('images/zombie2.png')";
    } else if (zombieTyp === 3) {
      zombieImage.style.backgroundImage = "url('images/zombie3.png')";
    } else {
      zombieImage.style.backgroundImage = "url('images/zombie1.jpg')";
    }
  }
});

// Funktion som körs när sidan har laddats helt
function init() {
  zombieImage.addEventListener("click", hanteraZombieKlick);
}

// lyssna på "load"-händelsen för att köra init-funktionen
window.addEventListener("load", init);
