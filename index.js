import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';

const app = express();
dotenv.config();

//Accept bod in json format
app.use(express.json());

//Route API endpoint
app.use("/api/role", roleRoute);

//Auth API endpoint
app.use("/api/auth", authRoute);

//Error Handler Middleware
app.use((obj, req, res, next) =>{
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a=> a == obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data,
        //stack: err.stack
    });
});

//connect mongoose database
const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL); //compass link and folder name
        console.log("Connected to Database")
    } catch (error) {
        throw error;
    }
}

//Start Network
app.listen(8800, ()=>{
    connectMongoDB();
    console.log("Connected to backend");
})