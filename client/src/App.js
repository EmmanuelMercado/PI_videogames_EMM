import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'

//Componentes
import CardVideogame from './Components/CardVideogame/CardVideogame'
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'


function App() {
const [videogames,setVideogames] = useState({})
const videogamesIsEmpty = Object.keys(videogames).length === 0;

//UseEffect para obtener los datos cada que se actualiza el home
useEffect(()=>{
  const requestApi = async()=>{
    await axios('http://localhost:3001/videogames')
    .then(response=>{
      setVideogames(response.data)
    })
    .catch(error =>{
      console.log(error);
    })
  }
  requestApi()
 
},[])


  return (
    <div className="App">
      <h1>Henry Videogames</h1>
      {videogamesIsEmpty ? (<p></p>) : (<CardsVideogame videogames={videogames.results} />)}
    </div>
  );
}

export default App;
