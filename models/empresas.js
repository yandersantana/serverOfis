const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpresasSchema = new Schema({
    id: { type: Number, required: false},
    nombre: { type: String, required: true},
    representante: { type: String, required: false},
    direccion: { type: String, required: false},
    ruc: { type: String, required: false},
    email_empresarial: { type: String, required: true},
    email_administrador: { type: String, required: true},
    contrasena: { type: String, required: true},
    numUsuarios: { type: Number, required: true}
},{
    timestamps:true
});

module.exports = mongoose.model('Empresas', EmpresasSchema);


