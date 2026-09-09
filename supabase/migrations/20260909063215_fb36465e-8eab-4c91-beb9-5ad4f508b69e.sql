create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  country text,
  role text,
  interest text not null,
  message text not null,
  status text not null default 'new'
);

grant select, update, delete on public.contact_requests to authenticated;
grant all on public.contact_requests to service_role;

alter table public.contact_requests enable row level security;

create policy "Authenticated staff can read contact requests"
  on public.contact_requests for select to authenticated using (true);

create policy "Authenticated staff can update contact requests"
  on public.contact_requests for update to authenticated using (true);
