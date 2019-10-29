<?php
if (is_home()) :
   $portraitMenu = "popup-nav_pages-categories";
else :
   $portraitMenu = "popup-nav_pages";
endif
?>

<nav id="popup-nav" class="popup-nav">

   <div class="popup-nav__subcontainer">
      <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
         <img class="popup-nav__logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo-white.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
      </a>

      <button id="popup-nav__toggler" class="popup-nav__toggler">
         <div id="hamburger" class="popup-nav__toggler__hamburger"><span></span><span></span><span></span><span></span></div>
      </button>
   </div>

   <div id="popup-nav__menu-portrait" class="popup-nav__menu popup-nav__menu-portrait">
      <?php
      // ul class=sub-menu inside the li of portfolio
      wp_nav_menu(array(
         'theme_location' => $portraitMenu,
         'menu_id'       => '',
         'menu_class'    => 'popup-nav__menu__pages popup-nav__menu-portrait__pages m-0 p-0',
         'container'     => ''
      ));

      wp_nav_menu(array(
         'theme_location' => 'popup-nav_socials',
         'menu_id'       => '',
         'menu_class'    => 'popup-nav__menu__socials popup-nav__menu-portrait__socials m-0 p-0',
         'container'     => ''
      ));
      ?>
   </div>

   <div class="popup-nav__menu popup-nav__menu-landscape">
      <?php
      wp_nav_menu(array(
         'theme_location' => 'popup-nav_pages',
         'menu_id'       => '',
         'menu_class'    => 'popup-nav__menu__pages popup-nav__menu-landscape__pages m-0 p-0',
         'container'     => ''
      ));

      wp_nav_menu(array(
         'theme_location' => 'popup-nav_socials',
         'menu_id'       => '',
         'menu_class'    => 'popup-nav__menu__socials popup-nav__menu-landscape__socials m-0 p-0',
         'container'     => ''
      ));
      ?>
   </div>

</nav>