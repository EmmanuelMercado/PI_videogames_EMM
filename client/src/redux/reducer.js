import {GET_ALL_VIDEOGAMES,FILTER,GET_ALL_GENRES,SEARCH_BY_NAME,CANCEL_SEARCH,CHANGE_CURRENT_PAGE,MOUNTED_APP_PAGE} from './actions'


const initialState={
    videogames:[],
    originalVideogames:[],
    genres:[],
    searchByName:false,
    auxVideogames:[],
    filter:{
        origen:"",
        genero:"",
        orden:"",
        opcion:"",
        noChanges:false
    },
    currentPage:1,
    mountedApp:false
}

const rootReducer = (state=initialState,action)=>{
    switch(action.type){
        case GET_ALL_VIDEOGAMES : 
            return{...state ,videogames:[...action.payload],originalVideogames:[...action.payload],mountedApp:true}  

        case GET_ALL_GENRES : 
            return{...state ,genres:[...action.payload]}  

        case FILTER:
            let {origen,genero,orden,opcion,noChanges} = action.payload
            let videogamesFiltered;

            if(noChanges===true){
                videogamesFiltered = state.originalVideogames.filter((videogame)=>{
                    if(origen!=="" && genero==="")  return videogame.origin === origen
                    else if(origen==="" && genero!=="") return videogame.genres.some((genre) => genre.name === genero)
                    else if(origen!=="" && genero!=="") return videogame.genres.some((genre) => genre.name === genero) && videogame.origin === origen
                    else return {...state,videogames:[...state.originalVideogames]}
                })
                if (opcion === "nombre" || opcion==="") {
                    // Ordenar por nombre
                    videogamesFiltered.sort((a, b) => {
                      if (orden === "ascendente" || orden==="") {
                        return a.name.localeCompare(b.name);
                      } else {
                        return b.name.localeCompare(a.name);
                      }
                    });
                  } else if (opcion === "rating") {
                    // Ordenar por rating
                    videogamesFiltered.sort((a, b) => {
                      if (orden === "ascendente" || orden==="") {
                        return a.rating - b.rating;
                      } else {
                        return b.rating - a.rating;
                      }
                    });
                  }  
                return {...state,videogames:videogamesFiltered,filter:action.payload,currentPage:1}
            }
            else{
                return{...state}
            }
        case SEARCH_BY_NAME:
            return{...state ,auxVideogames:[...state.videogames],videogames:[...action.payload],searchByName:true,currentPage:1}
        
        case CANCEL_SEARCH:
            return{...state ,videogames:[...state.auxVideogames],searchByName:false,currentPage:1}

        case CHANGE_CURRENT_PAGE:
            return {...state,currentPage:action.payload}
        
        case MOUNTED_APP_PAGE:
            return {...state,mountedApp:true}
        default:
            return{...state}
    }
}

export default rootReducer;