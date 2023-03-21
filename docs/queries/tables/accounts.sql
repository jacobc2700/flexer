CREATE TABLE accounts (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    type TEXT,
    provider TEXT NOT NULL,
    providerAccountId TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INT NOT NULL,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    oauth_token_secret TEXT,
    oauth_token TEXT,
    userId uuid NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);