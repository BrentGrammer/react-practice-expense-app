import { addExpense, editExpense, removeExpense} from '../../actions/expenses';
// import the functions from the component you want to test (they were exported as named defaults in this case)

//test removeExpense action generator:
test('should setup removeExpense action object', () => {
    //create const to store return value from test fn:
    // removeExpense expects an obj with id prop to be passed in, so make one up for the test:
    const action = removeExpense({ id: '123abc' });
    // now assert something about the return value with expect().toEqual() builtin jest library functions:
    // NOTE: normally you use toBe() instead of toEqual() with primitives etc., but since objects and arrays are never 
    // equal with === because of their reference comparison, you need to use the built in toEqual() method which 
    // iterates over objects and arrays.
    expect(action).toEqual({ 
        type: 'REMOVE_EXPENSE', 
        id: '123abc' 
    });
});

test('should setup an edit expense action object to send', () => {
    const action = editExpense('123abc', {note: 'new note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'new note'
        }
    });
});

// Test add expense action generator - test for default value if nothing passed in and if values are passed in:
test('should setup add expense action object with passed in values', () => {
    // set values you want to use to pass in - expects an object of expense data:
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'this was last month rent'
    };
    const action = addExpense(expenseData);
    // since id would be a dynamic value set by uuid() lib which changes on each call, you can use builtin jest method 
    // expect.any([data type]) for id prop:
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        ...expenseData,
        id: expect.any(String)
    });

});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});