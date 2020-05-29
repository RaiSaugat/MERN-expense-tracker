import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './expenseForm.scss';
import { GlobalContext } from 'context/GlobalState';
import { useHttpClient } from 'hooks/http-hook';
import { LoadingText } from 'components/shared';

const ExpenseForm = ({ expense }) => {
  const { addExpense, loading, updateExpense, currentUser } = useContext(
    GlobalContext
  );
  const { sendRequest } = useHttpClient();
  const params = useParams();
  const { token } = currentUser;

  const [amount, setAmount] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [type, setType] = useState('rent');
  const [note, setNote] = useState('');

  const disabled = !amount || !createdAt;

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setType(expense.type);
      setCreatedAt(expense.createdAt.slice(0, 10));
    }
  }, [expense]);

  const handleExpense = async (event) => {
    event.preventDefault();
    if (createdAt && type && amount) {
      const expense = {
        type,
        amount,
        createdAt,
      };

      if (params.id) {
        expense.id = params.id;
        const responseData = await sendRequest(
          `/api/v1/expenses/${params.id}`,
          'PATCH',
          expense,
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }
        );
        updateExpense(responseData.data);
        setNote(`<b>${type}</b> amount updated to <b>Rs.${amount}</b>`);
      } else {
        try {
          const responseData = await sendRequest(
            '/api/v1/expenses',
            'POST',
            expense,
            {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            }
          );

          addExpense(responseData.data);
          setNote(`<b>${type}</b> set to <b>Rs.${amount}</b>`);
        } catch (error) {
          setNote(error.response.data.message);
        }
      }
    } else {
      setNote(`Please add expense`);
    }
  };

  if (loading) {
    return <LoadingText text="Loading data" />;
  }

  return (
    <div className="expense-form">
      <h3>Add your expense</h3>
      <form className="form">
        <div className="form__control">
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
        <div className="form__control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setNote('');
            }}
          />
        </div>
        <div className="form__control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={createdAt}
            onChange={(event) => {
              setNote('');
              setCreatedAt(event.target.value);
            }}
          />
        </div>
        <div className="form__control">
          <label></label>
          <button
            className="button transparent primary"
            onClick={handleExpense}
            disabled={disabled}
          >
            {params.id ? 'Edit' : 'Add'}
          </button>
        </div>

        {note && (
          <div className="form__info">
            <p dangerouslySetInnerHTML={{ __html: note }} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
