<?php
/**
 * Homepage — mirrors the Integral Values master homepage.
 *
 * @package integral-values
 */

get_header();

$hero_video  = get_theme_mod( 'integral_values_hero_video', '' );
$hero_image  = get_theme_mod( 'integral_values_hero_image', '' );
$founder_img = get_theme_mod( 'integral_values_founder_image', '' );

$journey = array(
	array( 'step' => 'Discover Yourself', 'name' => 'Psyché™', 'slug' => 'psyche', 'body' => 'Evidence-based psychological and leadership assessment, read with you rather than about you.' ),
	array( 'step' => 'Heal Deeply', 'name' => 'Care & Therapy', 'slug' => 'care-therapy', 'body' => 'A safe space for anxiety, burnout, trauma, relationships and the quiet work of repair.' ),
	array( 'step' => 'Unlock Your Potential', 'name' => 'Coaching', 'slug' => 'coaching', 'body' => 'Executive, leadership, career and life coaching for people who want to lead consciously.' ),
	array( 'step' => 'Thrive Together', 'name' => 'Cross-Culture', 'slug' => 'cross-culture', 'body' => 'Intercultural intelligence for individuals, families and international organisations.' ),
	array( 'step' => 'Become Whole', 'name' => 'CORE™', 'slug' => 'core', 'body' => 'Our signature integrative pathway, aligning Body, Brain, Heart and Consciousness.' ),
);

$pillars = array(
	array( 'title' => 'Coaching', 'line' => 'Unlock Your Potential.', 'slug' => 'coaching', 'mod' => 'coaching', 'alt' => 'A person facing an open horizon at sunrise' ),
	array( 'title' => 'Care & Therapy', 'line' => 'Heal. Reconnect. Flourish.', 'slug' => 'care-therapy', 'mod' => 'care', 'alt' => 'Soft daylight falling through a quiet forest' ),
	array( 'title' => 'Cross-Culture', 'line' => 'Thrive Across Borders.', 'slug' => 'cross-culture', 'mod' => 'culture', 'alt' => 'People of different cultures walking side by side' ),
	array( 'title' => 'CORE™', 'line' => 'Become Whole.', 'slug' => 'core', 'mod' => 'core', 'alt' => 'A solitary figure in deep blue light' ),
);

$four_c = array(
	array( 'Body', 'The first witness. Breath, posture and fatigue carry what has not yet been said.' ),
	array( 'Brain', 'The organiser. Beliefs and learned patterns shape how a situation is read.' ),
	array( 'Heart', 'The compass. Emotion and attachment give every decision its weight.' ),
	array( 'Consciousness', 'The apex. Values and meaning integrate the three others.' ),
);

$values = array(
	'Inclusive'  => 'A way of thinking and acting that lets every individual feel accepted, valued and safe.',
	'Nurturing'  => 'To care for and protect someone while they are growing. Relationships are at the centre of what we do.',
	'Thriving'   => 'A positive psychological state combining vitality with a genuine sense of learning.',
	'Effective'  => 'Using all your energy, skill and motivation to reach the goals you set for yourself.',
	'Go-Getter'  => 'Moving ahead until goals are reached and surpassed, becoming a model for others.',
	'Resilient'  => 'Adapting successfully to difficult experiences through mental, emotional and behavioural flexibility.',
	'Assertive'  => 'Standing up for your interests and expressing your thoughts because respect runs both ways.',
	'Liveliness' => 'Passion for human beings and for life, kept enthusiastic and accountable.',
);

function iv_page_link( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' . $slug . '/' );
}
?>

<section class="iv-hero">
	<?php if ( $hero_video ) : ?>
		<video src="<?php echo esc_url( $hero_video ); ?>" <?php if ( $hero_image ) : ?>poster="<?php echo esc_url( $hero_image ); ?>"<?php endif; ?> autoplay muted loop playsinline aria-hidden="true"></video>
	<?php elseif ( $hero_image ) : ?>
		<img class="iv-hero__img" src="<?php echo esc_url( $hero_image ); ?>" alt="" aria-hidden="true" />
	<?php endif; ?>
	<div class="iv-hero__veil"></div>
	<div class="iv-hero__inner">
		<p class="iv-eyebrow"><?php esc_html_e( "You're Not Alone.", 'integral-values' ); ?></p>
		<h1><?php esc_html_e( 'Helping You Heal. Grow. Flourish.', 'integral-values' ); ?></h1>
		<p class="iv-hero__sub"><?php esc_html_e( 'Integrative Psychology • Coaching • Cross-Cultural Intelligence • Leadership', 'integral-values' ); ?></p>
		<div class="iv-hero__actions">
			<?php integral_values_book_button( 'Book a consultation' ); ?>
			<a class="iv-btn iv-btn--light" href="<?php echo esc_url( iv_page_link( 'our-method' ) ); ?>"><?php esc_html_e( 'Discover our approach', 'integral-values' ); ?></a>
		</div>
	</div>
</section>

<section class="iv-section">
	<div class="iv-wrap iv-narrow iv-center">
		<h2><?php esc_html_e( 'We don’t simply solve problems. We help people become whole.', 'integral-values' ); ?></h2>
		<p class="iv-lead" style="margin:2rem auto 0;"><?php esc_html_e( 'Integral Values® brings together psychology, therapy, coaching, leadership and cross-cultural intelligence in one coherent approach. We work internationally, in strict confidence, with people who are ready to look at their life as a whole.', 'integral-values' ); ?></p>
	</div>
</section>

<section class="iv-section iv-section--muted">
	<div class="iv-wrap">
		<p class="iv-eyebrow"><?php esc_html_e( 'The Integral Journey', 'integral-values' ); ?></p>
		<h2><?php esc_html_e( 'Five movements, one direction', 'integral-values' ); ?></h2>
		<ol class="iv-journey" style="margin-top:2.5rem;">
			<?php foreach ( $journey as $j ) : ?>
				<li>
					<span class="iv-step"><?php echo esc_html( $j['step'] ); ?></span>
					<h3><a href="<?php echo esc_url( iv_page_link( $j['slug'] ) ); ?>"><?php echo esc_html( $j['name'] ); ?></a></h3>
					<p class="iv-muted" style="margin:0;"><?php echo esc_html( $j['body'] ); ?></p>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>

<?php $i = 0; foreach ( $pillars as $p ) : $img = get_theme_mod( 'integral_values_pillar_' . $p['mod'], '' ); ?>
	<section>
		<div class="iv-wrap iv-row <?php echo ( $i % 2 === 1 ) ? 'iv-row--flip' : ''; ?>">
			<figure>
				<?php if ( $img ) : ?>
					<img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $p['alt'] ); ?>" loading="lazy" />
				<?php endif; ?>
			</figure>
			<div>
				<h2><?php echo esc_html( $p['title'] ); ?></h2>
				<p class="iv-line"><?php echo esc_html( $p['line'] ); ?></p>
				<p><a href="<?php echo esc_url( iv_page_link( $p['slug'] ) ); ?>" style="font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;"><?php esc_html_e( 'Learn more', 'integral-values' ); ?> &rarr;</a></p>
			</div>
		</div>
	</section>
<?php $i++; endforeach; ?>

<section class="iv-section iv-section--muted">
	<div class="iv-wrap">
		<p class="iv-eyebrow"><?php esc_html_e( 'The 4C Framework', 'integral-values' ); ?></p>
		<h2><?php esc_html_e( 'Body. Brain. Heart. Consciousness.', 'integral-values' ); ?></h2>
		<div class="iv-4c" style="margin-top:2.5rem;">
			<?php foreach ( $four_c as $c ) : ?>
				<div class="iv-4c__item">
					<h3><?php echo esc_html( $c[0] ); ?></h3>
					<p><?php echo esc_html( $c[1] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="iv-section">
	<div class="iv-wrap">
		<p class="iv-eyebrow"><?php esc_html_e( 'Our Values', 'integral-values' ); ?></p>
		<h2>I.N.T.E.G.R.A.L.</h2>
		<dl class="iv-values" style="margin-top:2.5rem;">
			<?php foreach ( $values as $k => $v ) : ?>
				<div>
					<dt><?php echo esc_html( $k ); ?></dt>
					<dd><?php echo esc_html( $v ); ?></dd>
				</div>
			<?php endforeach; ?>
		</dl>
	</div>
</section>

<section class="iv-section iv-section--muted">
	<div class="iv-wrap iv-row">
		<figure>
			<?php if ( $founder_img ) : ?>
				<img src="<?php echo esc_url( $founder_img ); ?>" alt="<?php esc_attr_e( 'Dr Tassadit Cherfaoui, founder of Integral Values', 'integral-values' ); ?>" loading="lazy" />
			<?php endif; ?>
		</figure>
		<div>
			<p class="iv-quote"><?php esc_html_e( 'A life dedicated to helping people become the best version of themselves — thriving, flourishing, and at home in who they are.', 'integral-values' ); ?></p>
			<p class="iv-muted" style="margin-top:1.6rem;max-width:34rem;"><?php esc_html_e( 'Twenty-five years of clinical practice and more than two decades accompanying leaders and organisations across cultures and continents. We never divide a person into parts.', 'integral-values' ); ?></p>
			<p class="iv-signature" style="margin-top:1.5rem;">Tassadit</p>
		</div>
	</div>
</section>

<section class="iv-section">
	<div class="iv-wrap iv-narrow iv-center">
		<p class="iv-quote"><?php esc_html_e( 'Your privacy matters. Your trust is our greatest responsibility.', 'integral-values' ); ?></p>
		<p style="margin-top:2rem;"><?php integral_values_book_button( 'Book a consultation' ); ?></p>
	</div>
</section>

<?php
get_footer();
