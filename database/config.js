const { Sequelize} = require('sequelize');

const sequelizeDB = new Sequelize('fueldb', 'root', '', {
    host:'localhost',
    dialect: 'mariadb',
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0,  // Número mínimo de conexiones en el pool
      acquire: 300000, // Tiempo máximo en ms que el pool intentará obtener una conexión antes de arrojar un error
      idle: 100000 // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser liberada
    },
    dialectOptions: {
      connectTimeout: 60000 // Tiempo de espera en ms para la conexión inicial
    },
})


const dbConnection = async()=>{
    try {
        await sequelizeDB.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


module.exports = {
    dbConnection,
    sequelizeDB
};