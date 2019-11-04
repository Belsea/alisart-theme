<?php
get_header('index');
?>

<div id="index__container" class="index__container">


    <ul id="categories-filter" class="index__categories m-0 p-0" data-url="<?php echo admin_url('admin-ajax.php'); ?>">

        <?php

        if ($_POST["category"]) :
            $currentCategory = get_cat_ID($_POST["category"]);
        else :
            $currentCategory = '1';
        endif;

        wp_list_categories(array(
            'hide_empty'      => True,
            'orderby'         => 'description',
            'order'           => 'ASC',
            'current_category' => $currentCategory,
            'title_li'        => ''
        ));
        ?>

    </ul>


    <div class="index__posts content__container">

        <?php

        if ($_POST["category"]) {

            $query = new WP_Query(array(
                'post_type'     => 'post',
                'tax_query'     => array(
                    array(
                        'taxonomy' => 'category',
                        'field'    => 'slug',
                        'terms'    => $_POST["category"],
                    ),
                ),
                'post_status'     => 'published'
            ));           
            
        } else {

            $query = $wp_query;
        }

        if ($query->have_posts()) :

            echo '<div id="index__loop-container">';

            echo '<div class="grid">';

            echo '<div class="gutter-sizer"></div>';

            while ($query->have_posts()) : $query->the_post();

                get_template_part('content');

            endwhile;

            echo '</div>';

            echo '</div>';

            wp_reset_postdata(); // is this needed with this implementation?
            
        endif;

        ?>



        <div id="page-counter" class="infinite-loader" data-page="1" data-url="<?php echo admin_url('admin-ajax.php'); ?>">

            <a id="loader" class="infinite-loader__container">

                <p id="loader__text" class="infinite-loader__text m-0">Load More</p>

                <p id="loader__text--completed" class="infinite-loader__text infinite-loader__text--completed hidden m-0">You've reached the end.<br>There are no more posts to load.</p>

                <!-- Spinner from https://loading.io/spinner/double-ring -->
                <div id="spinner" class="lds-css">
                    <div class="lds-double-ring">
                        <div></div>
                        <div></div>
                    </div>
                </div>

            </a>

        </div>

    </div>


</div>

<?php
get_footer();
