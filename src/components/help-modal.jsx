import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user-context";
import Example from "./example";
import graphImg from "../imgs/graph.png";
import img from "../imgs/x.png";

const HelpModal = ({ isClosed, closeModal, isHighContrastMode }) => {
  const user = useContext(UserContext)
  const [loggedIn, setLoggedIn] = useState(user.authInfo.isAuthenticated);
  return (
    <div className={isClosed ? "help-modal-layer closed" : "help-modal-layer"}>
      <div className="modal-content">
        <div onClick={() => closeModal()} className="close">
          <img src={img} alt="" />
        </div>
        <div className="help-section-content">
          <h1 className="title">How To Play</h1>
          <h2>Guess the Wordle in 6 tries.</h2>
          <ul>
            <li>Each guess must be a valid 5 letter word.</li>
            <li>
              The color of the tiles will change to show you how close your
              guess was to the word.
            </li>
          </ul>
          <p>Examples</p>
          <div className="example-content">
            <Example
              word={["W", "E", "A", "R", "Y"]}
              index={0}
              color={isHighContrastMode ? "correct-contrast" : "correct"}
            />
            <p>
              <strong>W</strong> is in the word and in the correct spot.
            </p>
          </div>
          <div className="example-content">
            <Example
              word={["P", "I", "L", "L", "S"]}
              index={1}
              color={isHighContrastMode ? "almost-contrast" : "almost"}
            />
            <p>
              <strong>I</strong> is in the word but in the wrong spot.
            </p>
          </div>
          <div className="example-content">
            <Example word={["V", "A", "G", "U", "E"]} index={3} color="wrong" />
            <p>
              <strong>U</strong> is not in the word in any spot.
            </p>
          </div>

          <hr />
          {loggedIn ? (
            <></>
          ) : (
            <>
              <div className="login-content">
                <img src={graphImg} alt="graph image" />
                <p>
                  <a href="/login">Log in or create a free account</a> to link
                  your stats.
                </p>
              </div>
              <hr />
            </>
          )}
          <div className="bottom-text">
            <p>
              You dont have to wait a full 24 hours to get a new puzzle here but
              to save your games and not lose any hot streaks{" "}
              <a href="/login">Sign up</a> here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;