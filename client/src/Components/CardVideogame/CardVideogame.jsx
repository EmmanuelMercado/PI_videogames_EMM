const CardVideogame = (props)=>{
    //ID auxiliar
    console.log(props.videogame);
    const {name,background_image,genres} = props.videogame
    
    const generateGenres = (genres) =>{
        const genresNames = genres.map(genre => genre.name)
        const totalGenres = genresNames.join(', ')
        return totalGenres
    }
    const genresToShow = generateGenres(genres)

    return(
        <div>
           <div>
            <img src={background_image} alt={name}/>
           </div>
           <h4>name: {name}</h4>
           <h4>genres:{genresToShow}</h4>
        </div>
    )
}

export default CardVideogame;