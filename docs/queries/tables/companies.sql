create table companies (
    id uuid default uuid_generate_v4(),
    created_at timestamp WITH time zone DEFAULT current_timestamp,
    company_name text unique,
    primary key (id)
)
