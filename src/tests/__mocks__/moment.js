/** This mocks the moment.js library which is used on components like ExpenseForm.js and is used for snapshot testing,
 *  since moment() returns a current time on each render of ExpenseForm and will cause every proceeding snapshot test
 *  to fail.  This sets a fn that will return consistent data to match the snapshot instead of a new current time on every render.
 */
 // import moment from 'moment'; // ***This will not work because it will look for the mocked version and create an infinite stack trace.
 // ** Need to use the jest provided require.requireActual() method to get the original moment library imported:
 const moment = require.requireActual('moment');
// define a function that will take the place of moment() fn imported on components like ExpenseForm.js:
// setting timestamp to a default of 0 will simulate a call to moment for the current time(no args passed in), but always set
// it to 0, so that when the shallow render calls moment(), it will always be 0 and match the snapshot.  If there is
// an arg passed in (the createdAt value of the expense), then it will function normally.
// The main purpose of this mock function for moment was to set the no arg return value to a consistent value instead of
// the current time which would make all future tests not match the snapshot when shallow rendered.
 export default (timestamp = 0) => {
   return moment(timestamp);
 };
