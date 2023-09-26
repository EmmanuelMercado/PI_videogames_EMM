require("dotenv").config()
const {USER,PASSWORD,HOST,PORT,BDD} =process.env

const {Sequelize} = require('sequelize')

const database = new Sequelize(
    `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${BDD}`,
    {logging:true}
)

module.exports={
    database
}