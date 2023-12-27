const defaultVersion = "0.9.0";

const defaultCookie = {
    "gryffondor": 20,
    "poufsouffle": 20,
    "serdaigle": 20,
    "serpentard": 20
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

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function generateRoulette() {
    let roulette = "";
    const randomizedCharacters = shuffle(charaters);
    randomizedCharacters.slice(7).forEach((char, idx) => {
        roulette += `<div class="wizard" style="animation-delay: -${0.5 * idx}s;"><img src="public/img/characters/${char}.png" alt="${char}" class="keep-axis"/></div>`;
    });
    return roulette;
};

function generateFootstep(side) {
    let footsteps = "";
    const count = side == "left" ? 6 : 7;
    const offset = side == "left" ? 0.75 : 0;

    for (let i = 0; i < count; i++) {
        footsteps += `<img src="public/img/footstep.png" alt="footstep" class="footstep" style="animation-delay: ${5 - (1.5 * i + offset)}s" />`;
    }

    return footsteps;
}

let eventListener;

function getHouseId(cookie) {
    const total = cookie["gryffondor"] + cookie["poufsouffle"] + cookie["serdaigle"] + cookie["serpentard"];
    const spec = { 0: cookie["gryffondor"] / total, 1: cookie["poufsouffle"] / total, 2: cookie["serdaigle"] / total, 3: cookie["serpentard"] / total };
    const r = Math.random();
    let sum = 0;
    for (let i in spec) {
        sum += spec[i];

        if (r <= sum) {
            return i;
        }
    }
}

function startRoulette() {
    const roulette = document.querySelector(".roulette");
    roulette.innerHTML = generateRoulette();

    const wrapper = document.querySelector(".choixpeauWrapper");
    wrapper.classList.remove("choixpeau");
    wrapper.classList.add("countdown");

    const [value, version] = getCookie();
    const houseId = getHouseId(value);

    setTimeout(() => {
        const house = houses[houseId];
        wrapper.classList.remove("countdown");
        wrapper.classList.add(house);
        value[house]--;
        saveCookie(value);

        document.querySelector(".restart").classList.add("show");
        const restartBtn = document.querySelector(".restartBtn");
        eventListener = () => restart(house);
        restartBtn.addEventListener("touchstart", eventListener);
        restartBtn.addEventListener("mousedown", eventListener);
    }, 6000);
}

function getCookie() {
    const cookies = document.cookie.split("; ");

    const version = cookies.find((row) => row.startsWith("version="))?.split("=")[1];

    const value = cookies
        .find((row) => row.startsWith("poudlard="))
        ?.split("=")[1];

    return [!value ? null : JSON.parse(value), version];
}

function saveCookie(value) {
    document.cookie = `poudlard=${JSON.stringify(value)};expires=${new Date("Jan 30 2024 00:00:00").toUTCString()}`;
    document.cookie = `version=${defaultVersion};expires=${new Date("Jan 30 2024 00:00:00").toUTCString()}`;
}

function restart(house) {
    const wrapper = document.querySelector(".choixpeauWrapper");
    wrapper.classList.remove(house);
    wrapper.classList.add("choixpeau");
    document.querySelector(".restartBtn").removeEventListener("touchstart", eventListener);
    document.querySelector(".restartBtn").removeEventListener("mousedown", eventListener);
    document.querySelector(".restart").classList.remove("show");
}

(() => {
    document.querySelector("section.left").innerHTML = generateFootstep("left");
    document.querySelector("section.right").innerHTML = generateFootstep("right");

    const [value, version] = getCookie();

    if (!value || version != defaultVersion) {
        saveCookie(defaultCookie);
    }

    const footsteps = document.querySelectorAll(".footstep");
    footsteps.forEach(el => {
        const angle = (Math.random() * 30) - 15;
        el.style.setProperty('--footstep-rotation', angle + 'deg');
    });

    const choixpeau = document.querySelector("img.choixpeau");

    choixpeau.addEventListener("touchstart", startRoulette);
    choixpeau.addEventListener("mousedown", startRoulette);
})();