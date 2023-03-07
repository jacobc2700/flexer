CREATE TABLE
  notes (
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid not null,
    title text DEFAULT "",
    description text DEFAULT "",
    body text DEFAULT "",
    type note_type DEFAULT "UNSPECIFIED",
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    updated_at timestamp WITH time zone DEFAULT current_timestamp, 
    visibility visibility_type DEFAULT "private",
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    PRIMARY key (id)
  )
