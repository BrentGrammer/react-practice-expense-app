// expenses selector tests:
import moment from 'moment'; // for use with filter by date tests
import selectExpenses from '../../selectors/expenses';

// make a set of test data to use to test the expenses selector functions:
const expenses = [{
    id: '1',
    description: 'gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'credit card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

test('should filter by text value', () => {
    // set up filters to be a text test value and set others to default values:
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    // the expected result will be an array with the expenses defined above with an 'e' in the description
    expect(result).toEqual([ expenses[2], expenses[1] ]);
});
// the expenses filter by date expects an instance of moment from moment.js and a difference of days in the createdAt values.
// (the createdAt values are edited in the test exenses obj defined above to be days apart using moment methods)
test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }
    const result = selectExpenses(expenses, filters);
    // by default expenses selector sorts by date(most recent first), so the 3rd index in test expenses will come first in the array:
    // (the second expense is in the past so it is filtered out since it's createdAt is before moment(0))
    expect(result).toEqual([ expenses[2], expenses[0] ]);
});
// should filter by end date
test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[0], expenses[1] ]);
});

// should filter by date (only order changes, no expenses are left out)
test('should filter and sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ]);
});
// should filter by amount
test('should filter by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([ expenses[1], expenses[2], expenses[0] ]);
});