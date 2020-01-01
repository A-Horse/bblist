import React from 'react';
import { BorderlessSelector } from './BorderlessSelect';
import renderer from 'react-test-renderer';

test('BorderlessSelector', () => {
  const assigneeSelector = renderer
    .create(<BorderlessSelector width={100} options={[]} />)
    .toJSON();
  expect(assigneeSelector).toMatchSnapshot();
});
