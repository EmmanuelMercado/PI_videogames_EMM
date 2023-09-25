import CardVideogame from "../CardVideogame/CardVideogame";

const CardsVideogames = (props)=>{
   return(
    <div>
        {
            props.videogames.map((videogame)=>{
                return(
                    <CardVideogame videogame = {videogame} key={videogame.id}></CardVideogame>
                    
                )
            })
        }
    </div>
   )
}

export default CardsVideogames;