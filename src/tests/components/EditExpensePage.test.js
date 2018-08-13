import React from 'react';
import { shallow } from 'enzyme';
//import the named export of the unconnected component to test it:
import { EditExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// Lifecycle method from jest to reduce repeated code in each test:
let history, removeExpense, editExpense, wrapper;
beforeEach(() => {
  history = { push: jest.fn() };
  removeExpense = jest.fn();
  editExpense = jest.fn();
  wrapper = shallow(
      <EditExpensePage 
        editExpense={editExpense} 
        removeExpense={removeExpense} 
        history={history}
        expense={expenses[1]} 
      />
  );
});

// Test that component renders properly using a snapshot and enzyme shallow renderer:
test('should render addExpensePage correctly', () => {
    // beforeEach() code is run here by jest...
    expect(wrapper).toMatchSnapshot();   
});

// Test handlers on the component:

// Test edit Expense handler:
test('should handle editExpense properly', () => {
    // get the onSubmit prop passed to child ExpenseForm to call it with an expense which triggers the editExpense handler in EditExpensePage:
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    // make assertions about the triggered handlers called when onSubmit in child ExpenseForm fires:
    expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

// test remove Expense handler:
test('should handle remove Expense properly', () => {
    // remove expense is triggered when button is clicked - find it on wrapper and simulate a click
    wrapper.find('button').simulate('click');
    // now test the handlers that fired on button click:
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});
