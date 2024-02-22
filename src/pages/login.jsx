import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user-context";
import errorImg from "../imgs/error.png";

const Login = ({ setLoggedIn, loggedIn, toggleLogin }) => {
  let user = useContext(UserContext);

  const [isEmailPresent, setIsEmailPresent] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [retrievedUser, setRetrievedUser] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  function toggleExistingUser() {
    setIsExistingUser((prevIsExistingUser) => {
      return !prevIsExistingUser;
    });
  }

  function addPotentialUserProfile(fetchedUser) {
    setRetrievedUser(fetchedUser);
  }

  function toggleEmailError() {
    setIsEmailError((prevIsEmailError) => {
      return !prevIsEmailError;
    });
  }

  function togglePasswordError() {
    setIsPasswordError((prevIsPasswordError) => {
      return !prevIsPasswordError;
    });
  }

  function toggleEmail() {
    setIsEmailPresent((prevIsEmailPresent) => {
      return !prevIsEmailPresent;
    });
  }

  function continueClick() {
    const emailValue = emailRef.current.value;
    const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (regex.test(emailValue)) {
      if (isEmailError) {
        toggleEmailError();
      }

      let response = false;
      if (emailValue === "demo@gmail.com") {
        response = {
          name: {
            firstName: "Demo",
            middleName: "",
            lastName: "User",
          },
          gameIndex: 3,
          authInfo: {
            authToken: "fsdfsdfsdfsdfs",
            isAuthenticated: true,
          },
          contactInfo: {
            email: "demo@gmail.com",
            username: "demo_user",
            password: "demo123",
          },
          preferences: {
            darkMode: true,
            hardMode: false,
            contrastMode: false,
          },
          games: [
            {
              won: true,
              totalGuesses: 2,
              guesses: [
                [
                  {
                    letter: "H",
                    isCorrect: "correct",
                  },
                  {
                    letter: "O",
                    isCorrect: "almost",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "Y",
                    isCorrect: "wrong",
                  },
                ],
                [
                  {
                    letter: "H",
                    isCorrect: "correct",
                  },
                  {
                    letter: "E",
                    isCorrect: "correct",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "O",
                    isCorrect: "correct",
                  },
                ],
              ],
              word: ["H", "E", "L", "L", "O"],
              hardMode: true,
            },
            {
              won: true,
              totalGuesses: 3,
              guesses: [
                [
                  {
                    letter: "H",
                    isCorrect: "wrong",
                  },
                  {
                    letter: "E",
                    isCorrect: "wrong",
                  },
                  {
                    letter: "L",
                    isCorrect: "almost",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "O",
                    isCorrect: "almost",
                  },
                ],
                [
                  {
                    letter: "H",
                    isCorrect: "wrong",
                  },
                  {
                    letter: "E",
                    isCorrect: "wrong",
                  },
                  {
                    letter: "L",
                    isCorrect: "almost",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "O",
                    isCorrect: "almost",
                  },
                ],
                [
                  {
                    letter: "W",
                    isCorrect: "correct",
                  },
                  {
                    letter: "O",
                    isCorrect: "correct",
                  },
                  {
                    letter: "R",
                    isCorrect: "correct",
                  },
                  {
                    letter: "L",
                    isCorrect: "correct",
                  },
                  {
                    letter: "D",
                    isCorrect: "correct",
                  },
                ],
              ],
              word: ["W", "O", "R", "L", "D"],
              hardMode: true,
            },
          ],
          maxStreak: 2,
          currentStreak: 2,
        };
      }

      if (response) {
        addPotentialUserProfile(response);
        toggleEmail();
        toggleExistingUser();
      } else {
        toggleEmail();
      }
    } else {
      toggleEmailError();
    }
  }

  function loginClick() {
    const password = passwordRef.current.value;
    if (retrievedUser.contactInfo.password !== password) {
      togglePasswordError();
    } else {
      let currentStreak =
        user.games.length && user.games[0].won
          ? retrievedUser.currentStreak + 1
          : retrievedUser.currentStreak;
      let maxStreak =
        currentStreak > retrievedUser.currentStreak ? currentStreak : 0;

      let updatedRetrievedUser = {
        ...retrievedUser,
        games: user.games.length
          ? [...retrievedUser.games, ...user.games]
          : retrievedUser.games,
        gameIndex: retrievedUser.gameIndex + user.gameIndex,
        currentStreak: currentStreak,
        maxStreak: maxStreak,
      };

      localStorage.setItem(
        "mdc_wordle_user",
        JSON.stringify(updatedRetrievedUser)
      );
      toggleLogin();
    }
  }

  function registerClick() {
    user = {
      ...user,
      contactInfo: {
        ...user.contactInfo,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
    };
    toggleLogin(true);
    localStorage.setItem("mdc_wordle_user", JSON.stringify(user));
  }

  function continueRedirect() {
    navigate("/game");
  }

  return !loggedIn ? (
    <div className="page login-page">
      <div className="page-content login-page-content">
        <h1 className="header">MDC Wordle</h1>
        <hr />
        <h2 className="login-header-sub-content">
          Log in or create an account
        </h2>
        <div className="input-fields">
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email-error-field"
              ref={emailRef}
              type="email"
              className={isEmailError ? "input-error" : ""}
            />
            <span
              id="email-error"
              className={isEmailError ? "email-error" : "email-error hidden"}
            >
              <img src={errorImg} alt="error icon" /> Please enter a valid email
              address.
            </span>
          </div>
          {isEmailPresent ? (
            <>
              {isExistingUser ? (
                <>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} className={isPasswordError ? "input-error" : ""}/>

                    <a href="#">Forgot your password?</a>
                    <span
                      id="password-error"
                      className={
                        isPasswordError
                          ? "password-error"
                          : "password-error hidden"
                      }
                    >
                      <img src={errorImg} alt="error icon" /> The email address or password you entered is incorrect. Please try again.
                    </span>
                  </div>
                  <button className="login-button" onClick={loginClick}>
                    Log In
                  </button>
                  <button className="login-button-alt">
                    Log in without password
                  </button>
                </>
              ) : (
                <>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} />
                  </div>
                  <button className="login-button" onClick={registerClick}>
                    Register
                  </button>
                </>
              )}
            </>
          ) : (
            <button className="login-button" onClick={continueClick}>
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="page login-page">
      <div className="page-content login-page-content">
        <h1 className="header">MDC Wordle</h1>
        <hr />
        <h2 className="login-header-sub-content">You're all set!</h2>
        <div className="input-fields">
          <div className="input-field"></div>
          <button className="login-button" onClick={continueRedirect}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;