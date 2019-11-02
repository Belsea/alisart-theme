<?php
if (is_home()) :
   $portraitMenu = "nav__pages-cats";
else :
   $portraitMenu = "nav__pages";
endif
?>

<nav id="nav" class="nav">

   <div class="nav__container">
      <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
         <img class="nav__logo" src="<?php echo esc_url(home_url('/wp-content/themes/alisart-theme/images/logo-white.svg')); ?>" alt="Alice Rossi - makeup artist &amp; hair stylist">
      </a>

      <button id="nav__toggler" class="nav__toggler">
         <div id="hamburger" class="nav__toggler__hamburger"><span></span><span></span><span></span><span></span></div>
      </button>
   </div>

   <div id="nav__menu--portrait" class="nav__menu nav__menu--portrait">
      <?php
      // ul class=sub-menu inside the li of portfolio
      wp_nav_menu(array(
         'theme_location' => $portraitMenu,
         'menu_id'       => '',
         'menu_class'    => 'nav__menu__pages nav__menu__pages--portrait m-0 p-0',
         'container'     => ''
      ));

      wp_nav_menu(array(
         'theme_location' => 'nav__socials',
         'menu_id'       => '',
         'menu_class'    => 'nav__menu__socials nav__menu__socials--portrait m-0 p-0',
         'container'     => ''
      ));
      ?>
   </div>

   <div class="nav__menu nav__menu--landscape">
      <?php
      wp_nav_menu(array(
         'theme_location' => 'nav__pages',
         'menu_id'       => '',
         'menu_class'    => 'nav__menu__pages nav__menu__pages--landscape m-0 p-0',
         'container'     => ''
      ));

      wp_nav_menu(array(
         'theme_location' => 'nav__socials',
         'menu_id'       => '',
         'menu_class'    => 'nav__menu__socials nav__menu__socials--landscape m-0 p-0',
         'container'     => ''
      ));
      ?>
   </div>

</nav>