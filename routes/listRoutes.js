
const { Router } = require('express');
const router = Router();
const List = require('../models/list')

router.post('/newList', async (req, res) => {
    const { list_name, list_description, list_items, list_empresa } = req.body;
    const newList = new List({
        list_name: req.body.list_name,
        list_description: req.body.list_description,
        list_empresa: req.body.list_empresa,
        list_items: req.body.list_items
    });
    await newList.save();
    //res.send("empresa registrado");
    res.json({ status: 'Lista creada' });
});

router.get('/getListByEmpresa/:empresa', async (req, res) => {
    const { empresa } = req.params;
    const listByEmpresas = await List.find({ "list_empresa": empresa });
    // console.log("sss "+grupos)
    res.json(listByEmpresas);
})

router.post('/getListExistlist/', async (req, res) => {
var exis = false
    const listaExiste = await List.find({ "list_name": req.body.list_name, "list_empresa": req.body.list_empresa });
    if (listaExiste  == '') {
      exis = false
        res.json({
            'existe': exis,
        });
    }
    else{
        exis = true
        res.json({
            'existe': exis,
        });
    }
})


router.post('/getListExistlistName2/', async (req, res) => {
    var exis = false
        const listaExiste = await List.find({ "list_name": req.body.list_name, "list_empresa": req.body.list_empresa,"_id": { $ne: req.body._id  } });
       
        if (listaExiste  == '') {
          exis = false
            res.json({
                'existe': exis,
            });
        }
        else{
            exis = true
            res.json({
                'existe': exis,
            });
        }
    })



    router.post('/getListEmpresa/', async (req, res) => {
     
        const listByEmpresas = await List.find({ "list_empresa": req.body.list_empresa, "list_description": req.body.list_description});
        // console.log("sss "+grupos)
        res.json(listByEmpresas);
        })


router.put('/updateList/:id', async (req, res,next) => {
    const { id } = req.params;
    const list = {
        list_name: req.body.list_name,
        list_decription: req.body.list_decription,
        list_empresa: req.body.list_empresa,
        list_items: req.body.list_items,

    };
    await List.findByIdAndUpdate(id, {$set: list}, {new: true});
    res.json({status: 'Lista Actualizada'});  
})


router.delete('/deleteList/:id', async (req, res,next) => {
    await List.findByIdAndRemove(req.params.id);
    res.json({status: 'Lista Eliminada'});
})


module.exports = router;