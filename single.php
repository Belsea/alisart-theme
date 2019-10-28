<?php
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

        <article class="singular-container">

            <header>
                <form method="post" action="<?php echo esc_url(home_url()) ?>">
                    <input class="hidden-cat" name="category" type="text" value="<?php echo $category->name; ?>">
                    <h2 class="sub-header text-right post-category">CATEGORY <button type="submit"><?php echo $category->name; ?></button></h2>
                </form>

                <h1 class="header-display m-0 text-right"><?php the_title_attribute() ?></h1>
            </header>

            <div class="singular-content grid">
                <div class="gutter-sizer"></div>
                <?php the_content() ?>
            </div>

            <div class="post-navigation">
                <h3 class="sub-header previous-post">
                    <?php previous_post_link(
                                '<img src="' . esc_url(home_url("/wp-content/themes/alisart-theme/images/arrow-sx.svg")) . '">
                        <div> PREVIOUS POST <br> %link </div>'
                            ); ?>
                </h3>
                <h3 class="sub-header next-post">
                    <?php next_post_link(
                                '<img src="' . esc_url(home_url("/wp-content/themes/alisart-theme/images/arrow-dx.svg")) . '">
                        <div> NEXT POST <br> %link </div>'
                            ); ?>
                </h3>
            </div>

        </article>

<?php
    endwhile;

endif;


get_footer();
