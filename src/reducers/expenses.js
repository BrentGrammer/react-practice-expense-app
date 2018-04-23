// create a variable to hold complex/multiple defaults to pass in to the reducer.
const expenseReducerDefaultState = [];

// Expenses reducer: returns an array of objects that replaces the default or previous expenses prop in the state object in
// the redux store:
export default (state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // use es6 spread op because it doesn't directly mutate the original array - a new array is returned with the 
            // original values in addition to the new expense object added by the add expense dispatched action.
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            // filter through the expenses array and return matches that are not the id passed in:
            // state represents the expenses array that the expensesReducer is referenced in the store object
            //return state.filter( (expense) => expense.id !== action.id );
            // use destructuring on expense object items in array to shorten code:
            return state.filter( ({ id }) => id !== action.id );
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    // no change
                    return expense; 
                    // don't return state here - throws error as the reducer returns a state object into the 
                    // expense object of state instead of the expense object being mapped.
                }
            });
        // The action sets all expenses in the state and the action object contains an array of expenses
        case 'SET_EXPENSES':
            return action.expenses; 
        default:
           return state;
    }
};

//

// Expenses Reducer

// const expensesReducerDefaultState = [];

// export default (state = expensesReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'ADD_EXPENSE':
//       return [
//         ...state,
//         action.expense
//       ];
//     case 'REMOVE_EXPENSE':
//       return state.filter(({ id }) => id !== action.id);
//     case 'EDIT_EXPENSE':
//       return state.map((expense) => {
//         if (expense.id === action.id) {
//           return {
//             ...expense,
//             ...action.updates
//           };
//         } else {
//           return expense;
//         };
//       });
//     default:
//       return state;
//   }
// };

