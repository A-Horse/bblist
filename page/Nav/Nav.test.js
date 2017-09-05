import React from 'react';
import Nav from './Nav';
import renderer from 'react-test-renderer';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { MemoryRouter } from 'react-router';
import { fromJS } from 'immutable';
import history from '../../services/history';
import { mount } from 'enzyme';

const user = fromJS({
  created_at: null,
  desc: null,
  email: 'jest@facebook.com',
  id: 34,
  status: null,
  type: null,
  updated_at: null,
  username: 'jest'
});

test('Website Nav', () => {
  const actions = {
    LOGOUT_FN: jest.fn()
  };
  const tree = renderer.create(
    <MemoryRouter>
      <Nav user={user} actions={actions} />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});

test('Website Nav behavior', () => {
  history.location.pathname = '/todo';

  const actions = {
    LOGOUT_FN: jest.fn()
  };
  const wrapper = mount(
    <MemoryRouter>
      <Nav user={user} actions={actions} />
    </MemoryRouter>
  );

  expect(wrapper.find('.nav-link-area .active').text()).toEqual('Todo');
  wrapper.find('.nav-avatar').simulate('click');
  wrapper.find('.logout-button').simulate('click');
  expect(actions.LOGOUT_FN.mock.calls.length).toBe(1);
});
