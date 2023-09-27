import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'


//Componentes
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'
import DetailVideogame from './Components/Detail/DetailVideogame';
import Form from './Components/Form/Form';
import SearchBar from './Components/SearchBar/SearchBar';


function App() {
const [videogames,setVideogames] = useState({})
const videogamesIsEmpty = Object.keys(videogames).length === 0;

//UseEffect para obtener los datos cada que se actualiza el home
useEffect(()=>{
  const requestApi = async()=>{
    await axios('http://localhost:3001/videogames')
    .then(response=>{
      console.log(response.data);
      const cardsToShow = [...response.data[0].results,...response.data[1].results]
      setVideogames(cardsToShow)
      console.log(cardsToShow);
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
      const cardsToShow = [...response.data[0].results,...response.data[1].results]
      setVideogames(cardsToShow)           
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
      <Link to="/Form">
        <h1>New videogame</h1>
      </Link>
      <SearchBar searchVideogameByName={searchVideogameByName}></SearchBar>
      <Routes>
        <Route path="/" element={videogamesIsEmpty ? (<p></p>) : (<CardsVideogame videogames={videogames}/>)}/> 
        <Route path='/Detail/:id' element={<DetailVideogame/>}> </Route> 
        <Route path='/Form' element={<Form/>}> </Route> 
      </Routes>
    </div>
  );
}

export default App;
