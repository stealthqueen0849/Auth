const asyncHandler = (request)=>{
    return async (req, res, next)=>{
        try {
            await request(req, res, next);
        } catch (error) {
            return res
                    .status(error.status || 500)
                    .json({
                        message:error.message,
                        success:false
                    })
        }
    }
}

export default asyncHandler;