CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    email TEXT NOT NULL,
    password TEXT,
    username TEXT NOT NULL,
    first_name TEXT DEFAULT "",
    last_name TEXT DEFAULT "",
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
    visibility visibility_type DEFAULT "PRIVATE",
    emailVerified TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    image TEXT DEFAULT NULL,
    PRIMARY KEY (id)
);