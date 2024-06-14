import { create } from 'zustand';
import MovieType from '../models/MovieType';

type MovieStore = {
    movies : MovieType[]
    setMovies: (movies: MovieType[]) => void;
    addMovie: (movie : MovieType) => void;
    toggleFavorite : (imdbid : string) => void
    deleteMovie : (imdbid : string) => void;
}

const useMovieStore = create<MovieStore>((set) =>({
    movies: [],
    setMovies: (movies) => set ({ movies }),
    addMovie: (movie) => set((state) => ({ movies : [...state.movies, movie]})),
    toggleFavorite : (imdbid) => set((state ) => ({
        movies: state.movies.map((movie) =>
            movie.imdbid === imdbid ? { ...movie, is_favorite: !movie.is_favorite } : movie
        )
    })),
    deleteMovie: (imdbid) => set((state) => ({
        movies: state.movies.filter((movie) => movie.imdbid !== imdbid),
      })),
}));

export default useMovieStore;