var triggers = document.getElementsByClassName("wpcf7-form-control"),
    footerSocials = document.querySelector(".footer__socials");

var indexHeaderPages = document.querySelector(".index-header__pages");
if (indexHeaderPages) {
    var indexHeaderPagesLI = indexHeaderPages.getElementsByTagName("li");
}

var catItems = document.getElementsByClassName("cat-item");

// ===========================================================
//  A D A P T   S O F T   K E Y B O A R D   T R I G G E R E D   W I N D O W   R E S I Z E
if (triggers && window.orientation == "undefined") {
    // not Safari/iOS, doesn't need this function

    if (
        screen.msOrientation == "portrait-primary" ||
        screen.msOrientation == "portrait-secondary" ||
        screen.orientation.type == "portrait-primary" ||
        screen.orientation.type == "portrait-secondary"
    ) {
        // submit input is not a trigger, so I leave it out
        for (var i = 0; i < triggers.length - 1; i++) {
            triggers[i].addEventListener("focusin", function() {
                // on focus sui tag input

                if (window.matchMedia("(max-width: 439px)").matches) {
                    // I leave out the textarea, which is already 100%
                    for (var i = 0; i < triggers.length - 2; i++) {
                        triggers[i].style.width = "100%";
                    }

                    footerSocials.style.display = "none";
                }
            });
        }
    }
}

// ===========================================================
//  C O R R E C T   S P A C E S   O N   I P H O N E S

if (navigator.userAgent.match(/iPhone/i)) {
    for (var i = 0; i < indexHeaderPagesLI.length; i++) {
        indexHeaderPagesLI[i].style.margin = "0 1.5vw";
    }
}

// ===========================================================
//  R E M O V E   T O O L T I P S   O N   C A T E G O R I E S
for (var i = 0; i < catItems.length; i++) {
    catItems[i].getElementsByTagName("a")[0].removeAttribute("title");
}
