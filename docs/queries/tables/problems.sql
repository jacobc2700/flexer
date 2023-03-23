CREATE TABLE problems (
    id uuid DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    question_id INT,
    question_title TEXT,
    question_title_slug TEXT,
    total_accepted INT,
    total_submitted INT,
    frontend_question_id INT,
    difficulty INT,
    paid_only BOOLEAN,
    PRIMARY KEY (id)
);