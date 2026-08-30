ALTER TABLE public.affiliate_applications
  ADD COLUMN IF NOT EXISTS reference_code text,
  ADD COLUMN IF NOT EXISTS status_note text,
  ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone NOT NULL DEFAULT now();

UPDATE public.affiliate_applications
SET reference_code = 'IV-' || upper(substr(md5(id::text), 1, 8))
WHERE reference_code IS NULL;

ALTER TABLE public.affiliate_applications
  ALTER COLUMN reference_code SET DEFAULT 'IV-' || upper(substr(md5(gen_random_uuid()::text), 1, 8));

ALTER TABLE public.affiliate_applications
  ALTER COLUMN reference_code SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS affiliate_applications_reference_code_key
  ON public.affiliate_applications (reference_code);

DROP TRIGGER IF EXISTS affiliate_applications_set_updated_at ON public.affiliate_applications;
CREATE TRIGGER affiliate_applications_set_updated_at
  BEFORE UPDATE ON public.affiliate_applications
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();