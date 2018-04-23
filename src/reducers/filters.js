import moment from 'moment';

// Filters reducer default state:
const filtersReducerDefaultState = { 
    text: '', 
    sortBy: 'date', 
    // use builtin startOf/endOf method for moment to set value to the start/end of the current month to show expenses
    // in the current month by default in the expense list on ExpenseDashboard
    startDate: moment().startOf('month'), 
    endDate: moment().endOf('month') 
};

// filters reducer (returns an object that replaces the default or previous filters prop in the state object in
// the redux store:
export default (state = filtersReducerDefaultState, action) => {
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