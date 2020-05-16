const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true},
    position: { type: String, required: false },
    office: { type: String, required: true },
    salary: { type: Number, required: false}
});

module.exports = mongoose.model('Employee', employeeSchema);