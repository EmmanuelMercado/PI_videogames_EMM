const {Videogame,Genre} = require('../db')
const {Sequelize} = require('sequelize')

const findByName = async (nameToSearch)=>{
    console.log(nameToSearch);
    try{
        const videogames = await Videogame.findAll({
            where:{
                name:{
                    [Sequelize.Op.iLike]: `${nameToSearch}%`
                }
            },
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

module.exports= findByName