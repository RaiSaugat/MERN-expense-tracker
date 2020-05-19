import React, { useState, useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

const moment = require('moment');

const Expense = ({ expense }) => {
  const { deleteExpense } = useContext(GlobalContext);

  const [showInput, setShowInput] = useState(false);
  const [type, setType] = useState(expense.type);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.createdAt);

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
          <button className="button" onClick={() => setShowInput(true)}>
            Edit
          </button>
        ) : (
          <button
            className="button"
            // onClick={() => {
            //   Expenses.update(expense.id, {
            //     $set: {
            //       type,
            //       amount,
            //       createdAt: date,
            //     },
            //   });
            //   setShowInput(false);
            // }}
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
