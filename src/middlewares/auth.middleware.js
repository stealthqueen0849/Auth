import { User } from "../models/user.models.js";
import jwt from jsonwebtoken;
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const verifyAccessToken = asyncHandler(async (req, res, next)=>{

    //this will give us encrypted access token saved in cookies while login (jwt.sign())
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    if(!accessToken){
        throw new ApiError("Unauthorised", 401);
    }

    // const user = await User.findById(accessToken)
    //here we can verify whether the token is valid or not
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)
    console.log("Decoded Token => ", decodedToken)

    //jwt.verify returns the decoded token  which can be used to find userId
    const user = await User.findById(decodedToken._id).select(
        "-password"
    );

    if(!user){
        throw new ApiError("Invalid user", 401);
    }
    //sending the user in cookies!
    req.user = user
    next();
})

export default verifyAccessToken;