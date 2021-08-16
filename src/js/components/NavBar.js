class NavigationBar extends HTMLElement {
    connectedCallback() {
        this.classList.add("w-11/12");
        this.classList.add("mt-6");
        this.classList.add("flex");
        this.classList.add("items-end");
        this.classList.add("justify-between");
        this.classList.add("sm:mt-2");
        this.classList.add("lg:w-3/4");
        
        this.render();
    };

    set changeSearchEvent(event) {
        this._searchEvent = event;
        this.render();
    };

    set clickHomeEvent(event) {
        this._homeBtnEvent = event;
        this.render();
    };

    set clickPokedexEvent(event) {
        this._pokedexBtnEvent = event;
        this.render();
    };

    get searchValue() {
        return this.querySelector("#search-bar").value;
    };

    render() {
        this.innerHTML = `
        <div id="search-bar-container" class="flex flex-col flex-1 pr-3 md:flex-row relative text-sm lg:text-xl">                
            <input id="search-bar" class="h-6 rounded-sm text-gray-800 pl-7 outline-none shadow-lg lg:h-10 sm:flex-1 lg:self-center lg:pl-10" type="text" placeholder="pikachu/mewtwo/etc...">
            <i class="fas fa-search absolute text-gray-600 top-1 left-1 lg:left-2 inset-y-1/2 m-0.5 sm:top-1 lg:text-1xl lg:-top-1 lg:mr-3 lg:mt-4"></i>            
         </div>
        <ul class="flex flex-none text-xl lg:text-4xl items-center">
            <li id="home-icon" class="mr-2 cursor-pointer"><i class="fas fa-home"></i></li>
            <li id="pokedex-icon" class="cursor-pointer pt-1 lg:pt-none"><img class="w-6 lg:w-11" src="images/pokeball-white.svg" alt="white-pokeball-icon"></li>
        </ul>
        `;

        this.querySelector("#search-bar").addEventListener("change", this._searchEvent);
        this.querySelector("#home-icon").addEventListener("click", this._homeBtnEvent);
        this.querySelector("#pokedex-icon").addEventListener("click", this._pokedexBtnEvent);
    };
};

customElements.define("navigation-bar", NavigationBar);