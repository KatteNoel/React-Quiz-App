import React from 'react';

import { QuestionContext } from './quiz';

import { useContext } from 'react';

export const Question = () => {
    const question = useContext(QuestionContext);

    return (
        <h3 className="textCenter">{question}</h3>
    );
};