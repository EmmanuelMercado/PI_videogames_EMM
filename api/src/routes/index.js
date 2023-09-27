//Importar la configuración
require('dotenv').config()
const {API_KEY} = process.env

//Importar dependencias
const express = require('express')
const routerVideogames = express.Router()
const axios = require('axios')
const { response } = require('../app')

//Controladores
const addGenresToDB = require('../controllers/addGenresToDB')
const createVideogame = require('../controllers/createVideogame')
const findAllVideogames = require('../controllers/findAllVideogames')
const findVideogameById = require('../controllers/findVideogameById')
const findByName = require('../controllers/findByName')


//Midlewares
routerVideogames.use(express.json())

routerVideogames.get('/',async(req,res)=>{
    try{
        let url = 'https://api.rawg.io/api/games?key='+API_KEY
        console.log(url);
        const {name} = req.query
        
        if(name){
            //https://api.rawg.io/api/games?search=Grand&key=f6eb52bcbcf14eb3b2670e43ac00abd8
            url = 'https://api.rawg.io/api/games?search='+name+'&key='+API_KEY
            const videogameInDB = await findByName(name);
            let DBResult = {
                origin:"DB",
                results:videogameInDB
            }
            let ResultApi = {
                origin:"API",
                results:[]
            }
            let finalResult=[]
            await axios.get(url)
            .then(response=>{
                const gamesAPILimited = response.data.results.slice(0,(15-DBResult.results.length))
                ResultApi={
                    origin:"API",
                    results:gamesAPILimited
                }
                finalResult.push(DBResult)
                finalResult.push(ResultApi)
                res.status(200).json(finalResult)
            })
            .catch(error =>{
                res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
            })
        }
        else{
            //Primero obtener los resultado de la base de datos
            const videogamesDB = await findAllVideogames()
            
            let DBResult = {
                    origin:"DB",
                    results:videogamesDB
                }
            
            let combinedResultApi = {
                origin:"API",
                results:[]
            }

            let finalResult=[]

            const resultados= async()=>{
                for(let i=0;i<5;i++){
                    await axios.get(`${url}&page=${i+1}`)
                    .then(response=>{
                        combinedResultApi={
                            origin:"API",
                            results:[...combinedResultApi.results,...response.data.results]
                        }
                    
                    })
                    .catch(error =>{
                    res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
                    })
                }
                finalResult.push(DBResult)
                finalResult.push(combinedResultApi)

                res.status(200).json(finalResult)
            }
            resultados()
            
            }
    }
    catch(error){
    }
})

routerVideogames.get('/:idVideogame',async(req,res)=>{
    try{
        const {idVideogame} = req.params
        const url = 'https://api.rawg.io/api/games/'+idVideogame+'?key='+API_KEY
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        let videogameInDB = ''
        if(uuidRegex.test(idVideogame)){
            videogameInDB = await findVideogameById(idVideogame)
            res.json(videogameInDB)
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
        res.status(500).json({ error: 'Error al hacer la solicitud a la API' });
    }
})

routerVideogames.get('/genres/all',async(req,res)=>{
    try{
        let url = 'https://api.rawg.io/api/genres?key='+API_KEY
        await axios.get(url)
        .then(async response=>{
            const genresInDB = await addGenresToDB(response.data.results)
            res.json(genresInDB)
        })
        .catch(error=>{
            res.status(500).json(error);
        })
    }
    catch(error){
        res.status(500).json(error);
    }
})

routerVideogames.post('/',async(req,res)=>{
    console.log(req.body);
    try{
        const {name,description_raw,platforms,background_image,released,rating,genres} = req.body
        const newVideogame = await createVideogame({name,description_raw,platforms,background_image,released,rating,genres})
        res.status(200).json(newVideogame)
    }
    catch(error){
        res.status(500).json(error);
    }
})





module.exports = routerVideogames;
