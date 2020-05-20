import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const moment = require('moment');

const Expense = ({ expense }) => {
  const { deleteExpense, updateExpense } = useContext(GlobalContext);

  const [showInput, setShowInput] = useState(false);
  const [type, setType] = useState(expense.type);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.createdAt.slice(0, 10));

  return (
    <div className="expense">
      <p className="type">
        {showInput ? (
          <input
            type="text"
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        ) : (
          expense.type
        )}
      </p>
      <p>
        {showInput ? (
          <input
            type="text"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        ) : (
          `Rs ${numberWithCommas(expense.amount)}`
        )}
      </p>
      <p>
        {showInput ? (
          <input
            type="date"
            name="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        ) : (
          moment(date).format('MMM Do YYYY')
        )}
      </p>
      <div className="buttons__wrapper">
        {!showInput ? (
          <Link className="button" to={`/edit/${expense._id}`}>
            Edit
          </Link>
        ) : (
          <button
            className="button"
            onClick={() => {
              const updatedValue = {
                id: expense._id,
                type,
                amount,
                createdAt: date,
              };
              updateExpense(updatedValue);
              setShowInput(false);
            }}
          >
            Update
          </button>
        )}
        {showInput ? (
          <button className="button" onClick={() => setShowInput(false)}>
            Cancel
          </button>
        ) : (
          <button
            className="button danger"
            onClick={() => deleteExpense(expense._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Expense;
