const mongoose = require('mongoose');

const URI = 'mongodb+srv://admin:admin@cluster0-rkmn7.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
    .catch(err => console.error(err));



//module.exports = mongoose;