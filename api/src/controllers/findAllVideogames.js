const {Videogame,Genre} = require('../db')

const findAllVideogames = async ()=>{
    try{
        const videogames = await Videogame.findAll({
            include:{
                model:Genre,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        })
        return videogames
    }
    catch(error){
        console.log(error);
        throw new Error('Error al solicitar los géneros')
    }
}

module.exports= findAllVideogames