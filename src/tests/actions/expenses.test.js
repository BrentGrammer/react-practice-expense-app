// importing actions used in test cases
import { startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
// redux-mock-store is a library to test the dispatching of actions and that their payload is stored correctly:
import configureMockStore from 'redux-mock-store';
// import thunk middleware so that the mock store has the same middleware the real store uses:
import thunk from 'redux-thunk';
//import the database to test that the data was entered into it:
import database from '../../firebase/firebase';

// This configures the mock store with options so that each test that uses it will create the same mock store:
// set this to configureMockStore imported from redux-mock-store library and pass in an array of middleware used.
const createMockStore = configureMockStore([ thunk ]);



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

// Test add expense action generator (not the async redux action; no need to test defaults since the async redux action does that)
// - test for default value if nothing passed in and if values are passed in:
test('should setup add expense action object with passed in values', () => {
    // pass in an expense item from the fixtures created (it will have an id prop which firebase expects):
    const action = addExpense(expenses[2]);
    // since id would be a dynamic value set by uuid() lib which changes on each call, you can use builtin jest method 
    // expect.any([data type]) for id prop:
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// test adding expense to database and to the store when user enters an expense and specifies the values (they are not the defaults):
// since this test involves asynchronous operations, jest needs to know it is asynchronous, otherwise the function 
// containing the test code will return before the .then() runs and the assertions in that block will not be tested.
//  Pass in done as an argument to the function block of the test so that it can be called after all async operations
// are complete.
test('should add expense to database and to the store', (done) => {
  // create a mock store to use in the test with the method imported from redux-mock-store library:
  const store = createMockStore({});
  // create expense data to pass into async action dispatched:
  const expenseData = {
    description: 'Mpuse',
    amount: 3000,
    note: 'note for mouse',
    createdAt: 1000
  };
  // dispatch the action with store.dispatch and pass in any data the action needs:
  // chain a .then onto it (because the async promise based action is returned in the orginal action file), and make
  // assertion about the async operation results in the .then block, and finally call done() to return the function results
  // only after all async actions and operations are complete in the then block.  
  store.dispatch(startAddExpense(expenseData)).then(() => {
      // get actions that were dispatched by the async redux function to the store in a const using method from redux mock 
      // store library getActions() - the action dispatched by startAddExpenses should have been addExpense:
      const actions = store.getActions();  // this returns an array of actions (actions[0] for example is the first action dispatched)
      // make an assertion about the actions dispatched (in this case only one) that it equals an expected action object:
      expect(actions[0]).toEqual({
        // this should match the addExpense action object dispatched by startAddExpense:
        type: 'ADD_EXPENSE',
        id: expect.any(String),  // builtin jest method - the value of id can be anything in this test case.
        ...expenseData
      });
      // Test that the database was correctly updated:
      // first, get the item added from the database (return the call to db so you can chain a .then instead of nesting
      // a new .then chain inside the original):
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
      // get the snapshot returned from the firebase call and make an assertion about it:
      expect(snapshot.val()).toEqual(expenseData);  
      // call done() when all async responses and callbacks are dealt with and complete:
      done();
  });
});
// tests the storing of an expense when defaults are used (user adds expense without specifying details)
test('should add expense with defaults to database and to the store', (done) => {
    const store = createMockStore({});

    const expenseDefaults = {
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0
    };
    // pass in empty object to the dispatched async redux action to simulate user did not select or input any params:
    store.dispatch(startAddExpense({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({ 
          type: 'ADD_EXPENSE', 
          id: expect.any(String),
          ...expenseDefaults
        });
        return database.ref(`expenses/${actions[0].id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot).toEqual(expenseDefaults);
        done();
      });
});

// test('should setup add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });