
const { Router } = require('express');
const router = Router();
//const upload = require('./upload');
const multipart = require('connect-multiparty');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const Documentos = require('../models/documento');
const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer');
/*router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));*/

const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

router.post('/api/upload', multipartMiddleware, (req, res) => {
    var file=req.files
    console.log("files "+JSON.stringify(file))
    for (var i = 0; i < file .length; i++) {//para cuando sean varios documentos
        var pathy = file[i]
        console.log("ddd "+pathy.path)
      }
    //console.log(file.uploads.path)
        res.json({
            'message': 'File uploaded succesfully.',
            'url':'http://localhost:3000/'
        });
   
    /* res.json({
        'message': 'File uploaded succesfully.'
    }); */

    
});
 


//app.use(multer({ dest: '/tmp/'}).single('file'))

// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({
  storage: storage
});

 router.post('/uploadFile', multipartMiddleware, (req, res, next) => {
  // console.log("sss "+bodyParser.text([req]))
console.log(req.files.uploads)
   var file=req.files.uploads
   console.log("files "+JSON.stringify(file))
    for (var i = 0; i < file .length; i++) {//para cuando sean varios documentos
        var pathy = file[i]
      }
   

      var sizeKb = 1024;
      var sizeMb = sizeKb * sizeKb;
      var sizeGb = sizeMb * sizeKb;
      var tamaño=pathy.size.length
      console.log("el tamaño es"+tamaño)

    console.log(file.length);
    console.log(file[0].path);
    res.json({
        'message': 'File uploaded succesfully.',
        'url':'http://ofistoreserver.herokuapp.com/'+pathy.path,
        //'url':'http://localhost:3000/'+pathy.path,
        //'url':'https://www.w3schools.com/css/default.asp',

        'size': parseInt(pathy.size/1024)
        
    });
});  


// POST File
/* router.post('/uploadFile', upload.single(fieldname), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
  
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
});
 */


/* 
router.post('/uploadFile', function (req, res) {
    console.log(req.file.name);
    console.log(req.file.path);
    console.log(req.file.type);
    var file = __dirname + "/" + req.file.name;
 
    fs.readFile( req.file.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ){
             console.log( err );
             }else{
                response = {
                   message:'File uploaded successfully',
                   filename:req.file.name
                };
             }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
    });
 }) */
  

router.get('/', function(req, res) {
    let ruta= req.body.ruta
    res.sendFile(uploads + ruta);
  })

router.get('/getDocumentos', async (req, res) => {
    const documentos = await Documentos.find();
    res.send(documentos)      
})

router.post('/DocumentosByClass/', async (req, res) => {

  const documentos = await Documentos.find({"clase":req.body.clasedoc_name,"empresa":req.body.clasedoc_empresa});
  console.log(documentos)
  res.json(documentos); 
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

router.put('/updateFile/:id', async (req, res,next) => {
  const { id } = req.params;
  const newDoc = {
    clase: req.body.clase,
    nombreDocumento: req.body.nombreDocumento,
    version: req.body.version,
    urlDocumento: req.body.urlDocumento,
    creadoPor: req.body.creadoPor,
    fechaCreacion: req.body.fechaCreacion,
    tamanoArchivo: req.body.tamanoArchivo,
    empresa: req.body.empresa,
    newdoc_indices: req.body.newdoc_indices,
    versionesUrl:req.body.versionesUrl

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
        empresa: req.body.empresa,
        newdoc_indices: req.body.newdoc_indices,
        versionesUrl:req.body.versionesUrl});
    console.log("ttt "+newDoc);
    await newDoc.save();
    //res.send("empresa registrado");
    res.json({status: 'Documento CREADo'});
});


module.exports = router;