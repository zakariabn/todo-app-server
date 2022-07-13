require("dotenv").config();
const mongoose = require("mongoose");

const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster-1.munun.mongodb.net/todoDatabase?retryWrites=true&w=majority`;

async function MongooseConnect() {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection successful"));
}

module.exports = MongooseConnect;
