
const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database using the URI from environment variables.
 * @async
 */
const connectDB = async () => {
    try {
        // Retrieve the connection URI from environment variables
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("❌ FATAL ERROR: MONGO_URI is not defined in environment variables.");
            // Exiting the process is common practice when the DB connection is critical
            process.exit(1); 
        }

        const conn = await mongoose.connect(mongoUri);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Exit process with failure
        process.exit(1); 
    }
};

module.exports = connectDB;