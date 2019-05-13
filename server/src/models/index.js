const MovieModel = require('./movie.js');

async function createTables() {
    return MovieModel.Movie.sync();
}

module.exports = {
    createTables
}
