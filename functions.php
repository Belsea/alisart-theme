<?php

// =================================================================================
//   E N Q U E U I N G   S T Y L E S   &   S C R I P T S
function alisart_theme_enqueue_scripts()
{
	//	S T Y L E S
	wp_enqueue_style('alisart_style', get_stylesheet_uri(), 'all');
	wp_enqueue_style('font_awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css', '5.11.2', 'all');
	wp_enqueue_style('font_awesome_brands', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/brands.min.css', '5.11.2', 'all');
	wp_enqueue_style('google_fonts', 'https://fonts.googleapis.com/css?family=Oswald:200,300,400|Playfair+Display:400,700&display=swap', 'all');


	//	S C R I P T S
	# last bool TRUE to load scripts in the footer
	wp_enqueue_script('navToggler', get_template_directory_uri() . '/js/navToggler.js', false, false, true);
	wp_enqueue_script('uiTweaks', get_template_directory_uri() . '/js/uiTweaks.js', false, false, true);
	wp_enqueue_script('bioSwitcher', get_template_directory_uri() . '/js/bioSwitcher.js', false, false, true);

	wp_register_script('lazysizes', 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.5/lazysizes.min.js', false, '4.1.5', true);
	wp_enqueue_script('respimg', 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.5/plugins/respimg/ls.respimg.min.js', array('lazysizes'), '4.1.5', true);

	# wp native versions need to be deregistered
	wp_deregister_script('masonry');
	wp_deregister_script('imagesLoaded');
	# wp_register_script for those only needed as dependencies of some other script
	wp_register_script('imagesLoaded', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/4.1.4/imagesloaded.pkgd.min.js', array('jquery'), '4.1.4', true);
	wp_register_script('masonry', 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js', array('imagesLoaded'), '4.2.2', true);	
	wp_enqueue_script('masonryInitializer', get_template_directory_uri() . '/js/masonryInitializer.js', array('jquery', 'masonry'), false, true);
	if ( is_home() ) {
		wp_enqueue_script('indexScrollAnimations', get_template_directory_uri() . '/js/indexScrollAnimations.js', false, false, true);
		wp_enqueue_script('masonryFilterLoader', get_template_directory_uri() . '/js/masonryFilterLoader.js', array('jquery', 'masonry'), false, true);
	}
}
add_action('wp_enqueue_scripts', 'alisart_theme_enqueue_scripts');




// =================================================================================
//   T H E M E   S E T U P
function alisart_theme_setup()
{
	add_theme_support('menus');
	register_nav_menus(array(
		'index-header__pages' => __('Index Header Menu - Pages', 'alisart_theme'),
		'index-header__socials' => __('Index Header Menu - Socials', 'alisart_theme'),
		'nav__pages' => __('Popup Menu - Pages', 'alisart_theme'),
		'nav__pages-cats' => __('Popup Menu - Pages & Categories', 'alisart_theme'),
		'nav__socials' => __('Popup Menu - Socials', 'alisart_theme'),
		'footer__socials' => __('Footer Menu - Socials', 'alisart_theme'),
		'footer__policies' => __('Footer Menu - Policies', 'alisart_theme')
	));

	add_theme_support('post-format', array('image', 'video'));

	add_theme_support('post-thumbnails');

	add_image_size('xsmall', 400);
	add_image_size('small', 600);
	# add_image_size( 'medium', 700, 9999 ) through admin settings
	# add_image_size( 'large', 800, 9999 ) through admin settings
	add_image_size('xlarge', 1000);
	add_image_size('xxlarge', 1100);
	add_image_size('xxxlarge', 1280);
	# xlarges needed for full width smartphones and width2 masonry items
}
add_action('after_setup_theme', 'alisart_theme_setup');


// =================================================================================
//   I M A G E    S I Z E S
# @param string $sizes contains the already existing ones
function alisart_custom_sizes($sizes)
{
	return array_merge($sizes, array(
		'xsmall' => __('XS'),
		'small' => __('S'),
		'xlarge' => __('XL'),
		'xxlarge' => __('XXL'),
		'xxxlarge' => __('XXXL'),
	));
}
add_filter('image_size_names_choose', 'alisart_custom_sizes', 10, 1);
# 10 is priority (default value), 1 is max args accepted (default value too)



// =================================================================================
//   R E S P O N S I V E    I M A G E S
function alisart_add_lazyload_class($content)
{
	$content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
	$document = new DOMDocument();
	libxml_use_internal_errors(true);
	$document->loadHTML(utf8_decode($content));

	$imgs = $document->getElementsByTagName('img');
	foreach ($imgs as $img) {
		if ($img->hasAttribute('class')) {
			$existing_class = $img->getAttribute('class');
			if (strpos($existing_class, 'wp-post-image') !== false || strpos($existing_class, 'wp-image') !== false) {
				$img->setAttribute('class', $existing_class . ' lazyload');
				$img->setAttribute('data-sizes', 'auto');
				$img_srcset = $img->getAttribute('srcset');
				$img->removeAttribute('srcset'); // useless - it doesn't work
				$img->setAttribute('data-srcset', $img_srcset);
			}
		}
	}

	$html = $document->saveHTML();
	return $html;
}
add_filter('post_thumbnail_html', 'alisart_add_lazyload_class');
add_filter('the_content', 'alisart_add_lazyload_class');



// =================================================================================
//   C U S T O M   C L A S S   T O   C A T E G O R Y   L I S T
# Added the same class as nav menus to more easily deal with current-cat in css and js files
function current_menu_item_class ($classes, $item) {
    if (in_array('current-cat', $classes)){
        $classes[] = 'current-menu-item ';
    }
    return $classes;
}
add_filter('category_css_class' , 'current_menu_item_class' , 10 , 2);



// =================================================================================
//   C A T E G O R Y    F I L T E R
function alisart_category_filter()
{
	$query = new WP_Query(array(
		'post_type' 	=> 'post',
		'tax_query' 	=> array(
			array(
				'taxonomy' => 'category',
				'field'    => 'slug',
				'terms'    => $_POST["categorySlug"],
			),
		),
		'post_status' 	=> 'published'
	));

	if ($query->have_posts()) :

		echo '<div class="grid">';

		echo '<div class="grid__gutter"></div>';

		while ($query->have_posts()) : $query->the_post();

			get_template_part('content');

		endwhile;

		echo '</div>';

		wp_reset_postdata();

	endif;

	wp_die();
}
add_action('wp_ajax_nopriv_alisart_category_filter', 'alisart_category_filter');
add_action('wp_ajax_alisart_category_filter', 'alisart_category_filter');



// =================================================================================
//   I N F I N I T E    S C R O L L
function alisart_infinite_scroll()
{
	$query = new WP_Query(array(
		'post_type' 	=> 'post',
		'tax_query' 	=> array(
			array(
				'taxonomy' => 'category',
				'field'    => 'slug',
				'terms'    => $_POST["categorySlug"],
			),
		),
		'post_status' 	=> 'published',
		'paged' 		=> $_POST["page"] + 1
	));

	if ($query->have_posts()) :

		while ($query->have_posts()) : $query->the_post();

			get_template_part('content');

		endwhile;

		wp_reset_postdata();

	endif;	

	wp_die();
}
add_action('wp_ajax_nopriv_alisart_infinite_scroll', 'alisart_infinite_scroll');
add_action('wp_ajax_alisart_infinite_scroll', 'alisart_infinite_scroll');
