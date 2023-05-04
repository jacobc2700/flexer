-- Get all companies with their preview info: id, name, number of reviews, and average salary:
DROP VIEW IF EXISTS get_companies;

CREATE VIEW get_companies AS (
    SELECT companies.id, companies.company_name AS Name, COUNT(companies.id) AS Reviews, MAX(levels.base_salary) * 1000 AS Salary
    FROM levels
    JOIN companies
    ON levels.company_id = companies.id
    GROUP BY companies.id
);