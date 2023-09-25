import CardVideogame from "../CardVideogame/CardVideogame";

const CardsVideogames = (props)=>{
   return(
    <div>
        {
            props.videogames.map((videogame)=>{
                return(
                    <CardVideogame videogame = {videogame}></CardVideogame>
                )
            })
        }
    </div>
   )
}

export default CardsVideogames;