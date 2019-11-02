<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_head(); ?>
</head>

<body <?php body_class('index'); ?>>

    <?php get_template_part('partials/responsive-bg') ?>

    <header class="index-header">
        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
            <img class="index-header__logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
        </a>

        <?php
        wp_nav_menu(array(
            'theme_location' => 'index-header__socials',
            'menu_class'       => 'index-header__socials m-0 p-0',
            'container'     => ''
        ));
        ?>
        <?php
        wp_nav_menu(array(
            'theme_location' => 'index-header__pages',
            'menu_class'       => 'index-header__pages m-0 p-0',
            'container'     => ''
        ));
        ?>
    </header>


    <?php get_template_part('partials/nav') ?>