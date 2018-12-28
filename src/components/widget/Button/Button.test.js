import React from 'react';
import Button from './Button';
import renderer from 'react-test-renderer';
import { fromJS } from 'immutable';

test('Button', () => {
  const tree = renderer.create(
    <Button className="signin-button" size="large" type="submit" styleType="primary" />
  );
  expect(tree).toMatchSnapshot();
});
