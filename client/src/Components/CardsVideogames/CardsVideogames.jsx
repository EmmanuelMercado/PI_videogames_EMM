// import CardVideogame from "../CardVideogame/CardVideogame";
// import styles from "./CardsVideogames.module.css"

// const CardsVideogames = (props)=>{
//    return(
//     <div className={styles.cardContainer}>
//         {
//             props.videogames.map((videogame)=>{
//                 return(
//                     <CardVideogame videogame = {videogame} key={videogame.id}></CardVideogame>
//                 )
//             })
//         }
//     </div>
//    )
// }

// export default CardsVideogames;


import React, { useState } from "react";
import CardVideogame from "../CardVideogame/CardVideogame";
import styles from "./CardsVideogames.module.css";

const CardsVideogames = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 15;

  // Calcula los índices de las tarjetas que se mostrarán en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentVideogames = props.videogames.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  // Función para cambiar la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <div>

    <div className="pagination">
        {Array.from(
          { length: Math.ceil(props.videogames.length / cardsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
      <div className={styles.cardContainer}>
        {currentVideogames.map((videogame) => (
          <CardVideogame videogame={videogame} key={videogame.id} />
        ))}
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(props.videogames.length / cardsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CardsVideogames;
