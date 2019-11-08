// C O R R E C T   S O F T   K E Y B O A R D   T R I G G E R E D   R E S I Z E S
/*
 * NON-iOS phones, when soft keyboard is open, may trigger a switch to landscape styling
 * These instructions are to prevent input tags (of type text) to change width
 */
var triggers = document.getElementsByClassName("wpcf7-text");

if (triggers && window.orientation == "undefined") {
    if (
        screen.msOrientation == "portrait-primary" ||
        screen.msOrientation == "portrait-secondary" ||
        screen.orientation.type == "portrait-primary" ||
        screen.orientation.type == "portrait-secondary"
    ) {
        for (var i = 0; i < triggers.length; i++) {
            triggers[i].addEventListener("focusin", function() {
                if (window.matchMedia("(max-width: 599px)").matches) {
                    triggers[i].style.width = "100%";
                }
            });
        }
    }
}

//  R E M O V E   T O O L T I P S   O N   C A T E G O R I E S
var catItems = document.getElementsByClassName("cat-item");

for (var i = 0; i < catItems.length; i++) {
    catItems[i].querySelector("a").removeAttribute("title");
}
