import React from 'react';

const Example = ({word, index, color}) => {
    return (
        <div className="example">
            {word.map((letter, i) => {
                return <div className={i === index ? `example-box ${color}` : "example-box"}>{letter}</div>
            })}
        </div>
    );
}

export default Example;