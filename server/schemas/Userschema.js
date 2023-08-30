const mongoose = require('mongoose')
const { Schema } = mongoose;

const userschema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    }


}, { timestamps: true })

const usermodel = mongoose.model('user', userschema);

module.exports = {
    usermodel
}