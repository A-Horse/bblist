import React from 'react';
import { BorderLessSelector } from './BorderlessSelect';
import renderer from 'react-test-renderer';

test('BorderLessSelector', () => {
  const assigneeSelector = renderer
    .create(<BorderLessSelector width={100} options={[]} />)
    .toJSON();
  expect(assigneeSelector).toMatchSnapshot();
});
