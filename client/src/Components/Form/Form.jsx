import { useState, useEffect } from "react"
import axios from "axios"

const Form = ()=>{
    //Estados locales
    let [form,setForm]=useState({
        name:'',
        description_raw:'',
        platforms:[],
        background_image:'',
        released:'',
        rating:0,
        genres:[]
    })
    let [genres,setGenres]=useState([])

    //Obtener los géneros
    useEffect(()=>{
        const requestApi = async()=>{
          await axios('http://localhost:3001/videogames/genres/all')
          .then(response=>{
            setGenres(response.data)
          })
          .catch(error =>{
          })
        }
        requestApi()
    },[])

    const platformsArray = ['Xbox','Xbox One','Xbox Series S/X','Gameboy Color','Gameboy Advance','Nintendo DS','Nintendo 3DS','Nintendo Switch','Nintento Wii','Nintendo Wii U','Playstation','Playstation 1','Playstation 2','Playstation 3','Playstation 4','Playstation 5','PC','Mobile']

    //Handlers
    const handleOnChange =(event)=>{
    setForm({
        ...form,
        [event.target.name]:event.target.value
    })

}

    const handleOnCheckPlatforms = (event)=>{
    const platformExists = form.platforms.find((platform)=>platform.platform.name === event.target.name) 
    if(platformExists===undefined){ 
        const auxPlatform = form.platforms
        auxPlatform.push(({platform:{name:event.target.name}}))
        setForm({
            ...form,
            platforms:auxPlatform
        })
        
    }
    else{
        const auxPlatform = form.platforms
        const newPlatformValue=  auxPlatform.filter((platform)=>platform.platform.name !== event.target.name)
        setForm({
            ...form,
            platforms:newPlatformValue
        })
        
    }
    }

    const handleOnCheckGenres = (event)=>{
        const platformExists = form.genres.find((genre)=> genre === event.target.id) 
        if(platformExists===undefined){ 
            const auxPlatform = form.genres
            auxPlatform.push(event.target.id)
            setForm({
                ...form,
                genres:auxPlatform
            })

        }
        else{
            const auxPlatform = form.genres
            const newPlatformValue=  auxPlatform.filter((genre)=>genre !== event.target.id)
            setForm({
                ...form,
                genres:newPlatformValue
            })
            
        }
        }

    function handleDateChange(event) {
        const selectedDate = event.target.value; // Obtiene la fecha seleccionada en formato ISO (aaaa-mm-dd)
    
        // Convierte la fecha al formato dd/mm/aaaa
        const parts = selectedDate.split("-");
        const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        setForm({
            ...form,
            released:formattedDate
        })
    }

    const listPlatforms = platformsArray.map((value) => (
        <li key={value}>
            <label htmlFor={value}>{value}</label>
            <input name={value} type='checkbox' onChange={handleOnCheckPlatforms}/>
        </li>
    ));

    const listGenres = genres.map((genre) => (
        <li key={genre.id}>
            <label htmlFor={genre.name}>{genre.name}</label>
            <input name={genre.name} id={genre.id} type='checkbox' onChange={handleOnCheckGenres}/>
        </li>
    ));

    //Enviar formulario
    const handleOnSubmit =async (event) =>{
        event.preventDefault();
        //Validar primero todos los datos
        let dataCorrect = true
        const urlPattern = /^https:\/\/media\.rawg\.io\/media\/games\/[a-f0-9]{3}\/[a-f0-9]{32}\.jpg$/;
        const {name,background_image,description_raw,platforms,genres,rating} = form
        if(name.length===0||!urlPattern.test(background_image)||description_raw===0||platforms.length===0||genres.length===0||rating<0||rating>5){
            dataCorrect=false
        }
        if(dataCorrect){
            try {
                const response = await axios.post("http://localhost:3001/videogames", form, {
                  headers: {
                    "Content-Type": "application/json", // Indicamos que estamos enviando JSON
                  },
                });
          
                if (response.status === 200) {
                  // La solicitud fue exitosa
                  console.log("Solicitud exitosa");
                } else {
                  // La solicitud falló
                  console.error("Error en la solicitud");
                }
              } catch (error) {
                console.error("Error de red:", error);
              }
        }
        else{
            window.alert('Falta algún dato o existe alguno incorrecto, favor de verificar')
        }
       
    }



return(
    <form onSubmit={handleOnSubmit}>
        <h1>Holis, soy el Form</h1>
        {/* Nombre */}
        <label htmlFor="name">Name </label>
        <input type="text" name='name' placeholder="Videogame name" value={form.name} onChange={handleOnChange}/>

        {/* Descripción */}
        <label htmlFor="description_raw">Description </label>
        <textarea name='description_raw' placeholder='Insert the description' value={form.description_raw} onChange={handleOnChange}/>

        {/* Platforms */}
        <label htmlFor="plataforms">Platforms </label>
        <ul>
            {listPlatforms }
        </ul>

        {/* Image */}
        <label htmlFor="background_image">Image URL </label>
        <input type="text" name='background_image' placeholder="Image URL" value={form.background_image} onChange={handleOnChange}/>

        {/* Released */}
        <label htmlFor="released">Date released:</label>
        <input type="date" name="released" onChange={handleDateChange}></input>

        {/* Rating */}
        <label for="rating">Ingresa un número:</label>
        <input type="number" name="rating" min="0" max="5" step="0.1" value={form.rating} onChange={handleOnChange}></input>

        {/* Genres */}
        <label htmlFor="genres">Genres</label>
        <ul>
            {listGenres }
        </ul>

        <button>Registrar videojuego</button>

    </form>
)
}

export default Form;


