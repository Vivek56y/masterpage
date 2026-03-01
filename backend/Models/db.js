
const mongoose = require("mongoose");

async function connectDB() {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL is not set in .env");
  }

  await mongoose.connect(mongoUrl);
  return mongoose.connection;
}

module.exports = connectDB;

