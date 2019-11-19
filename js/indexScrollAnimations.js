//  R E M O V E   T O O L T I P S   O N   C A T E G O R I E S
(function(catItems) {
    catItems.forEach((element) => element.querySelector("a").removeAttribute("title"));
})(Array.from(document.getElementsByClassName("cat-item")));

// S C R O L L   R E L A T E D   A N I M A T I O N S
(function(indexMain, nav) {
    //  S H O W   S I D E   N A V
    window.addEventListener(
        "scroll",
        function() {
            let navInvolved = [
                document.getElementById("nav__toggler"),
                document.getElementById("hamburger"),
                ...Array.from(document.getElementsByClassName("nav__menu"))
            ];

            if (indexMain.getBoundingClientRect().top <= 0 && !nav.classList.contains("show")) {
                nav.classList.add("show");
            }
            if (indexMain.getBoundingClientRect().top > 0 && nav.classList.contains("show")) {
                nav.classList.remove("show");
                // also close the nav if open
                if (nav.classList.contains("opened")) {
                    nav.classList.remove("opened");
                    navInvolved.forEach((element) => {
                        element.classList.contains("opened") && element.classList.remove("opened");
                    });
                }
            }
        },
        false
    );

    //  B L O C K   S I D E   C A T E G O R I E S
    window.addEventListener(
        "scroll",
        function() {
            let navTop = nav.getBoundingClientRect().top;
            let navHeight = nav.getBoundingClientRect().height;
            let categoriesFilter = document.getElementById("categories-filter");

            if (!window.orientation) {
                // not iOS
                if (
                    screen.msOrientation == "landscape-primary" ||
                    screen.msOrientation == "landscape-secondary" ||
                    screen.orientation.type == "landscape-primary" ||
                    screen.orientation.type == "landscape-secondary"
                ) {
                    if (indexMain.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                        categoriesFilter.classList.add("sticky");
                    }
                    if (indexMain.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                        categoriesFilter.classList.remove("sticky");
                    }
                }
            } else {
                // Safari/iOS
                if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
                    if (indexMain.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                        categoriesFilter.classList.add("sticky");
                    }
                    if (indexMain.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                        categoriesFilter.classList.remove("sticky");
                    }
                }
            }
        },
        false
    );
})(document.getElementById("index__main"), document.getElementById("nav"));
