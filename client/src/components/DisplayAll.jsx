import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DisplayAll = () => {
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies')
            .then(res => {
                console.log(res);
                setAllMovies(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h1>Cinemania</h1>
                <Link to={`/create`} className="btn btn-outline-info btn-lg">Add a new review!</Link>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <p>Your hub for movie reviews and recommendations. Join a vibrant community of film enthusiasts to share your thoughts on the latest releases and timeless classics. Discover your next movie night pick and connect with fellow cinephiles</p>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie title</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {allMovies.map((movie) => (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>
                                <Link to={`/oneMovie/${movie._id}`} className="btn btn-outline-success">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayAll;
