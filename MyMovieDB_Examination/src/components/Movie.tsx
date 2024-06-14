import { Link } from "react-router-dom";
import MovieType from "../models/MovieType";
import '../styles/movie.css'

type MovieProps = {
    movie : MovieType;
    toggleFavoriteMovie : (imdbid : string) => void;
    deleteMovie : (imdbid : string) => void;
}

function Movie({ movie, toggleFavoriteMovie, deleteMovie } : MovieProps) {
    return (
        <div className="movie-wrapper">
            <img src={movie.poster} className="movie-poster"/>
            <div className="movie-details">
                <Link to={`/movie/${movie.imdbid}`} className="movie-title-link">
                    <p>{movie.title}</p>
                </Link>
            </div>
            <div className="movie-actions">
                <button className="favorite-button"
                    onClick={() => { if (movie.imdbid) toggleFavoriteMovie(movie.imdbid) }}>
                    <i className={movie.is_favorite ? 'fas fa-star' : 'far fa-star'}></i>
                </button>
                <button className="delete-button"
                    onClick={() => { if (movie.imdbid) deleteMovie(movie.imdbid) }}>
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )
}

export default Movie;