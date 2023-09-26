import { Link } from "react-router-dom";
import styles from './CardVideogame.module.css'

const CardVideogame = (props)=>{
    //ID auxiliar
    
    const {id,name,background_image,genres} = props.videogame
    
    const generateGenres = (genres) =>{
        const genresNames = genres.map(genre => genre.name)
        const totalGenres = genresNames.join(', ')
        return totalGenres
    }
    const genresToShow = generateGenres(genres)

    return(
        <div className={styles.card}>
           <div className={styles.cardImage}>
            <Link to={'/detail/'+id}>
                
                    <img src={background_image} alt={name}/>
    
            </Link>
           </div>
           <div className={styles.cardTitle}>
            <h4>{name}</h4>
           </div>
           <div className={styles.cardDescription}>
            <h4>{genresToShow}</h4>
           </div>
           
        </div>
    )
}

export default CardVideogame;