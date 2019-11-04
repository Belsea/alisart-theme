(function($) {
    var masonrySetup = {
        gutter: ".gutter-sizer",
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
