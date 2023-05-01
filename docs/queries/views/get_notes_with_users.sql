create view
  public.get_notes_with_users as
select
  notes.id,
  notes.user_id,
  notes.title,
  notes.description,
  notes.body,
  notes.type,
  notes.created_at,
  notes.updated_at,
  notes.visibility,
  notes.company_id,
  notes.problem_id,
  users.username
from
  notes
  join users on users.id = notes.user_id;