<?php
/**
 * Single page template.
 *
 * @package integral-values
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="iv-pagehero">
		<div class="iv-wrap">
			<p class="iv-eyebrow"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></p>
			<h1><?php the_title(); ?></h1>
			<?php integral_values_page_lead(); ?>
		</div>
	</section>

	<?php if ( has_post_thumbnail() ) : ?>
		<div class="iv-wrap">
			<figure style="margin:0 0 2rem;border-radius:2rem;overflow:hidden;">
				<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy' ) ); ?>
			</figure>
		</div>
	<?php endif; ?>

	<section class="iv-section" style="padding-top:1rem;">
		<div class="iv-wrap">
			<div class="iv-narrow iv-content">
				<?php the_content(); ?>
			</div>
			<div class="iv-narrow iv-center" style="margin-top:3.5rem;">
				<?php integral_values_book_button(); ?>
			</div>
		</div>
	</section>
	<?php
endwhile;

get_footer();
