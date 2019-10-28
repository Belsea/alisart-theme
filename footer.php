<footer>

    <div class="site-info">
        <p>Copyright <?php echo get_bloginfo(); ?> &copy; <?php echo date("Y"); ?></p>
        <p><span>Created by Marina Bellacicco</span></p>

        <?php
        /* wp_nav_menu( array(
                'theme_location' => 'footer_policies',
                'menu_id'       => 'footer-policies-links',
                'container'     => ''
            ) ); */
        ?>
    </div>

    <?php
    wp_nav_menu(array(
        'theme_location' => 'footer_socials',
        'menu_id'       => 'footer-socials-links',
        'container'     => ''
    ));
    ?>

</footer>

<?php wp_footer(); ?>

</body>

</html>