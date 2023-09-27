import { useState } from "react"
const Form = ()=>{
let [form,setForm]=useState({
    name:'',
    description_raw:'',
    platforms:[],
    image:'',
    released:'',
    rating:'',
    genres:[]
})

// let [plataforms,setPlataforms]=useState([
//     {plataform:{name:"Nintendo", checked:false}},
//     {plataform:{name:"Xbox", checked:false}},
//     {plataform:{name:"Playstation", checked:false}},
//     {plataform:{name:"PC", checked:false}},
// ])


const handleOnChange =(event)=>{
    setForm({
        ...form,
        [event.target.name]:event.target.value
    })
}

const handleOnCheckPlatforms = (event)=>{
   
    const platformExists = form.platforms.find((platform)=>platform.platform.name === event.target.name) 

    
    if(platformExists===undefined){
        console.log('Si entro');
        const auxPlatform = form.platforms
        const newPlatformValue= auxPlatform.push(({platform:{name:event.target.name}}))
        setForm({
            ...form,
            platforms:auxPlatform
        })
        console.log(form);
    }
    else{
        const auxPlatform = form.platforms
        const newPlatformValue=  auxPlatform.filter((platform)=>platform.platform.name !== event.target.name)
        console.log(newPlatformValue);
        setForm({
            ...form,
            platforms:newPlatformValue
        })
        console.log(form);
    }
}



return(
    <form action="">
        <h1>Holis, soy el Form</h1>
        {/* Nombre */}
        <label htmlFor="name">Name </label>
        <input type="text" name='name' placeholder="Videogame name" value={form.name} onChange={handleOnChange}/>

        {/* Descripción */}
        <label htmlFor="description_raw">Description </label>
        <textarea name='description_raw' placeholder='Insert the description' value={form.description_raw} onChange={handleOnChange}/>

        {/* Platforms */}
        <label htmlFor="plataforms">Platforms </label>
        <ul>
            <li>
                <label htmlFor="Xbox">Xbox</label>
                <input name="Xbox" type='checkbox'  onChange={handleOnCheckPlatforms}/>
            </li>
            <li>
                <label htmlFor="Nintendo">Nintendo</label>
                <input name="Nintendo" type='checkbox'  onChange={handleOnCheckPlatforms}/>
            </li>
            <li>
                <label htmlFor="Playstation">Playstation</label>
                <input name="Playstation" type='checkbox'  onChange={handleOnCheckPlatforms}/>
            </li>
            <li>
                <label htmlFor="PC">PC</label>
                <input name="PC" type='checkbox'  onChange={handleOnCheckPlatforms}/>
            </li>
            <li>
                <label htmlFor="Mobile">Mobile</label>
                <input name="Mobile" type='checkbox'  onChange={handleOnCheckPlatforms}/>
            </li>
        </ul>

    </form>
)
}

export default Form;


//Prueba checklist

// import React, { useState } from 'react';

// function ChecklistApp() {
//   // Estado local 'form' para almacenar las plataformas seleccionadas
//   const [form, setForm] = useState({
//     platforms: [],
//   });

//   // Función para manejar el cambio de estado de una plataforma
//   const handlePlataformaChange = (plataforma) => {
//     setForm((prevState) => {
//       if (prevState.platforms.some((item) => item.name === plataforma)) {
//         // Si la plataforma ya está seleccionada, la eliminamos del arreglo 'platforms'
//         console.log(form);
//         return {
//           ...prevState,
//           platforms: prevState.platforms.filter((item) => item.name !== plataforma),
//         };
//       } else {
//         // Si la plataforma no está seleccionada, la agregamos al arreglo 'platforms'
//         console.log(form);
//         return {
//           ...prevState,
//           platforms: [...prevState.platforms, { platform: { name: plataforma } }],
//         };
//       }
//     });
//   };

//   return (
//     <div>
//       <h2>Selecciona tus plataformas:</h2>
//       <ul>
//         <li>
//           <input
//             type="checkbox"
//             id="xbox"
//             checked={form.platforms.some((item) => item.name === 'Xbox')}
//             onChange={() => handlePlataformaChange('Xbox')}
//           />
//           <label htmlFor="xbox">Xbox</label>
//         </li>
//         <li>
//           <input
//             type="checkbox"
//             id="nintendo"
//             checked={form.platforms.some((item) => item.name === 'Nintendo')}
//             onChange={() => handlePlataformaChange('Nintendo')}
//           />
//           <label htmlFor="nintendo">Nintendo</label>
//         </li>
//         <li>
//           <input
//             type="checkbox"
//             id="playstation"
//             checked={form.platforms.some((item) => item.name === 'Playstation')}
//             onChange={() => handlePlataformaChange('Playstation')}
//           />
//           <label htmlFor="playstation">Playstation</label>
//         </li>
//         <li>
//           <input
//             type="checkbox"
//             id="pc"
//             checked={form.platforms.some((item) => item.name === 'PC')}
//             onChange={() => handlePlataformaChange('PC')}
//           />
//           <label htmlFor="pc">PC</label>
//         </li>
//       </ul>
//       <div>
//         <h3>Plataformas seleccionadas:</h3>
//         <ul>
//           {form.platforms.map((plataforma, index) => (
//             <li key={index}>{JSON.stringify(plataforma)}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ChecklistApp;
