import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { EditIcon, DeleteIcon } from './shared/svgIcon';

const moment = require('moment');

const Expense = ({ expense }) => {
  const { deleteExpense } = useContext(GlobalContext);

  return (
    <div className="expense">
      <p className="type">{expense.type}</p>
      <p>{`Rs ${numberWithCommas(expense.amount)}`}</p>
      <p>{moment(expense.createdAt).format('MMM Do YYYY')}</p>
      <div className="buttons__wrapper">
        <Link
          className="button transparent link icon"
          to={`/edit/${expense._id}`}
        >
          <EditIcon />
        </Link>

        <button
          className="button transparent danger icon"
          onClick={() => deleteExpense(expense._id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default Expense;
