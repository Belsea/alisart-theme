// C O R R E C T   S O F T   K E Y B O A R D   T R I G G E R E D   R E S I Z E S
// Instructions are to prevent input tags of type text from changing width
(function(inputTextFields) {
    /**
     * if
     * inputTextFields is defined &&
     * is not iOS ('cause it doesn't need it) &&
     * is portrait for ms or other &&
     * is smartphone
     */
    if (
        inputTextFields &&
        window.orientation == "undefined" &&
        (screen.msOrientation == "portrait-primary" ||
            screen.msOrientation == "portrait-secondary" ||
            screen.orientation.type == "portrait-primary" ||
            screen.orientation.type == "portrait-secondary") &&
        !window.matchMedia("(min-width: 600px)").matches
    ) {
        inputTextFields.forEach((element) =>
            element.addEventListener(
                "focusin",
                function() {
                    element.style.width = "100%";
                },
                false
            )
        );
    }
})(Array.from(document.getElementsByClassName("wpcf7-text")));
