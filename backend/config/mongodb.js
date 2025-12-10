import mongoose from "mongoose";

const connectDB = async () => {

// connecting mongoose to mongodb server
 mongoose.connection.on('connected',()=>{
    console.log("DB Connected");
})

await mongoose.connect(`${process.env.MONGODB_URL}/finalprojectwork`)
}

export default connectDB;