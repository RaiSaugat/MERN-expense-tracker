const moment = require('moment');

export default (state, action) => {
  switch (action.type) {
    case 'GET_EXPENSES':
      let monthArr = [];
      action.payload.map((expense) => {
        const month = moment(expense.createdAt).format('M');
        if (!monthArr.includes(month)) {
          monthArr.push(month);
        }
      });

      monthArr.sort((a, b) => a - b);
      const months = monthArr.map((month) => moment(month, 'M').format('MMMM'));

      return {
        ...state,
        expenses: action.payload,
        loading: false,
        months,
      };

    case 'GET_SELECTED_EXPENSE':
      return {
        ...state,
        expense: action.payload,
      };

    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: [
          ...state.expenses.filter((expense) => {
            if (expense._id === action.payload._id) return action.payload;
            return expense;
          }),
        ],
      };

    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filterType: action.payload,
      };

    case 'SET_MONTH_FILTER':
      return {
        ...state,
        filterMonth: action.payload,
      };

    case 'EXPENSE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
