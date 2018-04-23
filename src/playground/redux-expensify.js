import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Add expense action generator:
const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt 
    }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// return an action object with the passed in id of the expense to remove
const removeExpense = ({ id } = {}) => ({ type: 'REMOVE_EXPENSE', id });

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

// create a variable to hold complex/multiple defaults to pass in to the reducer.
const expenseReducerDefaultState = [];

// Expenses reducer:
const expensesReducer = (state = expenseReducerDefaultState, action) => {
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
                    return state;
                }
            });
        default:
           return state;
    }
};

// Filters reducer default state:
const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 
    'date', 
    startDate: undefined, 
    endDate: undefined 
};

// filters reducer:
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };
        case 'SORT_BY_AMOUNT':
            return {
                ...state, 
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state, 
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
           return state;
    }
};

// Get visible expenses:
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // filter through expenses array to determine if the expense is included in return
    return expenses.filter((expense) => {
        // both conditions return true, if the latter, then used for sort filtering:
        // (IOw, the dates can be undefined, the only real required criteria to match is the text)
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        const description = expense.description;
        const lowercaseDescription = description.toLowerCase();
        const lowercaseText = text.toLowerCase();
         
        const textMatch = lowercaseDescription.includes(lowercaseText);

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; 
        } else if (sortBy === 'amount') {
            return a.amount > b.amount ? -1 : 1;
        }
    });
};

// Create a new store and pass in the reducer function by reference:
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }));

// reference the returned action object stored above to get the id of the expense added to remove:
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('fee'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
// store.dispatch(setStartDate(-500));
//store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));


const demoState = {
    expenses: [{
        id: 'sdfsdf',
        description: 'January Rent',
        note: 'this was final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'date', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// const user = {
//     name: 'jen',
//     age: 24
// };

// console.log({
//     ...user,
//     location: 'Cleveland',
//     age: 26
// });