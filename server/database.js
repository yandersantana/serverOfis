const mongoose = require('mongoose');
const URI = 'mongodb+srv://yanderst:estudiante@digifile0-g1log.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect('mongodb+srv://yanderst:estudiante@digifile0-g1log.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

module.exports = mongoose;