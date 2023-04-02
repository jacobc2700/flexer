DROP VIEW IF EXISTS get_company_notes;

CREATE VIEW get_company_notes AS (
    SELECT C.company_name as company_name, N.*
    FROM companies AS C
    JOIN notes AS N
    on C.id = N.company_id
);