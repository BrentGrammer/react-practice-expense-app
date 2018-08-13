import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
// These tests are using a mock of the moment library set up in \tests\__mocks__\ folder so that moment() without any args
// will always return moment(0) so that the snapshot will match future renders (since moment will not get the current time
// each time it is called, but instead returns moment(0) - see fn in __mocks__)

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

// test if expense form renders with populated data for editing when an expense is passed down from parent to populate fields:
test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

// Test user interactions:
test('should render error for invalid form submission value', () => {
  // 1) shallow render the component:
  const wrapper = shallow(<ExpenseForm />);
  // You can add a snapshot here to test that an error is not showing before form submission:
  expect(wrapper).toMatchSnapshot();
  // 2) Find the element to test the event (by tagname in this case-can also use id/class).
  // 3) Use simulate() to simulate an event on the selected element:
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // 4) Make an assertion about what the event should do or change (state.error should not be empty string):
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  // 5) Make a snapshot to check that the error renders correctly:
  expect(wrapper).toMatchSnapshot();
});

// test description input change:
test('should set description in state on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />);
  // get the specific input for description (the first one) using .at():
  // Since the event requires e.target.value passed in, create the e obj and set target.value to use as second arg to 
  // simulate:
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  // test that the state changed correctly:
  expect(wrapper.state('description')).toBe(value);
});

// test note input change:
test('should set note on textarea input change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

// test valid amount input:
test('should set description in state on input change', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

// test invalid amount input:
test('should render error if amount entered is invalid', () => {
  const value = '12.122';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  // the amount should remain the default (empty string) since the regex test fails and it will not be put in state:
  expect(wrapper.state('amount')).toBe('');
});

/** Testing handlers in the component using spies: **/

test('should call onSubmit handler prop for valid form submission', () => {
  // Create the spy:
  const onSubmitSpy = jest.fn();
  // render the component with passed in data needed for the handler (incl the method since it's passed from the parent):
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  // Simulate event to trigger handler:
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // Make assertions about what should happen when handler run:
  expect(wrapper.state('error')).toBe('');
  // Check that the handler (spy) was called with the correct args:
  expect(onSubmitSpy).toHaveBeenCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});
// Testing a handler fired from a passed down prop to a child:
test('should set new date in state on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  // Call the prop passed to child to make the handler on parent run:
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  // Check that state was updated with correct value
  wrapper.state('createdAt').toEqual(now);
});

test('should set calendarFocus in state on focus change', () => {
  // arg that will be passed into handler and set in state by it:
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  // Call the prop passed to child to make the handler on parent run:
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  // Check that state was updated with correct value
  wrapper.state('calendarFocus').toBe(focused);
});
