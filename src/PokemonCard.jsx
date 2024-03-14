import { useState, useEffect } from "react";
import axios from "axios";

function PokemonCard({ url, name, size }) {
    const [pokemonDetail, setPokemonDetail] = useState(null);
    
const fetchPokemonDetails = async () => {
    const response = await axios.get(url);
    setPokemonDetail(response.data);
    console.log(response.data, "data");
}

    useEffect(() => {
        fetchPokemonDetails();
    }, []);

    return (
        <article className="card">
            <img src={pokemonDetail?.sprites?.front_default} alt={name} width={size} height={size}/>
            <h3>{name}</h3>
        </article>
    )
}

export default PokemonCard