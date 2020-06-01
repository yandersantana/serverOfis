
const { Router } = require('express');
const router = Router();
const multipart = require('connect-multiparty');
//const bodyParser = require('body-parser');


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




module.exports = router;