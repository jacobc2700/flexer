CREATE TABLE users (
    -- id uuid default uuid_generate_v4(), -- generic id
    user_id id, -- id FK to auth.users (id)
    email text,
    password text,
    username text,
    first_name text DEFAULT "",
    last_name text DEFAULT "",
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    updated_at timestamp WITH time zone DEFAULT current_timestamp,
    visibility visibility_type DEFAULT "private",
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    primary key (user_id)
);