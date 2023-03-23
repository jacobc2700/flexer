-- TODO: remove

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT,
    username TEXT NOT NULL UNIQUE,
    first_name TEXT DEFAULT "",
    last_name TEXT DEFAULT "",
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    visibility visibility_type DEFAULT "PRIVATE",
    emailVerified TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    image TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);