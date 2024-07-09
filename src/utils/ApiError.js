class ApiError extends Error{
    constructor(
        message = "Something went wrong on server side",
        status,
        errors = "",
    ){
        super(message);
        this.status = status
        this.errors = errors
        this.success = false
    }
}

export { ApiError }