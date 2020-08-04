const { Router } = require('express');
const router = Router();
const Indexes = require('../models/indexes')

router.get('/getIndexes', async (req, res) => {
    const indexes = await Indexes.find();
    res.send(indexes)      
})


router.put('/update/:id', async (req, res,next) => {
    const { id } = req.params;
    const indexes = {
        index_name: req.body.index_name,
        index_description: req.body.index_description,
        index_type: req.body.index_type,
        index_legnth: req.body.index_legnth,
        empresa:req.body.empresa,
        lista_id:req.body.lista_id
    };
    await Indexes.findByIdAndUpdate(id, {$set: indexes}, {new: true});
    res.json({status: 'Ìndice Actualizado'});  
})


router.delete('/delete/:id', async (req, res,next) => {
    await Indexes.findByIdAndRemove(req.params.id);
    res.json({status: 'Ìndice Eliminado'});
})
router.get('/getIndexesByEmpresa/:empresa', async (req, res) => {
    const { empresa} = req.params;
    const indexesByEmpresas = await Indexes.find({"empresa":empresa});
   // console.log("sss "+grupos)
    res.json(indexesByEmpresas); 
})

router.post('/newIndex', async (req, res) => {
    const { index_name, index_description, index_type,index_length,lista_id } = req.body;
    const newIndex= new Indexes({ 
        index_name: req.body.index_name,
        index_description: req.body.index_description,
        index_type: req.body.index_type,
        index_legnth: req.body.index_legnth,
        empresa:req.body.empresa,
        lista_id:req.body.lista_id
        });
    console.log("ttt "+newIndex);
    await newIndex.save();
    res.json({status: 'Índice creado'});
});


module.exports = router;