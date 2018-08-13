import moment from 'moment';
import filtersReducer from '../../reducers/filters';

// there is a builtin action with a type of @@INIT which can be used in tests to check if the reducer sets itself up correctly by default.  @@INIT is the first action dispatched automatically to the reducers when app starts.

// test default filter values:
test('should set up default filter values', () => {
    // pass nothing(undefined) in for the current state to test defaults
    const state = filtersReducer(undefined, { type: '@@INIT' });
    // the reducer will return an object that will be used to update state - you want test the props of this object to make sure they match the defaults set in src\reducers\filters.js:
    expect(state).toEqual({
        text: '', 
        sortBy: 'date', 
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month')    
    }); 
    
});
// test the SORT_BY_AMOUNT action that sets the sortBy prop to amount in the filters reducer:
test('should set sortBy to amount', () => {
   const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
   expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    // date is the default, so you need to change the current state so that you can test if the action changes the sortby prop to date after switching it from amount:
    const currentState = {
        text:'',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

// test text filter
test('should set text filter', () => {
    const text = 'test text here';
    const action = { 
        type: 'SET_TEXT_FILTER', 
        text 
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

// test startDate filter
test('should set startDate filter', () => {
    const startDate = moment();
    const action = { 
        type: 'SET_START_DATE', startDate 
    };
    const state = filtersReducer(undefined, action);
    // use toEqual() with moment instances which are objects:
    expect(state.startDate).toEqual(startDate);
});

// test endDate filter
test('should set endDate filter', () => {
    const endDate = moment();
    const action = { 
        type: 'SET_END_DATE', 
        endDate 
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});