
// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS
eventListeners(); // iniciamos el metodo

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento este listo
    document.addEventListener('DOMContentLoaded', () => {
        
        tweets = JSON.parse( localStorage.getItem('tweets')) || []; // Si esta en null, lo agrega como un arreglo vacio, para que no lo llene como null 

        crearHTML();
    });
}

// FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; 
    }
    // Creamos un objeto para agregarlo a los tweets
    const tweetObj = {
        id: Date.now(), // Esto nos devuelve la canntidad de milisegundos transcurridos desde enero, nos servira como un id para cada tweet
        tweet 
    }
    // Añadir al arreglo de twwets
    tweets = [...tweets, tweetObj];
    // Una vez agregado, creamos el HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error'); // Se le agrega esta clase que esta definida ya en css

// Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

// Elimina la alerta despues de 3 segundos
    setTimeout( () => {
        mensajeError.remove();
    },3000); 
}

// Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML(); // Eliminamos el html previo para colocar el nuevo listado

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); // Le pasamos el id del que vamos a eliminar
            }

            // Crear el HTML
            const li = document.createElement('li');
            // Añadir texto
            li.innerText = tweet.tweet;
            // le asignamos el boton al li  una vez agregado el texto
            li.appendChild(btnEliminar);
            // Insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los tweets Actuales al localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id); // Devuelve todos menos el id que le estamos pasando
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
