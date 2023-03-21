CREATE TABLE companies (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp NOT NULL,
    company_name TEXT UNIQUE NOT NULL,
    PRIMARY KEY (id)
);