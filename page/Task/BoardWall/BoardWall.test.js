import React from 'react';
import BoardWall from './BoardWall';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

test('Button', () => {
  const tree = renderer.create(<BoardWall />);
  expect(tree).toMatchSnapshot();
});
