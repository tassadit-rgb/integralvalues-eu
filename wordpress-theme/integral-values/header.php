<?php
/**
 * Header.
 *
 * @package integral-values
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#iv-main"><?php esc_html_e( 'Skip to content', 'integral-values' ); ?></a>

<header class="iv-header">
	<div class="iv-header__inner">
		<?php if ( has_custom_logo() ) : ?>
			<?php the_custom_logo(); ?>
		<?php else : ?>
			<a class="iv-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<?php bloginfo( 'name' ); ?>
				<small><?php esc_html_e( 'Human First. Purpose Driven.', 'integral-values' ); ?></small>
			</a>
		<?php endif; ?>

		<button class="iv-nav__toggle" aria-expanded="false" aria-controls="iv-primary-nav"><?php esc_html_e( 'Menu', 'integral-values' ); ?></button>

		<nav class="iv-nav" id="iv-primary-nav" aria-label="<?php esc_attr_e( 'Primary', 'integral-values' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'depth'          => 2,
					'fallback_cb'    => '__return_empty_string',
				)
			);
			?>
		</nav>

		<?php integral_values_book_button( 'Book', 'iv-btn' ); ?>
	</div>
</header>

<main id="iv-main">
