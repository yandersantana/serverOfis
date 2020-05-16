const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    rol: { type: String, required: true},
    grupo: { type: String, required: true}
},{
    timestamps:true
});

module.exports = mongoose.model('User', UserSchema);