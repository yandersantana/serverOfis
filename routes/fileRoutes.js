
const { Router } = require('express');
const router = Router();
const multipart = require('connect-multiparty');
const bodyParser = require('body-parser');
const Documentos = require('../models/documento')


//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({
//    extended: true
//}));

const multipartMiddleware = multipart({
    uploadDir: './uploads/'
});

router.post('/uploadFile', multipartMiddleware, (req, res, next) => {
   
    console.log("file"+ req.files.name);
    //var path = '';
    res.json({
        'message': 'File uploaded succesfully.'
    });
});


router.get('/getDocumentos', async (req, res) => {
    const documentos = await Documentos.find();
    res.send(documentos)      
})

router.get('/getDocumentos3/:clase', async (req, res) => {
    const { clase } = req.params;
    const clases = await Documentos.find({"clase":clase});
    res.json(clases); 
})

router.put('/update/:id', async (req, res,next) => {
    const { id } = req.params;
    const newDoc = {
        clasedoc_name: req.body.clasedoc_name,
        clasedoc_description: req.body.clasedoc_description,
        clasedoc_empresa: req.body.clasedoc_empresa,
        clasedoc_tamanoMax: req.body.clasedoc_tamanoMax,
        clasedoc_cantidadMax: req.body.clasedoc_cantidadMax,
        clasedoc_cantidadDoc: req.body.clasedoc_cantidadDoc,
        clasedoc_indicesNum: req.body.clasedoc_indicesNum,
        clasedoc_estado: req.body.clasedoc_estado,
        newdoc_indices: req.body.newdoc_indices
    };
    await Documentos.findByIdAndUpdate(id, {$set: newDoc}, {new: true});
    res.json({status: 'Documentos Updated'});  
})


router.delete('/delete/:id', async (req, res,next) => {
    await Documentos.findByIdAndRemove(req.params.id);
    res.json({status: 'Documentos Deleted'});
})


router.post('/newDocument', async (req, res) => {
    const newDoc = new Documentos({ 
        clase: req.body.clase,
        nombreDocumento: req.body.nombreDocumento,
        version: req.body.version,
        urlDocumento: req.body.urlDocumento,
        creadoPor: req.body.creadoPor,
        fechaCreacion: req.body.fechaCreacion,
        tamanoArchivo: req.body.tamanoArchivo,
        newdoc_indices: req.body.newdoc_indices});
    console.log("ttt "+newDoc);
    await newDoc.save();
    //res.send("empresa registrado");
    res.json({status: 'Documento CREADo'});
});




module.exports = router;