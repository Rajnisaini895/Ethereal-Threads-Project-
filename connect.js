const mongoose = require("mongoose");

const uri = "mongodb+srv://RajniSaini:<rajnisaini.895089>@cluster0.ljfvz.mongodb.net/RajniSaini?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
