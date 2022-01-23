require("dotenv").config({ path: "./Config/.env" });

const mongoose = require("mongoose");
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("connection to database successfully");
  } catch (error) {
    console.error("connection to database failed");
  }
};
module.exports = db;
