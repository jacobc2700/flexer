CREATE TABLE verification_tokens (
    token TEXT NOT NULL,
    identifier TEXT NOT NULL,
    expires TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
    PRIMARY KEY (token)
);