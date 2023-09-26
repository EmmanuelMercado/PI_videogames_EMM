import { useState } from "react";


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
        <div>
            <input onChange={handleChange} type="search" value={nameVideogame}/>
            <button onClick={searchVideogameByName}>Buscar</button>
            
        </div>
    )
}

export default SearchBar;