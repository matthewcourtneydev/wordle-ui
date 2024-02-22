import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/user-context";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Game from "./pages/game";
import Login from "./pages/login";

function App() {
  let defaultUserObj = {
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    gameIndex: 0,
    authInfo: {
      authToken: "",
      isAuthenticated: false,
    },
    contactInfo: {
      email: "",
      username: "",
      password: "",
    },
    preferences: {
      darkMode: true,
      hardMode: false,
      contrastMode: false,
    },
    games: [],
    maxStreak: 0,
    currentStreak: 0,
  };

  function logout() {
    localStorage.removeItem("mdc_wordle_user");
  }

  let localStorageUser = JSON.parse(localStorage.getItem("mdc_wordle_user"));
  const userData = localStorageUser ? localStorageUser : defaultUserObj;

  const [userState, setUserState] = useState(userData);
  const [loggedIn, setLoggedIn] = useState(userState.authInfo.isAuthenticated);

  function toggleLogin() {
    setLoggedIn((prevLoggedIn) => {
      return !prevLoggedIn;
    });
  }

  useEffect(() => {
    console.log("Is logged in: ", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    console.log("user updated ", userState);
  }, [userState]);

  console.log(userData)
  return (
    
      <UserContext.Provider value={userState}>
        <div className={userState.preferences.darkMode ? "darkmodeapp App" : "lightmodeapp App"}>
        <Routes>
          <Route
            exact
            path="game"
            element={
              <Game
                defaultUserObj={defaultUserObj}
                loggedIn={loggedIn}
                toggleLogin={toggleLogin}
              />
            }
          />
          <Route
            exact
            path="login"
            element={
              <Login
                loggedIn={loggedIn}
                toggleLogin={toggleLogin}
                defaultUserObj={defaultUserObj}
              />
            }
          />
          <Route
            exact
            path="/"
            element={
              <Home
                defaultUserObj={defaultUserObj}
                loggedIn={loggedIn}
                toggleLogin={toggleLogin}
              />
            }
          />
        </Routes>
        </div>
      </UserContext.Provider>
    
  );
}

export default App;
