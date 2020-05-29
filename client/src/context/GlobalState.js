import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState = {
  expenses: [],
  users: [],
  expense: null,
  error: null,
  loading: false,
  filterType: 'all',
  months: [],
  filterMonth: 'all',
  isLoggedIn: false,
  currentUser: null,
  tokenExpirationDate: null,
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  // Actions
  const login = useCallback((user, expirationDate) => {
    const { userId, token, name, email } = user;
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
        token: token,
        name: name,
        email: email,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    try {
      dispatch({
        type: 'LOGIN',
        payload: { user, tokenExpirationDate },
      });
    } catch (err) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data.error,
      });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    try {
      dispatch({
        type: 'LOGOUT',
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: 'LOGOUT_ERROR',
        payload: err.response.data.error,
      });
    }
  }, []);
  async function getAllExpenses(expenses) {
    try {
      dispatch({
        type: 'GET_EXPENSES',
        payload: expenses,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function getExpenseByUserId(expenses) {
    try {
      dispatch({
        type: 'GET_USER_EXPENSES',
        payload: expenses,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  function handleLoading(loadingState) {
    try {
      dispatch({
        type: 'HANDLE_LOADING',
        payload: loadingState,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getExpenseById(expenseData) {
    try {
      dispatch({
        type: 'GET_SELECTED_EXPENSE',
        payload: expenseData,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteExpense(expenseId) {
    try {
      dispatch({
        type: 'DELETE_EXPENSE',
        payload: expenseId,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function addExpense(expense) {
    try {
      dispatch({
        type: 'ADD_EXPENSE',
        payload: expense,
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
      dispatch({
        type: 'UPDATE_EXPENSE',
        payload: expense,
      });
    } catch (err) {
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function getAllUsers(users) {
    try {
      dispatch({
        type: 'GET_USERS',
        payload: users,
      });
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  function setFilterType(type) {
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

  useEffect(() => {
    let logoutTimer;
    if (
      state.currentUser &&
      state.currentUser.token &&
      state.tokenExpirationDate
    ) {
      const remainingTime =
        state.tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, state.currentUser, state.tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData, new Date(storedData.expiration));
    }
  }, [login]);

  return (
    <GlobalContext.Provider
      value={{
        expenses: state.expenses,
        users: state.users,
        error: state.error,
        loading: state.loading,
        expense: state.expense,
        filterType: state.filterType,
        months: state.months,
        filterMonth: state.filterMonth,
        isLoggedIn: state.isLoggedIn,
        currentUser: state.currentUser,
        token: state.token,
        userId: state.userId,
        deleteExpense,
        addExpense,
        getExpenseByUserId,
        getAllExpenses,
        updateExpense,
        getExpenseById,
        setFilterType,
        setMonthFilter,
        handleLoading,
        getAllUsers,
        login,
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
