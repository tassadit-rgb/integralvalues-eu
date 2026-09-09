-- Keep contact enquiries behind server-side code only.
-- The public contact form writes through supabaseAdmin (service_role), so
-- authenticated browser sessions do not need direct table access.

DROP POLICY IF EXISTS "Authenticated staff can read contact requests"
  ON public.contact_requests;

DROP POLICY IF EXISTS "Authenticated staff can update contact requests"
  ON public.contact_requests;

REVOKE ALL ON public.contact_requests FROM anon;
REVOKE ALL ON public.contact_requests FROM authenticated;

GRANT ALL ON public.contact_requests TO service_role;
