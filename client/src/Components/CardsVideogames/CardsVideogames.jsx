
import React, { useState } from "react";
import CardVideogame from "../CardVideogame/CardVideogame";
import SearchBar from "../SearchBar/SearchBar";
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

  // Validar si hay páginas anteriores o siguientes
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = indexOfLastCard < props.videogames.length;

  return (
    <div>
      <SearchBar searchVideogameByName={props.searchVideogameByName} />
      
      <div className={styles.cardContainer}>
        {currentVideogames.map((videogame) => (
          <CardVideogame videogame={videogame} key={videogame.id} />
        ))}
      </div>

      <div className="pagination">
        {hasPreviousPage && (
          <button onClick={() => paginate(currentPage - 1)}>Back</button>
        )}

        {Array.from(
          { length: Math.ceil(props.videogames.length / cardsPerPage) },
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? styles.activePage : ""}
            >
              {index + 1}
            </button>
          )
        )}

        {hasNextPage && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default CardsVideogames;
