var indexContainer = document.getElementById("index__container");

var nav = document.getElementById("nav");

var navToggler = document.getElementById("nav__toggler"),
    hamburger = document.getElementById("hamburger"),
    navMenus = document.getElementsByClassName("nav__menu");

var navTop = nav.getBoundingClientRect().top;
var navHeight = nav.getBoundingClientRect().height;
var categoriesFilter = document.getElementById("categories-filter");

window.addEventListener("scroll", function() {
    //  S H O W   S I D E   N A V
    if (indexContainer.getBoundingClientRect().top <= 0 && !nav.classList.contains("show")) {
        nav.classList.add("show");
    }
    if (indexContainer.getBoundingClientRect().top > 0 && nav.classList.contains("show")) {
        nav.classList.remove("show");

        // also close the nav if open
        if (nav.classList.contains("opened")) {
            navToggler.classList.remove("opened");
            hamburger.classList.remove("opened");
            nav.classList.remove("opened");
            for (var i = 0; i < navMenus.length; i++) {
                if (navMenus[i].classList.contains("opened")) {
                    navMenus[i].classList.remove("opened");
                }
            }
        }
    }

    //  B L O C K   S I D E   C A T E G O R I E S
    if (!window.orientation) {
        if (
            screen.msOrientation == "landscape-primary" ||
            screen.msOrientation == "landscape-secondary" ||
            screen.orientation.type == "landscape-primary" ||
            screen.orientation.type == "landscape-secondary"
        ) {
            if (indexContainer.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                categoriesFilter.classList.add("sticky");
            }
            if (indexContainer.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                categoriesFilter.classList.remove("sticky");
            }
        }
    } else {
        // Safari/iOS
        if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
            if (indexContainer.getBoundingClientRect().top <= navTop + navHeight + window.innerHeight * 0.02) {
                categoriesFilter.classList.add("sticky");
            }
            if (indexContainer.getBoundingClientRect().top > navTop + navHeight + window.innerHeight * 0.02) {
                categoriesFilter.classList.remove("sticky");
            }
        }
    }
});
