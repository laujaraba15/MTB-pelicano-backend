const express = require('express');
const { dbConnection } = require('./database/config')
const cors = require('cors');
const expressfileUpload = require('express-fileupload');

require('dotenv').config();

//Crecion del servidor de express
const app = express();

//cors conf 
app.use(cors());

app.use(expressfileUpload());



//lectura del body
app.use(express.json());

dbConnection();

//Rutas alojadas en la carpeta de routes 
app.use('/users', require('./routes/user'));
app.use('/signin', require('./routes/auth'));
app.use('/signup', require('./routes/user'));
app.use('/payments', require('./routes/payments'));
app.use('/checktoken', require('./routes/auth'));
app.use('/payments/upload', require('./routes/payments'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + 3000);
})