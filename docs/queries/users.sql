CREATE TABLE users (
    id uuid default uuid_generate_v4(),
    email text,
    password text,
    username text,
    first_name text,
    last_name text,
    timestamp timestamp WITH time zone,
    primary key (id)
);