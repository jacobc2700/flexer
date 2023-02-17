-- TODO: create the companies table

CREATE TABLE
  favorite_companies (
    id uuid DEFAULT uuid_generate_v4 (),
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    user_id uuid,
    company_id uuid,
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    FOREIGN KEY (company_id) REFERENCES companies (id),
    PRIMARY key (id)
  );
