const moviesController = require('../controllers/movie.controller');

module.exports = (app) => {
    app.get('/api/movies', moviesController.getAllMovies);
    app.post('/api/movie/create', moviesController.createMovie);
    app.get('/api/movie/:id', moviesController.getOneMovie);
    app.delete('/api/movie/:id', moviesController.deleteMovie);
    app.patch('/api/movie/:id', moviesController.updateMovie);
}