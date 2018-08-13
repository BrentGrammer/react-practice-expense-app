import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashboardPage', () => {
  const wrapper = shallow(<ExpenseDashBoardPage />);
  expect(wrapper).toMatchSnapshot();
});
