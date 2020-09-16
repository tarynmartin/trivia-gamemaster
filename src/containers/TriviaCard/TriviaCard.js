import React from 'react';
import './TriviaCard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const TriviaCard = () => {
  return (
    <h2>These will be the cards</h2>
  )
}

export default connect(null, null)(TriviaCard);

// create conditional renders of certain elements
