const express = require('express');
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

/*app.get('', (req, res) => {
    res.send('Hola Mundo');
    });*/
