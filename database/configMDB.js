/* eslint-env node */
const mongoose = require('mongoose');


const configMDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('BDD Mongo conectada')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar a la base de datos')
    }
};


module.exports = {
    configMDB,
}