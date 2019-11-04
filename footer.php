<footer class="footer">

    <div>
        <p class="footer__p">Copyright <?php echo get_bloginfo(); ?> &copy; <?php echo date("Y"); ?></p>
        <p class="footer__p"><a href="https://www.linkedin.com/in/marina-bellacicco" class="footer__developer">Created by Marina Bellacicco</a></p>

        <?php
        /* 
        wp_nav_menu( array(
            'theme_location' => 'footer__policies',
            'menu_class'       => 'footer__policies',
            'container'     => ''
        ) ); 
        */
        ?>
    </div>

    <?php
    wp_nav_menu(array(
        'theme_location' => 'footer__socials',
        'menu_class'       => 'footer__socials m-0',
        'container'     => ''
    ));
    ?>

</footer>

<?php wp_footer(); ?>

</body>

</html>