(function(langBioSwitch, bioEng, bioIta) {
    if (langBioSwitch) {
        langBioSwitch.addEventListener(
            "click",
            function(e) {
                e.preventDefault();
                if (bioIta[0].classList.contains("text--hidden")) {
                    langBioSwitch.textContent = "Read it in English";
                    bioIta.forEach((element) => element.classList.remove("text--hidden"));
                    bioEng.forEach((element) => element.classList.add("text--hidden"));
                } else {
                    langBioSwitch.textContent = "Leggilo in italiano";
                    bioEng.forEach((element) => element.classList.remove("text--hidden"));
                    bioIta.forEach((element) => element.classList.add("text--hidden"));
                }
            },
            false
        );
    }
})(
    document.querySelector(".about__switcher a"),
    Array.from(document.getElementsByClassName("about__text--eng")),
    Array.from(document.getElementsByClassName("about__text--ita"))
);
