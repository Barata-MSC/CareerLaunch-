alter table public.job_applications
  drop constraint if exists job_applications_title_length_check,
  add constraint job_applications_title_length_check
    check (char_length(title) <= 300) not valid,
  drop constraint if exists job_applications_company_length_check,
  add constraint job_applications_company_length_check
    check (char_length(company) <= 200) not valid,
  drop constraint if exists job_applications_location_length_check,
  add constraint job_applications_location_length_check
    check (char_length(location) <= 200) not valid,
  drop constraint if exists job_applications_source_length_check,
  add constraint job_applications_source_length_check
    check (char_length(source) <= 100) not valid,
  drop constraint if exists job_applications_external_job_id_length_check,
  add constraint job_applications_external_job_id_length_check
    check (char_length(external_job_id) <= 200) not valid,
  drop constraint if exists job_applications_apply_url_length_check,
  add constraint job_applications_apply_url_length_check
    check (char_length(apply_url) <= 2048) not valid,
  drop constraint if exists job_applications_notes_length_check,
  add constraint job_applications_notes_length_check
    check (char_length(notes) <= 5000) not valid,
  drop constraint if exists job_applications_apply_url_scheme_check,
  add constraint job_applications_apply_url_scheme_check
    check (apply_url is null or apply_url ~* '^https?://') not valid;

-- After reviewing existing rows, the lead dev can validate each constraint with
-- ALTER TABLE public.job_applications VALIDATE CONSTRAINT <constraint_name>.

create or replace function public.set_job_applications_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  if new.status is distinct from old.status then
    new.status_updated_at = now();
  end if;
  return new;
end;
$$;
