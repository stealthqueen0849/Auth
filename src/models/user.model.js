import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// creating user schema for user
const userSchema = new Schema({
    email:{
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    username:{
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    password:{
        type : String,
        required : true,
        minlength : 8
    }
},{
    timestamps:true
})

//encrypting the password before saving it.
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//comparing the password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

//generating encrypted access token which can be saved in cookies
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn:process.env.ACCESS_EXPIRY
        }

    )
}


// exporting the user schema
export const User = mongoose.model("User", userSchema)