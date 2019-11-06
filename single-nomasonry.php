<?php

/*
 * Template Name: No Masonry
 * Template Post Type: post
 */


get_header();


if (have_posts()) :

    while (have_posts()) :

        the_post();

        $categories = get_the_category();

        foreach ($categories as $cat) {
            if ($cat->name != "All") {
                $category = $cat;
            }
        }

        $prev_post = get_previous_post();
        $next_post = get_next_post();
        ?>

        <article class="main main--slim single ">

            <header class="main__header text--right">
                <form method="post" action="<?php echo esc_url(home_url()) ?>">
                    <input class="hidden" name="category" type="text" value="<?php echo $category->name; ?>">
                    <h2 class="single__category single__subheader m-0">
                        CATEGORY <button class="p-0" type="submit"><?php echo $category->name; ?></button>
                    </h2>
                </form>

                <h1 class="main__title playfair-display m-0"><?php the_title_attribute() ?></h1>
            </header>

            <div class="main__content">
                <?php the_content() ?>
            </div>

            <div class="single-nav">
                <h3 class="single-nav__item single-nav__item--left">
                    <?php 
                    previous_post_link('
                    <img class="single-nav__arrow single-nav__arrow--left" src="' . esc_url(home_url("/wp-content/themes/alisart-theme/images/arrow-sx.svg")) . '">
                    <div class="single__subheader"> PREVIOUS POST <br> %link </div>
                    '); 
                    ?>
                </h3>
                <h3 class="single-nav__item single-nav__item--right">
                    <?php 
                    next_post_link('
                    <img class="single-nav__arrow single-nav__arrow--right" src="' . esc_url(home_url("/wp-content/themes/alisart-theme/images/arrow-dx.svg")) . '">
                    <div class="single__subheader"> NEXT POST <br> %link </div>
                    '); 
                    ?>
                </h3>
            </div>

        </article>

<?php
    endwhile;

endif;


get_footer();
