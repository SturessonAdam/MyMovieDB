import useMovieStore from "../store/useMovieStore";
import Movie from "./Movie";

type MovieListProps = {
    toggleFavoriteMovie : (imdbid : string) => void;
    deleteMovie : (imdbid : string) => void;
}

function MovieList({ toggleFavoriteMovie, deleteMovie }: MovieListProps) {
    const { movies } = useMovieStore();

    return (
        <div>
            {movies.map((movie) => (
            <Movie key={movie.imdbid}
                   movie={movie} 
                   toggleFavoriteMovie={toggleFavoriteMovie}
                   deleteMovie={deleteMovie} />
         ))}
        </div>
    )
}

export default MovieList;