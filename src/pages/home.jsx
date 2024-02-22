import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { useNavigate } from 'react-router-dom';
import img from "../imgs/logo.webp";

const Home = ({ defaultUserObj, toggleLogin, loggedIn }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('mdc_wordle_user')) || defaultUserObj)
  const navigate = useNavigate();

  function navigateToGame() {
    navigate('/game')
  }

  function navigateToLogin() {
    navigate('/login')
  }

  return (
    <div className="home-page page">
      <div className="page-content">
        <img src={img} alt="" />
        <h1>Wordle</h1>
        <h2>Get 6 chances to guess a 5-letter word.</h2>
        {loggedIn ? (
          <div className="button-container">
            <button onClick={navigateToGame} id="play">
              Play
            </button>
          </div>
        ) : (
          <div className="button-container">
            <button onClick={navigateToGame} id="play">
              Play
            </button>
            <button onClick={navigateToLogin}>Log in</button>
            <button onClick={navigateToGame}>How to play</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;