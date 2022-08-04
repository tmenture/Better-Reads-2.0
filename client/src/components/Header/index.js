import React from 'react';
import { Link } from 'react-router-dom';

function Header({ currentPage }) {
  return (
    <ul className="nav nav-tabs">
    <h3 className="px-5 py-2">
        Final Project
    </h3>
      <li className="nav-item">
        <Link to="/"
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard"
          className={currentPage === 'Dashboard' ? 'nav-link active' : 'nav-link'}
        >
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login"
          className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup"
          className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
        >
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/singleBook"
          className={currentPage === 'SingleBook' ? 'nav-link active' : 'nav-link'}
        >
          Single Book
        </Link>
      </li>


    </ul>
  );
}

export default Header;
