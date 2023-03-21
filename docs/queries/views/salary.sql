-- ...

DROP VIEW joined_tables;

CREATE VIEW joined_tables AS (
    SELECT companies.id, companies.company_name AS Name, COUNT(companies.id) AS Reviews, MAX(levels.base_salary) * 1000 AS Salary
    FROM levels
    JOIN companies
    ON levels.company_id = companies.id
    GROUP BY companies.id
    LIMIT 5
);