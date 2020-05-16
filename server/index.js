/* const express = require('express');
const app = express();
const cors= require('cors');



require('./database');

app.set('port', process.env.PORT || 3000);
// middlewares
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'));
app.use('/grupos', require('./routes/groupsRoutes'));


//starting the server
app.listen(app.get('port'), () => {
   console.log('Server on port 3000, Yes');
}); */

/*app.get('', (req, res) => {
    res.send('Hola Mundo');
    });*/




const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./router');

const app = express();

// Body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@digifiletest1-o6t78.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

// Habilitar pug
app.set('view engine', 'pug');

// Carpeta para las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar los archivos estaticos en public
app.use(express.static('public'));

// Definir rutas de la aplicación
app.use('/api', require('./routes/index'));
app.use('/grupos', require('./routes/groupsRoutes'));



app.listen(3000);