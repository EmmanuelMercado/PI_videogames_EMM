//Importar las dependencias
const server = require('./src/app')
const {database} = require('./src/db')

database.sync({alter:true})
.then(()=>{
    server.listen(3001,()=>{
        console.log('Servidor arriba en el puerto 3001');
    })
})
.catch((err)=>console.log(err))


