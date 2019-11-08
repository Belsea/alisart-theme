# alisart-theme
Custom Wordpress Theme developed for https://www.alisartbeauty.it/

This is a portfolio for a Makeup Artist, packed with pictures, so the biggest challenge was to personalize the design of the website while handling heavy images and still achieve good performance.

I've used [lazysizes](https://github.com/aFarkas/lazysizes) and it's plugin polyfill [respimg](https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/respimg), to support the few IE users left, filtering every image via **'post_thumbnail_html'** and **'the_content'** hooks. 

Homepage and single pages are mainly galleries, styled with [masonry](https://github.com/desandro/masonry).

The main page also is using AJAX to handle category filtering and infinite loading which, being this a wordpress theme, needed to be implemented also in the _function.php_ with the [wp_ajax](https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_%28action%29) hooks. 
Infinite loading isn't triggered by page scroll but by clicking the _Load More_ button to be sturdier with slow connections.
To behave coherently to the homepage, the category in the single pages links to the home already accordingly filtered.

In the actual site I've installed [photoswipe](https://github.com/dimsemenov/photoswipe) to allow users to see pictures, in the single pages, at their original quality, to better grasp the details of the makeups.

Feel free to tell me if I've done something wrong, I'm quite new to all these techniques and always glad to improve.
