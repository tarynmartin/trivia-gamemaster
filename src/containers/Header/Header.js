import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => {
  return (
    <h2 className='header'>This is the header</h2>
  )
}

export default connect(null, null)(Header);
