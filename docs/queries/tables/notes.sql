CREATE TABLE
  notes (
    id uuid DEFAULT uuid_generate_v4 (),
    user_id uuid not null,
    title text,
    description text,
    body text,
    type note_type,
    timestamp timestamp WITH time zone DEFAULT current_timestamp,
    updated timestamp WITH time zone DEFAULT current_timestamp, 
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    PRIMARY key (id)
  )
