import './styles/style.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/images/pokeball-white.svg';
import main from './js/view/main.js';
import STORAGE_KEY from './js/data/STORAGE_KEY';

document.addEventListener('DOMContentLoaded', () => {
    if (typeof Storage !== 'undefined') {
        if (localStorage.getItem(STORAGE_KEY) === null) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));    
        }
    }

    main();
});