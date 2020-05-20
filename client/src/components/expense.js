import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const moment = require('moment');

const Expense = ({ expense }) => {
  const { deleteExpense } = useContext(GlobalContext);

  return (
    <div className="expense">
      <p className="type">{expense.type}</p>
      <p>{`Rs ${numberWithCommas(expense.amount)}`}</p>
      <p>{moment(expense.createdAt).format('MMM Do YYYY')}</p>
      <div className="buttons__wrapper">
        <Link className="button link" to={`/edit/${expense._id}`}>
          Edit
        </Link>

        <button
          className="button danger"
          onClick={() => deleteExpense(expense._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Expense;
