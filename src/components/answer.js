import React from 'react';

import { AnswerContext } from './quiz';

import { useContext } from 'react';

import { Button } from 'react-bootstrap';

export const Answer = (props) => {
    const answer = useContext(AnswerContext);

    return <Button className="margin" variant="dark" onClick={() => props.handleClick(props.index)}>{answer[props.index]}</Button>
}