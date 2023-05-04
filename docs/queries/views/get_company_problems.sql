-- Get all companies and their associated problems:
DROP VIEW IF EXISTS get_problem_companies;

CREATE VIEW get_company_problems AS (
  SELECT C_P.*, C.company_name, P.question_title, P.question_title_slug
  FROM company_problems AS C_P
  JOIN companies AS C
    on C_P.company_id = C.id
  JOIN problems AS P
    on C_P.problem_id = P.id
);