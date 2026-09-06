<?php
/**
 * Integral Values theme functions.
 *
 * @package integral-values
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function integral_values_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-logo', array( 'height' => 60, 'width' => 240, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'align-wide' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary menu', 'integral-values' ),
			'footer'  => __( 'Footer menu', 'integral-values' ),
		)
	);
}
add_action( 'after_setup_theme', 'integral_values_setup' );

function integral_values_assets() {
	wp_enqueue_style(
		'integral-values-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&family=Mrs+Saint+Delafield&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'integral-values', get_stylesheet_uri(), array( 'integral-values-fonts' ), wp_get_theme()->get( 'Version' ) );
	wp_enqueue_script( 'integral-values', get_template_directory_uri() . '/assets/theme.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'integral_values_assets' );

/**
 * Booking URL — set in Customizer once Amelia is installed.
 */
function integral_values_booking_url() {
	$url = get_theme_mod( 'integral_values_booking_url', '' );
	if ( ! $url ) {
		$page = get_page_by_path( 'contact' );
		$url  = $page ? get_permalink( $page ) : home_url( '/contact/' );
	}
	return esc_url( $url );
}

function integral_values_customize( $wp_customize ) {
	$wp_customize->add_section(
		'integral_values_options',
		array(
			'title'    => __( 'Integral Values', 'integral-values' ),
			'priority' => 30,
		)
	);

	$wp_customize->add_setting( 'integral_values_booking_url', array( 'sanitize_callback' => 'esc_url_raw', 'default' => '' ) );
	$wp_customize->add_control(
		'integral_values_booking_url',
		array(
			'label'       => __( 'Booking URL (Amelia page)', 'integral-values' ),
			'description' => __( 'Where every “Book a consultation” button points.', 'integral-values' ),
			'section'     => 'integral_values_options',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting( 'integral_values_hero_video', array( 'sanitize_callback' => 'esc_url_raw', 'default' => '' ) );
	$wp_customize->add_control(
		'integral_values_hero_video',
		array(
			'label'       => __( 'Homepage hero video URL (MP4)', 'integral-values' ),
			'description' => __( 'Upload the lavender field video to the Media Library and paste its URL. Leave empty to use the hero image only.', 'integral-values' ),
			'section'     => 'integral_values_options',
			'type'        => 'url',
		)
	);

	$wp_customize->add_setting( 'integral_values_hero_image', array( 'sanitize_callback' => 'esc_url_raw', 'default' => '' ) );
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'integral_values_hero_image',
			array(
				'label'   => __( 'Homepage hero image (video poster / fallback)', 'integral-values' ),
				'section' => 'integral_values_options',
			)
		)
	);

	$wp_customize->add_setting( 'integral_values_founder_image', array( 'sanitize_callback' => 'esc_url_raw', 'default' => '' ) );
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'integral_values_founder_image',
			array(
				'label'   => __( 'Founder portrait (homepage)', 'integral-values' ),
				'section' => 'integral_values_options',
			)
		)
	);

	foreach ( array( 'coaching', 'care', 'culture', 'core' ) as $key ) {
		$wp_customize->add_setting( 'integral_values_pillar_' . $key, array( 'sanitize_callback' => 'esc_url_raw', 'default' => '' ) );
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				'integral_values_pillar_' . $key,
				array(
					'label'   => sprintf( __( 'Pillar image — %s', 'integral-values' ), $key ),
					'section' => 'integral_values_options',
				)
			)
		);
	}
}
add_action( 'customize_register', 'integral_values_customize' );

/**
 * Small helper: a book button.
 */
function integral_values_book_button( $label = 'Book a consultation', $class = 'iv-btn' ) {
	printf(
		'<a class="%1$s" href="%2$s">%3$s</a>',
		esc_attr( $class ),
		integral_values_booking_url(),
		esc_html( $label )
	);
}

/**
 * Excerpt used as the page lead paragraph.
 */
function integral_values_page_lead() {
	$lead = get_the_excerpt();
	if ( $lead ) {
		printf( '<p class="iv-lead">%s</p>', esc_html( wp_strip_all_tags( $lead ) ) );
	}
}
