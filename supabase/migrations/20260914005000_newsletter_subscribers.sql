CREATE TABLE public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'subscribed' CHECK (status IN ('subscribed', 'unsubscribed')),
  source text NOT NULL DEFAULT 'website_footer',
  consent_version text NOT NULL DEFAULT '2026-09-14',
  consented_at timestamp with time zone NOT NULL DEFAULT now(),
  unsubscribed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT newsletter_email_basic_check CHECK (
    char_length(email) BETWEEN 5 AND 320
    AND position('@' IN email) > 1
  )
);

CREATE UNIQUE INDEX newsletter_subscribers_email_unique_idx
  ON public.newsletter_subscribers (lower(email));

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'subscribed'
    AND consent_version = '2026-09-14'
    AND source = 'website_footer'
  );

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
