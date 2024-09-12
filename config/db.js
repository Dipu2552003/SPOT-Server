const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const dbURI = process.env.MONGODB_URI;

// Set the strictQuery option to suppress deprecation warnings
mongoose.set("strictQuery", false); // or true, based on your preference

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
