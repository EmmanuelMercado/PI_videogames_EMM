
import React, { useEffect, useState } from "react";
import CardVideogame from "../CardVideogame/CardVideogame";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import styles from "./CardsVideogames.module.css";
import {useSelector,useDispatch} from "react-redux"
import { changeCurrentPage } from "../../redux/actions";

const CardsVideogames = (props) => {
  const videogames = useSelector((state)=>state.videogames)
  const searchByName = useSelector((state)=>state.searchByName)
  const currentPageGlobal = useSelector((state)=>state.currentPage)
  const dispatch = useDispatch()
  
  const [currentPage, setCurrentPage] = useState(currentPageGlobal);
  const cardsPerPage = 15;

  // Calcula los índices de las tarjetas que se mostrarán en la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentVideogames = videogames.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  useEffect(()=>{
    dispatch(changeCurrentPage(currentPage))
  },[currentPage])

  useEffect(()=>{
    setCurrentPage(currentPageGlobal)
  },[currentPageGlobal])

  // Función para cambiar la página actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Validar si hay páginas anteriores o siguientes
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = indexOfLastCard < videogames.length;

  return (
    <div>
      
      <SearchBar/>
      {searchByName?(<></>):(<Filters/>)}
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
          { length: Math.ceil(videogames.length / cardsPerPage) },
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
