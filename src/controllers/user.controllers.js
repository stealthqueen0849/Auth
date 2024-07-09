import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.models.js";

const signup = asyncHandler(async (req, res, next)=>{

    /*
     * getting the email/username/password from req.body(user)
     * check if the credentials are filled properly or not
     * check if the user already exist in DB
     * if not the create the user
     * send response 
     */
    
    const {email, username, password} = req.body;
    if([email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError("Please fill all the credentials", 401)
    }

    if(password.length < 8){
        throw new ApiError("Minimum length of the password should be 8", 401)
    }

    const user = await User.findOne({
        $or: [
            {email},
            {username}
        ]
    });

    if(user){
        throw new ApiError("User already exists", 401)
    }
    const createdUser = await User.create({
        email,
        username,
        password
    })

    if(!createdUser){
        throw new ApiError("Something went wrong while creating user", 500)
    }
    return res.status(201).json(new ApiResponse("User created successfully", 201, createdUser))

})

const login = asyncHandler(async (req, res, next)=>{
    /**
     * get the user info from req
     * verify if the credentials are correct or not
     * check if the user exist w that id
     * compare their password
     * after verification 
     * generate access token using jwt.sign()
     * send this in cookies
     */
    const {email, password} = req.body;
    if([email, password].some((field) => field?.trim() === "")){
        throw new ApiError("Please fill all the credentials", 401)
    }
    const user = await User.findOne({
        $or: [
            {email},
            {username}
        ]
    });

    const isPasswordValid = await user.isPasswordCorrect(password, this.password)

    if(!isPasswordValid){
        throw new ApiError("Password invalid", 400)
    }
    const accessToken = await user.generateAccessToken()
    if(!accessToken){
        throw new ApiError("Something went wrong while generating token", 500)
    }

    const options ={
        httpOnly:true,
        secure:true
    }
    return res
            .status(200)
            .cookie("accesToken", accessToken, options)
            .json(
                new ApiResponse("Login successful", 200, )
            )

})

const logout = asyncHandler(async (req, res, next) =>{
    /**
     * check if the token is there or not 
     * delete the cookies 
    */
   
})