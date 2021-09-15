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

//Parses URL-encoded bodies (as sent by the HTML form)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by the API client)
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if(error) {
        console.log(error);
    } else {
        console.log("MySQL Connected")
    }
})

//routers defined in other class
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))

app.listen(5001, () => {
    console.log("Server is on Port 5001")
})