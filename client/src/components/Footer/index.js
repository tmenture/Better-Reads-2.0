import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container">
        Better Reads Version 2.0 &copy;{new Date().getFullYear()} Caitlin Clifford, Liz DiTullio, Thomas Menture, and Alex Pappagallo
      </div>
    </footer>
  );
};

export default Footer;
