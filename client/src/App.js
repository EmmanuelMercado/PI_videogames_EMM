import './App.css';
import axios from 'axios'
import {useEffect,useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"

import { getAllVideogames,getAllGenres,mountedAppPage } from './redux/actions';


//Componentes
import CardsVideogame from './Components/CardsVideogames/CardsVideogames'
import DetailVideogame from './Components/Detail/DetailVideogame';
import Form from './Components/Form/Form';
import SearchBar from './Components/SearchBar/SearchBar';
import NavBar from './Components/NavBar/NavBar';
import Loading from './Components/Loading/Loading.jsx';
import LandingPage from './Components/LandingPage/LandingPage';


function App() {
// const [videogames,setVideogames] = useState({})
// const [login,setLogin] = useState(false)
const videogames = useSelector((state)=>state.videogames)
const mountedApp = useSelector((state)=>state.mountedApp)
let videogamesIsEmpty = Object.keys(videogames).length === 0;
console.log(mountedApp);
const dispatch = useDispatch()

useEffect(()=>{
    if(videogamesIsEmpty && !mountedApp){
      dispatch(getAllVideogames())
      dispatch(getAllGenres())
    }
},[])



// const handleLogin = (condition) =>{
//   console.log(condition);
//   setLogin(condition)
// }


  return (
    <div className="App">
      {/* Auxiliar de home */}
      {/* {login?<NavBar requestApi={requestApi}></NavBar>:<>Z</>} */}
      <NavBar></NavBar>
      <Routes>
        {/* <Route path="/" element={<LandingPage handleLogin={handleLogin}></LandingPage>}/>  */}
        <Route path="/home" element={mountedApp||!videogamesIsEmpty? (<CardsVideogame/>) : (<Loading></Loading>)}/> 
        
        {/* <Route path="/home" element={<CardsVideogame/>}/> */}
        <Route path='/Detail/:id' element={<DetailVideogame/>}> </Route> 
        <Route path='/Form' element={<Form/>}> </Route> 
      </Routes>
      {mountedApp||videogamesIsEmpty? <h1>Game not founded</h1> : <h1></h1>}
    </div>
  );
}

export default App;
