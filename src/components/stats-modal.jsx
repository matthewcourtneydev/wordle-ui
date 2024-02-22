import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user-context";
import robotImg from "../imgs/robot.png";
import graphImg from "../imgs/graph.png";
import img from "../imgs/x.png";
import { UilShareAlt } from "@iconscout/react-unicons";

const StatsModal = ({ isClosed, closeModal, defaultUserObj }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('mdc_wordle_user')) || defaultUserObj)
  const [loggedIn, setLoggedIn] = useState(user.authInfo.isAuthenticated);

  let gamesCount = [0, 0, 0, 0, 0, 0];

  user.games.forEach((game) => {
    gamesCount[game.totalGuesses - 1] += 1;
  });

  // TODO UPDATE PERCENTAGE LOGIC
  const gamesWon = user.games.map((game) => {
    return game.won === true;
  });

  const gamesPlayed = user.games.length;
  const winPercentage = 1;
  //   (user.games / user.games.length);


  const currentStreak = user.currentStreak;
  const maxStreak = user.maxStreak;
  return (
    <div className={isClosed ? "modal-layer closed" : "modal-layer"}>
      <div className="close-modal" onClick={() => closeModal()}>
        <p>
          Back to puzzle <img src={img} alt="" />
        </p>
      </div>
      <div className="statistics section-container">
        <h1>STATISTICS</h1>
        <ul className="stats">
          <li className="stat">
            <span className="stat-large">
              <strong>{gamesPlayed}</strong>
            </span>
            <span>Played</span>
          </li>
          <li className="stat">
            <span className="stat-large">
              <strong>{winPercentage * 100}</strong>
            </span>
            <span>Win %</span>
          </li>
          <li className="stat">
            <span className="stat-large">
              <strong>{currentStreak}</strong>
            </span>
            <span>Current streak</span>
          </li>
          <li className="stat">
            <span className="stat-large">
              <strong>{maxStreak}</strong>
            </span>
            <span>Max streak</span>
          </li>
        </ul>
      </div>
      <div className="guess-distribution section-container">
        <h1>GUESS DISTRIBUTION</h1>
        <div className="bar-container">
          {gamesCount.map((guessNum, i) => {
            return guessNum > 0 ? (
              <div className="dist-row">
                <span>
                  <strong>{i + 1}</strong>
                </span>
                <div
                  className="bar"
                  style={{ width: `${(guessNum / gamesPlayed) * 100}%` }}
                >
                  <span>{guessNum}</span>
                </div>
              </div>
            ) : (
              <div className="dist-row">
                <span>
                  <strong>{i + 1}</strong>
                </span>
                <div className="grey-bar">
                  <span>{guessNum}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="wordle-bot-container section-container">
        <img src={robotImg} alt="robot image" />
        <div className="text">
          <p>
            <strong>Wordlebot give an analysis of your guesses.</strong>
          </p>
          <a href="#">Did you beat the bot? &#62;</a>
        </div>
      </div>
      {loggedIn ? (
        <></>
      ) : (
        <>
          <hr />
          <div className="section-container login-stat-container">
            <img src={graphImg} alt="graph image" />
            <div className="text">
              <a href="/login">
                Login or create a free account to link your stats.
              </a>
            </div>
          </div>
        </>
      )}
      <button className="share">
        <span>Share</span> <UilShareAlt />
      </button>
    </div>
  );
};

export default StatsModal;