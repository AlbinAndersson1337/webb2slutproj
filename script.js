let antalPlankor = 0;
let zombieClickCounter = 0;
let antalPengar = 0;
let antalMaterial = 0;
let antalVapendelar = 0;
const reqClicks = 10;
const clicksTKill = document.querySelector(".clicks-to-kill");
const zombieImage = document.querySelector(".left-section");

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

// funktion för att öka antalet plankor
function ökaAntalPlankor() {
  antalPlankor += 1;
  const plankorElement = document.querySelector(".wood-resources");
  plankorElement.textContent = antalPlankor;
}

// funktion för att hantera klick på zombien
function hanteraZombieKlick() {
  zombieClickCounter++;
  clicksTKill.textContent -= 1;

  if (clicksTKill.textContent == 0) {
    const zombieTyp = Math.floor(Math.random() * 3) + 1; //Slumpa en zombie
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

    clicksTKill.textContent = 10;
  }

  if (zombieClickCounter === reqClicks) {
    ökaAntalPlankor();
    zombieClickCounter = 0;
  }
}

// funktion som körs när sidan har laddats helt
function init() {
  zombieImage.addEventListener("click", hanteraZombieKlick);
}

// lyssna på "load"-händelsen för att köra init-funktionen
window.addEventListener("load", init);
