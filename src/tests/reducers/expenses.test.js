import expensesReducer from '../../reducers/expenses';
// dummy data to use:
import expenses from '../fixtures/expenses';

// test that the reducer returns the default state set:
test('should set default state', () => {
  // pass nothing into the state arg, and for the action to catch use the default init action that fires automatically on app load
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  // simulate a dispatch by calling the reducer with the action:
  const state = expensesReducer(expenses, action);
  // make assertion: the array returned should be missing the second item:
  expect(state).toEqual([ expenses[0], expenses[2] ]);
});

// test if the id is not found and make sure no expenses are removed:
test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    // input a random id that doesn't exists in the expenses state array:
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  // make assertion: the array returned should be unchanged without anything removed:
  expect(state).toEqual(expenses);
});

// should add an expense:
test('should add an expense to state', () => {
  // create an expense to add:
  const newExpense = {
      id: '1075',
      description: 'new',
      note: '',
      amount: 10000,
      createdAt: 'today'
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: newExpense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, newExpense]);
});

// should edit expenses:
test('should edit an expense in state', () => {
  const updates = {
    note: 'edited note',
    amount: 123
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ {...expenses[0], ...updates}, expenses[1], expenses[2] ]);
  // Alternative assertion just comparing the specific item in state to it's edited value above:
  expect(state[0].amount).toBe(updates.amount);
});

// should not edit expense if expense id not found:
test('should not edit expenses if no id found', () => {
  const updates = {
    note: 'edited note',
    amount: 123
  };
  // change id to -1 so it is not in the array:
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
