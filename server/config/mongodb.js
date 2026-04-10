// Password   LsmbbL8r8MNov5xp
import mongoose from "mongoose";
const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Database connected');
    })
await mongoose.connect(process.env.MONGODB_URL).catch(err => console.error('MongoDB connection failed:', err.message))
}
export default connectDB