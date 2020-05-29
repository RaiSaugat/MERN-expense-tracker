import React, { useState, useContext } from 'react';

import './expenseHeader.scss';

import { GlobalContext } from 'context/GlobalState';

const ExpenseHeader = () => {
  const { months, setMonthFilter } = useContext(GlobalContext);

  const [defaultMonth, setDefaultMonth] = useState('');

  const handleMonthChange = (event) => {
    setDefaultMonth(event.target.value);
    setMonthFilter(event.target.value);
  };

  return (
    <div className="filter">
      <h1>
        Expenses of Month:{' '}
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
    </div>
  );
};

export default ExpenseHeader;
