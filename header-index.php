<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>
</head>

<body <?php body_class('index'); ?>>

    <img class="bg-image lazyload" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-1440x810.jpg')); ?>" srcset="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-1440x810.jpg')); ?> 1440w,
                <?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-1920x1080.jpg')); ?> 1920w,
                <?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-2880x1620.jpg')); ?> 2880w,
                <?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-3840x2160.jpg')); ?> 3840w,
                <?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-4800x2700.jpg')); ?> 4800w,
                <?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/bg-5760x3240.jpg')); ?> 5760w" data-sizes="auto">


    <header class="index__header">
        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
            <img class="index__header-logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
        </a>

        <?php
        wp_nav_menu(array(
            'theme_location' => 'header-socials',
            'menu_id'       => 'header-social-links',
            'container'     => ''
        ));
        ?>
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'       => 'header-pages-nav',
            'container'     => ''
        ));
        ?>
    </header>


    <nav id="popup-nav" class="popup-nav">
        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
            <img class="popup-nav__logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo-white.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
        </a>

        <button id="popup-nav__toggler" class="popup-nav__toggler">
            <div id="hamburger" class="popup-nav__toggler__hamburger"><span></span><span></span><span></span><span></span></div>
        </button>

        <div class="popup-nav__menu popup-nav__menu-landscape">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_id'       => '',
                'menu_class'    => 'pages-nav m-0 p-0',
                'container'     => ''
            ));

            wp_nav_menu(array(
                'theme_location' => 'header-socials',
                'menu_id'       => '',
                'menu_class'    => 'nav-social-links m-0 p-0',
                'container'     => ''
            ));
            ?>
        </div>

        <div class="popup-nav__menu popup-nav__menu-portrait">
            <?php
            // ul class=sub-menu after the anchor of portfolio element
            wp_nav_menu(array(
                'theme_location' => 'primary+secondary',
                'menu_id'       => '',
                'menu_class'    => 'pages-nav m-0 p-0',
                'container'     => ''
            ));

            wp_nav_menu(array(
                'theme_location' => 'header-socials',
                'menu_id'       => '',
                'menu_class'    => 'nav-social-links menu',
                'container'     => ''
            ));


            ?>
        </div>
    </nav>