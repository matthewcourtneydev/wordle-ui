import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../imgs/x.png'

const AsideNav = ({ isAsideClosed, closeAside, defaultUserObj, toggleLogin }) => {
    const navigate = useNavigate()

  function logout() {
    localStorage.setItem('mdc_wordle_user', JSON.stringify(defaultUserObj));
    toggleLogin()
    navigate('/');
  }

    return (
        <aside className={isAsideClosed ? "closed" : ""}>
            <div className="top" onClick={closeAside}></div>
            <div className="aside-content">
            <div className="close"><img src={img} alt="close button" onClick={closeAside}/></div>
            <div className="bottom-buttons">
                <h1>PROFILE</h1>
                <p>Account details</p>
                <div className="buttons">
                <button className="signout-alt">SUBSCRIBE</button>
                <button className="signout" onClick={logout}>LOG OUT</button>
                </div>
            </div>
            </div>
        </aside>
    );
}

export default AsideNav;