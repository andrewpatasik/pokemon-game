class PaginationButton extends HTMLElement {
    connectedCallback() {
        this.classList.add("flex");
        this.classList.add("text-white");
        this.classList.add("justify-center");
        
        this.render();
    };

    set clickPrevBtnEvent(event) {
        this._eventPrevBtn = event;
        this.render();
    };

    set clickNextBtnEvent(event) {
        this._eventNextBtn = event;
        this.render();
    };

    render() {
        this.innerHTML = `
        <button id="prev" class="flex items-center m-1 border-2 border-gray-300 bg-white p-2 rounded-md bg-blue-400 hover:bg-blue-300">                
            <i class="fas fa-caret-left mr-1 text-2xl"></i>                
        </button>  
        <button id="next" class="flex items-center m-1 border-2 border-gray-300 bg-white p-2 rounded-md bg-blue-400 hover:bg-blue-300">                
            <i class="fas fa-caret-right ml-1 text-2xl"></i>
        </button>
        `;

        this.querySelector("#prev").addEventListener("click", this._eventPrevBtn);
        this.querySelector("#next").addEventListener("click", this._eventNextBtn);
    };
};

customElements.define("pagination-button", PaginationButton);