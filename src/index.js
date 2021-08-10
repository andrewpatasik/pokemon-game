import "./styles/style.css";
import axios from "axios";

async function summonPokemon() {
    try {
        const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/100");
        return pokemon.data;
    } catch (error) {
        return error;
    }
}

const app = () => {
    const root = document.getElementById("app");
    summonPokemon()
    .then(pokemon => {
        const heading = document.createElement("h1");
        heading.innerText = pokemon.name;
        root.appendChild(heading);
    })
}

app();