import React from 'react';
import { shallow } from 'enzyme';
//import the named export const from ExpenseList (not the connected default export) to test with sample expenses.
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render expense list with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  // compare the wrapper render to a stored snapshot:
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with no expenses msg', () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  // This will create and store a new snapshot holding the ExpenseList with the empty array and no expenses msg
  expect(wrapper).toMatchSnapshot();
});
