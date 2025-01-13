import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connected successfully on ${process.env.MONGO_URI}`);

        // Add index creation logic here
        const db = mongoose.connection.db;
        await db.collection("authorities").createIndex({ name: "text" });
        await db.collection("organizations").createIndex({ name: "text" });
        await db.collection("categories").createIndex({ name: "text" });

        console.log("Indexes created successfully.");

    } catch (err) {
        console.error('Database connection failed. Error:', err);
        process.exit(1);
    }
};

export default connectDB;