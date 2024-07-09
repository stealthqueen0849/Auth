const asyncHandler = (request)=>{
    return async (req, res, next)=>{
        try {
            await request(req, res, next);
        } catch (error) {
            return res
                    .status(500)
                    .json({
                        message:"Something went wrong",
                        error: error.message
                    })
        }
    }
}

export default asyncHandler;