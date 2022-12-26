import React from 'react';

export const Result = (props) => {
    return (
        <>
        <h1 className="textCenter">You Got: {props.clan}!</h1>
        <p className="textCenter">{props.description}</p>
        </>
    );
};