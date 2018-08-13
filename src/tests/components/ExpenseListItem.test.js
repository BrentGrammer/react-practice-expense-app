import React from 'react';
import expenses from '../fixtures/expenses';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

test('should render ExpenseListItem with an expense item', () => {
  // grab the first item in the expenses fixture to pass to ExpenseListItem and spread it out:
  const wrapper = shallow(<ExpenseListItem key={expense.id} {...expense[0]} />);
  expect(wrapper).toMatchSnapshot();
});
