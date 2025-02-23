const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        // Try multiple connection strings
        let conn;
        try {
            conn = await mongoose.connect('mongodb://127.0.0.1:27017/LinkedInAIBot', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            console.log('Trying alternative connection...');
            conn = await mongoose.connect('mongodb://localhost:27017/LinkedInAIBot', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('Please make sure MongoDB is running and accessible');
        process.exit(1);
    }
};

module.exports = connectDB; 