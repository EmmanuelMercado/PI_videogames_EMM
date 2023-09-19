//Importar las dependencias
const express = require('express')
const server = express()

//Rutas
const routerVideogames = require('./routes/index')

//Midlewares
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
 });
server.use(express.json())
server.use('/videogames',routerVideogames)




//Exportar el servidor

module.exports = server;