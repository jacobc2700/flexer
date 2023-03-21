CREATE TABLE favorite_problems (
  id uuid DEFAULT uuid_generate_v4() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
  user_id uuid NOT NULL,
  problem_id uuid NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (problem_id) REFERENCES problems (id),
  PRIMARY KEY (id)
);
