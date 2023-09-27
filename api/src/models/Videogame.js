const {DataTypes} = require('sequelize')

module.exports=(database)=>{
    database.define("Videogame",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        description_raw:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        platforms:{
            type:DataTypes.JSON,
            allowNull:false
        },
        background_image:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        released:{
            type:DataTypes.STRING,
            allowNull:false
        },
        rating:{
            type:DataTypes.FLOAT,
            allowNull:false
        }
    })
}
