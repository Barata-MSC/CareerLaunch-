alter table public.job_applications
  drop constraint if exists job_applications_external_job_id_length_check,
  add constraint job_applications_external_job_id_length_check
    check (char_length(external_job_id) <= 512) not valid;