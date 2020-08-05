const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true});
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 3000;


// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/uploads', express.static('uploads'));

// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static('uploads'));
require('./config/passport')(passport);

app.use('/users', users);
app.use('/api', require('./routes/index'));
app.use('/grupos', require('./routes/groupsRoutes'));
app.use('/empresas', require('./routes/empresasRoutes'));
app.use('/upload', require('./routes/fileRoutes'));
app.use('/indexes', require('./routes/indexesRoutes'));
app.use('/email', require('./routes/emailRoutes'));
app.use('/clasesDoc', require('./routes/clasesDocRoutes'));
app.use('/list', require('./routes/listRoutes'));


// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
