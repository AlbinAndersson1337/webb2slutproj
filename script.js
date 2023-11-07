let antalPlankor = 0;
let zombieClickCounter = 0;
const reqClicks = 10;
const clicksTKill = document.querySelector(".clicks-to-kill");
const zombieImage = document.querySelector(".left-section");

window.addEventListener("load", function () {
  zombieImage.addEventListener("click", function () {
    zombieClickCounter++;
    clicksTKill.textContent -= 1;

    if (clicksTKill.textContent == 0) {
      clicksTKill.textContent = 10;
    }

    if (zombieClickCounter === reqClicks) {
      antalPlankor += 1;

      zombieClickCounter = 0;

      const plankorElement = document.querySelector(".wood-resources");
      plankorElement.textContent = antalPlankor;
    }
  });
});
