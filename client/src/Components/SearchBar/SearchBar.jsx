import { useState } from "react";
import styles from './SearchBar.module.css'

const SearchBar = (props) =>{
    let [nameVideogame,setNameVideogame] = useState('')
    const handleChange = (event)=>{
        setNameVideogame(event.target.value)
    }

    const searchVideogameByName = ()=>{
        console.log(nameVideogame);
        props.searchVideogameByName(nameVideogame)
    }

    return(
        <div className={styles.searchBar}>
            <input onChange={handleChange} type="search" value={nameVideogame}/>
            <button onClick={searchVideogameByName}>Buscar</button>
            
        </div>
    )
}

export default SearchBar;