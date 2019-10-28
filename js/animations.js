// =================================================================================
//   V A R I A B L E S
var menuToggler = document.getElementById('popup-nav__toggler'),
    hamburger = document.getElementById('hamburger'),
    nav = document.getElementById('popup-nav'),
    navMenus = document.getElementsByClassName('popup-nav__menu');

var postsGrid = document.getElementsByClassName('index-container')[0];

var categoriesNav = document.getElementById('categories-nav'),
    navTop = nav.getBoundingClientRect().top,
    navHeight = nav.getBoundingClientRect().height;

var nf404 = document.getElementById('nf404-container');

var langBioSwitch = document.getElementById('lang-switch'),
    bioEng = document.getElementById('bio-eng'),
    bioIta = document.getElementById('bio-ita');



// =================================================================================
//   L I S T E N E R S

// ===========================================================
//  O P E N / C L O S E   M E N U
menuToggler.addEventListener('click', function () {

    // one classList check to rule them all

    if (hamburger.classList.contains('opened')) {

        hamburger.classList.remove('opened');
        menuToggler.classList.remove('opened');
        nav.classList.remove('opened');
        for (var i = 0; i < navMenus.length; i++) {
            if (navMenus[i].classList.contains('opened')) {
                navMenus[i].classList.remove('opened');
            }
        }

    } else {

        hamburger.classList.add('opened');
        menuToggler.classList.add('opened');
        nav.classList.add('opened');
        for (var i = 0; i < navMenus.length; i++) {
            if (!navMenus[i].classList.contains('opened')) {
                navMenus[i].classList.add('opened');
            }
        }
    }
});



// ===========================================================
//  S H O W   M E N U
// ===========================================================
//  IF SINGULAR BUT NOT 404 PAGE
if (!postsGrid & !nf404) {
    nav.classList.add('show');
}

// ===========================================================
//  IF INDEX 
if (postsGrid) {

    window.addEventListener('scroll', function () {

        //  S H O W   S I D E   N A V
        if (postsGrid.getBoundingClientRect().top <= 0 && !nav.classList.contains('show')) {

            nav.classList.add('show');

        }
        if (postsGrid.getBoundingClientRect().top > 0 && nav.classList.contains('show')) {

            nav.classList.remove('show');

            // also close the nav if open
            if (nav.classList.contains('opened')) {
                hamburger.classList.remove('opened');
                menuToggler.classList.remove('opened');
                nav.classList.remove('opened');
                for (var i = 0; i < navMenus.length; i++) {
                    if (navMenus[i].classList.contains('opened')) {
                        navMenus[i].classList.remove('opened');
                    }
                }
            }
        }


        //  B L O C K   S I D E   C A T E G O R I E S
        // avoid checks if not landscape
        if (!window.orientation) {

            if (screen.msOrientation == "landscape-primary" || screen.msOrientation == "landscape-secondary"
                || screen.orientation.type == "landscape-primary" || screen.orientation.type == "landscape-secondary") {

                if (postsGrid.getBoundingClientRect().top <= (navTop + navHeight + window.innerHeight * 0.02)) {

                    categoriesNav.classList.add('sticky');
                }
                if (postsGrid.getBoundingClientRect().top > (navTop + navHeight + window.innerHeight * 0.02)) {

                    categoriesNav.classList.remove('sticky');
                }
            }
        }
        else { // Safari/iOS

            if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {

                if (postsGrid.getBoundingClientRect().top <= (navTop + navHeight + window.innerHeight * 0.02)) {

                    categoriesNav.classList.add('sticky');
                }
                if (postsGrid.getBoundingClientRect().top > (navTop + navHeight + window.innerHeight * 0.02)) {

                    categoriesNav.classList.remove('sticky');
                }
            }
        }
    });


}


// ===========================================================
//  S W I T C H   B I O   L A N G U A G E
if (langBioSwitch) {

    langBioSwitch.addEventListener('click', function () {

        event.preventDefault();

        if (bioIta.classList.contains('hidden')) {
            langBioSwitch.innerHTML = "Read it in English";
            bioIta.classList.remove('hidden');
            bioEng.classList.add('hidden');
        } else {
            langBioSwitch.innerHTML = "Leggilo in italiano";
            bioEng.classList.remove('hidden');
            bioIta.classList.add('hidden');
        }
    });
}