const mongoose = require('mongoose')
const { Schema } = mongoose;

const papptschema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    slots: {
        type: [[String,String]],
        required: true,
    }
}, { timestamps: true })

const papptmodel = mongoose.model('personappointment', papptschema);

module.exports = {
    papptmodel
}