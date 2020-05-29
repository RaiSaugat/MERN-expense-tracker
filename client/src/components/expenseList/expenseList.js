import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './expenseList.scss';

import { GlobalContext } from 'context/GlobalState';
import { numberWithCommas } from 'utils/format';
import { EditIcon, DeleteIcon } from 'components/shared';
import { useHttpClient } from 'hooks/http-hook';

const moment = require('moment');

const ExpenseList = ({ expense }) => {
  const { sendRequest } = useHttpClient();
  const { deleteExpense, currentUser } = useContext(GlobalContext);
  const { token, userId } = currentUser;

  const onDeleteExpense = async () => {
    try {
      const response = await sendRequest(
        `/api/v1/expenses/${expense.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + token,
        }
      );
      deleteExpense(response.expenseId);
    } catch (error) {}
  };

  return (
    <div className="expense">
      <p className="expense__type">{expense.type}</p>
      <p className="expense__amount">{`Rs ${numberWithCommas(
        expense.amount
      )}`}</p>
      <p className="expense__date">
        {moment(expense.createdAt).format('MMM Do YYYY')}
      </p>
      {userId === expense.creator && (
        <div className="buttons__wrapper">
          <Link
            className="button transparent link icon"
            to={`/edit/${expense._id}`}
          >
            <EditIcon />
          </Link>

          <button
            className="button transparent danger icon"
            onClick={onDeleteExpense}
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
