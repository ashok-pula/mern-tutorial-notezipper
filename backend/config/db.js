const mongoose=require('mongoose');

const connectDB=async()=>{
    try {
        mongoose.set('strictQuery', true);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected: ${conn.connection.host}`)

    } catch (error) {
        console.log(error);
        process.exist();
    }
}
module.exports=connectDB;