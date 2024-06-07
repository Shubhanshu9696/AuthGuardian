const mongoose = require('mongoose');

require('dotenv').config();

const dbConnection = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( ()=>{console.log("db connect successfully");})
    .catch( (error) =>{
        console.log("db not connected successfully ");
        console.log(error);
        process.exit(1);
    } )
}

module.exports = dbConnection;