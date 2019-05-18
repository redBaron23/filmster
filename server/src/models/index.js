const MovieModel = require('./movie.js');

async function createTables() {
    return MovieModel.Movie.sync();
}

async function dropTables() {
    MovieModel.Movie.destroy({
        where: {}
    });
}

module.exports = {
    createTables,
    dropTables
}
