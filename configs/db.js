const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose.connect(process.env.mongoDB_url);

module.exports = { connection }