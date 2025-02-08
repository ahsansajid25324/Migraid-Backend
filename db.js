require("dotenv").config();
const mongoose = require("mongoose");
const connectMongodB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectMongodB;

