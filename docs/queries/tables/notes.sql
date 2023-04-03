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
  problem_id uuid,
  company_id uuid,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (company_id) REFERENCES companies (id),
  FOREIGN KEY (problem_id) REFERENCES problems (id),
  PRIMARY KEY (id)
);