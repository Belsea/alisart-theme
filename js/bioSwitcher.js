var langBioSwitch = document.querySelector(".about__switcher a"),
    bioEng = document.getElementsByClassName("about__text--eng"),
    bioIta = document.getElementsByClassName("about__text--ita");

if (langBioSwitch) {
    langBioSwitch.addEventListener("click", function() {
        event.preventDefault();
        if (bioIta[0].classList.contains("text--hidden")) {
            langBioSwitch.textContent = "Read it in English";
            for (let el of bioIta) {
                el.classList.remove("text--hidden");
            }
            for (let el of bioEng) {
                el.classList.add("text--hidden");
            }
        } else {
            langBioSwitch.textContent = "Leggilo in italiano";
            for (let el of bioEng) {
                el.classList.remove("text--hidden");
            }
            for (let el of bioIta) {
                el.classList.add("text--hidden");
            }
        }
    });
}
