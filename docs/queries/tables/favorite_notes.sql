CREATE TABLE favorite_notes (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
  user_id uuid NOT NULL,
  note_id uuid NOT NULL,
  type note_type NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (note_id) REFERENCES notes (id),
  PRIMARY KEY (id)
);
