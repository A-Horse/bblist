import React from 'react';
import TodoCreater from './TodoCreater';
import renderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';

test('TodoCreater Component render', () => {
  const actions = {};
  const tree = renderer.create(<TodoCreater actions={actions} />, {
    createNodeMock: () => document.createElement('textarea')
  });
  expect(tree).toMatchSnapshot();
});
