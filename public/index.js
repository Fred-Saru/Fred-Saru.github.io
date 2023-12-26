const defaultCookie = {
    "gryfCounter": 20,
    "serdCounter": 20,
    "serpCounter": 20,
    "poufCounter": 20
};

const houses = [
    "gryffondor",
    "poufsouffle",
    "serdaigle",
    "serpentard",
];

const charatersByHouses = {
    "gryffondor": [
        "harry",
        "ron",
        "hermione",
        "albus",
        "alastor",
        "rubeus",
        "sirius"
    ],
    "poufsouffle": [
        "pomona",
        "cedric",
        "nymphadora",
        "newton",
        "susan",
        "justin",
        "friar"
    ],
    "serdaigle": [
        "sybil",
        "luna",
        "cho",
        "myrtle",
        "gilderoy",
        "quirinus",
        "filius"
    ],
    "serpentard": [
        "lord",
        "severus",
        "draco",
        "bellatrix",
        "dolores",
        "horace",
        "lucius"
    ],
};

const charaters = [...charatersByHouses.gryffondor, ...charatersByHouses.poufsouffle, ...charatersByHouses.serdaigle, ...charatersByHouses.serpentard];

function generateRoulette() {
    let roulette = "";
    charaters.forEach((char, idx) => {
        roulette += `<div class="wizard" style="animation-delay: -${0.5 * idx}s;"><img src="public/img/characters/${char}.png" alt="${char}" class="keep-axis"/></div>`;
    });
    return roulette;
};

function generateFootstep(side) {
    let footsteps = "";
    const count = side == "left" ? 6 : 7;
    const offset = side == "left" ? 0.75 : 0;

    for (let i = 0; i < count; i++) {
        footsteps += `<img src="public/img/footstep.png" alt="footstep" class="footstep" style="animation-delay: ${10 - (1.5 * i + offset)}s" />`;
    }

    return footsteps;
}

function startRoulette() {
    const roulette = document.querySelector(".roulette");
    roulette.innerHTML = generateRoulette();

    const wrapper = document.querySelector(".choixpeauWrapper");
    wrapper.classList.remove("choixpeau");

    const houseId = Math.round(Math.random() * 3);

    setInterval(() => {
        const house = houses[houseId];
        wrapper.classList.add(house);
    }, 3000);

}

function endRoulette() {
    const roulette = document.querySelector(".roulette");
}

function getCookie(name) {
    const value = document.cookie
        .split(";")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];

    return !!value ? JSON.parse(value) : defaultCookie;
}

(() => {
    document.querySelector("section.left").innerHTML = generateFootstep("left");
    document.querySelector("section.right").innerHTML = generateFootstep("right");

    const poudlardCounter = getCookie("poudlard");

    if (!poudlardCounter) {
        document.cookie = `poudlard=${JSON.stringify(defaultCookie)};expires=${new Date("Jan 30 2024 00:00:00").toUTCString()}`;
    }

    const footsteps = document.querySelectorAll(".footstep");
    footsteps.forEach(el => {
        const angle = (Math.random() * 30) - 15;
        el.style.setProperty('--footstep-rotation', angle + 'deg');
    });

    const choixpeau = document.querySelector("img.choixpeau");

    choixpeau.addEventListener("touchstart", startRoulette);
    choixpeau.addEventListener("mousedown", startRoulette);

    choixpeau.addEventListener("touchend", endRoulette);
    choixpeau.addEventListener("mouseup", endRoulette);
})();