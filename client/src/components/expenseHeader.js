import React from 'react';

import './expenseHeader.scss';

const ExpenseHeader = () => {
  // const [typeFilter, setTypeFilter] = useState('all');

  return (
    <div className="filter">
      <h1>Expense</h1>
      <div className="tabs__wrapper">
        <ul>
          {/* <li onClick={() => setTypeFilter('all')}>All</li>
          <li onClick={() => setTypeFilter('rent')}>Rent</li>
          <li onClick={() => setTypeFilter('electricity')}>Electricity</li> */}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseHeader;
