import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongDb");
    } catch (error) {
        console.error("Error connecting to MongoDb",error);
    }
}
export default connectDb;