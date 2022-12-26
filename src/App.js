import React from 'react';

import { Container } from 'react-bootstrap';

import Quiz from './components/quiz';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Container>
      <h1 className="textCenter">Which Would Be Your Warrior Cats Clan?</h1>
      <Quiz />
    </Container>
  );
}

export default App;
