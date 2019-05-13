const MovieModel = require('./models/movie.js')

const initMovies = () => {
    MovieModel.Movie.sync({ force: true })
        .then(() =>
            MovieModel.Movie.create({
                title: 'Back to the Future',
                description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
                year: 1985,
                runtime: 116,
                country: 'United States',
                language: 'English',
                genres: ['Adventure', 'Comedy', 'Science Fiction'],
                directors: ['Robert Zemeckis'],
                writers: ['Robert Zemeckis', 'Bob Gale']
            })
        )
        .then(() =>
            MovieModel.Movie.create({
                title: 'Back to the Future Part II',
                description: 'After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.',
                year: 1989,
                runtime: 108,
                country: 'United States',
                language: 'English',
                genres: ['Adventure', 'Comedy', 'Science Fiction'],
                directors: ['Robert Zemeckis'],
                writers: ['Robert Zemeckis', 'Bob Gale']
            })
        )
}

initMovies()
