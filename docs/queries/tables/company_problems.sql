CREATE TABLE company_problems (
  id uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
  problem_id uuid NOT NULL,
  company_id uuid NOT NULL,
  FOREIGN KEY (problem_id) REFERENCES problems (id),
  FOREIGN KEY (company_id) REFERENCES companies (id),
  PRIMARY KEY (id)
);