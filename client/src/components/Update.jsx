import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import StarRating from './StarRating'
import { Link } from 'react-router-dom'

const Update = () => {
    const { id } = useParams()
    const navigate = useNavigate() 
    const [movie, setMovie] = useState({
        title: '',
        genre: '',
        rating: 0,
        review: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        genre: '',
        rating: 0,
        review: ''
    });

useEffect(() => {
        axios.get(`http://localhost:8000/api/movie/${id}`)
            .then(res => {
                setMovie(res.data.movie)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: '' })
    }

    const handleRatingChange = (newRating) => {
        setMovie({ ...movie, rating: newRating })
        setErrors({ ...errors, rating: '' })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/movie/${id}`, movie)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.errors) {
                    const errorMessages = err.response.data.errors;
                    setErrors(errorMessages);
                } else {
                    console.log(err);
                }
            })
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
                    <input type='text' className={`form-control ${errors.title ? 'is-invalid' : ''}`} name="title" value={movie.title} onChange={handleChange} />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <select name="genre" className={`form-control ${errors.genre ? 'is-invalid' : ''}`} value={movie.genre} onChange={handleChange} >
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
                    <label htmlFor='rating'>Rating:</label>
                    <StarRating rating={movie.rating} onChange={handleRatingChange} />
                    {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor='review'>Review:</label>
                    <input type='text' className={`form-control ${errors.review ? 'is-invalid' : ''}`} name="review" value={movie.review} onChange={handleChange} />
                    {errors.review && <div className="invalid-feedback">{errors.review}</div>}
                </div>
                <button type="submit" className="btn btn-outline-success">Submit</button>
            </form>
        </div>
    );
}

export default Update;
