CREATE TABLE favorite_companies (
  id uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
  user_id uuid NOT NULL,
  company_id uuid NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (company_id) REFERENCES companies (id),
  PRIMARY KEY (id)
);