
const { Router } = require('express');
const router = Router();
const ClasesDoc = require('../models/clasesDoc')

router.post('/newClassDoc', async (req, res) => {
    console.log("sjkdsjkdsj")
    const { clasedoc_name, clasedoc_description, clasedoc_cantidadDoc,clasedoc_indicesNum,clasedoc_tamanoMax,clasedoc_cantidadMax,clasedoc_periodoExp,empresa } = req.body;
    const newClassDoc = new ClasesDoc({ clasedoc_name:req.body.clasedoc_name,
        clasedoc_description:req.body.clasedoc_description, 
        clasedoc_empresa:req.body.clasedoc_empresa, 
        clasedoc_cantidadDoc:req.body.clasedoc_cantidadDoc,
        clasedoc_indicesNum:req.body.clasedoc_indicesNum,
        clasedoc_tamanoMax: req.body.clasedoc_tamanoMax,
        empresa:req.body.empresa,
        clasedoc_cantidadMax:req.body.clasedoc_cantidadMax,
        clasedoc_estado:req.body.clasedoc_estado,
        clasedoc_indices:req.body.clasedoc_indices,
        permisosGrupo:req.body.permisosGrupo,
        permisosUsuario:req.body.permisosUsuario});
    console.log("ttt "+newClassDoc);
    await newClassDoc.save();
    //res.send("empresa registrado");
    res.json({status: 'Clase CREADA'});
});

router.get('/getClassDoc/:empresa', async (req, res) => {
    console.log("entre aqui ")
    const { empresa } = req.params;
    const clase = await ClasesDoc.find({"clasedoc_empresa":empresa});
    res.json(clase); 
})

router.get('/getClassDocID/:id', async (req, res) => {
    const { id } = req.params;
    const clase = await ClasesDoc.findById(id);
    res.json(clase); 
})

router.put('/update/:id', async (req, res,next) => {
    const { id } = req.params;
    const newClassDoc = {
        clasedoc_name:req.body.clasedoc_name,
        clasedoc_description:req.body.clasedoc_description, 
        clasedoc_empresa:req.body.clasedoc_empresa, 
        clasedoc_cantidadDoc:req.body.clasedoc_cantidadDoc,
        clasedoc_indicesNum:req.body.clasedoc_indicesNum,
        clasedoc_tamanoMax: req.body.clasedoc_tamanoMax,
        clasedoc_cantidadMax:req.body.clasedoc_cantidadMax,
        clasedoc_estado:req.body.clasedoc_estado,
        empresa: req.body.empresa,
        clasedoc_indices:req.body.clasedoc_indices,
        permisosGrupo:req.body.permisosGrupo,
        permisosUsuario:req.body.permisosUsuario
        
    };
    await ClasesDoc.findByIdAndUpdate(id, {$set: newClassDoc}, {new: true});
    res.json({status: 'Actualización Exitosa'}); 
})


router.put('/update2/:id', async (req, res,next) => {
    const { id } = req.params;
    const newClassDoc = {
        clasedoc_name:req.body.clasedoc_name,
        clasedoc_description:req.body.clasedoc_description, 
        clasedoc_empresa:req.body.clasedoc_empresa, 
        clasedoc_cantidadDoc:req.body.clasedoc_cantidadDoc,
        clasedoc_indicesNum:req.body.clasedoc_indicesNum,
        clasedoc_tamanoMax: req.body.clasedoc_tamanoMax,
        clasedoc_cantidadMax:req.body.clasedoc_cantidadMax,
        clasedoc_estado:req.body.clasedoc_estado,
        empresa: req.body.empresa,
        clasedoc_indices:req.body.clasedoc_indices,
        permisosGrupo:req.body.permisosGrupo,
        permisosUsuario:req.body.permisosUsuario
        
    };
    await ClasesDoc.findByIdAndUpdate(id, {$set: {permisosGrupo:[] ,permisosUsuario:[] }}, {new: true});
    res.json({status: 'Actualización Exitosa'}); 
})

router.put('/update3/:id', async (req, res,next) => {
    const { id } = req.params;
    const newClassDoc = {
        clasedoc_name:req.body.clasedoc_name,
        clasedoc_description:req.body.clasedoc_description, 
        clasedoc_empresa:req.body.clasedoc_empresa, 
        clasedoc_cantidadDoc:req.body.clasedoc_cantidadDoc,
        clasedoc_indicesNum:req.body.clasedoc_indicesNum,
        clasedoc_tamanoMax: req.body.clasedoc_tamanoMax,
        clasedoc_cantidadMax:req.body.clasedoc_cantidadMax,
        clasedoc_estado:req.body.clasedoc_estado,
        empresa: req.body.empresa,
        clasedoc_indices:req.body.clasedoc_indices,
        permisosGrupo:req.body.permisosGrupo,
        permisosUsuario:req.body.permisosUsuario
        
    };
    await ClasesDoc.findByIdAndUpdate(id, {$set: {permisosGrupo:req.body.permisosGrupo,permisosUsuario:req.body.permisosUsuario }}, {new: true});
    res.json({status: 'Actualización Exitosa'}); 
})


router.put('/updatePermisosGrupo/:id/', async (req, res,next) => {
    const { id } = req.params;
    await ClasesDoc.findByIdAndUpdate(id, {$set: {permisosGrupo:req.body.permisosGrupo}}, {new: true});
    res.json({status: 'Actualización Exitosa'}); 
})

router.put('/updatePermisosUsuarios/:id/', async (req, res,next) => {
    const { id } = req.params;
    await ClasesDoc.findByIdAndUpdate(id, {$set: {permisosUsuario:req.body.permisosUsuario}}, {new: true});
    res.json({status: 'Actualización Exitosa'}); 
})




router.delete('/delete/:id', async (req, res,next) => {
    await ClasesDoc.findByIdAndRemove(req.params.id);
    res.json({status: 'Clase de Documentos Eliminada'});
})


module.exports = router;

