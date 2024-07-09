class ApiResponse{
    constructor(
        message = "Successful req",
        status = 200,
        data = {},
        success = true
    ){
        this.message = message
        this.status = status
        this.data = data;
        this.success = success
    }
}

export { ApiResponse };