import moment from 'moment';
import { 
    setStartDate, 
    setEndDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter 
} from '../../actions/filters';

test('should generate setStartDate action object', () => {
   const action = setStartDate(moment(0));
   expect(action).toEqual({
       type: 'SET_START_DATE',
       startDate: moment(0)
   });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
       type: 'SET_END_DATE',
       endDate: moment(0)
   });
});

//sort by amount
test('should generate sort by amount action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
});

//sort by date
test('should generate sort by dateaction object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
});
// set text filter
test('should generate text filter action object with default arg empty string', () => {
   const action = setTextFilter();
   expect(action).toEqual({
       type: 'SET_TEXT_FILTER',
       text: ''
   });
});

test('should generate text filter object', () => {
    const text = '123abc';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});