<?php
get_header();



if (have_posts()) :

    while (have_posts()) : the_post();
        ?>

        <div class="main main--page">

            <header class="main__header text--right">
                <h1 class="main--page__title main__title playfair-display m-0"><?php the_title_attribute() ?></h1>
            </header>

            <div class="main--page__content main__content">
                <?php the_content() ?>
            </div>

        </div>

<?php
    endwhile;

endif;


get_footer();
?>