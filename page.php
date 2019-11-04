<?php
get_header();



if (have_posts()) :

    while (have_posts()) : the_post();
        ?>

        <div class="singular-container">

            <h1 class="playfair-display m-0 text-right"><?php the_title_attribute() ?></h1>

            <div class="singular-content">
                <?php the_content() ?>
            </div>

        </div>

<?php
    endwhile;

endif;


get_footer();
?>