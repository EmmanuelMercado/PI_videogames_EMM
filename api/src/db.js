require("dotenv").config()
const {USER,PASSWORD,HOST,PORT,BDD} =process.env

const VideogameFunction = require('./models/Videogame')
const GenreFunction = require('./models/Genre')

const {Sequelize} = require('sequelize')

const database = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
    {logging:false}
)

VideogameFunction(database)
GenreFunction (database);   

const {Videogame,Genre} = database.models

Videogame.belongsToMany(Genre,{through:"VideogameGenre"})
Genre.belongsToMany(Videogame,{through:"VideogameGenre"})

module.exports={
    database,
    ...database.models
}