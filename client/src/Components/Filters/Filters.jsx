const Filters = ()=>{
    const [selectedOption, setSelectedOption] = useState(""); // Estado para almacenar la opción seleccionada

        // Función para manejar el cambio de opción
        const handleSelectChange = (event) => {
            setSelectedOption(event.target.value);
        };

        return (
            <div>
            <h2>Filtro por origen:</h2>
            <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Selecciona una opción...</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
            </select>
            <p>Opción seleccionada: {selectedOption}</p>
            </div>
  );
};


export default Filters