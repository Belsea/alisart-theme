<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <?php get_template_part('partials/responsive-bg') ?>

    <nav id="popup-nav" class="popup-nav">
        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
            <img class="popup-nav__logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo-white.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
        </a>

        <button id="popup-nav__toggler" class="popup-nav__toggler">
            <div id="hamburger" class="popup-nav__toggler__hamburger"><span></span><span></span><span></span><span></span></div>
        </button>


        <div class="popup-nav__menu">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'popup-nav_pages',
                'menu_id'       => '',
                'menu_class'    => 'pages-nav m-0 p-0',
                'container'     => ''
            ));

            wp_nav_menu(array(
                'theme_location' => 'popup-nav_socials',
                'menu_id'       => '',
                'menu_class'    => 'nav-social-links m-0 p-0',
                'container'     => ''
            ));
            ?>
        </div>

    </nav>