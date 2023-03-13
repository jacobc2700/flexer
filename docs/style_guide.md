Server:

TODO: cache headers for get requests

standardized response object:
**Use the standard_resp() function**
Response format =>
{
ok: bool,
status: int, # a status code
message: str # some descriptor for the status
data: any (if None -> becomes null in json)
}

# Status Codes

- 201 - created (when a resource is successfully created)
- 400 - bad request
- 405 - method not allowed (the provided request.method is not allowed)
- 500 - internal server error

# API Folder Structure
