import React from "react";
import { Link } from "react-router-dom";
import styles from './CardVideogame.module.css'
import StarRating from '../Stars/Star'

const CardVideogame = (props) => {
  const { id, name, background_image, genres, Genres,rating} = props.videogame;
  let genresToShow = '';
  
  const generateGenres = (genres) => {
    const genresNames = genres.map((genre) => genre.name);
    const totalGenres = genresNames.join(', ');
    return totalGenres;
  };


  if (genres) {
    genresToShow = generateGenres(genres);
  } else {
    genresToShow = generateGenres(Genres);
  }
    

  return (
    <div className={styles.cardContainer}>
    <h4 className={styles.cardTitle}>{name}</h4>
    <StarRating rating={rating} />
    <div className={styles.cardImageContainer}>
        <Link to={'/detail/' + id}>
          <img src={background_image} alt={name} className={styles.cardImage} />
          <p className={styles.cardPlatforms}>Rating: {rating}</p>
          <p className={styles.cardGenres}>{genresToShow}</p>
        </Link>
        
        
      </div>
    </div>
  );
};

export default CardVideogame;

