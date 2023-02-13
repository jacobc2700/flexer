CREATE TABLE
  favorite_problems (
    id uuid DEFAULT uuid_generate_v4 (),
    timestamp timestamp WITH time zone DEFAULT current_timestamp,
    user_id uuid not null,
    problem_id uuid not null,
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    FOREIGN KEY (problem_id) REFERENCES problems (id),
    PRIMARY key (id)
  );
