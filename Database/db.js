const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "project"
    });
    console.log("Database connection is ready...");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = connectDB;
