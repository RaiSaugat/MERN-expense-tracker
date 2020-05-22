import React, { useState, useContext } from 'react';

import './expenseHeader.scss';
import { GlobalContext } from '../context/GlobalState';

const ExpenseHeader = () => {
  const { setFilterType, months, setMonthFilter } = useContext(GlobalContext);

  const [typeFilter, setTypeFilter] = useState('all');
  const [defaultMonth, setDefaultMonth] = useState('');

  // const handleFilterChange = (type) => {
  //   setTypeFilter(type);
  //   setFilterType(type);
  // };

  const handleMonthChange = (event) => {
    setDefaultMonth(event.target.value);
    setMonthFilter(event.target.value);
  };

  return (
    <div className="filter">
      <h1>
        Expenses of Month :{' '}
        <select
          value={defaultMonth}
          onChange={(event) => handleMonthChange(event)}
          name="month"
          className="filter__expense"
        >
          <option value="all">All</option>
          {months &&
            months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
        </select>
      </h1>
      <div className="tabs__wrapper">
        {/* <ul>
          <li onClick={() => handleFilterChange('all')}>All</li>
          <li onClick={() => handleFilterChange('rent')}>Rent</li>
          <li onClick={() => handleFilterChange('electricity')}>Electricity</li>
        </ul> */}
      </div>
    </div>
  );
};

export default ExpenseHeader;
