import React from 'react';
import './Results.css';
import TriviaCard from '../TriviaCard/TriviaCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Results = () => {
  return (
    <>
    <h3>These will be the results</h3>
    <TriviaCard />
    </>
  )
}

export default connect(null, null)(Results);
