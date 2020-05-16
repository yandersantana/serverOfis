const mongoose = require('mongoose');
const { Schema } = mongoose;

const GruposSchema = new Schema({
    id: { type: Number, required: false},
    name: { type: String, required: true},
    description: { type: String, required: true},
    email: { type: String, required: true},
    permisos: { type: Array, required: true}
},{
    timestamps:true
});

module.exports = mongoose.model('Groups', GruposSchema);