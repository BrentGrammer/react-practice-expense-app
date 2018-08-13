import React from 'react';
import { shallow } from 'enzyme';
//import the named export of the unconnected component to test it:
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// The tests for this component deal with the scenario where there is an imported action function that is called with dispatch.
// On the component, the unconnected version should be exported in addition to facilitate testing and the mapDispatchToProps 
// should be implemented and passed into the connect() fn in order to abstract the function from the component.


/**
 * You can use jest lifecycle methods to avoid repeating build code in tests.
 * beforeAll()
 * beforeEach()
 * afterAll()
 * afterEach()
 */
// Example of lifecycle jest method:
// let startAddExpense, history, wrapper;
// beforeEach(() => {
//     startAddExpense = jest.fn();
//     history = { push: jest.fn() };
//     wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
// });
// You can now remove these lines from all the tests.  They are left in place for reference though.

// Make a snapshot test call and pass in props creating spies if necessary for passed in fns:
test('should render AddExpenseForm correctly', () => {
    // create spies for the passed in functions from parent (or imported actions) into props of component:
    const startAddExpense = jest.fn();
    // make a spy for the history object used in the component for routing:
    // history is an object and define the thing used on history (push) in the object set by setting it to jest.fn() as the spy:
    const history = { push: jest.fn() };
    // render the unconnected component and pass in the spies created for the props:
    const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
    // take snapshot of the component after all props etc. passed in correctly:
    expect(wrapper).toMatchSnapshot();
});

// Now check that when the form gets submitted, both of the spies created get called and get called with the correct info.
test('should handle onSubmit', () => {
    // pass in props and render the component again like above in first test:
    const startAddExpense = jest.fn();
    const history = { push: jest.fn() };
    const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
    expect(wrapper).toMatchSnapshot();
    // call the onSubmit that gets passed into expense form which then calls the imported action on AddExpensePage:
    // find the expense form component in the wrapper and access its props to call onSubmit passed in from AddExpensePage
    // and then call it with an expense object (like it would be called with in the app) - use one from the expense fixtures created:
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    // Now that the function has been called, make assertions that both of the spies were called with the correct data (these are 
    // the functions that would be called with the onSubmit call from ExpenseForm triggered in AddExpensePage:
    // test each spy:
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expense[1]);
});