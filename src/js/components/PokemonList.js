import './PokemonCard.js';

class PokemonList extends HTMLElement {
    set pokemons(pokemons) {
        this._pokemons = pokemons;
        this.clear();
        this.render();
    };

    set pokemonCardEvent(event) {
        this._pokemonCardEvent = event;
        this.clear();
        this.render();
    };

    render() {
        this.classList.add("grid");
        this.classList.add("lg:grid-cols-4");
        this.classList.add("md:grid-cols-3");
        this.classList.add("sm:grid-cols-2");
        this.classList.add("gap-4");
        this.classList.add("mb-12");

        this._pokemons.forEach(pokemon => {
            const pokemonCard = document.createElement("pokemon-card");
            pokemonCard.pokemon = pokemon;
            pokemonCard.clickAddFavoriteEvent = this._pokemonCardEvent;
            this.appendChild(pokemonCard)
        });
    };

    clear() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        };
    };

    renderMessage(msg) {
        this.innerHTML = `
            <h1 class="text-2xl">${msg}</h1>
        `;
    };
};

customElements.define("pokemon-list", PokemonList);