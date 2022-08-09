import React from 'react';
import './index.css'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        Better Reads Version 2.0 &copy;{new Date().getFullYear()} Caitlin Clifford, Liz DiTullio, Thomas Menture, and Alex Pappagallo
      </div>
    </footer>
  );
};

export default Footer;
