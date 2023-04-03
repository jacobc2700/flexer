DROP VIEW IF EXISTS get_problem_notes;

CREATE VIEW get_problem_notes AS (
    SELECT P.question_title, P.question_title_slug, N.*
    FROM problems AS P
    JOIN notes AS N
    on P.id = N.problem_id
);