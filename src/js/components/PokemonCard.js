class PokemonCard extends HTMLElement {

    set pokemon(pokemon) {
        this._pokemon = pokemon;
        this.render();
    };

    set clickAddFavoriteEvent(event) {
        this._eventAddFavorite = event || null;
        this.render();
    };

    checkPokemonId(id) {
        const myPokemonList = JSON.parse(localStorage.getItem("my-pokemon-list"));
        const myPokemonListId = myPokemonList.map(pokemon => pokemon.id).includes(id);
        return myPokemonListId;
    };

    render() {
        const {id, name, types, moves, imageUrl, color} = this._pokemon;
        const isPokemonFavorited = this.checkPokemonId(id);
        this.setAttribute("id", id);
        this.classList.add("bg-gray-100");
        this.classList.add("shadow-lg");
        this.classList.add("relative");

        this.innerHTML = `
            <div class="w-full h-3/5 md:h-1/4 absolute bg-${color === "brown" ? "yellow": color !== "white" ? color : "gray"}-500"></div>
            <div class="fav-icon">
                <i class="fas fa-star text-xl text-${isPokemonFavorited ? "yellow" : "gray"}-300 absolute right-0 top-0 m-2 cursor-pointer"></i>
            </div>
            <img class="bg-white w-40 h-40 m-5 md:w-32 md:h-32 mx-auto md:mb-12 relative md:top-10 p-2 rounded-full" src=${imageUrl}>            
            <div class="flex md:flex-col md:flex-none">
                <div class="flex-1 md:flex-none m-1 md:m-4">
                    <p class="border-2 rounded-lg w-max mx-auto my-3 bg-white text-sm p-1">#${id ? id.padStart("3","0") : null}</p>
                    <h3 class="text-xl text-center font-bold text-gray-700">${name.charAt(0).toUpperCase().concat(name.slice(1))}</h3>
                    <p class="text-center text-sm italic text-gray-700">${types.map(type => `<span class="p-0.5">${type}</span>`).join('/')}</p>                    
                </div>                
                <div class="flex-1 md:flex-none m-1 md:m-4">
                    <p class="font-medium">Moves:</p>
                    ${moves.map(move => `<ul><li class="text-sm md:text-base md:px-1.5 py-0.5 my-0.5 bg-${color === "brown" ? "yellow": color}-200 text-${color === "brown" ? "yellow": color}-900 border-2 shadow-sm rounded-md pl-1">${move}</li></ul>`).join(' ')}
                </div>
            </div>
        `;        

        if(this._eventAddFavorite) {
            this.querySelectorAll(".fav-icon").forEach(icon => {
                icon.addEventListener("click", () => {
                    this._eventAddFavorite(this._pokemon);  
                    this.querySelector(".fa-star").classList.add("text-yellow-300");
                });
            })
        };
    };
};

customElements.define("pokemon-card", PokemonCard);