import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user-context";
import img from "../imgs/logo.webp";

const Home = ({ defaultUserObj, toggleLogin, loggedIn }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('mdc_wordle_user')) || defaultUserObj)

  return (
    <div className="home-page page">
      <div className="page-content">
        <img src={img} alt="" />
        <h1>Wordle</h1>
        <h2>Get 6 chances to guess a 5-letter word.</h2>
        {loggedIn ? (
          <div className="button-container">
            <a href={"/game"} id="play">
              Play
            </a>
          </div>
        ) : (
          <div className="button-container">
            <a href={"/game"} id="play">
              Play
            </a>
            <a href={"/login"}>Log in</a>
            <a href={"/game"}>How to play</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;