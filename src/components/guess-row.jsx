import React from 'react';

const GuessRow = (props) => {
    const ordinals = ['st', 'nd', 'rd', 'th', 'th']
    return (
        <div id={`row-${props.attempt}`} className="guess-row">
            <div className="box guess-1"></div>
            <div className="box guess-2"></div>
            <div className="box guess-3"></div>
            <div className="box guess-4"></div>
            <div className="box guess-5"></div>
            <div id={`error-row-${props.attempt}`} className={"error hide"}>Not enough letters</div>
            <div id={`error-hard-row-${props.attempt}`} className={"error-hard hide"}>{props.error ? `${(props.error.index + 1)}${ordinals[props.error.index]} letter must be ${props.error.letter}` : ""}</div>
        </div>
    );
}

export default GuessRow;