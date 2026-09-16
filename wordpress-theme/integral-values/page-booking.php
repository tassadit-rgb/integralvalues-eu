<?php
/** Template Name: Calendly Booking
 * @package integral-values
 */
get_header();
$services = array(
    array( 'title' => 'Let’s talk!', 'duration' => 15, 'price' => 'Free', 'url' => 'https://calendly.com/integralvalues/chemistry-call' ),
    array( 'title' => 'I Need Help!', 'duration' => 45, 'price' => '€75 per session', 'url' => 'https://calendly.com/integralvalues/ineedhelp' ),
    array( 'title' => 'CoachMeUp!', 'duration' => 60, 'price' => '€99 per session', 'url' => 'https://calendly.com/integralvalues/coachmeup' ),
    array( 'title' => 'Culture Talk', 'duration' => 60, 'price' => '€125 per session', 'url' => 'https://calendly.com/integralvalues/culture-talk' ),
    array( 'title' => 'LeadUp (Core)', 'duration' => 60, 'price' => '€250 per session', 'url' => 'https://calendly.com/integralvalues/leadup-core' ),
    array( 'title' => 'Supervision', 'duration' => 90, 'price' => '€75 per participant · Maximum 12 participants', 'url' => 'https://calendly.com/integralvalues/supervisor-group' ),
);
?>
<section class="iv-pagehero"><div class="iv-wrap">
<p class="iv-eyebrow">Booking</p><h1>Choose the support that fits.</h1>
<p class="iv-lead">Let’s talk! is free. All other sessions require payment through Calendly.</p>
</div></section>
<section class="iv-section"><div class="iv-wrap">
<?php foreach ( $services as $service ) : ?>
<article class="iv-content" style="margin-bottom:3rem;">
<h2><?php echo esc_html( $service['title'] ); ?></h2>
<p><?php echo esc_html( $service['duration'] . ' min · ' . $service['price'] ); ?></p>
<a class="iv-btn" href="<?php echo esc_url( $service['url'] ); ?>">Continue to booking</a>
</article>
<?php endforeach; ?>
</div></section>
<?php get_footer(); ?>
