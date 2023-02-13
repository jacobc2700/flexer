CREATE TABLE
  favorite_notes (
    id uuid DEFAULT uuid_generate_v4 (),
    timestamp timestamp WITH time zone DEFAULT current_timestamp,
    user_id uuid not null,
    note_id uuid not null,
    type note_type
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    FOREIGN KEY (note_id) REFERENCES notes (id),
    PRIMARY key (id)
  );
