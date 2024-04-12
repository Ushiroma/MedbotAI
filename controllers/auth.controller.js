import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

//Register User
export const register = async (req, res, next)=>{
    const role = await Role.find({role: 'User'});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //Create New User
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        dob: req.body.dob,
        gender: req.body.gender,
        roles: role
    });
    await newUser.save();
    return next(CreateSuccess(200, "User Registered!"));
}

//Login User
export const login = async (req, res, next)=>{
    try {
        //Email Check
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return next(CreateError(404, "User Not Found"));
        }
        //Password Check
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(CreateError(400, "Password Incorrect"));
        }
        //Create Token
        
        return next(CreateSuccess(200, "Login Successful!"));
    } catch (error) {
        return next(CreateError(500, "Something Went Wrong"));
    }
}