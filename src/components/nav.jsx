import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilBars, UilQuestionCircle, UilGraphBar, UilSetting } from '@iconscout/react-unicons'

const Nav = ({closeModal, closeSettings, closeHelp, closeAside}) => {
    const navigate = useNavigate();
    useEffect(() => {
        document.querySelector('.home-link').addEventListener('click', () => {
            navigate('/')
        })
    }, [])
    
    return (
        <nav className="nav-bar">
            <div className="left">
            <UilBars onClick={closeAside} />
            <p className="home-link">Wordle</p>
            </div>
            <div className="right">
            <span><UilQuestionCircle onClick={() => closeHelp()}/></span>
            <span><UilGraphBar onClick={() => closeModal()}/></span>
            <span><UilSetting onClick={() => closeSettings()}/></span>
            </div>

        </nav>
    );
}

export default Nav;