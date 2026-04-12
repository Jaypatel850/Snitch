const mongoose = require('mongoose');
const register = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true},
        role:{
            type: String,
            enum: ['buyer', 'seller'],
            default: 'buyer',
            required: true
        }
});

const Register = mongoose.model('RegisterSnitch', register);
module.exports = Register;