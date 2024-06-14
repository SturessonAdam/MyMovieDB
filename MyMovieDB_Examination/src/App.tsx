import { useEffect, useState } from 'react'
import axios from "axios"
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import useMovieStore from './store/useMovieStore';

function App() {

  const [apiKey, setApiKey] = useState<string | null>(null);
  const { movies, setMovies, toggleFavorite } = useMovieStore();
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('loggedInUser'));

  useEffect(() => {
    axios.get('http://localhost:8080/api/keys')
      .then(response => {
        const fetchedApiKey = response.data.data;
        setApiKey(fetchedApiKey)
      })
      .catch(error => console.log(error));
  }, []);


  useEffect(() => {
    if (apiKey) {
      axios.get(`http://localhost:8080/api/movies?key=${apiKey}`)
        .then(response => setMovies(response.data.data))
        .catch(error => console.log(error));
    }
  }, [apiKey, setMovies])

  useEffect(() => {
    console.log(movies);
  }, [movies]);


  const toggleFavoriteMovie = (imdbid: string) => {
    if (apiKey) {
      axios.put(`http://localhost:8080/api/movies/${imdbid}?key=${apiKey}`)
        .then(() => toggleFavorite(imdbid))
        .catch(error => console.log(error));
    }
  };


  console.log('logged in?', isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/home" element={isLoggedIn ? <HomePage apiKey={apiKey} toggleFavoriteMovie={toggleFavoriteMovie} /> : <Navigate to="/" />} />
      <Route path="/movie/:id" element={isLoggedIn ? <MoviePage toggleFavoriteMovie={toggleFavoriteMovie} /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App
