import React, { createContext, useReducer } from 'react';
import axios from 'axios';

import AppReducer from './AppReducer';

//Initial state
const initialState = {
  expenses: [],
  expense: null,
  error: null,
  loading: true,
  filterType: 'all',
  months: [],
  filterMonth: 'all',
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

  async function getExpenseById(id) {
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
      const res = await axios.patch(`/api/v1/expenses/${expense.id}`, expense);
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

  async function setFilterType(type) {
    try {
      dispatch({
        type: 'SET_FILTER',
        payload: type,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  function setMonthFilter(month) {
    try {
      dispatch({
        type: 'SET_MONTH_FILTER',
        payload: month,
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
        filterType: state.filterType,
        months: state.months,
        filterMonth: state.filterMonth,
        deleteExpense,
        addExpense,
        getAllExpenses,
        updateExpense,
        getExpenseById,
        setFilterType,
        setMonthFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
