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
        let url = 'https://api.rawg.io/api/games?key='+API_KEY
        const {name} = req.query
        
        if(name){
            //https://api.rawg.io/api/games?search=Grand&key=f6eb52bcbcf14eb3b2670e43ac00abd8
            url = 'https://api.rawg.io/api/games?search='+name+'&key='+API_KEY
            await axios.get(url)
            .then(response=>{
                const gamesLimited = response.data.results.slice(0,15)
                res.status(200).json(gamesLimited)
            })
            .catch(error =>{
                res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
            })
        }
        else{
            await axios.get(url)
            .then(response=>{
                res.json(response.data)
            })
            .catch(error =>{
                res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
            })
        }

        

    }
    catch(error){
    }
})

routerVideogames.get('/:idVideogame',async(req,res)=>{
    try{
        const {idVideogame} = req.params
        const url = 'https://api.rawg.io/api/games/'+idVideogame+'?key='+API_KEY

        await axios.get(url)
        .then(response=>{
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
