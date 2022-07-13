const express = require("express");
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
const MongooseConnect = require("./connection/mongooseConnect");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connected to mongoDB With mongoose
MongooseConnect().catch((err) => console.log("Error: \n", err));

// api routes
app.use("/todo", todoRoute);

// default/empty api endpoint
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ result: "success", message: "Server Running Properly" });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send(`"${req.url}" Route not found`);
});

// handling default error
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem");
  } else {
    if (err.massage) {
      res.status(500).send(err.massage);
    } else {
      res.status(500).send("There was an error!");
    }
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
