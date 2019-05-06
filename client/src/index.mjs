import Table from './components/table.mjs'
import movieService from './api/movie.mjs'

// Inicializamos la tabla
window.table = Table('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Duración', field: 'runtime' },        
        { label: 'Pais', field: 'country' },
        {
            label: 'Guionistas',
            field: 'writers',
            render: function (data) { return data.join(', ') }
        }
    ],
    data: [],
    // Esta funcion se ejecuta cuando seleccionamos una pelicula
    onSelectedRow: function (row) {
        console.log(table.getSelectedRows())
    },
    // Esta funcion se ejecuta cuando deseleccionamos una pelicula
    onDeselectedRow: function () {
        console.log(table.getSelectedRows())
    }
})

// Obtenemos todas las peliculas
movieService.getAll().then(table.update)

// Guardamos todas las referencias a elementos que vamos a
// necesitar
const $refs = {
    cancelModalBtn: document.querySelector('#cancelModalBtn'),
    saveMovieBtn: document.querySelector('#saveMovieBtn'),
    addMovieBtn: document.querySelector('#addMovieBtn'),
    closeModalBtn: document.querySelector('#closeModalBtn'),

    modal: document.querySelector('#modal'),

    movieName: document.querySelector('#movieName'),
    moviePlot: document.querySelector('#moviePlot'),
    movieReleaseDate: document.querySelector('#movieReleaseDate'),
    movieCountry: document.querySelector('#movieCountry'),
    movieRuntime: document.querySelector('#movieRuntime'),
    movieLanguage: document.querySelector('#movieLanguage'),
    movieGeneres: document.querySelector('#movieGeneres'),
    movieWriters: document.querySelector('#movieWriters'),
    movieDirectors: document.querySelector('#movieDirectors')
}

/*
 * Abre el modal
 */
function openModal() {
    $refs.modal.classList.add('is-active')
}

/*
 * Cierra el modal
 */
function closeModal() {
    $refs.modal.classList.remove('is-active')
    removeData();
}

function parseCSV(val) {
    return val.split(',').flatMap(v => v.split());
}


function removeData(){
    $refs.movieName.value = "";
    $refs.moviePlot.value = "";
    $refs.movieReleaseDate.value= "";
    $refs.movieCountry.value= "";
    $refs.movieRuntime.value="";
    $refs.movieLanguage.value="";
    $refs.movieGeneres.value="";
    $refs.movieWriters.value="";
    $refs.movieDirectors.value="";
  
}
 

/*
 * Guarda una pelicula
 */
function saveMovie() {
    const movie = {
        name: $refs.movieName.value,
        plot: $refs.moviePlot.value,
        year: new Date($refs.movieReleaseDate.value),
        country: $refs.movieCountry.value,
        runtime: +$refs.movieRuntime.value,
        language: $refs.movieLanguage.value,
        generes: parseCSV($refs.movieGeneres.value),
        writers: parseCSV($refs.movieWriters.value),
        directors: parseCSV($refs.movieDirectors.value)
    }
    //Se llama a la función que cargará la pelicula 
    movieService.createMovie(movie);
    //Se recarga la página
    location.reload();
}

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
