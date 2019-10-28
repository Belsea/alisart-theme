<?php
get_header( 'index' );
?>

<div class="index-container">


    <ul id="categories-nav" class="menu" data-url="<?php echo admin_url('admin-ajax.php'); ?>">

        <?php

        if ( $_POST["category"] ) { 
            $currentCategory = get_cat_ID( $_POST["category"] );
        } else {
            $currentCategory = '1';
        }

        wp_list_categories( array(
            'hide_empty'      => True,
            'orderby'         => 'description',
            'order'           => 'ASC',
            'current_category'=> $currentCategory,
            'title_li'        => ''
        ) );
        ?>

    </ul>


    <div class="posts-container">

        <?php
        
        if ( $_POST["category"] ) {

            $query = new WP_Query( array(
                'post_type' 	=> 'post',
                'tax_query' 	=> array(
                    array(
                        'taxonomy' => 'category',
                        'field'    => 'slug',
                        'terms'    => $_POST[ "category" ],
                    ),
                ),
                'post_status' 	=> 'published'
            ) );


            if( $query->have_posts() ) :

                echo '<div id="inside-loop">';

                    echo '<div id="insider" class="grid">';

                        echo '<div class="gutter-sizer"></div><!-- empty element only for sizing -->';

                        while( $query->have_posts() ) : $query->the_post();

                            get_template_part( 'content' );

                        endwhile;

                    echo '</div>';

                echo '</div>';
            endif;

            wp_reset_postdata();

        } else {

            if( have_posts() ) :

                echo '<div id="inside-loop">';
    
                    echo '<div id="insider" class="grid">';
    
                        echo '<div class="grid-sizer"></div><!-- empty element only for sizing -->';
                        echo '<div class="gutter-sizer"></div><!-- empty element only for sizing -->';
    
                        while( have_posts() ) : the_post();
    
                            get_template_part( 'content' );
    
                        endwhile;
    
                    echo '</div>';
    
                echo '</div>';
            endif;
        } 
        
        ?>
        


        <div id="page-counter" data-page="1" data-url="<?php echo admin_url('admin-ajax.php'); ?>">

            <a id="load-more">

                <p id="text">Load More</p>

                <p id="text-completed">You've reached the end.<br>There are no more post to load.</p>

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