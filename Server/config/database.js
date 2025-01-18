import mongoose from "mongoose";

const checkAndDropIndex = async (collection, indexName) => {
    const indexes = await collection.indexes();
    const indexExists = indexes.some(index => index.name === indexName);
    if (indexExists) {
        await collection.dropIndex(indexName);
        console.log(`Dropped index: ${indexName}`);
    } else {
        console.log(`Index ${indexName} does not exist.`);
    }
};

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully on ${process.env.MONGO_URI}`);

        const db = mongoose.connection.db;

        // Check if index exists before dropping
        await checkAndDropIndex(db.collection("organizations"), "abbreviation_text");
        await checkAndDropIndex(db.collection("authorities"), "name_text");
        await checkAndDropIndex(db.collection("categories"), "category_text");

        // Create new indexes
        await db.collection("authorities").createIndex({ name: "text" });
        console.log("Text index created on 'name' field in 'authorities'.");

        await db.collection("organizations").createIndex({ abbreviation: "text" });
        console.log("Text index created on 'abbreviation' field in 'organizations'.");

        await db.collection("categories").createIndex({ category: "text" });
        console.log("Text index created on 'category' field in 'categories'.");

    } catch (err) {
        console.error('Database connection failed. Error:', err);
        process.exit(1);
    }
};

export default connectDB;
