import React from 'react';
import Todo from './Todo';
import renderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { fromJS } from 'immutable';

test('Todo Component render', () => {
  const todo = fromJS({
    id: 76,
    userId: 2,
    todoBoxId: null,
    content: "I'am a Todo.",
    remark: null,
    isDone: 1,
    isStar: 0,
    repeat: '2',
    deadline: null,
    noticeTime: null,
    doneTime: null,
    tags: null,
    created_at: 1498739573140,
    updated_at: null,
    isDelete: null
  });

  const mockDispatch = jest.fn();
  const tree = renderer.create(<Todo todo={todo} dispatch={mockDispatch} />, {
    createNodeMock: () => document.createElement('textarea')
  });
  expect(tree).toMatchSnapshot();
});
