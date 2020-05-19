import React, { useState, useContext } from 'react';

import './addExpenseForm.scss';
import { GlobalContext } from '../context/GlobalState';

const AddExpenseForm = () => {
  const { addExpense } = useContext(GlobalContext);

  const [amount, setAmount] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [type, setType] = useState('rent');
  const [note, setNote] = useState('');

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
            onChange={(event) => {
              setNote('');
              setType(event.currentTarget.value);
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

export default AddExpenseForm;
