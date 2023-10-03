const {Videogame} = require('../db')

const deleteVideogame = async(id)=>{
    try{
        const videogameToDelete = await CardsVideogames.findByPk(id)
    await videogameToDelete.destroy()
    return videogameToDelete
    }
    catch(error){
        throw new Error('Falla')
    }
}

module.exports=deleteVideogame