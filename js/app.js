// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweets);

    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];

        crearHTML();
    })
}

// Funciones
function agregarTweets(e) {
    e.preventDefault();
    
    // Textarea donde escribe el usuario
    const tweet = document.querySelector("#tweet").value;

    // Validacion
    if (tweet === "") {
        mostrarError("Un mensaje no puede ir vacio");
        return;  // evita que se ejecuten mas lineas de codigo
    }

    // Añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now,
        tweet
    }

    tweets = [...tweets, tweetObj];
    
    // Una vez agregado creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
    function mostrarError(error) {
        const mensajeError = document.createElement("p");
        mensajeError.textContent = error;
        mensajeError.classList.add("error");

        // Insertarlo en el contenido
        const contenido = document.querySelector("#contenido");
        contenido.appendChild(mensajeError);

        // Elimina la alerta despues de 3 segundos
        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
}

// Muestra un listado de tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar un btn de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "X";

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement("li");
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Agrega los Tweets actuales al LocalStorage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}