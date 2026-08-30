CREATE TABLE public.affiliate_referrers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  referrals_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.affiliate_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  profession TEXT NOT NULL,
  credentials TEXT NOT NULL,
  fields TEXT NOT NULL,
  message TEXT,
  referral_code TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX affiliate_applications_referral_code_idx ON public.affiliate_applications (referral_code);

GRANT INSERT ON public.affiliate_referrers TO anon, authenticated;
GRANT INSERT ON public.affiliate_applications TO anon, authenticated;
GRANT ALL ON public.affiliate_referrers TO service_role;
GRANT ALL ON public.affiliate_applications TO service_role;

ALTER TABLE public.affiliate_referrers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a referral code"
  ON public.affiliate_referrers FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can submit an affiliate application"
  ON public.affiliate_applications FOR INSERT TO anon, authenticated WITH CHECK (true);