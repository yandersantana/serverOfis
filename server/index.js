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
});
 */
/*app.get('', (req, res) => {
    res.send('Hola Mundo');
    });*/


const app = express();
const server= http.createServer(app);
const io= socketio.listen(server);


mongoose.connect('mongodb+srv://admin:admin@digifiletest1-o6t78.mongodb.net/test?retryWrites=true&w=majority').then(db => console.log("db connect"));


app.set("port" . process.env.PORT || 3000);
app.use('/api', require('./routes/index'));
app.use('/grupos', require('./routes/groupsRoutes'));

server.listen(app.get("port"),() => {
   console.log("escuchanod en el puerti")
})