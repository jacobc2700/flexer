CREATE POLICY "dev_policy"
ON public.levels
FOR SELECT USING (
  true
);