import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Import CSS specific to this component

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e528d680f17709d9ce247878697c05ed`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching the movies:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e528d680f17709d9ce247878697c05ed&query=${searchTerm}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div className="movie-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-item-link">
              <div className="movie-item">
                <h3>{movie.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            </Link>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
