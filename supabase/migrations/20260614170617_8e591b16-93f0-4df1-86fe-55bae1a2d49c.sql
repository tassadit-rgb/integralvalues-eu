CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.wheel_of_life (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  career smallint NOT NULL CHECK (career BETWEEN 1 AND 10),
  finances smallint NOT NULL CHECK (finances BETWEEN 1 AND 10),
  health smallint NOT NULL CHECK (health BETWEEN 1 AND 10),
  family_friends smallint NOT NULL CHECK (family_friends BETWEEN 1 AND 10),
  romance smallint NOT NULL CHECK (romance BETWEEN 1 AND 10),
  personal_growth smallint NOT NULL CHECK (personal_growth BETWEEN 1 AND 10),
  fun_recreation smallint NOT NULL CHECK (fun_recreation BETWEEN 1 AND 10),
  physical_environment smallint NOT NULL CHECK (physical_environment BETWEEN 1 AND 10),
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.wheel_of_life TO authenticated;
GRANT ALL ON public.wheel_of_life TO service_role;

ALTER TABLE public.wheel_of_life ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Wheel owner all" ON public.wheel_of_life
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX wheel_of_life_user_date_idx ON public.wheel_of_life (user_id, entry_date DESC);

CREATE TRIGGER update_wheel_of_life_updated_at
  BEFORE UPDATE ON public.wheel_of_life
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();