require("dotenv").config();
var express = require('express');
// var db = require("./config");
var app = express();
const cookieParser = require ("cookie-parser");
var router = require("./routes/route.js");
const cors = require("cors");
const { PORT, IP_ADDRESS } = process.env;


app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.get("/", (req, res, next) => {
    try {
      return res.send("Welcome to Our API");
    } catch (error) {
      next(error);
    }
});
  
  // Error handling 404 -- not found
app.use((req, res) => {
    return res.status(404).json({
      status: false,
      message: "not found",
    });
});
  
  // Error handling 500 -- internal server error
app.use((err, req, res) => {
    return res.status(500).json({
      status: false,
      message: "internal server error" + err.message,
      data: null,
    });
});

app.listen(PORT, () => {
  return console.log(`running on http://${IP_ADDRESS}:${PORT}`);
});