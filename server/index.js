const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { mongoose } = require('./database');

// Settings
//app.set('port', process.env.PORT || 3000);

// Middlewares
/* app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

// Routes
app.use('/api/employees', require('./routes/employee.routes'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 */
// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@digifiletest1-o6t78.mongodb.net/test?retryWrites=true&w=majority', {
   // useNewUrlParser: true
})

// Habilitar pug
app.set('view engine', 'pug');

// Carpeta para las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar los archivos estaticos en public
app.use(express.static('public'));

// Definir rutas de la aplicación
app.use('/api/employees', require('./routes/employee.routes'));


app.listen(3000);