// Added to enable use of process.env vars set in webpack.config.js for testing with the test database.
//require('dotenv').config({ path: '.env.test' });
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// set up Enzyme to work with the adapter for react 16:
// configure() takes an object of options.  set the adapter option to a new instance of Adapter:
Enzyme.configure({
  adapter: new Adapter()
});
