import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';


const Create = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        rating: 0,
        review: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        genre: '',
        rating: '',
        review: ''
    });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const handleRatingChange = (newRating) => {
        setMovie({ ...movie, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/movie/create', movie)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.errors) {
                    const errorMessages = err.response.data.errors;
                    setErrors(errorMessages);
                } else {
                    console.log(err);
                }
            });
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Create Your Review</h2>
                <Link to={`/`} className="btn btn-outline-info btn-lg">Dashboard</Link>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" onChange={handleChange} className={`form-control ${errors.title ? 'is-invalid' : ''}`}/>
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="genre">Genre:</label>
                <select name="genre" onChange={handleChange} className={`form-select ${errors.genre ? 'is-invalid' : ''}`}>
                    <option value="">Select a genre</option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                </select> {errors.genre && <div className="invalid-feedback">{errors.genre}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="rating">Rating:</label>
                <StarRating rating={movie.rating} onChange={handleRatingChange} className={`form-control ${errors.rating ? 'is-invalid' : ''}`}/>
                {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="review">Review:</label>
                <input type="text" name="review" className={`form-control ${errors.review ? 'is-invalid' : ''}`} onChange={handleChange} />
                {errors.review && <div className="invalid-feedback">{errors.review}</div>}
            </div>
            <button type="submit" className="btn btn-outline-success">Submit</button>
            </form>
        </div>
    );
}

export default Create;
