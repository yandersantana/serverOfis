const { Router } = require('express');
const router = Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Holly Molly'))


router.post('/register', async (req, res) => {
	if(req.body.password){}
    const { email, password, name, lastname } = req.body;
    const newUser = new User({ email, password, name, lastname });
    console.log(newUser);
    await newUser.save();
    /*const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});  esto guarda el id de un nuevo usuario si fuera el caso de que
    el usuario haga su registro y quiere mantener la sesion iniciada*/
    res.send("Registrado");

});


router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('La cuenta no existe');
    if (user.password !== password) return res.status(401).send('Contraseña Incorrecta');
    const token = jwt.sign({ _id: user._id }, 'secretkey');

    return res.status(200).json({ token });
});


router.get('/dashboard', verifyToken, (req, res) => {//para rutas privadas
    
           
});

router.post('/signInGoogle', async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Correo no existe');
   // if (user.password !== password) return res.status(401).send('Wrong Password');
    const token = jwt.sign({ _id: user.token }, 'secretkey');

    return res.status(200).json({ token });
});


router.get('/dashboard', verifyToken, (req, res) => {//para rutas privadas
    
           
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {//revisa si en cada petición existe una cabecera autorizacion
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {// si existe revisa que el token no este vacio
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) { //si no esta vacio extrae los datos del token
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send('Unauhtorized Request');
	}
}

router.get('/getUsers', async (req, res) => {
    const grupos = await User.find();
    res.send(grupos)      
})

router.get('/getUsers/:id', async (req, res) => {
    const { id } = req.params;
	const grupos = await User.findById(id);
	res.json(grupos);   
})



router.post('/newUser', async (req, res) => {
	const { email, password, name, rol,grupo } = req.body;
    const newUser = new User({ email, password, name, rol ,grupo});
    console.log(newUser);
    await newUser.save();

});


module.exports = router;