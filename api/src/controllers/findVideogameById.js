const {Videogame,Genre} = require('../db')

const findAllVideogames = async (id)=>{
    try{
        const videogames = await Videogame.findByPk(id,{
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