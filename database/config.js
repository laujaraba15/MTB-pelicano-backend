const mongoose = require('mongoose');
require('dotenv').config();


//configuración de la base de datos con mongoose, process.env.db_connection es el enlace establecido en los enviroments por  a la base en mongo 

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.db_connection);
        console.log('DataBase Online');

    } catch (error) {
        console.log(error);
        throw new Error('Database connection failed');
    }
}

module.exports = {
    dbConnection
}