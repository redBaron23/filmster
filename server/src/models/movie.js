const Sequelize = require('sequelize')

const db = require('../db.js')

const Movie = db.define('Movie', {
	// attributes
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	runtime: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false
	},
	language: {
		type: Sequelize.STRING,
		allowNull: false
	},
	genres: {
		type: Sequelize.JSON
	},
	directors: {
		type: Sequelize.JSON
	},
	writers: {
		type: Sequelize.JSON
	}
}, {
  tableName: 'Movie'
})

const getAllMovies = () => Movie.findAll()

const createMovie = (data) =>
	Movie.sync().then(() =>
		Movie.create(data)
	)

const getMovie = (id) => Movie.findOne({where: {id: id}}).then(movie => movie)

const updateMovie = (id, data) => {
	return Movie.findOne({where: {id: id}}).then(movie => {
		if (movie != null) {
			return movie.update(data).then(d => d)
		}
		return null
	})	
}

const deleteMovie = (id) => {
	return Movie.findOne({where: {id: id}}).then(movie => {
		if (movie != null) {
			return movie.destroy()
		}
		return null
	})	
}

const MovieModel = {
	Movie: Movie,
	getAll: getAllMovies,
	create: createMovie,
	get: getMovie,
	update: updateMovie,
	delete: deleteMovie
}

module.exports = MovieModel