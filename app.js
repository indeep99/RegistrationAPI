const express = require ("express");
const mysql = require ("mysql");
const dotenv = require ("dotenv");
const path = require ("path");

dotenv.config({ path: './.env'});

const app = express(); 

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, //put ip address of server if not ran on local machine
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connected")
    }
})

app.get("/", (req, res) => {
    // res.send("<h1>Home page</h1>")
    res.render("index")
})

app.listen(5001, () => {
    console.log("Server is on Port 5001")
})