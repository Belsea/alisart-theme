(function($) {
    var masonrySetup = {
        gutter: ".gutter-sizer",
        itemSelector: ".grid-item",
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
