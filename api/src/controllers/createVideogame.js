const {Videogame} = require('../db')

const createVideogame = async (videogame)=>{
    try{
        console.log(videogame);
        const {name,description_raw,platforms,background_image,released,rating,genres} = videogame
        const newVideogame = await Videogame.create({name,description_raw,platforms,background_image,released,rating})
        newVideogame.addGenres(genres)
        return newVideogame;
    }
    catch(error){
        console.log(error);
        throw new Error('Error al solicitar los géneros')
    }
}

module.exports= createVideogame