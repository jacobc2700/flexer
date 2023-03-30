DROP VIEW IF EXISTS get_user_notes;

CREATE VIEW get_user_notes AS (
    SELECT users.id, users.username, notes.id AS note_id, notes.title, notes.description, notes.body, notes.type, notes.created_at, notes.updated_at, notes.visibility
    FROM users
    JOIN notes
    ON users.id = notes.user_id
);