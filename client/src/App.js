import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'


//Componentes
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'
import DetailVideogame from './Components/Detail/DetailVideogame';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
const [videogames,setVideogames] = useState({})
const videogamesIsEmpty = Object.keys(videogames).length === 0;

//UseEffect para obtener los datos cada que se actualiza el home
useEffect(()=>{
  const requestApi = async()=>{
    await axios('http://localhost:3001/videogames')
    .then(response=>{
      setVideogames(response.data)
      console.log(response.data.results);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  requestApi()
 
},[])




const searchVideogameByName = async (nameVideogame)=>{
  await axios('http://localhost:3001/videogames?name='+nameVideogame)
    .then(response=>{
      let results = {
        results : response.data
      }
      setVideogames(results)
    })
    .catch(error =>{
      console.log(error);
    })
}


  return (
    <div className="App">
      {/* Auxiliar de home */}
      <Link to="/">
        <h1>Henry Videogames</h1>
      </Link>
      <SearchBar searchVideogameByName={searchVideogameByName}></SearchBar>
      <Routes>
        <Route path="/" element={videogamesIsEmpty ? (<p></p>) : (<CardsVideogame videogames={videogames.results} />)}/> 
        <Route path='/Detail/:id' element={<DetailVideogame/>}> </Route> 
      </Routes>
    </div>
  );
}

export default App;
