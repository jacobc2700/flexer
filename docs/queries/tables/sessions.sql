CREATE TABLE sessions (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    expires TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
    sessionToken TEXT NOT NULL,
    userId uuid NOT NULL,
    FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);