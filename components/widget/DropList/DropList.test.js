import React from 'react';
import DropList from './DropList';
import renderer from 'react-test-renderer';

test('DropList', () => {
  const tree = renderer.create(<DropList className="custom-droplist" />);
  expect(tree).toMatchSnapshot();
});
