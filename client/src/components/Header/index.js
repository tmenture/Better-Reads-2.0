import React from 'react';
import { Link } from 'react-router-dom';


function Header({ currentPage }) {
  return (
    <ul className="nav nav-tabs">
    <h1 className="p-5 py-2">
        <Link to ="/">Better Reads: <h4 className="d-inline"> We're Better than Good</h4></Link>
    </h1>
      <li className="nav-item py-3">
        <Link to="/"
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className="nav-item py-3">
        <Link to="/saved"
          className={currentPage === 'SavedBooks' ? 'nav-link active' : 'nav-link'}
        >
          My Books
        </Link>
      </li>
      <li className="nav-item py-3">
        <Link to="/login"
          className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
        >
          Login
        </Link>
      </li>
      <li className="nav-item py-3">
        <Link to="/signup"
          className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
        >
          Sign Up
        </Link>
      </li>
      <li className="nav-item py-3">
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
