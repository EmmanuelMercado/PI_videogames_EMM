const {Genre} = require('../db')

const addGenresToDB = async (genres)=>{
    try{
        let genresDB = await Genre.findAll()
        if(genresDB.length>0){
            console.log('genres already in DB');  
        }
        else{
            for(let i = 0;i<genres.length;i++){
                const {name} = genres[i]
                // console.log(name);
                const newGender = await Genre.create({name})
            }
            genresDB = await Genre.findAll()
        }
        return genresDB
    }
    catch{
        throw new Error('Error al solicitar los géneros')
    }
}

module.exports= addGenresToDB