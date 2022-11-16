// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
const tweets = [];


// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener("submit", agregarTweets);
}

// Funciones
function agregarTweets(e) {
    e.preventDefault();
}