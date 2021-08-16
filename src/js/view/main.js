import '../components/NavBar.js';
import '../components/PokemonList.js';
import '../components/PokemonCard.js';
import '../components/AppInfo.js';
import '../components/PaginationButton.js';
import fetchPagination from '../data/fetchPagination.js';
import fetchPokemon from '../data/fetchPokemon.js';
import STORAGE_KEY from '../data/STORAGE_KEY.js';

const main = () => {
    const navigationBarElement = document.querySelector("navigation-bar");
    const pokemonListElement = document.querySelector("pokemon-list");
    const paginationElement = document.querySelector("pagination-button");
    const firstPageUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

    const renderPokemon = (currentPageUrl) => {
        return new Promise((resolve, reject) => {
            fetchPagination(currentPageUrl)
                .then(data => {
                    if (data.status === 200) {
                        let next = data.next;
                        let previous = data.previous;

                        let pokemonListPromise = data.results.map(pokemon => fetchPokemon(pokemon.url));

                        Promise.all(pokemonListPromise)
                            .then(pokemons => {
                                pokemonListElement.pokemons = pokemons;
                                pokemonListElement.pokemonCardEvent = handleAddFavoriteEvent;
                            })
                            .catch(error => pokemonListElement.renderMessage(error));

                        resolve({next, previous});
                    } else {
                        reject(data.message);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        });
    };

    const hidePagination = (isElementHidden) => {
        !isElementHidden ?
            paginationElement.classList.remove("hidden") : paginationElement.classList.add("hidden");
    };

    const smoothScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSearchEvent = () => {
        let searchBarValue = navigationBarElement.searchValue.toLowerCase();
        if (searchBarValue !== "") {
            const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
            let pokemon = fetchPokemon(baseUrl + searchBarValue);
            pokemon
                .then(pokemon => {
                    if (pokemon.status === 200) {
                        pokemonListElement.pokemons = [pokemon];
                        pokemonListElement.pokemonCardEvent = handleAddFavoriteEvent;
                    } else {
                        pokemonListElement.renderMessage("Pokemon not found");
                    }
                })
                .catch(error => console.log(error));
            hidePagination(true);
            return;
        }
        renderPokemon(firstPageUrl);
        hidePagination(false);
    }

    const handleClickHomeBtnEvent = () => {
        renderPokemon(firstPageUrl);
        hidePagination(false);
    }

    const handleClickPokedexEvent = () => {
        const myPokemonList = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if(myPokemonList[0] === undefined) {
            pokemonListElement.renderMessage("Pokedex is empty")    ;
        } else {
            pokemonListElement.pokemons = myPokemonList;
            pokemonListElement.pokemonCardEvent = null;
    
        }
        hidePagination(true);
    }

    const handleAddFavoriteEvent = (favoritedPokemon) => {
        const myPokemonList = JSON.parse(localStorage.getItem(STORAGE_KEY));
        myPokemonList.push(favoritedPokemon);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(myPokemonList));
    };

    renderPokemon(firstPageUrl)
        .then(dataFulfilled => {
                let nextPageUrl = dataFulfilled.next;
                let prevPageUrl = dataFulfilled.previous;

                const handleNextBtnEvent = () => {
                    renderPokemon(nextPageUrl)
                        .then(data => {
                            nextPageUrl = data.next;
                            prevPageUrl = data.previous;
                        })
                        .catch(error => console.log(error));
                    smoothScrollToTop();
                };

                const handlePrevBtnEvent = () => {
                    if (prevPageUrl) {
                        renderPokemon(prevPageUrl)
                            .then(data => {
                                nextPageUrl = data.next;
                                prevPageUrl = data.previous;
                            })
                            .catch(error => console.log(error));
                        smoothScrollToTop();
                    };
                };

                navigationBarElement.changeSearchEvent = handleSearchEvent;
                navigationBarElement.clickHomeEvent = handleClickHomeBtnEvent;
                navigationBarElement.clickPokedexEvent = handleClickPokedexEvent;
                paginationElement.clickPrevBtnEvent = handlePrevBtnEvent;
                paginationElement.clickNextBtnEvent = handleNextBtnEvent;
            },
            dataRejected => pokemonListElement.renderMessage(dataRejected));
};

export default main;