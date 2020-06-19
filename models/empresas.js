const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpresasSchema = new Schema({
    id: { type: Number, required: false},
    nombre: { type: String, required: false},
    representante: { type: String, required: false},
    direccion: { type: String, required: false},
    ruc: { type: String, required: false},
    email_empresarial: { type: String, required: false},
    email_administrador: { type: String, required: false},
    contrasena: { type: String, required: false},
    numUsuarios: { type: Number, required: false}
},{
    timestamps:true
});

module.exports = mongoose.model('Empresas', EmpresasSchema);


