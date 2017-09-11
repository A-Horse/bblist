import React from 'react';
import TodoBoxs from './TodoBoxs';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';

test('TodoBoxs', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <TodoBoxs />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});
