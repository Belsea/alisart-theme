(function($) {
    var $loopContainer = $("#index__loop-container");
    var categoryLinks = Array.from(document.querySelectorAll("#categories-filter li")),
        navCategoryLinks = Array.from(document.querySelectorAll("#nav__menu--portrait ul.sub-menu li"));

    var infinteLoaderContainer = document.querySelector(".infinite-loader__container"),
        pageCounter = document.querySelector("#page-counter"),
        spinner = document.querySelector("#spinner");

    var masonrySetup = {
        gutter: ".grid__gutter",
        itemSelector: ".grid__item",
        percentPosition: true
    };

    // ======================================================
    //   S E T   C U R R E N T   C A T E G O R Y   I N   T H E   N A V
    categoryLinks.forEach((el) => {
        if (el.classList.contains("current-menu-item")) {
            var currentCategory = el.firstChild.href;
            navCategoryLinks.forEach((navEl) => {
                navEl.firstChild.href == currentCategory && navEl.classList.add("current-menu-item");
            });
        }
    });

    // =======================================================
    function showLoadMore() {
        infinteLoaderContainer.classList.remove("loading");
        infinteLoaderContainer.querySelector("#loader__text").classList.remove("hidden");
    }
    function hideLoadMore() {
        infinteLoaderContainer.classList.add("loading");
        infinteLoaderContainer.querySelector("#loader__text").classList.add("hidden");
    }

    // ======================================================
    //   C A T E G O R Y   F I L T E R
    function categoryFilter(e) {
        // avoid standard page loading
        e.preventDefault();

        // reset load more button
        if (!infinteLoaderContainer.querySelector("#loader__text--completed").classList.contains("hidden")) {
            infinteLoaderContainer.querySelector("#loader__text--completed").classList.add("hidden");
            showLoadMore();
        }

        pageCounter.setAttribute("data-page", 1);

        var targetHref = e.target.href;

        // remove wherever is the current-menu-item class
        [...categoryLinks, ...navCategoryLinks].forEach((el) => {
            el.classList.contains("current-menu-item") && el.classList.remove("current-menu-item");
        });
        // animate the updating area
        $loopContainer.animate({ opacity: "0.5" });
        // and set new current menu items
        [...categoryLinks, ...navCategoryLinks].forEach((el) => {
            el.firstChild.href == targetHref && el.classList.add("current-menu-item");
        });

        // A J A X
        var adminAjax = document.querySelector(".index__categories").getAttribute("data-url");

        $.ajax({
            url: adminAjax,
            type: "post",
            data: {
                categorySlug: targetHref.split("/")[4],
                action: "alisart_category_filter"
            },
            error: function(response) {
                console.log(response);
            },
            success: function(response) {
                $loopContainer.html(response);
                // re-initialize masonry
                var $msnry = $(".grid")
                    .masonry(masonrySetup)
                    .imagesLoaded()
                    .progress(function() {
                        $msnry.masonry("layout");
                    });
                $loopContainer.animate({ opacity: "1" });
            }
        });
    }
    // CATEGORIES FILTERS LISTENERS
    document.querySelector(".index__categories").addEventListener("click", categoryFilter, false);
    document.querySelector(".nav__menu__pages--portrait ul.sub-menu").addEventListener("click", categoryFilter, false);

    // ==========================================================
    //   I N F I N I T E   S C R O L L
    document.querySelector("#loader:not(.loading)").addEventListener(
        "click",
        function(e) {
            hideLoadMore();
            spinner.classList.add("show");

            var pageNumber = parseInt(pageCounter.getAttribute("data-page")),
                newPageNumber = pageNumber + 1,
                adminAjax = pageCounter.getAttribute("data-url");

            var categorySlug;

            categoryLinks.forEach((el) => {
                if (el.classList.contains("current-menu-item")) categorySlug = el.firstChild.href.split("/")[4];
            });

            $.ajax({
                url: adminAjax,
                type: "post",
                data: {
                    categorySlug: categorySlug,
                    page: pageNumber,
                    action: "alisart_infinite_scroll"
                },
                error: function(response) {
                    console.log(response);
                },
                success: function(response) {
                    if (response == 0) {
                        // hide spinner and inform user by switching load more text
                        spinner.classList.remove("show");
                        infinteLoaderContainer.querySelector("#loader__text--completed").classList.remove("hidden");
                    } else {
                        pageCounter.setAttribute("data-page", newPageNumber);
                        // response need to be wrapped in jQuery object to work with Masonry
                        var $response = $(response);
                        var $msnry = $(".grid")
                            .append($response)
                            .masonry("appended", $response)
                            .imagesLoaded()
                            .progress(function() {
                                $msnry.masonry("layout");
                            });

                        spinner.classList.remove("show");
                        showLoadMore();
                    }
                }
            });
        },
        false
    );
})(jQuery);
