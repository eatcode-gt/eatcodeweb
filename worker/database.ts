import dotenv from 'dotenv'; //allows use of enviroment variables in ./.env
import mongoose from 'mongoose';

dotenv.config(); //load .env file

export default {
    connect: async (callback: () => void) => { 
        mongoose
        .connect(process.env.MONGO_DB_CONNECT!)
        .then((res) => {
            console.log("MongoDB connection created")
            callback()
        });
    }
};