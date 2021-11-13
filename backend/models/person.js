const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    notes: String
});

module.exports = mongoose.model('Person', personSchema);