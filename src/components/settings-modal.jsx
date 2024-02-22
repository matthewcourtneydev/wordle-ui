import React, { useEffect } from "react";
import img from '../imgs/x.png'

const SettingsModal = ({
  isClosed,
  closeModal,
  isDarkMode,
  toggleDarkMode,
  toggleContrast,
  isHighContrastMode,
  isHardMode,
  toggleHardMode
}) => {
  useEffect(() => {
    const darkModeCheckbox = document.getElementById("checkbox-dark");
    const hardModeCheckbox = document.getElementById("checkbox-hard");
    const contrastModeCheckbox = document.getElementById("checkbox-contrast");
    darkModeCheckbox.addEventListener("change", () => {
      toggleDarkMode();
    });
    contrastModeCheckbox.addEventListener("change", () => {
      toggleContrast();
    });
    hardModeCheckbox.addEventListener("change", () => {
      toggleHardMode();
    });
  }, []);

  useEffect(() => {

  }, [isHighContrastMode])

  return (
    <div
      className={
        isClosed ? "settings-modal-layer closed" : "settings-modal-layer"
      }
    >
      <div className="modal-menu">
        <div className="modal-menu-content">
          <h1>SETTINGS</h1>
          <div onClick={() => closeModal()} className="close">
            <img src={img} alt="" />
          </div>
          <div className="settings-container">
            <div className="content-section difficulty">
              <div className="settings-left">
                <h2>Hard Mode</h2>
                <p>Any revealed hints must be used in subsequent guesses</p>
              </div>
              <div className="settings-right">
                <div
                  className={
                    isHighContrastMode
                      ? "text-container contrast"
                      : "text-container"
                  }
                >
                  <label className="toggle">
                    <input id="checkbox-hard" type="checkbox" checked={isHardMode}/>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="content-section theme">
              <div className="settings-left">
                <h2>Dark Theme</h2>
              </div>
              <div className="settings-right">
                <div
                  className={
                    isHighContrastMode
                      ? "text-container contrast"
                      : "text-container"
                  }
                >
                  <label className="toggle">
                    <input
                      id="checkbox-dark"
                      type="checkbox"
                      checked={isDarkMode}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="content-section contrast">
              <div className="settings-left">
                <h2>High Contrast Mode</h2>
                <p>For improved color vision</p>
              </div>
              <div className="settings-right">
                <div
                  className={
                    isHighContrastMode
                      ? "text-container contrast"
                      : "text-container"
                  }
                >
                  <label className="toggle">
                    <input
                      id="checkbox-contrast"
                      type="checkbox"
                      checked={isHighContrastMode}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="content-section feedback">
              <div className="settings-left">
                <h2>Feedback</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
            <div className="content-section report">
              <div className="settings-left">
                <h2>Report a Bug</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
            <div className="content-section community">
              <div className="settings-left">
                <h2>Community</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Wordle Review</a>
                </div>
              </div>
            </div>
            <div className="content-section questions">
              <div className="settings-left">
                <h2>Questions</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">FAQ</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;