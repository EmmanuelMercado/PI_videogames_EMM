import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'


//Componentes
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'
import DetailVideogame from './Components/Detail/DetailVideogame';
import Form from './Components/Form/Form';
import SearchBar from './Components/SearchBar/SearchBar';
import NavBar from './Components/NavBar/NavBar';
import Loading from './Components/Loading/Loading.jsx';
import LandingPage from './Components/LandingPage/LandingPage';


function App() {
const [videogames,setVideogames] = useState({})
const [login,setLogin] = useState(false)
const videogamesIsEmpty = Object.keys(videogames).length === 0;

const requestApi = async()=>{
  setVideogames({})
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

//UseEffect para obtener los datos cada que se actualiza el home
useEffect(()=>{
  requestApi()
},[])




const searchVideogameByName = async (nameVideogame)=>{
  await axios('http://localhost:3001/videogames?name='+nameVideogame)
    .then(response=>{
      
      const cardsToShow = [...response.data[0].results,...response.data[1].results]
      console.log(cardsToShow);
      if(cardsToShow.length===0){
        window.alert('No se encontraron coincidencias')
      }
      else{
        setVideogames(cardsToShow) 
      }
                
    })
    .catch(error =>{
      console.log(error);
    })
}

const handleLogin = (condition) =>{
  console.log(condition);
  setLogin(condition)
}


  return (
    <div className="App">
      {/* Auxiliar de home */}
      {/* {login?<NavBar requestApi={requestApi}></NavBar>:<>Z</>} */}
      <NavBar requestApi={requestApi}></NavBar>
      <Routes>
        {/* <Route path="/" element={<LandingPage handleLogin={handleLogin}></LandingPage>}/>  */}
        {/* <Route path="/" element={videogamesIsEmpty ? (<Loading></Loading>) : (<CardsVideogame searchVideogameByName={searchVideogameByName} videogames={videogames}/>)}/>  */}
        <Route path="/" element={<CardsVideogame searchVideogameByName={searchVideogameByName} videogames={videogames}/>}/>
        {/* <Route path='/Detail/:id' element={<DetailVideogame/>}> </Route> 
        <Route path='/Form' element={<Form requestApi={requestApi}/>}> </Route>  */}
      </Routes>
    </div>
  );
}

export default App;
