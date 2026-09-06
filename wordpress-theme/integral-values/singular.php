<?php
/**
 * Single post template.
 *
 * @package integral-values
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="iv-pagehero">
		<div class="iv-wrap">
			<p class="iv-eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
			<h1><?php the_title(); ?></h1>
		</div>
	</section>
	<section class="iv-section" style="padding-top:1rem;">
		<div class="iv-wrap">
			<div class="iv-narrow iv-content"><?php the_content(); ?></div>
		</div>
	</section>
	<?php
endwhile;

get_footer();
