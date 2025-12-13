const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CALL_DB,);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error:", error.message);
    }
}
module.exports = connectDB;