Server:

TODO: cache headers for get requests

return object standard:

Response => 
{
    ok: bool,
    status: int, # a status code
    message: str # some descriptor for the status
    data: {}
}

Status codes used:
201 - created (when a resource is successfully created)

400 - bad request
405 - method not allowed (the provided request.method is not allowed)

500 - internal server error