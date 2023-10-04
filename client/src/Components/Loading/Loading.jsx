import styles from './Loading.module.css'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"



const Loading = ()=>{
// const [estado,setEstado]=useState('Cargando')
// const videogames = useSelector((state)=>state.videogames)
// const mountedApp = useSelector((state)=>state.mountedApp)
// let videogamesIsEmpty = Object.keys(videogames).length === 0;

// if(mountedApp && videogamesIsEmpty){
//    setEstado("No se ha encontrado el juego") 
// }
    return(
        <div className={styles.loading}>
            Loading games...
        </div>
    )
}

export default Loading