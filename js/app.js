// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];


// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener("submit", agregarTweets);
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

            // Crear el HTML
            const li = document.createElement("li");
            li.innerText = tweet.tweet;

            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        })
    }
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}