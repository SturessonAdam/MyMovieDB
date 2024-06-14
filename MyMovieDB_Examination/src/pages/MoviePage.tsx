import { useParams } from 'react-router-dom';
import useMovieStore from '../store/useMovieStore';
import Logo from "../assets/logo.png"
import '../styles/moviePage.css'
import TrailerModal from '../components/TrailerModal';

type MoviePageProps = {
    toggleFavoriteMovie : (imdbid : string) => void;
}

function MoviePage({ toggleFavoriteMovie } : MoviePageProps)  {
    const { id } = useParams<{ id: string }>();
    const movie = useMovieStore((state) =>
      state.movies.find((movie) => movie.imdbid === id));

    const trailerURL =  movie?.trailer_link || "";

    if (!movie) {
        return <h1>Finns ingen film med detta id</h1>;
      }

    return (
        <div className='detailed-movie-wrapper'>
          <img src={Logo} className="logo" />
          <div className='detailed-movie'>
            <h1>{movie.title}</h1>
            <div className='favorite-button-container'>
              <button className="favorite-button"
                onClick={() => { if (movie.imdbid) toggleFavoriteMovie(movie.imdbid)}}>
                <i className={movie.is_favorite ? 'fas fa-star' : 'far fa-star'}></i>
              </button>
            </div>
            <div className='movie-poster-trailer-wrapper'>
                <img src={movie.poster} className='movie-poster'/>
                <TrailerModal show={true} onClose={() => { }} trailerURL={trailerURL} />
            </div>
          </div>
      </div>
    )
}

export default MoviePage;