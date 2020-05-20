const mongoose = require('mongoose');
const { Schema } = mongoose;

const GruposSchema = new Schema({
    id: { type: Number, required: false},
    name: { type: String, required: true},
    description: { type: String, required: true},
    empresa: { type: String, required: true},
},{
    timestamps:true
});

module.exports = mongoose.model('Groups', GruposSchema);