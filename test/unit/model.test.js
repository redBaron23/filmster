const MovieModels = require('../../server/src/models/movie.js')

beforeEach(async () => {
    await MovieModels.Movie.sync({ force: true });
})

test('Crear película', async () => {
    const movieData = {
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

    // Creamos la pelicula
    const movie = await MovieModels.create(movieData)

    expect(movie.title).toBe(movieData.title);
    expect(movie.description).toBe(movieData.description);
    expect(movie.year).toBe(movieData.year);

    // Completar test
})

test('Crear película sin título', async () => {
    const movieData = {
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
    };

    try {
        await MovieModels.create(movieData)
    } catch (e) {
        expect(e.name).toBe('SequelizeValidationError')
    }
})

test('Obtener película', async () => {
    const movieData = {
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

    // Creamos la pelicula
    const movie = await MovieModels.create(movieData)
    const recivedMovie = await MovieModels.get(movie.id);

    expect(movie.id).toBe(recivedMovie.id);
    expect(movie.title).toBe(recivedMovie.title);
    expect(movie.year).toBe(recivedMovie.year);

    // Completar test
});

test('Editar pelicula', async () =>{
    const movieData = {
        title: 'El dia que me quieras',
        description: 'Carlos Argüelles is the son of a wealthy man whose only interests in life are business and making money. While trying to succeed in show business he falls in love with a dancer and they elope to marry. But success is not easy to obtain.',
        year: 1935,
        runtime: 82,
        country: 'United States',
        language: 'Spanish',
        genres: ['Drama'],
        directors: ['John Reinhardt'],
        writers: ['Alfredo Le Pera']
    };
    const movieDataUpdate = {
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
    //Insertamos pelicula
    const movieCreated = await MovieModels.create(movieData);    
    //Modifico con la otra pelicula
    const updatedMovie = await MovieModels.update(movieCreated.id,movieDataUpdate);
    //Voy a ver como quedo guardada
    const recivedMovie = await MovieModels.get(updatedMovie.id);   
    //Comparo lo que subi al update, con lo que modifico
    expect(recivedMovie.title).toBe(movieDataUpdate.title);
    expect(recivedMovie.year).toBe(movieDataUpdate.year);       
});
