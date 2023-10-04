import { useEffect,useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { filterVideogames } from "../../redux/actions";
import styles from './Filters.module.css'


const Filters = ()=>{
    // const videogames = useSelector((state)=>state.videogames)
    const genres = useSelector((state)=>state.genres)
    const filters = useSelector((state)=>state.filter)


    const [opcionesFiltro,setOpcionesFiltro] = useState({
        origen:filters.origen,
        genero:filters.genero,
        orden:filters.orden,
        opcion:filters.opcion,
        noChanges:filters.noChanges
    })


    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(filterVideogames(opcionesFiltro))
    },[opcionesFiltro])


    const filterOrigin = (event) =>{
        setOpcionesFiltro({
            ...opcionesFiltro,
            noChanges:true,
            [event.target.name]:event.target.value
        })
    }

    const listGenres = genres.map((genre) => (
            <option key={genre.id} value={genre.name}>{genre.name}</option>
    ));

    return (
        <div className={styles.container}>
        <label htmlFor="origen">Origin</label>
        <select name="origen" value={opcionesFiltro.origen} onChange={filterOrigin}>
            <option value="">All videogames</option>
            <option value="API">API</option>
            <option value="DB">Data Base</option>
        </select>
        <label htmlFor="genero">Gender</label>
        <select name="genero" value={opcionesFiltro.genero} onChange={filterOrigin}>
            <option key='all' value=''>All</option>
            {listGenres}
        </select>
        <label htmlFor="orden">Order</label>
        <select name="orden" value={opcionesFiltro.orden} onChange={filterOrigin}>
                <option value="">Order</option>
                <option value="ascendente">Ascendente</option>
                <option value="Des">Descendente</option>
        </select>
        <label htmlFor="opcion">Rating or Alfabetic</label>
        <select name="opcion" value={opcionesFiltro.opcion} onChange={filterOrigin}>
            <option value="">Choose an opción</option>
            <option value="nombre">Alfabetic</option>
            <option value="rating">Rating</option>
        </select>
        </div>
  );
};


export default Filters