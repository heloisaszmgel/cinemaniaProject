import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const DisplayOne = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState({});

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

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/movie/${id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        navigate("/");
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Title: {movie.title}</h2>
                    <p>Genre: {movie.genre}</p>
                    <p>Rating: <StarRating rating={movie.rating} /></p>
                    <p>Review: {movie.review}</p>
                    <div className="d-flex justify-content-evenly">
                        <Link to={`/update/${movie._id}`} className="btn btn-outline-success">Edit</Link>
                        <button onClick={handleDelete} className="btn btn-outline-danger">Delete</button>
                        <Link to={`/`} className="btn btn-outline-info">Go back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayOne;
