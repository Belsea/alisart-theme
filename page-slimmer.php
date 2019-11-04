<?php

/*
 * Template Name: Slimmer Page
 */

get_header();



if (have_posts()) :

    while (have_posts()) : the_post();
        ?>

        <div class="singular-container slimmer">

            <h1 class="playfair-display m-0 text-right page-title"><?php the_title_attribute() ?></h1>

            <div class="singular-content">
                <?php the_content() ?>
            </div>

        </div>

<?php
    endwhile;

endif;


get_footer();
?>