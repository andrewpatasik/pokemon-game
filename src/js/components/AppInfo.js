class AppInfo extends HTMLElement {
    connectedCallback() {
        this.classList.add("w-full");
        this.classList.add("mt-10");
        this.classList.add("p-10");
        this.classList.add("flex");
        this.classList.add("flex-col");
        this.classList.add("text-white");
        this.classList.add("bg-red-500");
        this.classList.add("sm:flex-row");

        this.render();
    };

    render() {
        this.innerHTML = `
            <article id="tools" class="my-5 flex-1 flex flex-col items-center">
                <p class="text-2xl font-medium text-center">Powered by</p>
                <ul>
                    <li class="m-3">
                        <a target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/" class="flex items-center text-white hover:text-red-600">
                            <i class="fas fa-globe text-4xl"></i>
                            <span class="pl-3 text-sm">PokéAPI</span>
                        </a>
                    </li>
                    <li class="m-3">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/axios" class="flex items-center text-white hover:text-red-600">
                            <i class="fab fa-npm text-4xl"></i>
                            <span class="pl-3 text-sm">Axios</span>
                        </a>
                    </li>
                    <li class="m-3">
                        <a target="_blank" rel="noopener noreferrer" href="https://tailwindcss.com/" class="flex items-center text-white hover:text-red-600">
                            <i class="fab fa-css3 text-4xl"></i>
                            <span class="pl-3 text-sm">Tailwind CSS</span>
                        </a>
                    </li>
                </ul>
            </article>
            <article id="author" class="flex-1 flex flex-col items-center my-5">
                <p class="text-2xl font-medium text-white">Created by</p>        
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/andrewpatasik" class="flex items-center flex-col hover:text-red-600">
                    <i class="fab fa-github text-6xl m-3"></i>
                    <p class="text-sm">andrewpatasik.github.com</p>
                </a>
            </article>
            <article id="disclaimer" class="my-5 flex-1 flex flex-col items-center justify-between text-sm text-center">
                <p class="text-2xl font-medium text-white">Disclaimer</p>        
                <p class="flex-1">© 1995–2021 Nintendo/Creatures Inc./GAME FREAK inc. 
                    Pokémon, Pokémon character names, Pokémon character images are trademarks of Nintendo.</p>
                <p class="flex-1">this website is intended for <a target="_blank" rel="noopener noreferrer" href="https://www.dicoding.com/academies/163" class="text-yellow-300 underline hover:text-red-400">dicoding fundamental front-end development</a> class submission.</p>
            </article>
        `;
    };
};

customElements.define("app-info", AppInfo);