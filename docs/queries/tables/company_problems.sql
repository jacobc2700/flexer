CREATE TABLE
  company_problems (
    id uuid DEFAULT uuid_generate_v4 (),
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    problem_id uuid,
    company_id uuid,
    FOREIGN KEY (problem_id) REFERENCES problems (id),
    FOREIGN KEY (company_id) REFERENCES companies (id),
    PRIMARY key (id)
  );
