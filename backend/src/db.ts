import mongoose from "mongoose";

const db_url: string | undefined = process.env.MONGODB_URL;

if (!db_url) {
    console.error("Database URL not found.");
    process.exit(1);
}

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        await mongoose.connect(db_url);
        console.log("Connected successfully to DB");
    } catch (error) {
        console.error("Error during database connection:", error);
        process.exit(1);
    }
};


export default connectDB;