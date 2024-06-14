import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"
import "../styles/loginPage.css"
import axios from 'axios';

type LoginPageProps = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSignup = () => {
    if (username && password) {
      axios.post('http://localhost:8080/api/auth/register', {
        username,
        password
      })
      .then(() => {
        alert("Användare skapad, nu kan du logga in!");
        setIsSignup(false);
        setUsername('');
        setPassword('');
      })
      .catch(error => console.log(error));
    }
  }

  const handleLogin = () => {
    axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      })
      .then(response => {
        console.log('Login successful:', response.data)
        sessionStorage.setItem('loggedInUser', username);
        setIsLoggedIn(true);
        navigate('/home');
      })
      .catch(error => {
        console.log('Login error:', error);
        if (error.response && error.response.status === 401) {
          alert("Fel användarnamn eller lösenord, försök igen");
        } else {
          alert("Inloggning misslyckades, försök igen senare");
        }
      });
  };



  return (
    <section className='login-page-wrapper'>
      <img src={Logo} className='logo' />
      <div className='login-register-wrapper'>
        <h1>{isSignup ? "Skapa en användare" : "Logga in"}</h1>
        <div className='login'>
          <input
            type="text"
            placeholder="Ange användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Ange lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={isSignup ? handleSignup : handleLogin}>
            {isSignup ? 'Skapa användare' : 'Logga in'}
          </button>
        </div>
        <p className='register'>
          {isSignup ? "Gå tillbaka till login" : "Skapa en användare innan du loggar in"}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Logga in' : 'Skapa användare'}
          </button>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;