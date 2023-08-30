const mongoose = require('mongoose')
const mongouri = process.env.DATABASEURL

const connecttodb = async()=>{
    try{
        await mongoose.connect(mongouri);
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Error is ",err);
    }
}

module.exports = connecttodb;