const app = require("./app.js")
const connectDB = require("./config/db.js");
require("dotenv").config();
const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.log("Server Error:", error.message);
            throw error;
        })
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server Is Running")
        })
    } catch (error) {
        console.log("Connected DB Error !!", error.message);
    }
}

startServer();