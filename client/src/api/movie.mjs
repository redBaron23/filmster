function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

//Función de crear pelicula
function createMovie(m) {
    const año = m.year.toString().slice(10, 15);

    const data = JSON.stringify({ title: m.name, description: m.plot, year: año, country: m.country, runtime: m.runtime, language: m.language, genres: m.generes, writers: m.writers, directors: m.directors }) 
    //Ejecuta el llamado a la api con los datos de la película
    return fetch('/api/v1/movies', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })

}

export default {
    getAll,
    createMovie,
}
