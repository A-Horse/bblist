import React from 'react';
import SignIn from './SignIn';
import { timeout } from 'utils/timeout';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';
import { fromJS } from 'immutable';
import { mount } from 'enzyme';

test('SignIn', () => {
  const actions = {};
  const history = { push: jest.fn() };
  const signInErrorMessages = null;

  const tree = renderer.create(
    <MemoryRouter>
      <SignIn actions={actions} history={history} signInErrorMessages={signInErrorMessages} />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});

test('SignIn signin', () => {
  const actions = { LOGIN_REQUEST: jest.fn() };
  const history = { push: jest.fn() };
  const signInErrorMessages = null;

  const wrapper = mount(
    <MemoryRouter>
      <SignIn actions={actions} history={history} signInErrorMessages={signInErrorMessages} />
    </MemoryRouter>
  );

  const emailInput = wrapper.find('input[name="octopus-email"]');
  const passwdInput = wrapper.find('input[name="octopus-password"]');

  emailInput.simulate('focus');
  emailInput.node.value = 'octopus@octopus.com';
  emailInput.simulate('change', { target: { value: 'octopus@octopus.com' } });

  passwdInput.simulate('focus');
  passwdInput.node.value = 'octopus';
  passwdInput.simulate('change', { target: { value: 'octopus' } });

  wrapper
    .find('.signin-form')
    .simulate('focus')
    .simulate('submit');

  expect(actions.LOGIN_REQUEST.mock.calls.length).toBe(1);
});
