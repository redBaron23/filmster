const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin películas', async () => {
    const URL = `${baseURL}/movies`;
    const req = await fetch(URL)
    const movies = await req.json()

    expect(movies.length).toBe(0)
});

test('Se deberia poder agregar una pelicula usando la Api y verificar que exista la pelicula en bd', async () => { 
	//Se declara la pelicula
	const movie = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    	};

	//Se llama a la API
	await fetch(`${baseURL}/movies`, {
        method: 'POST', 
        body: JSON.stringify(movie),
        headers:{
            'Content-Type': 'application/json'
        }});

	//Se Obtiene la pelicula
    	const req = await fetch(`${baseURL}/movies/1`)
    	const receivedMovie = await req.json()
 
    	expect(movie.title).toBe(receivedMovie.title)
    	expect(movie.description).toBe(receivedMovie.description)
    	expect(movie.year).toBe(receivedMovie.year)
    	expect(movie.runtime).toBe(receivedMovie.runtime)
    	expect(movie.country).toBe(receivedMovie.country)
    	expect(movie.language).toBe(receivedMovie.language)
    	expect(movie.genres).toStrictEqual(receivedMovie.genres)
    	expect(movie.directors).toStrictEqual(receivedMovie.directors)
    	expect(movie.writers).toStrictEqual(receivedMovie.writers)
});
