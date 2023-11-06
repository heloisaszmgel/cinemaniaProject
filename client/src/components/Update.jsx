import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        rating: 0,
        review: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/movie/${id}`)
            .then(res => {
                console.log(res);
                setMovie(res.data.movie);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const handleRatingChange = (newRating) => {
        setMovie({ ...movie, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/movie/${id}`, movie)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Edit Review</h2>
                <Link to={`/`} className="btn btn-outline-info">Dashboard</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='title'>Title:</label>
                    <input type='text' className="form-control" name="title" value={movie.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='genre'>Genre:</label>
                    <input type='text' className="form-control" name="genre" value={movie.genre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='rating'>Rating:</label>
                    <StarRating rating={movie.rating} onChange={handleRatingChange} />
                </div>
                <div className="form-group">
                    <label htmlFor='review'>Review:</label>
                    <input type='text' className="form-control" name="review" value={movie.review} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-outline-success">Submit</button>
            </form>
        </div>
    );
}

export default Update;
