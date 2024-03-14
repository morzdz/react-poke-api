import { useState, useEffect } from "react"; // Importation des hooks useState et useEffect depuis React
import axios from "axios"; // Importation de la bibliothèque axios pour effectuer des requêtes HTTP
import PokemonCard from "./PokemonCard"; // Importation de la composante PokemonCard depuis le fichier PokemonCard.js

function SearchPokemon() { // Définition de la fonction composante SearchPokemon
    const [allPokemons, setAllPokemons] = useState([]); // Déclaration d'un état allPokemons initialisé à un tableau vide
    const [filteredPokemons, setFilteredPokemons] = useState([]); // Déclaration d'un état filteredPokemons initialisé à un tableau vide
    const [searchTerm, setSearchTerm] = useState(""); // Déclaration d'un état searchTerm initialisé à une chaîne vide

    const fetchAllPokemons = async () => { // Définition de la fonction asynchrone fetchAllPokemons
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50"); // Envoi d'une requête GET à l'API PokeAPI pour récupérer les 50 premiers Pokémon
        setAllPokemons(response.data.results); // Mise à jour de l'état allPokemons avec les résultats de la requête
    };
    
    useEffect(() => { // Utilisation du hook useEffect pour effectuer une action après le montage du composant
        fetchAllPokemons(); // Appel de la fonction fetchAllPokemons
    }, []); // Le tableau vide en second argument indique que cette action doit être effectuée uniquement après le montage initial du composant

    const handleSearch = () => { // Définition de la fonction handleSearch
        if (searchTerm.trim() !== "") { // Vérifie si searchTerm n'est pas une chaîne vide après suppression des espaces blancs
            const filtered = allPokemons.filter(pokemon => // Filtrage des Pokémon en fonction du terme de recherche saisi par l'utilisateur
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) // Vérification si le nom du Pokémon inclut le terme de recherche (ignorant la casse)
            );
            setFilteredPokemons(filtered); // Mise à jour de l'état filteredPokemons avec les Pokémon filtrés
        } else {
            displayAllPokemon(); // Si searchTerm est vide, affiche tous les Pokémon
        }
    };
    

    const displayAllPokemon = () => { // Définition de la fonction displayAllPokemon
        setFilteredPokemons(allPokemons); // Mise à jour de l'état filteredPokemons avec tous les Pokémon non filtrés
    };

    return ( // Rendu de la composante SearchPokemon
        <>
            <div>
                <div className="title">
                {/* Titre de la page */}
                    <h1>Recherchez un Pokémon</h1> 
                </div>
                <div className="search">
                    <input 
                        type="text" 
                        id="pokemonName" 
                        placeholder="Entrez le nom d'un Pokémon"
                        onChange={e => setSearchTerm(e.target.value)} // Appel de la fonction setSearchTerm à chaque modification de la valeur de l'input
                    />
                    <div id="btn">
                        {/* Bouton pour lancer la recherche de Pokémon */}
                        <button onClick={handleSearch}>Rechercher</button>
                        {/* Bouton pour afficher tous les Pokémon */}
                        <button onClick={displayAllPokemon}>Afficher tous</button>
                    </div>
                </div>
                    <div id="container">
                        {filteredPokemons.map((pokemon, index) => ( // Affichage de chaque Pokémon filtré dans une PokemonCard
                            <PokemonCard 
                                key={index} 
                                name={pokemon.name} 
                                url={pokemon.url}
                                size={100} // Taille de l'image
                            />
                        ))}
                    </div>
            </div>
        </>
    );
}

export default SearchPokemon; // Exportation de la composante SearchPokemon
