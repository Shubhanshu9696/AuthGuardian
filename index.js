const express = require('express');

const app = express();

app.use(express.json());

const cookieParser = require('cookie-parser');

app.use(cookieParser());

require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`server is currently running on ${PORT} `);
})

const user = require('./routes/user');

app.use('/api/v1',user);

const dbConnect = require('./config/database');
dbConnect();

app.get('/', (req,res)=>{
    res.send(`<h1>this is home page</h1> `);
    
})
