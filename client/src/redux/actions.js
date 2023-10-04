import axios from "axios"

export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
export const FILTER = "FILTER"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const SEARCH_BY_NAME = "SEARCH_BY_NAME"
export const CANCEL_SEARCH = "CANCEL_SEARCH"
export const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE"
export const MOUNTED_APP_PAGE = 'MOUNTED_APP_PAGE'


export const getAllVideogames = () =>{
    return function(dispatch){
        axios("http://localhost:3001/videogames")
        .then(response=>{
            dispatch({type:GET_ALL_VIDEOGAMES,payload:response.data})
        })
    }
}

export const filterVideogames = (filtro) =>{
    return {type:FILTER,payload:filtro}
}

export const getAllGenres = () =>{
    return function(dispatch){
        axios('http://localhost:3001/videogames/genres/all')
        .then(response=>{
            dispatch({type:GET_ALL_GENRES,payload:response.data})
        })
    }
}

export const searchByName = (nameVideogame)=>{
    return function(dispatch){
        axios('http://localhost:3001/videogames?name='+nameVideogame)
        .then(response=>{
            dispatch({type:SEARCH_BY_NAME,payload:response.data})
        })
    }
}

export const cancelSearch = ()=>{
    return {type:CANCEL_SEARCH}
}

export const changeCurrentPage = (page)=>{
    return {type:CHANGE_CURRENT_PAGE,payload:page}
}

export const mountedAppPage = ()=>{
    return {type:MOUNTED_APP_PAGE}
}
