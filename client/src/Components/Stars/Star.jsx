import React from "react";
import styles from './Star.module.css'

const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating); // Redondea el rating a la estrella más cercana

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < filledStars) {
      return <span className={styles.starRating} key={index}>&#9733;</span>; // Estrella vacía (código Unicode)
    }
    return <span className={styles.starRating } key={index}>&#9734;</span>; // Estrella vacía (código Unicode)
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;