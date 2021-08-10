import "./styles/style.css";
import axios from "axios";

const fetchPagination = async (url) => {
    try {
        const response = await axios.get(url);
        return {
            previous: response.data.previous,
            next: response.data.next,
            results: response.data.results
        };
    } catch (error) {
        return error;
    }
}

const fetchPokemon = async (pokemonUrl) => {
    try {
        const response = await axios.get(pokemonUrl);
        const pokemon = response.data;
        return {
            name: pokemon.name,
            imageUrl: pokemon.sprites.front_default,
            moves: [pokemon.moves[0].move.name, pokemon.moves[1].move.name, pokemon.moves[2].move.name],
            types: pokemon.types.map(type => type.type.name)
        };
    } catch (error) {
        return error;
    }
}

class PokemonList extends HTMLElement {
    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.clear();
        this.render();
    }

    render() {
        this._pokemons.forEach(pokemon => {
            const pokemonItem = document.createElement("pokemon-item");
            pokemonItem.pokemon = pokemon;
            this.appendChild(pokemonItem)
        })
    }

    clear() {
        while (this.firstChild) {
            this.removeChild(this.firstChild)
        }
    }
}

class PokemonItem extends HTMLElement {
    set pokemon(pokemon) {
        this._pokemon = pokemon;
        this.render();
    }

    render() {
        this.innerHTML = `<p>${this._pokemon.name} - ${this._pokemon.types}</p>`
    }
}

const app = () => {
    const root = document.getElementById("app");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pokemonListElement = document.createElement("pokemon-list");
    const firstPageUrl = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"

    fetchPagination(firstPageUrl)
        .then(data => {
            let nextPage = data.next;
            let prevPage = data.previous;

            let pokemonListPromise = data.results.map(pokemon => {
                const pokemonData = fetchPokemon(pokemon.url);
                return pokemonData;
            })

            Promise.all(pokemonListPromise)
                .then(pokemon => pokemonListElement.pokemons = pokemon)

            nextButton.addEventListener("click", () => {
                fetchPagination(nextPage)
                    .then(data => {
                        nextPage = data.next
                        prevPage = data.previous

                        let pokemonListPromise = data.results.map(pokemon => {
                            const data = fetchPokemon(pokemon.url);
                            return data;
                        })

                        Promise.all(pokemonListPromise)
                            .then(pokemon => pokemonListElement.pokemons = pokemon)
                    })
            })

            prevButton.addEventListener("click", () => {
                if (prevPage) {
                    fetchPagination(prevPage)
                        .then(data => {
                            nextPage = data.next
                            prevPage = data.previous

                            let pokemonListPromise = data.results.map(pokemon => {
                                const data = fetchPokemon(pokemon.url);
                                return data;
                            })

                            Promise.all(pokemonListPromise)
                                .then(pokemon => pokemonListElement.pokemons = pokemon)
                        })
                }
            })

            root.appendChild(pokemonListElement);

        })
}

customElements.define("pokemon-list", PokemonList);
customElements.define("pokemon-item", PokemonItem);

app();