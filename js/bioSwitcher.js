var langBioSwitch = document.getElementById("lang-switch"),
    bioEng = document.getElementById("bio-eng"),
    bioIta = document.getElementById("bio-ita");

if (langBioSwitch) {
    langBioSwitch.addEventListener("click", function() {
        event.preventDefault();

        if (bioIta.classList.contains("hidden")) {
            langBioSwitch.innerHTML = "Read it in English";
            bioIta.classList.remove("hidden");
            bioEng.classList.add("hidden");
        } else {
            langBioSwitch.innerHTML = "Leggilo in italiano";
            bioEng.classList.remove("hidden");
            bioIta.classList.add("hidden");
        }
    });
}
