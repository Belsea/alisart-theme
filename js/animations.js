// =================================================================================
//   V A R I A B L E S
var navToggler = document.getElementById("nav__toggler"),
    hamburger = document.getElementById("hamburger"),
    nav = document.getElementById("nav"),
    navMenus = document.getElementsByClassName("nav__menu");

var indexContainer = document.getElementById("index__container");

var categoriesNav = document.getElementById("categories-nav"),
    navTop = nav.getBoundingClientRect().top,
    navHeight = nav.getBoundingClientRect().height;

var nf404 = document.getElementById("nf404-container");

// =================================================================================
//   L I S T E N E R S

// ===========================================================
//  O P E N / C L O S E   N A V
navToggler.addEventListener("click", function() {
    // one classList check to rule them all

    if (hamburger.classList.contains("opened")) {
        hamburger.classList.remove("opened");
        navToggler.classList.remove("opened");
        nav.classList.remove("opened");
        for (var i = 0; i < navMenus.length; i++) {
            if (navMenus[i].classList.contains("opened")) {
                navMenus[i].classList.remove("opened");
            }
        }
    } else {
        hamburger.classList.add("opened");
        navToggler.classList.add("opened");
        nav.classList.add("opened");
        for (var i = 0; i < navMenus.length; i++) {
            if (!navMenus[i].classList.contains("opened")) {
                navMenus[i].classList.add("opened");
            }
        }
    }
});

// ===========================================================
//  S H O W    N A V
// ===========================================================
//  IF SINGULAR BUT NOT 404 PAGE
if (!indexContainer & !nf404) {
    nav.classList.add("show");
}

// ===========================================================
//  IF INDEX
if (indexContainer) {
    window.addEventListener("scroll", function() {
        //  S H O W   S I D E   N A V
        if (indexContainer.getBoundingClientRect().top <= 0 && !nav.classList.contains("show")) {
            nav.classList.add("show");
        }
        if (indexContainer.getBoundingClientRect().top > 0 && nav.classList.contains("show")) {
            nav.classList.remove("show");

            // also close the nav if open
            if (nav.classList.contains("opened")) {
                hamburger.classList.remove("opened");
                navToggler.classList.remove("opened");
                nav.classList.remove("opened");
                for (var i = 0; i < navMenus.length; i++) {
                    if (navMenus[i].classList.contains("opened")) {
                        navMenus[i].classList.remove("opened");
                    }
                }
            }
        }

        //  B L O C K   S I D E   C A T E G O R I E S
        // avoid checks if not landscape
        if (!window.orientation) {
            if (
                screen.msOrientation == "landscape-primary" ||
                screen.msOrientation == "landscape-secondary" ||
                screen.orientation.type == "landscape-primary" ||
                screen.orientation.type == "landscape-secondary"
            ) {
                if (indexContainer.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                    categoriesNav.classList.add("sticky");
                }
                if (indexContainer.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                    categoriesNav.classList.remove("sticky");
                }
            }
        } else {
            // Safari/iOS

            if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
                if (indexContainer.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                    categoriesNav.classList.add("sticky");
                }
                if (indexContainer.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                    categoriesNav.classList.remove("sticky");
                }
            }
        }
    });
}
