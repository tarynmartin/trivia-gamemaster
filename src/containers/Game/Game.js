import React from 'react';
import './Game.css';
import TriviaCard from '../TriviaCard/TriviaCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Game = () => {
  return (
    <>
    <h3>This will be the game</h3>
    <TriviaCard />
    </>
  )
}

export default connect(null, null)(Game);
