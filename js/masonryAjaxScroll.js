(function ($) {

    // =================================================================================
    //   V A R I A B L E S
    var $insideLoop = $('#inside-loop'),
        $categoryLinks = $('#categories-nav li a'),
        $categoryNavLinks = $('#nav__menu--portrait ul.sub-menu li a');

    var $loadMoreButton = $('#load-more'),
        $spinner = $('#spinner'),
        $pageCounter = $('#page-counter');

    var masonrySetup = {
        //columnWidth: '.grid-sizer', breaks masonry on Firefox
        gutter: '.gutter-sizer',
        itemSelector: '.grid-item',
        percentPosition: true
    };
    var $msnry;


    // ======================================================
    //   S E T   C U R R E N T   C A T E G O R Y   I N   T H E   N A V
    for (var i = 0; i < $categoryLinks.length; i++) {

        var currentCategory;

        if ($categoryLinks[i].parentNode.classList.contains('current-cat')) {

            currentCategory = $categoryLinks[i].href;

            for (var i = 0; i < $categoryNavLinks.length; i++) {
                if ($categoryNavLinks[i].href == currentCategory) {
                    $categoryNavLinks[i].parentNode.classList.add('current-menu-item');
                }
            }
        }
    }



    // ======================================================
    //   I N I T I A L I Z E   M A S O N R Y
    $(document).ready(function () {

        $msnry = $('.grid').masonry(masonrySetup)
            .imagesLoaded().progress(function () {
                $msnry.masonry('layout');
            });
    });




    // ======================================================
    //   C A T E G O R Y   F I L T E R 
    $categoryLinks.on('click', function (e) {

        // avoid standard page loading
        e.preventDefault();

        // reset load more button
        if ($loadMoreButton.find('#text-completed').hasClass('show')) {
            $loadMoreButton.find('#text-completed').removeClass('show');
            $loadMoreButton.removeClass('loading')
                .find('#text').removeClass('hidden');
        }

        that = $(this);

        $pageCounter.data('page', 1);

        var thatHref = that.attr('href'),
            $categorySlug = thatHref.split('/')[4];

        // remove wherever is the current-cat class
        $categoryLinks.parent().removeClass('current-cat');
        // also remove wherever is the current-menu-item class in the side menu
        $categoryNavLinks.parent().removeClass('current-menu-item');
        // and animate the updating area
        $insideLoop.animate({ opacity: "0.5" });
        // then highlight the new current category who's about to load
        that.parent().addClass('current-cat');
        // and the current-menu-item in the side menu
        for (var i = 0; i < $categoryNavLinks.length; i++) {
            if ($categoryNavLinks[i].href == thatHref) {
                $categoryNavLinks[i].parentNode.classList.add('current-menu-item');
            }
        }

        // A J A X
        var $categoryData = $('#categories-nav'),
            $ajaxurl = $categoryData.data('url');

        $.ajax({

            url: $ajaxurl,
            type: 'post',
            data: {
                categorySlug: $categorySlug,
                action: 'alisart_category_filter'
            },
            error: function (response) {
                console.log(response);
            },
            success: function (response) {
                $insideLoop.html(response)
                // re-initialize masonry
                $msnry = $('.grid').masonry(masonrySetup)
                    .imagesLoaded().progress(function () {
                        $msnry.masonry('layout');
                    });
                $insideLoop.animate({ opacity: "1" });
            },
        });

    });




    // =========================================================
    //   P O R T R A I T   N A V   C A T E G O R Y   F I L T E R 
    $categoryNavLinks.on('click', function (e) {

        // avoid standard page loading
        e.preventDefault();

        // reset load more button
        if ($loadMoreButton.find('#text-completed').hasClass('show')) {
            $loadMoreButton.find('#text-completed').removeClass('show');
            $loadMoreButton.removeClass('loading')
                .find('#text').removeClass('hidden');
        }

        that = $(this);

        $pageCounter.data('page', 1);

        var thatHref = that.attr('href'),
            $categorySlug = thatHref.split('/')[4];

        // remove wherever is the current-menu-item class
        $categoryNavLinks.parent().removeClass('current-menu-item');
        // also remove wherever is the current-cat class in the page nav
        $categoryLinks.parent().removeClass('current-cat');
        // and animate the updating area
        $insideLoop.animate({ opacity: "0.5" });
        // then highlight the new current category who's about to load
        that.parent().addClass('current-menu-item');
        // and the new current-cat in the page nav        
        for (var i = 0; i < $categoryLinks.length; i++) {
            if ($categoryLinks[i].href == thatHref) {
                $categoryLinks[i].parentNode.classList.add('current-cat');
            }
        }


        // A J A X
        var $categoryData = $('#categories-nav'),
            $ajaxurl = $categoryData.data('url');

        $.ajax({

            url: $ajaxurl,
            type: 'post',
            data: {
                categorySlug: $categorySlug,
                action: 'alisart_category_filter'
            },
            error: function (response) {
                console.log(response);
            },
            success: function (response) {
                $insideLoop.html(response)
                // re-initialize masonry
                $msnry = $('.grid').masonry(masonrySetup)
                    .imagesLoaded().progress(function () {
                        $msnry.masonry('layout');
                    });
                $insideLoop.animate({ opacity: "1" });
            },
        });

    });




    // ==========================================================
    //   I N F I N I T E   S C R O L L   - ONLY IN INDEX
    $(document).on('click', '#load-more:not(.loading)', function (e) {

        $loadMoreButton.addClass('loading')
            .find('#text').addClass('hidden');
        $spinner.addClass('show');

        var $page = $pageCounter.data('page')
        $newPage = $page + 1;
        $ajaxurl = $pageCounter.data('url');

        var $categorySlug;

        if (window.location.href.split('/').length > 4) {
            $categorySlug = window.location.href.split('/')[4];
        } else {
            for (var i = 0; i < $categoryLinks.length; i++) {
                if ($categoryLinks[i].parentNode.classList.contains('current-cat')) {
                    var $href = $categoryLinks[i].href;
                    $categorySlug = $href.split('/')[4];
                }
            }
        }

        $.ajax({

            url: $ajaxurl,
            type: 'post',
            data: {
                categorySlug: $categorySlug,
                page: $page,
                action: 'alisart_infinite_scroll'
            },
            error: function (response) {
                console.log(response);
            },
            success: function (response) {

                if (response == 0) {
                    // hide spinner and inform user by switching load more text
                    $spinner.removeClass('show');
                    $loadMoreButton.find('#text-completed').addClass('show');

                } else {

                    $pageCounter.data('page', $newPage);
                    // response need to be wrapped in jQuery object to work with Masonry
                    var $response = $(response);
                    $('.grid').append($response)
                        .masonry('appended', $response)
                        .imagesLoaded().progress(function () {
                            $msnry.masonry('layout');
                        });

                    $spinner.removeClass('show');
                    $loadMoreButton.removeClass('loading')
                        .find('#text').removeClass('hidden');
                }
            },

        });
    });


})(jQuery);
