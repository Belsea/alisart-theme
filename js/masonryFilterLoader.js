(function($) {
    var $loopContainer = $("#index__loop-container"),
        $categoryLinks = $("#categories-filter li a"),
        $navCategoryLinks = $("#nav__menu--portrait ul.sub-menu li a");

    var $infinteLoader = $("#loader"),
        $spinner = $("#spinner"),
        $pageCounter = $("#page-counter");

    var masonrySetup = {
        gutter: ".grid__gutter",
        itemSelector: ".grid__item",
        percentPosition: true
    };

    // ======================================================
    //   S E T   C U R R E N T   C A T E G O R Y   I N   T H E   N A V
    for (var i = 0; i < $categoryLinks.length; i++) {
        var currentCategory;

        if ($categoryLinks[i].parentNode.classList.contains("current-menu-item")) {
            currentCategory = $categoryLinks[i].href;

            for (var i = 0; i < $navCategoryLinks.length; i++) {
                if ($navCategoryLinks[i].href == currentCategory) {
                    $navCategoryLinks[i].parentNode.classList.add("current-menu-item");
                }
            }
        }
    }

    // ======================================================
    //   C A T E G O R Y   F I L T E R
    $categoryLinks.on("click", function(e) {
        // avoid standard page loading
        e.preventDefault();

        // reset load more button
        if (!$infinteLoader.find("#loader__text--completed").hasClass("hidden")) {
            $infinteLoader.find("#loader__text--completed").addClass("hidden");
            $infinteLoader
                .removeClass("loading")
                .find("#loader__text")
                .removeClass("hidden");
        }

        that = $(this);

        $pageCounter.data("page", 1);

        var thatHref = that.attr("href"),
            $categorySlug = thatHref.split("/")[4];

        // remove wherever is the current-menu-item class
        $categoryLinks.parent().removeClass("current-menu-item");
        // also remove wherever is the current-menu-item class in the side menu
        $navCategoryLinks.parent().removeClass("current-menu-item");
        // and animate the updating area
        $loopContainer.animate({ opacity: "0.5" });
        // then highlight the new current category who's about to load
        that.parent().addClass("current-menu-item");
        // and the current-menu-item in the side menu
        for (var i = 0; i < $navCategoryLinks.length; i++) {
            if ($navCategoryLinks[i].href == thatHref) {
                $navCategoryLinks[i].parentNode.classList.add("current-menu-item");
            }
        }

        // A J A X
        var $categoryData = $("#categories-filter"),
            $ajaxurl = $categoryData.data("url");

        $.ajax({
            url: $ajaxurl,
            type: "post",
            data: {
                categorySlug: $categorySlug,
                action: "alisart_category_filter"
            },
            error: function(response) {
                console.log(response);
            },
            success: function(response) {
                $loopContainer.html(response);
                // re-initialize masonry
                $msnry = $(".grid")
                    .masonry(masonrySetup)
                    .imagesLoaded()
                    .progress(function() {
                        $msnry.masonry("layout");
                    });
                $loopContainer.animate({ opacity: "1" });
            }
        });
    });

    // =========================================================
    //   P O R T R A I T   N A V   C A T E G O R Y   F I L T E R
    $navCategoryLinks.on("click", function(e) {
        // avoid standard page loading
        e.preventDefault();

        // reset load more button
        if (!$infinteLoader.find("#loader__text--completed").hasClass("hidden")) {
            $infinteLoader.find("#loader__text--completed").addClass("hidden");
            $infinteLoader
                .removeClass("loading")
                .find("#loader__text")
                .removeClass("hidden");
        }

        that = $(this);

        $pageCounter.data("page", 1);

        var thatHref = that.attr("href"),
            $categorySlug = thatHref.split("/")[4];

        // remove wherever is the current-menu-item class
        $navCategoryLinks.parent().removeClass("current-menu-item");
        // also remove wherever is the current-menu-item class in the page nav
        $categoryLinks.parent().removeClass("current-menu-item");
        // and animate the updating area
        $loopContainer.animate({ opacity: "0.5" });
        // then highlight the new current category who's about to load
        that.parent().addClass("current-menu-item");
        // and the new current-menu-item in the page nav
        for (var i = 0; i < $categoryLinks.length; i++) {
            if ($categoryLinks[i].href == thatHref) {
                $categoryLinks[i].parentNode.classList.add("current-menu-item");
            }
        }

        // A J A X
        var $categoryData = $("#categories-filter"),
            $ajaxurl = $categoryData.data("url");

        $.ajax({
            url: $ajaxurl,
            type: "post",
            data: {
                categorySlug: $categorySlug,
                action: "alisart_category_filter"
            },
            error: function(response) {
                console.log(response);
            },
            success: function(response) {
                $loopContainer.html(response);
                // re-initialize masonry
                $msnry = $(".grid")
                    .masonry(masonrySetup)
                    .imagesLoaded()
                    .progress(function() {
                        $msnry.masonry("layout");
                    });
                $loopContainer.animate({ opacity: "1" });
            }
        });
    });

    // ==========================================================
    //   I N F I N I T E   S C R O L L
    $("#loader:not(.loading)").on("click", function(e) {
        $infinteLoader
            .addClass("loading")
            .find("#loader__text")
            .addClass("hidden");
        $spinner.addClass("show");

        var $page = $pageCounter.data("page");
        $newPage = $page + 1;
        $ajaxurl = $pageCounter.data("url");

        var $categorySlug;

        if (window.location.href.split("/").length > 4) {
            $categorySlug = window.location.href.split("/")[4];
        } else {
            for (var i = 0; i < $categoryLinks.length; i++) {
                if ($categoryLinks[i].parentNode.classList.contains("current-menu-item")) {
                    var $href = $categoryLinks[i].href;
                    $categorySlug = $href.split("/")[4];
                }
            }
        }

        $.ajax({
            url: $ajaxurl,
            type: "post",
            data: {
                categorySlug: $categorySlug,
                page: $page,
                action: "alisart_infinite_scroll"
            },
            error: function(response) {
                console.log(response);
            },
            success: function(response) {
                if (response == 0) {
                    // hide spinner and inform user by switching load more text
                    $spinner.removeClass("show");
                    $infinteLoader.find("#loader__text--completed").removeClass("hidden");
                } else {
                    $pageCounter.data("page", $newPage);
                    // response need to be wrapped in jQuery object to work with Masonry
                    var $response = $(response);
                    $msnry = $(".grid")
                        .append($response)
                        .masonry("appended", $response)
                        .imagesLoaded()
                        .progress(function() {
                            $msnry.masonry("layout");
                        });

                    $spinner.removeClass("show");
                    $infinteLoader
                        .removeClass("loading")
                        .find("#loader__text")
                        .removeClass("hidden");
                }
            }
        });
    });
})(jQuery);
