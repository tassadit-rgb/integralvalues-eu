<?php
/**
 * 404.
 *
 * @package integral-values
 */

get_header();
?>
<section class="iv-section">
	<div class="iv-wrap iv-narrow iv-center">
		<p class="iv-eyebrow"><?php esc_html_e( 'Page not found', 'integral-values' ); ?></p>
		<h1><?php esc_html_e( 'This path has moved.', 'integral-values' ); ?></h1>
		<p class="iv-lead" style="margin:0 auto 2.5rem;"><?php esc_html_e( 'Let us take you back to a quieter place.', 'integral-values' ); ?></p>
		<a class="iv-btn" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Return home', 'integral-values' ); ?></a>
	</div>
</section>
<?php
get_footer();
