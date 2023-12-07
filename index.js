var express = require('express');
var db = require("./config/db.js");
const dotenv = require('dotenv');
var app = express();
const cookieParser = require ("cookie-parser");
var router = require("./routes/route.js");
const cors = require("cors")
dotenv.config();

async function test() {try {
    await db.authenticate();
    console.log('Database connected');
    
    } catch (error) {
    console.error(error);
}}

test()
app.use(express.json());
app.use(router);
app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.listen(9000, ()=> console.log('Server berjalan at port 9000'));