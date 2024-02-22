import React, { useState, useEffect, useContext } from "react";
import { BsBackspace } from "react-icons/bs";
import { UserContext } from "../contexts/user-context";
import GuessRow from "../components/guess-row";
import StatsModal from "../components/stats-modal";
import SettingsModal from "../components/settings-modal";
import HelpModal from "../components/help-modal";
import Nav from "../components/nav";
import AsideNav from "../components/aside-nav";
import "../animate.css";

const Game = ({ defaultUserObj, toggleLogin }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("mdc_wordle_user")) || defaultUserObj
  );
  const [loggedIn, setLoggedIn] = useState(user.authInfo.isAuthenticated);

  const existingUser = user.gameIndex > 0 ? true : false;
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
  ];

  const testUser = {
    name: {
      firstName: "Matthew",
      middleName: "",
      lastName: "",
    },
    gameIndex: 1,
    authInfo: {
      authToken: "fsdfsdfsdfsdfs",
      isAuthenticated: true,
    },
    contactInfo: {
      email: "testUser1@gmail.com",
      username: "testUser1",
      password: "123",
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
        totalGuesses: 2,
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
  };

  const testWordsList = [
    ["H", "E", "L", "L", "O"],
    ["W", "O", "R", "L", "D"],
    ["D", "O", "G", "G", "O"],
    ["R", "E", "L", "A", "X"],
    ["D", "R", "A", "I", "N"],
    ["T", "H", "U", "M", "P"]
  ];

  const guessRowsArr = [
    "guess-1",
    "guess-2",
    "guess-3",
    "guess-4",
    "guess-5",
    "guess-6",
  ];

  let basicGameData = {
    won: null,
    totalGuesses: null,
    guesses: [],
    word: null,
    hardMode: null,
  };

  let guessesTotals = [];

  const [currentWord, setCurrentWord] = useState(testWordsList[user.gameIndex]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(1);
  const [modalHidden, setModalHidden] = useState(!loggedIn);
  const [isSettingsClosed, setIsSettingsClosed] = useState(true);
  const [isHelpClosed, setIsHelpClosed] = useState(existingUser);
  const [isAsideClosed, setIsAsideClosed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(user.preferences.darkMode);
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    user.preferences.contrastMode
  );
  const [isHardMode, setIsHardMode] = useState(user.preferences.hardMode);
  const [gameGuessHistoryInfo, setGameGuessHistoryInfo] = useState([]);
  const [hardErrInfo, setIsHardErrorInfo] = useState(false);

  function displayHardError(error) {
    document
      .getElementById(`row-guess-${currentAttempt}`)
      .classList.add("error-shake");
    document.getElementById("error-hard-row-guess-1").classList.remove("hide");
    setTimeout(function () {
      document
        .getElementById(`row-guess-${currentAttempt}`)
        .classList.remove("error-shake");
      document.getElementById("error-hard-row-guess-1").classList.add("hide");
      setIsHardInfo();
    }, 2000);
  }

  function setIsHardInfo(info) {
    if (hardErrInfo) {
      setIsHardErrorInfo(false);
    } else {
      setIsHardErrorInfo((prev) => {
        return info;
      });
    }
  }

  function addGuessDataToArray(guessData) {
    setGameGuessHistoryInfo((prevGuessHistory) => {
      return [...prevGuessHistory, guessData];
    });
  }

  function closeModal() {
    setModalHidden((prevSetModalHidden) => {
      return !prevSetModalHidden;
    });
  }

  function toggleDarkMode() {
    setIsDarkMode((prevIsDarkMode) => {
      return !prevIsDarkMode;
    });
  }

  function toggleAside() {
    setIsAsideClosed((prevIsAsideClosed) => {
      return !prevIsAsideClosed;
    });
  }

  function toggleHardMode() {
    setIsHardMode((prevIsHardMode) => {
      return !prevIsHardMode;
    });
  }

  function toggleContrast() {
    setIsHighContrastMode((prevIsHighContrastMode) => {
      return !prevIsHighContrastMode;
    });
  }

  function toggleSettings() {
    setIsSettingsClosed((prevIsSettingsClosed) => {
      return !prevIsSettingsClosed;
    });
  }

  function toggleHelp() {
    setIsHelpClosed((prevIsHelpClosed) => {
      return !prevIsHelpClosed;
    });
  }

  function increaseIndex() {
    setCurrentGuessIndex((prevCurrentGuessIndex) => {
      return prevCurrentGuessIndex + 1;
    });
  }

  function increaseAttempt() {
    setCurrentAttempt((prevCurrentAttempt) => {
      return prevCurrentAttempt + 1;
    });
  }

  function decreaseIndex() {
    setCurrentGuessIndex((prevCurrentGuessIndex) => {
      return prevCurrentGuessIndex - 1;
    });
  }

  function continueGameLogic() {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    const guessData = [];
    let correctCount = 0;

    guessArr.slice(0, 5).forEach((guess, i) => {
      if (guess.innerHTML === currentWord[i]) {
        correctCount++;
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "correct",
        };
        guessData.push(guessIndexData);
        setTimeout(function () {
          guess.classList.add(
            isHighContrastMode ? "correct-flip-contrast" : "correct-flip"
          );
          if (document.getElementById(`letter-${guess.innerHTML}`)) {
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add(
                isHighContrastMode ? "correct-contrast" : "correct"
              );
          }
        }, 500 * (i + 1));
      } else if (currentWord.includes(guess.innerHTML)) {
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "almost",
        };
        guessData.push(guessIndexData);
        setTimeout(function () {
          guess.classList.add(
            isHighContrastMode ? "almost-flip-contrast" : "almost-flip"
          );
          if (
            !document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.contains("correct")
          ) {
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add(isHighContrastMode ? "almost-contrast" : "almost");
          }
        }, 500 * (i + 1));
      } else {
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "wrong",
        };
        guessData.push(guessIndexData);
        setTimeout(function () {
          guess.classList.add("wrong-flip");
          if (
            !document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.contains("correct") ||
            !document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.includes("almost")
          ) {
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add(isHighContrastMode ? "wrong-contrast" : "wrong");
          }
        }, 500 * (i + 1));
      }
    });

    if (correctCount === 5) {
      basicGameData.won = true;
      basicGameData.totalGuesses = currentAttempt;
      basicGameData.word = currentWord;
      basicGameData.hardMode = isHardMode;
      basicGameData.guesses = [...gameGuessHistoryInfo, guessData];

      setTimeout(() => {
        user.games = [...user.games, basicGameData];
        user.gameIndex++;
        if (user.gameIndex < 1) {
          user.currentStreak = 1;
          user.maxStreak = 1;
        } else {
          user.currentStreak++;
          if (user.currentStreak > user.maxStreak) {
            user.maxStreak++;
          }
        }
        localStorage.setItem("mdc_wordle_user", JSON.stringify(user));
        window.location.reload();
      }, 3500);
      // TO DO PATCH USER OR REDIRECT TO LOGIN
    } else if (currentAttempt === 6) {
      console.log(guessesTotals, guessData);
      addGuessDataToArray(guessData);
      basicGameData.won = false;
      basicGameData.totalGuesses = currentAttempt;
      basicGameData.word = currentWord;
      basicGameData.guesses = gameGuessHistoryInfo;

      // TO DO PATCH USER OR REDIRECT TO LOGIN
    } else {
      addGuessDataToArray(guessData);
      increaseAttempt();
      setCurrentGuessIndex(0);
      return;
    }
  }

  function handleEnter() {
    if (currentGuessIndex < 5) {
      document
        .getElementById(`row-guess-${currentAttempt}`)
        .classList.add("error-shake");
      document.getElementById("error-row-guess-1").classList.remove("hide");
      setTimeout(function () {
        document
          .getElementById(`row-guess-${currentAttempt}`)
          .classList.remove("error-shake");
        document.getElementById("error-row-guess-1").classList.add("hide");
      }, 2000);
    } else {
      if (currentAttempt > 1 && isHardMode) {
        let prevGuessArray = [];
        let currentGuessArr = [];

        const guessArr = [
          ...document.getElementById(`row-guess-${currentAttempt - 1}`)
            .children,
        ];
        for (let i = 0; i < 5; i++) {
          const element = guessArr[i];
          prevGuessArray.push({
            letter: element.innerHTML,
            isCorrect: element.innerHTML === currentWord[i],
          });
        }

        const newGuessArr = [
          ...document.getElementById(`row-guess-${currentAttempt}`).children,
        ];

        newGuessArr.slice(0, 5).forEach((guess) => {
          currentGuessArr.push(guess.innerHTML);
        });

        let error = false;

        for (let i = 0; i < prevGuessArray.length; i++) {
          const prevGuess = prevGuessArray[i];
          if (prevGuess.isCorrect === true) {
            if (prevGuess.letter !== currentGuessArr[i]) {
              error = {
                letter: prevGuess.letter,
                index: i,
              };

              break;
            }
          }
        }

        if (error) {
          setIsHardInfo(error);
          displayHardError(error);
        } else {
          continueGameLogic();
        }
      } else {
        continueGameLogic();
      }
    }
  }

  useEffect(() => {
    if (isHighContrastMode) {
      const correct = document.querySelectorAll(".correct-flip");
      const correctBtns = document.querySelectorAll(".correct");
      const almost = document.querySelectorAll(".almost-flip");
      const almostBtns = document.querySelectorAll(".almost");
      correct.forEach((el) => {
        el.classList.remove("correct-flip");
        el.classList.add("correct-flip-contrast");
      });
      almost.forEach((el) => {
        el.classList.remove("almost-flip");
        el.classList.add("almost-flip-contrast");
      });
      correctBtns.forEach((el) => {
        el.classList.remove("correct");
        el.classList.add("correct-contrast");
      });
      almostBtns.forEach((el) => {
        el.classList.remove("almost");
        el.classList.add("almost-contrast");
      });
    } else {
      const correct = document.querySelectorAll(".correct-flip-contrast");
      const correctBtns = document.querySelectorAll(".correct-contrast");
      const almost = document.querySelectorAll(".almost-flip-contrast");
      const almostBtns = document.querySelectorAll(".almost-contrast");
      correct.forEach((el) => {
        el.classList.remove("correct-flip-contrast");
        el.classList.add("correct-flip");
      });
      almost.forEach((el) => {
        el.classList.remove("almost-flip-contrast");
        el.classList.add("almost-flip");
      });
      correctBtns.forEach((el) => {
        el.classList.remove("correct-contrast");
        el.classList.add("correct");
      });
      almostBtns.forEach((el) => {
        el.classList.remove("almost-contrast");
        el.classList.add("almost");
      });
    }
  }, [isHighContrastMode]);

  function updateWord(e) {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    if (e.target.id === "backspace") {
      if (currentGuessIndex > 0) {
        guessArr[currentGuessIndex - 1].innerHTML = "";
        guessArr[currentGuessIndex - 1].classList.remove("value-present");
        decreaseIndex();
        setIsHardErrorInfo(false);
      }
    } else if (e.target.id === "letter-Enter") {
      handleEnter();
    } else {
      if (currentGuessIndex <= 4) {
        guessArr[currentGuessIndex].innerHTML = e.target.value;
        guessArr[currentGuessIndex].classList.add("value-present");
        increaseIndex();
      }
    }
  }

  useEffect(() => {
    let newData = {
      ...user,
      preferences: {
        ...user.preferences,
        hardMode: isHardMode,
      },
    };

    localStorage.setItem("mdc_wordle_user", JSON.stringify(newData));
  }, [isHardMode]);

  useEffect(() => {
    let newData = {
      ...user,
      preferences: {
        ...user.preferences,
        darkMode: isDarkMode,
      },
    };

    localStorage.setItem("mdc_wordle_user", JSON.stringify(newData));
  }, [isDarkMode]);

  useEffect(() => {
    let newData = {
      ...user,
      preferences: {
        ...user.preferences,
        contrastMode: isHighContrastMode,
      },
    };

    localStorage.setItem("mdc_wordle_user", JSON.stringify(newData));
  }, [isHighContrastMode]);

  return (
    <div className={isDarkMode ? "game-page page" : "game-page page light"}>
      {modalHidden ? (
        <Nav
          closeModal={closeModal}
          closeSettings={toggleSettings}
          closeHelp={toggleHelp}
          closeAside={toggleAside}
        />
      ) : (
        <></>
      )}
      <AsideNav
        isAsideClosed={isAsideClosed}
        defaultUserObj={defaultUserObj}
        closeAside={toggleAside}
        loggedIn={loggedIn}
        toggleLogin={toggleLogin}
      />
      <StatsModal
        isClosed={modalHidden}
        defaultUserObj={defaultUserObj}
        closeModal={closeModal}
      />
      <SettingsModal
        isClosed={isSettingsClosed}
        closeModal={toggleSettings}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        isHighContrastMode={isHighContrastMode}
        toggleContrast={toggleContrast}
        isHardMode={isHardMode}
        toggleHardMode={toggleHardMode}
      />
      <HelpModal
        isClosed={isHelpClosed}
        closeModal={toggleHelp}
        isHighContrastMode={isHighContrastMode}
      />
      <div className="page-content">
      <div className="container">
        <div className="game-window">
          {guessRowsArr.map((attempt, i) => {
            return (
              <GuessRow attempt={attempt} iteration={i} error={hardErrInfo} />
            );
          })}
        </div>
        <div
          className={
            isHighContrastMode
              ? "keyboard-container contrast"
              : "keyboard-container"
          }
        >
          {rows.map((row) => {
            return (
              <div className="row">
                {row.map((letter) => {
                  return letter !== "Back" ? (
                    <button
                      id={`letter-${letter}`}
                      value={letter}
                      onClick={(e) => updateWord(e)}
                    >
                      {letter}
                    </button>
                  ) : (
                    <button
                      id={"backspace"}
                      data={letter}
                      onClick={(e) => updateWord(e)}
                    >
                      {<BsBackspace />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
