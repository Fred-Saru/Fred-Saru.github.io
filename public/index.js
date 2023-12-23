(() => {
    const footsteps = document.querySelectorAll(".footstep");

    footsteps.forEach(el => {
        const angle = (Math.random() * 30) - 15;
        el.style.setProperty('--footstep-rotation', angle +'deg');
    });

    const choixpeau = document.querySelector(".choixpeau");
    choixpeau.addEventListener("mousedown", () => {
        const roulette = document.querySelector(".roulette");
        roulette.classList.add("play");
    });

    choixpeau.addEventListener("mouseup", () => {
        const roulette = document.querySelector(".roulette");
        roulette.classList.remove("play");
    });
})();