const { Router } = require('express');
const router = Router();
const Groups = require('../models/groups')


/* //router.get('/', (req, res) => res.send('Holly Molly'))
router.get('/', async (req, res) => {
    const grupos = await Groups.find();
    console.log(grupos)
    alert("entre")
   // res.json(grupos);       
}) */

router.get('/getGroup', async (req, res) => {
    const grupos = await Groups.find();
    res.send(grupos)      
})


router.put('/update/:id', async (req, res,next) => {
    const { id } = req.params;
    const grupos = {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        permisos: req.body.permisos
    };
    await Groups.findByIdAndUpdate(id, {$set: grupos}, {new: true});
    res.json({status: 'Employee Updated'});  
})


router.delete('/delete/:id', async (req, res,next) => {
    await Groups.findByIdAndRemove(req.params.id);
    res.json({status: 'Employee Deleted'});
})

router.post('/newGroup', async (req, res) => {
    const { name, description, email,permisos } = req.body;
    const newGroup = new Groups({ name, description, email,permisos});
    console.log("ttt "+newGroup);
    await newGroup.save();
    res.send("Grupo registrado");

});


module.exports = router;