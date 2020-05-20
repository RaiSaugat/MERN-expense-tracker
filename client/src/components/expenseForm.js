import React, { useState, useContext, useEffect } from 'react';

import './expenseForm.scss';
import { GlobalContext } from '../context/GlobalState';

const ExpenseForm = ({ expense }) => {
  const { addExpense } = useContext(GlobalContext);

  const [amount, setAmount] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [type, setType] = useState('rent');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setType(expense.type);
      setCreatedAt(expense.createdAt.slice(0, 10));
    }
  }, [expense]);

  const handleExpense = (event) => {
    event.preventDefault();

    if (createdAt && type && amount) {
      const newExpense = {
        type,
        amount,
        createdAt,
      };
      addExpense(newExpense);
      setNote(`${type} of Rs.${amount} has been added`);
    } else {
      setNote(`Please add expense`);
    }
  };

  return (
    <div className="addExpense-form">
      <form>
        <div className="type">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={type}
            onChange={(event) => {
              setNote('');
              setType(event.target.value);
            }}
          >
            <option value="rent">Rent</option>
            <option value="electricity">Electricity</option>
          </select>
        </div>
        <div className="amount">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setNote('');
            }}
          />
        </div>
        <div className="date">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={createdAt}
            onChange={(event) => {
              setNote('');
              setCreatedAt(new Date(event.target.value));
            }}
          />
        </div>
        <button className="button" onClick={handleExpense}>
          Add
        </button>

        {note && (
          <div className="info">
            <p>{note}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
