var express = require('express');
// var db = require("./config");
const dotenv = require('dotenv');
var app = express();
const cookieParser = require ("cookie-parser");
var router = require("./routes/route.js");
const cors = require("cors")
dotenv.config();


app.use(express.json());
app.use(router);
app.use(cookieParser());
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

app.listen(9000, ()=> console.log('Server berjalan at port 9000'));