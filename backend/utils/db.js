import mongoose from "mongoose";

const connectDB =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoodb is connected succesfully`)
    }catch (error){
        console.log(`error to connect `)

    }
}

export default connectDB;