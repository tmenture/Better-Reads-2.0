import React from 'react';
import './index.css'

const Footer = () => {
  return (
    <footer className="fixed-bottom" >
      <div id="footer">
        <span className='footer'>Better Reads Version 2.0 &copy;{new Date().getFullYear()} Caitlin Clifford, Liz DiTullio, Thomas Menture, and Alex Pappagallo</span>
      </div>
    </footer>
  );
};

export default Footer;
