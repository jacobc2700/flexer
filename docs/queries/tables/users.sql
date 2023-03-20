CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4 (),
    email text,
    password text,
    username text,
    first_name text DEFAULT "",
    last_name text DEFAULT "",
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    updated_at timestamp WITH time zone DEFAULT current_timestamp,
    visibility visibility_type DEFAULT "private",
    emailVerified timestamp WITH time zone DEFAULT NULL,
    image text DEFAULT NULL,
    primary key (id)
);