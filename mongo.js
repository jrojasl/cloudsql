/**Mongo DB */
const mongoose = require('mongoose');
const connect = async()=>{
    try {
        await mongoose.connect('mongodb://ubkzuq7yiexurzzyjtnh:XyNizYcf1pEW6RsC4iyM@bqllgbcm2bbbhvw-mongodb.services.clever-cloud.com:27017/bqllgbcm2bbbhvw');
        console.log('Conectado mongoDb');
    } catch (error) {
        console.log(error);
    }
}
const Schema = mongoose.Schema;



const teatroSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String },
    direccion: { type: String },
})


const TeatroModel = mongoose.model('Teatro', teatroSchema);

module.exports = {TeatroModel, connect};

