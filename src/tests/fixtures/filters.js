// Used to test ExpenseListFilters.js

import moment from 'moment';

// export two sets of filters - one with default values and others with inputted populated values simulated:

const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}


const altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export { filters, altFilters };