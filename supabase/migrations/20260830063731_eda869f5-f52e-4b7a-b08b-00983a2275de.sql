CREATE TABLE public.affiliate_apply_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  confirmed_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.affiliate_apply_sessions TO service_role;
ALTER TABLE public.affiliate_apply_sessions ENABLE ROW LEVEL SECURITY;

CREATE INDEX affiliate_apply_sessions_email_idx ON public.affiliate_apply_sessions (lower(email));

ALTER TABLE public.affiliate_applications
  ADD COLUMN IF NOT EXISTS referees jsonb NOT NULL DEFAULT '[]'::jsonb;