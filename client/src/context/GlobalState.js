import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import AppReducer from './AppReducer';

//Initial state
const initialState = {
  expenses: [],
  expense: null,
  error: null,
  loading: true,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getAllExpenses(id) {
    try {
      const res = await axios.get('/api/v1/expenses');
      dispatch({
        type: 'GET_EXPENSES',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function getSelectedExpense(id) {
    try {
      const res = await axios.get(`/api/v1/expenses/${id}`);
      dispatch({
        type: 'GET_SELECTED_EXPENSE',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteExpense(id) {
    try {
      await axios.delete(`/api/v1/expenses/${id}`);
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addExpense(expense) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/expenses', expense, config);
      dispatch({
        type: 'ADD_EXPENSE',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function updateExpense(expense) {
    try {
      const res = await axios.post(`/api/v1/expenses/${expense.id}`, expense);
      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        error: state.error,
        loading: state.loading,
        expense: state.expense,
        deleteExpense,
        addExpense,
        getAllExpenses,
        updateExpense,
        getSelectedExpense,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
