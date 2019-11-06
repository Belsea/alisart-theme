var indexMain = document.getElementById("index__main");
var error404 = document.getElementById("error404");

var navToggler = document.getElementById("nav__toggler"),
    hamburger = document.getElementById("hamburger"),
    nav = document.getElementById("nav"),
    navMenus = document.getElementsByClassName("nav__menu");

// ===========================================================
//  S H O W    N A V
//  IF SINGULAR BUT NOT 404 PAGE
if (!indexMain & !error404) {
    nav.classList.add("show");
}

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
