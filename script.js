let antalPlankor = 0;
let zombieClickCounter = 0;
let antalPengar = 0;
let antalMaterial = 0;
let antalVapendelar = 0;
let zombieTyp = Math.floor(Math.random() * 3) + 1; //Slumpa en zombie

const reqClicks = 10;
let clicksShow = document.querySelector(".clicks-to-kill");
let clicksTKill = reqClicks; // Sätt initialt antal klick att döda till reqClicks

const zombieImage = document.querySelector(".left-section img");
const clicksToKillElement = document.querySelector(".clicks-to-kill");

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
        reqClicks: 10,
        plankor: Math.floor(Math.random() * 4) + 3,
        pengar: 300,
        material: Math.floor(Math.random() * 7) + 9,
        vapendelar: Math.floor(Math.random() * 4) + 3,
      };
    case 3:
      return {
        reqClicks: 30,
        plankor: 9,
        pengar: 500,
        material: Math.floor(Math.random() * 6) + 15,
        vapendelar: Math.floor(Math.random() * 3) + 9,
      };
    default:
      return {
        reqClicks: 50,
        plankor: 0,
        pengar: 0,
        material: 0,
        vapendelar: 0,
      };
  }
}

// funktion för att öka antalet plankor
function ökaAntalPlankor() {
  antalPlankor += 1;
  const plankorElement = document.querySelector(".wood-resources");
  plankorElement.textContent = antalPlankor;
}

// funktion för att hantera klick på zombien
function hanteraZombieKlick() {
  zombieClickCounter++;
  clicksShow.textContent -= 1; // Minska antalet klick att döda

  // Uppdatera gränssnittet

  if (clicksTKill == 0) {
    const slumpadeResurser = genereraSlumpadeResurser(zombieTyp); //Slumpa resurser

    antalPlankor += slumpadeResurser.plankor;
    antalPengar += slumpadeResurser.pengar;
    antalMaterial += slumpadeResurser.material;
    antalVapendelar += slumpadeResurser.vapendelar;

    const plankorElement = document.querySelector(".wood-resources");
    const pengarElement = document.querySelector(".money-resources");
    const materialElement = document.querySelector(".material-resources");
    const vapendelarElement = document.querySelector(".weapon-parts-resources");

    plankorElement.textContent = antalPlankor;
    pengarElement.textContent = antalPengar;
    materialElement.textContent = antalMaterial;
    vapendelarElement.textContent = antalVapendelar;

    zombieClickCounter = 0;

    // Slumpa en ny zombie-typ för nästa zombi
    zombieTyp = Math.floor(Math.random() * 3) + 1;

    clicksTKill = reqClicks;
    clicksTKill.textContent = reqClicks; // Återställ antalet klick att döda till det krävda antalet
  }

  if (zombieClickCounter === reqClicks) {
    ökaAntalPlankor();
    zombieClickCounter = reqClicks - 1;
    kills.textContent += 1;
  }
}

// funktion som körs när sidan har laddats helt
function init() {
  zombieImage.addEventListener("click", hanteraZombieKlick);
}

// lyssna på "load"-händelsen för att köra init-funktionen
window.addEventListener("load", init);
