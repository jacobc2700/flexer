-- Get all problems and their associated notes:
DROP VIEW IF EXISTS get_problem_notes;

CREATE VIEW get_problem_notes AS (
    SELECT
        p.question_title,
        p.question_title_slug,
        n.id,
        n.user_id,
        n.title,
        n.description,
        n.body,
        n.type,
        n.created_at,
        n.updated_at,
        n.visibility,
        n.company_id,
        n.problem_id
    FROM problems p
    JOIN notes n
    ON p.id = n.problem_id
);