import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e528d680f17709d9ce247878697c05ed`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e528d680f17709d9ce247878697c05ed`);
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast || []);
      } catch (error) {
        console.error('Error fetching movie details or credits:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className="movie-details-container">
      <Link to="/movie-list" className="back-link">Back to Movies List</Link>
      <div className="movie-details-content">
        <div className="movie-poster">
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-overview">{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>
      <div className="cast-section">
        <h3>Cast</h3>
        <div className="cast-list">
          {cast.length > 0 ? (
            cast.slice(0, 10).map((actor) => (
              <div key={actor.cast_id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                  }}
                />
                <p>{actor.name}</p>
                <p><em>as {actor.character}</em></p>
              </div>
            ))
          ) : (
            <p>No cast information available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
