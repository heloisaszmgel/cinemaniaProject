const Movie = require('../models/movie.model');

module.exports = {
    getAllMovies: (req, res) => {
        Movie.find({})
            .then((movies) => {
                res.json(movies)
            })
            .catch(err => {
                res.json({message: 'Something went wrong in find all controllers', error: err})
            })
},

    createMovie: (req, res) => {
        Movie.create(req.body)
            .then(newlyCreatedMovie => {
                res.json({ movie: newlyCreatedMovie })
                })
            .catch((err) => {
                if (err.name === 'ValidationError') {
                    const errors = {};
                    for (let field in err.errors) {
                        errors[field] = err.errors[field].message;
                    }
                    if (!errors['rating']) {
                        errors['rating'] = 'Rating is required and must be at least 1 star';
                    }
                    res.status(400).json({ message: 'Validation error', errors });
                } else {
                    res.status(500).json({ message: 'Something went wrong in create controllers', error: err });
                }
            })
},

    getOneMovie: (req, res) => {
        Movie.findOne({ _id: req.params.id })
        .then(oneSingleMovie => {
            res.json({ movie: oneSingleMovie })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong in find one controllers', error: err })
        })
},

    deleteMovie: (req, res) => {
        Movie.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong in delete controller', error: err })
        })
},

    updateMovie: (req, res) => {
        Movie.findOneAndUpdate(
            { _id: req.params.id }, req.body,
            { new: true, runValidators: true }
        )
        .then(updatedMovie => {
            res.json({ movie: updatedMovie })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                const errors = {};
                for (let field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                if (!errors['rating']) {
                    errors['rating'] = 'Rating is required and must be at least 1 star';
                }
                res.status(400).json({ message: 'Validation error', errors });
            } else {
                res.status(500).json({ message: 'Something went wrong in update controllers', error: err });
            }
        })
},

}