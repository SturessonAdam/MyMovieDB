import MovieType from "../models/MovieType";
import { useState } from 'react'
import useMovieStore from "../store/useMovieStore";
import axios from "axios"
import MovieList from "../components/MovieList";
import Logo from "../assets/logo.png"
import '../styles/homePage.css'
import { useNavigate } from "react-router-dom";

type HomePageProps = {
    apiKey : string | null;
    toggleFavoriteMovie : (imdbid : string) => void;
}


function HomePage({ apiKey, toggleFavoriteMovie } : HomePageProps) {
    const { addMovie, deleteMovie } = useMovieStore();

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [trailerLink, setTrailerLink] = useState('');


    const createMovie = () => {
        if (apiKey) {
            const newMovie: MovieType = {
              title,
              trailer_link: trailerLink,
              poster,
            };
            axios.post(`http://localhost:8080/api/movies?key=${apiKey}`, newMovie)
              .then(response => {
                addMovie(response.data);
                setTitle('');
                setPoster('');
                setTrailerLink('');
              })
            .catch(error => console.log(error));
        }
    };

    const removeMovie = (imdbid: string) => {
        if (apiKey) {
          axios.delete(`http://localhost:8080/api/movies/${imdbid}?key=${apiKey}`)
            .then(() => deleteMovie(imdbid))
            .catch(error => console.log(error));
        }
      };

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://localhost:8080/api/auth/logout')
          .then(() => {
            sessionStorage.removeItem('loggedInUser');
            navigate('/');
          })
          .catch(error => console.log(error));
    }



    return (
        <div className="home-page-wrapper">
                <img src={Logo} className="logo" />
                <button onClick={handleLogout} className="logout-button">Logga ut</button>
            <div className="new-movie-wrapper">
                <input
                    type="text"
                    placeholder="movie title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                 />
                <input
                    type="text"
                    placeholder="poster url"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="trailer-link"
                    value={trailerLink}
                    onChange={(e) => setTrailerLink(e.target.value)}
                />
                <button onClick={createMovie}>Lägg till film</button>
            </div>
            <MovieList toggleFavoriteMovie={toggleFavoriteMovie} deleteMovie={removeMovie} />
        </div>
    )
}

export default HomePage;