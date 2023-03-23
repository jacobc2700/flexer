CREATE TABLE notes (
  id uuid DEFAULT uuid_generate_v4() UNIQUE,
  user_id uuid NOT NULL,
  title text DEFAULT "",
  description text DEFAULT "",
  body text DEFAULT "",
  type note_type DEFAULT "UNSPECIFIED",
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp, 
  visibility visibility_type DEFAULT "PRIVATE",
  FOREIGN KEY (user_id) REFERENCES users (id),
  PRIMARY KEY (id)
);