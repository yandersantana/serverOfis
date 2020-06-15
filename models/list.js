
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ListSchema = new Schema({
    id: { type: Number, required: false},
    list_name: { type: String, required: false},
    list_description: { type: String, required: false},
    list_empresa: { type: String, required: false},
    list_items: { type: Array, required: false},
  
   
},{
    timestamps:true
});

module.exports = mongoose.model('List', ListSchema);


