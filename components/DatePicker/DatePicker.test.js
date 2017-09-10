import React from 'react';
import DatePicker from './DatePicker';
import renderer from 'react-test-renderer';

test('DatePicker', () => {
  const tree = renderer.create(<DatePicker placeholder="i am placeholder" hideIcon={true} />);
  expect(tree).toMatchSnapshot();
});
