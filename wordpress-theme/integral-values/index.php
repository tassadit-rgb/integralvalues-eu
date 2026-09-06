<?php
/**
 * Fallback template (blog index, archives, search).
 *
 * @package integral-values
 */

get_header();
?>
<section class="iv-pagehero">
	<div class="iv-wrap">
		<p class="iv-eyebrow"><?php esc_html_e( 'Reading room', 'integral-values' ); ?></p>
		<h1><?php echo esc_html( is_home() ? __( 'Articles & reflections', 'integral-values' ) : wp_strip_all_tags( get_the_archive_title() ) ); ?></h1>
	</div>
</section>

<section class="iv-section" style="padding-top:1rem;">
	<div class="iv-wrap">
		<?php if ( have_posts() ) : ?>
			<div class="iv-grid iv-grid--3">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article class="iv-card">
						<p class="iv-card__meta"><?php echo esc_html( get_the_date() ); ?></p>
						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<p><?php echo esc_html( wp_trim_words( wp_strip_all_tags( get_the_excerpt() ), 28 ) ); ?></p>
					</article>
					<?php
				endwhile;
				?>
			</div>
			<div style="margin-top:2.5rem;"><?php the_posts_pagination(); ?></div>
		<?php else : ?>
			<p class="iv-lead"><?php esc_html_e( 'Nothing here yet.', 'integral-values' ); ?></p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
