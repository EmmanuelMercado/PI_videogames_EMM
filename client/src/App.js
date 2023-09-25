import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'


//Componentes
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'
import DetailVideogame from './Components/Detail/DetailVideogame';


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
      {/* Auxiliar de home */}
      <Link to="/">
        <h1>Henry Videogames</h1>
      </Link>
      
      <Routes>
        <Route path="/" element={videogamesIsEmpty ? (<p></p>) : (<CardsVideogame videogames={videogames.results} />)}/> 
        <Route path='/Detail/:id' element={<DetailVideogame/>}> </Route> 
      </Routes>
    </div>
  );
}

export default App;
