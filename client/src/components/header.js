import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>House Expense Tracker</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add Expenses</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
