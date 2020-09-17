import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => {
  return (
    <div className='header'>
      <Link to={'/'}>
        <h1>Be Your Own QuizMaster!</h1>
      </Link>
      <div className='btn-holder'>
        <Link to={'/create_game'}>
          <button className='create-game'>Create Your Own Game</button>
        </Link>
        <Link to={'/your_game'}>
          <button className='your-game'>Your Game</button>
        </Link>
      </div>
    </div>
  )
}

export default connect(null, null)(Header);
