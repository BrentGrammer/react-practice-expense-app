import React from 'react';
// this is from the npm library react-test-renderer used to render the components in tests for testing:
// Shallow rendering is used for components without state or lifecycle events.
// import ReactShallowRenderer from 'react-test-renderer/shallow'; // this was used before installing Enzyme and is a simpler tool
// shallow renderer from Enzyme library:
import { shallow } from 'enzyme';
// enzyme-to-json npm package is needed to use Enzyme with snapshots correctly:
import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render header title correctly', () => {
    // create a wrapper var, call shallow and pass in the component:
    const wrapper = shallow(<Header />);
    // create a snapshot for comparison (you can accept an update in the terminal if needed):
    // toJSON from enzyme-to-json package, extracts rendered output from the wrapper
    expect(toJSON(wrapper)).toMatchSnapshot();
    // use .find() to get elements in the component and make assertions about them:
    expect(wrapper.find('h1').length).toBe(1);

/*
  This is the setup for using react-test-renderer (before Enzyme was installed and used):
  // create a new renderer:
  const renderer = new ReactShallowRenderer();
  // render with the render method on the shallow renderer instance:
  renderer.render(<Header />);
  // getRenderOutput() is how you get the data that was rendered by the shallow renderer:
  expect(renderer.getRenderOutPut()).toMatchSnapshot();
*/
});
