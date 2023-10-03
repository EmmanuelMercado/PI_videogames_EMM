import axios from 'axios'
import { useParams,Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import styles from './DetailVideogame.module.css'

const DetailVideogame = ()=>{
    let [videogame,setVideogame] = useState({})
    const videogameIsEmpty = Object.keys(videogame).length === 0;

    let {id} = useParams()


    //Funciones para manejar los datos
    let genresToShow = ''
    let platformsToShow = ''


    function generateGenres(genres){
        const genresNames = genres.map(genre => genre.name)
        const totalGenres = genresNames.join(', ')
        return totalGenres
    }
    function generatePlatforms(platforms){
        const platformsNames = platforms.map(platform => platform.platform.name)
        const totalPlatform = platformsNames.join(', ')
        return totalPlatform
    }
    // function generateDescription(description){
    //     console.log(videogame.description_raw);
    //     const sections =  description.split('<p>')
    //     let finalDescription = sections[1]
    //     // finalDescription = finalDescription.replace(/<p>|<\/p>|<br\s*\/?>/gi, '');
    //     return finalDescription;
    // }

    

    useEffect(()=>{
        const requestApi = async ()=>{
          await axios('http://localhost:3001/videogames/'+id)
          .then(response=>{
            console.log(response.data);
            setVideogame(response.data)            
          })
          .catch(error =>{
            // window.alert('No existe videojuego con este Id')
            console.log(error);
          })
        }
        requestApi()
        // return(setVideogame({}))
    },[])

    if(!videogameIsEmpty){
        if(videogame.genres){
            genresToShow = generateGenres(videogame.genres)
        }
        else{
            genresToShow = generateGenres(videogame.Genres)
        }
        platformsToShow= generatePlatforms(videogame.platforms)
        // descriptionToShow= generateDescription(videogame.description)
    }
    return(
        <div>
            <Link to= '/'>
            <div className={styles.home}>
                <h1>Home</h1>
            </div>
            </Link>
            <div className={styles.cardDetail}>
            {!videogameIsEmpty?<h1>Nombre: {videogame.name}</h1>:<p></p>}
            {!videogameIsEmpty?<img src={videogame.background_image} alt={videogame.name} />:<p></p>}
            {!videogameIsEmpty?<h3>ID: {videogame.id}</h3>:<p></p>}
            {!videogameIsEmpty?<h3>Genres: {genresToShow} </h3>:<p></p>}
            {!videogameIsEmpty?<h3>Platforms: {platformsToShow}</h3>:<p></p>}
            {!videogameIsEmpty?<h3>Description: {videogame.description_raw}</h3>:<p></p>}
            {!videogameIsEmpty?<h3>Released: {videogame.released}</h3>:<p></p>}
            {!videogameIsEmpty?<h3>Rating: {videogame.rating}</h3>:<p></p>}
           
            </div>
            
        </div>
    )
}

export default DetailVideogame;