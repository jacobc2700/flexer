# Flexer Style Guide

Conventions to follow for the project.

Server:

TODO: cache headers for get requests

# API:

Standardized response object:
**Use the standard_resp() function**
Response format =>
{
ok: bool,
status: int, # a status code
message: str # some descriptor for the status
data: any (if None -> becomes null in json)
}

# Status Codes

- 201 - created (when a resource is successfully created).
- 400 - bad request.
- 405 - method not allowed (the provided request.method is not allowed).
- 500 - internal server error.

# API Folder Structure

# SQL:

- Table names are lowercase plural, eg: companies, users, sessions.
- Only column names are lowercase (with the exception of certain data types), while everything else should be uppercase.
- Use snake case (underlines between words).

# Entity Relationship (ER) Diagrams:

- Use [draw.io](draw.io) to make diagrams.
- Attributes which are not PK/FK are not listed in the entity boxes.
- Complete list of tables can be viewed in `/docs/queries`.
- It would be best to have the arrows go directly between foreign and primary keys.
- Each new version of the current EMR state diagram should be named by the creation date.
