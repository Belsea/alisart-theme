(function(indexMain, error404, nav) {
    //  S H O W    N A V
    //  IF SINGULAR BUT NOT 404 PAGE
    if (!indexMain & !error404) {
        nav.classList.add("show");
    }

    //  O P E N / C L O S E   N A V
    nav.addEventListener(
        "click",
        function() {
            let navInvolved = [
                document.getElementById("nav__toggler"),
                document.getElementById("hamburger"),
                ...Array.from(document.getElementsByClassName("nav__menu"))
            ];
            if (nav.classList.contains("opened")) {
                nav.classList.remove("opened");
                navInvolved.forEach((element) => {
                    element.classList.contains("opened") && element.classList.remove("opened");
                });
            } else {
                nav.classList.add("opened");
                navInvolved.forEach((element) => {
                    !element.classList.contains("opened") && element.classList.add("opened");
                });
            }
        },
        false
    );
})(document.getElementById("index__main"), document.getElementById("error404"), document.getElementById("nav"));
