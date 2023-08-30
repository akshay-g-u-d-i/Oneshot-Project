const mongoose = require('mongoose')
const { Schema } = mongoose;

const apptschema = new Schema({
    bookdate: {
        type: String,
        required: true,
        unique: true
    },
    slots: {
        type: [String],
        required: true,
    }
}, { timestamps: true })

const apptmodel = mongoose.model('bookedappointment', apptschema);

module.exports = {
    apptmodel
}