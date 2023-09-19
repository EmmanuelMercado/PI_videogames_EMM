//Importar la configuración
require('dotenv').config()
const {API_KEY} = process.env

//Importar dependencias
const express = require('express')
const routerVideogames = express.Router()
const axios = require('axios')
const { response } = require('../app')

//Midlewares
routerVideogames.use(express.json())

routerVideogames.get('/',async(req,res)=>{
    try{
        const url = 'https://api.rawg.io/api/games?key='+API_KEY

        axios.get(url)
        .then(response=>{
            console.log(response);
            res.json(response.data)
        })
        .catch(error =>{
            res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
        })

    }
    catch(error){
    }
})

module.exports = routerVideogames;
