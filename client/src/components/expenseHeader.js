import React, { useState, useContext } from 'react';

import './expenseHeader.scss';
import { GlobalContext } from '../context/GlobalState';

const ExpenseHeader = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const { setFilterType } = useContext(GlobalContext);

  // const handleFilterChange = (type) => {
  //   setTypeFilter(type);
  //   setFilterType(type);
  // };

  return (
    <div className="filter">
      <div className="tabs__wrapper">
        <ul>
          {/* <li onClick={() => handleFilterChange('all')}>All</li>
          <li onClick={() => handleFilterChange('rent')}>Rent</li>
          <li onClick={() => handleFilterChange('electricity')}>Electricity</li> */}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseHeader;
