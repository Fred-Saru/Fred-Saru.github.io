(() => {
    const footsteps = document.querySelectorAll(".footstep");

    footsteps.forEach(el => {
        const angle = (Math.random() * 30) - 15;
        el.style.setProperty('--footstep-rotation', angle +'deg');
    });
})();