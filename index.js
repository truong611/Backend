const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
var path = require("path");

var bodyParser = require("body-parser");

const mongoose = require("mongoose");
// const verify = require("./router/auth");
var cors = require("cors");
const User = require("./model/User");

const adminRouter = require("./Router/Admin.Route");
const userRouter = require("./Router/User.Router");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var htmlPath = path.join(__dirname, "uploads");
app.use(express.static(htmlPath));

app.use(cors());

app.use("/admin", adminRouter);
app.use("/", userRouter);

app.get("/img/:name", (req, res) => {
  var filePath = path.join(htmlPath, req.params.name);
  res.sendFile(filePath);
});

mongoose.connect(
  "mongodb+srv://truongdo:admin123@cluster0.psojm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect");
  }
);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const server = app.listen(port, () => console.log(`running in ${port}`));
