const { Router } = require('express');
const router = Router();
const Empresas = require('../models/empresas')

router.get('/getEmpresa', async (req, res) => {
    const empresas = await Empresas.find();
    res.send(empresas)      
})


router.put('/update/:id', async (req, res,next) => {
    const { id } = req.params;
    const empresas = {
        nombre: req.body.nombre,
        representante: req.body.representante,
        direccion: req.body.direccion,
        ruc: req.body.ruc,
        email_empresarial: req.body.email_empresarial,
        email_administrador: req.body.email_administrador,
        numUsuarios:req.body.numUsuarios
    };
    await Empresas.findByIdAndUpdate(id, {$set: empresas}, {new: true});
    res.json({status: 'empresa Updated'});  
})


router.delete('/delete/:id', async (req, res,next) => {
    await Empresas.findByIdAndRemove(req.params.id);
    res.json({status: 'Employee Deleted'});
})

router.post('/newEmpresa', async (req, res) => {
    const { nombre, representante, direccion,email_empresarial,email_administrador,contrasena,numUsuarios } = req.body;
    const newEmpresa = new Empresas({ nombre:req.body.nombre,
         representante:req.body.representante, 
         direccion:req.body.direccion,
         ruc:req.body.ruc,
         email_empresarial: req.body.email_empresarial,
         email_administrador:req.body.email_administrador,
         contrasena:req.body.contrasena,
         numUsuarios:req.body.numUsuarios});
    console.log("ttt "+newEmpresa);
    await newEmpresa.save();
    //res.send("empresa registrado");
    res.json({status: 'EMPRESA CREADA'});
});


module.exports = router;