import { useState,useEffect } from "react";
import styles from './SearchBar.module.css'
import {useDispatch,useSelector} from "react-redux"
import {searchByName,cancelSearch} from '../../redux/actions'

const SearchBar = () =>{
    let [mounted,setMounted] = useState(false)
    let [nameVideogame,setNameVideogame] = useState('')
    let [search,setSearch] = useState(false)
    let [cancelSearchG,setCancelSearchG] = useState(false)


    const handleChange = (event)=>{
        setNameVideogame(event.target.value)
    }
    const dispatch = useDispatch()

    
    useEffect(()=>{
        if(mounted){
            dispatch(searchByName(nameVideogame))
        }
        else{
            setMounted(true)
        }
    },[search])

    useEffect(()=>{
        if(mounted){
        dispatch(cancelSearch())
        }
        else{
            setMounted(true)
        }
    },[cancelSearchG])

    const searchGame = () => {
        setSearch(!search)
    }

    const cancelSearchGame = () =>{
        setNameVideogame('')
        setCancelSearchG(!cancelSearchG)
    }

    return(
        <div className={styles.searchBar}>
            <input onChange={handleChange} type="search" value={nameVideogame}/>
            {nameVideogame && (
            <button  onClick={cancelSearchGame}>&#x2715;</button>
            )}
            <button onClick={searchGame}>Buscar</button>
            
        </div>
    )
}

export default SearchBar;