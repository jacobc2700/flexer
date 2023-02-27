-- CREATE TABLE users (
--     id uuid default uuid_generate_v4(),
--     email text,
--     password text,
--     username text,
--     first_name text,
--     last_name text,
--     timestamp timestamp WITH time zone,
--     primary key (id)
-- );


CREATE TABLE users (
    -- id uuid default uuid_generate_v4(), -- generic id
    user_id id, -- id FK to auth.users (id)
    email text,
    password text,
    username text,
    first_name text,
    last_name text,
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    updated_at timestamp WITH time zone DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    PRIMARY KEY (user_id, username)
);

-- CREATE TABLE users (
--     id uuid DEFAULT uuid_generate_v4 (),
--     timestamp timestamp WITH time zone DEFAULT current_timestamp,
--     user_id uuid,
--     company_id uuid,
--     FOREIGN KEY (user_id) REFERENCES auth.users (id),
--     FOREIGN KEY (company_id) REFERENCES companies (id),
--     PRIMARY key (id)
-- );