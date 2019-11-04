<?php

if (has_post_thumbnail()) : ?>

    <figure class="grid__item">

        <?php the_post_thumbnail('thumbnail'); ?>

        <figcaption class="meta">

            <div class="meta__container">
                <h2 class="meta__title text-normal playfair-display m-0"><?php the_title_attribute(); ?></h2>

                <?php
                    $categories = get_the_category();

                    foreach ($categories as $cat) {
                        if ($cat->name != "All") {
                            $category = $cat;
                        }
                    }
                    ?>
                <div class="meta__subcontainer">
                    <h3 class="meta__category text-normal m-0"><?php echo $category->name; ?></h3>
                </div>
            </div>

            <a class="meta__link" href="<?php the_permalink(); ?>"></a>

        </figcaption>
    </figure>

<?php

endif;
