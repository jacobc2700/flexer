-- Get all users and their associated notes:
DROP VIEW IF EXISTS get_user_notes;

CREATE VIEW get_user_notes AS (
    SELECT
        notes.id as note_id,
        notes.title,
        notes.description,
        notes.body,
        notes.type,
        notes.created_at,
        notes.updated_at,
        notes.visibility,
        notes.company_id,
        notes.problem_id,
        users.username,
        users.id as user_id
    FROM notes
    JOIN users
    ON users.id = notes.user_id
);