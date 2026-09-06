<?php
/**
 * Footer.
 *
 * @package integral-values
 */
?>
</main>

<footer class="iv-footer">
	<div class="iv-footer__inner">
		<div>
			<h4><?php bloginfo( 'name' ); ?></h4>
			<p style="font-size:.92rem;max-width:26ch;"><?php esc_html_e( 'Human First. Purpose Driven. Transformation Inspired.', 'integral-values' ); ?></p>
		</div>
		<div>
			<h4><?php esc_html_e( 'Explore', 'integral-values' ); ?></h4>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'depth'          => 1,
					'fallback_cb'    => '__return_empty_string',
				)
			);
			?>
		</div>
		<div>
			<h4><?php esc_html_e( 'Confidentiality', 'integral-values' ); ?></h4>
			<p style="font-size:.92rem;max-width:30ch;"><?php esc_html_e( 'Your privacy matters. Your trust is our greatest responsibility. Sessions are confidential; this site is not an emergency service.', 'integral-values' ); ?></p>
		</div>
		<div>
			<h4><?php esc_html_e( 'Begin', 'integral-values' ); ?></h4>
			<?php integral_values_book_button( 'Book a consultation', 'iv-btn iv-btn--light' ); ?>
		</div>
	</div>
	<div class="iv-footer__bottom">
		&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Integral Values&reg;. <?php esc_html_e( 'All rights reserved.', 'integral-values' ); ?>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
