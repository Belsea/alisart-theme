<?php

if (has_post_thumbnail()) : ?>

    <figure class="grid-item portfolio">

        <?php the_post_thumbnail('thumbnail'); ?>

        <figcaption>

            <div class="post-meta">
                <h2 class="text-normal"><?php the_title_attribute(); ?></h2>

                <?php
                    $categories = get_the_category();

                    foreach ($categories as $cat) {
                        if ($cat->name != "All") {
                            $category = $cat;
                        }
                    }
                    ?>
                <div class="meta-cat-box">
                    <h3 class="text-normal"><?php echo $category->name; ?></h3>
                </div>
            </div>

            <a class="view-more" href="<?php the_permalink(); ?>"></a>

        </figcaption>
    </figure>

<?php

endif;
