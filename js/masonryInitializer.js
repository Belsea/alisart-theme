(function($) {
    var masonrySetup = {
        gutter: ".grid__gutter",
        itemSelector: ".grid__item",
        percentPosition: true
    };

    $(document).ready(function() {
        var $msnry = $(".grid")
            .masonry(masonrySetup)
            .imagesLoaded()
            .progress(function() {
                $msnry.masonry("layout");
            });
    });
})(jQuery);
