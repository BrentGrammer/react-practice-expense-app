import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
// import two sets of filters created in fixtures: a default set and a populated set:
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';


// declare variables for the mock fuunctions:
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

// create the mock functions for them in a beforeEach lifecycle jest method so you don't have to repeat the code in 
// all the tests:

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    // render the component and pass in props for testing (these are props set up by mapDispatchToProps and mapStateToProps on the component):
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate} 
        />
    );
});

// test that the default filters are in place on a render of the component:
test('should render ExpenseListFilters correctly', () => {
    // you can check the snapshot in the _snapshots_ folder to check the values of the filters are set to defaults:
    expect(wrapper).toMatchSnapshot();
});

// test that populated filters when user enters different options renders correctly
test('should render ExpenseListFilters with alt populated filters data correctly', () => {
    // use enzyme method .setProps() to simulate a change of value in the store state and then that injection into the props of ExpenseListFilters:
    // .setProps takes an object with keys representing the props and the values to set them to.
    // change the filters in the component (originally from store through connect()) to use simulated alt data:
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

// handle text change
test('should handle text change', () => {
  const value = 'bills';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  // test that the spy handler was called with the correct arg:
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

// should sort by date
test('should fire sort by date action in handler on change', () => {
  const value = 'date';
  // you can set the props to switch the selection to amount to make sure you test a change in the select:
  // (atFilters has sortBy set to 'amount')
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', { target: { value }});
  expect(sortByDate).toHaveBeenCalled();
})

// sort by amount
test('should fire sort by amount action in handler', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', { target: { value }});
  expect(sortByAmount).toHaveBeenCalled();
});

// should handle date changes:
test('should handle date changes', () => {
  // create start and end dates inputted:
  const startDate = moment(0).add(4,'years');
  const endDate = moment(0).add(8, 'years');
  // access and call the fn in DateRangePicker props that will cause setStartDate and setEndDate to fire:
  // get the prop that starts the handler and call it passing in what it expects (startDate and endDate)
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// should handle date focus changes:
test('should handle date focus change', () => {
  // the docs for the daterangepicker allow for three options for values of calendarFocused ('startDate', 'endDate', null)
  const calendarFocused = 'endDate';
  // find the element and access the prop that fires the handler to change the calendarFocused state and call it:
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  // assertion about the result of the handler (a change of state to the calendarFocused property)
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
