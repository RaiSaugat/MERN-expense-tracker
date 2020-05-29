import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './header.scss';

import { GlobalContext } from 'context/GlobalState';
import Navigation from './navigation';

const Header = () => {
  const { currentUser } = useContext(GlobalContext);

  if (!currentUser) {
    return null;
  }

  return (
    <header className="header">
      <h1>
        <NavLink to="/" exact>
          House Expense Tracker
        </NavLink>
      </h1>

      <Navigation />
    </header>
  );
};

export default Header;
