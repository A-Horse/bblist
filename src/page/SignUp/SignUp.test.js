import React from "react";
import SignUp from "./SignUp";
import { timeout } from "utils/timeout";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import { fromJS } from "immutable";
import { mount } from "enzyme";

test("SignUp", () => {
  const actions = {};
  const history = {};

  const tree = renderer.create(
    <MemoryRouter>
      <SignUp actions={actions} history={history} />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});

test("SignUp signup", () => {
  const actions = { SIGNUP_REQUEST: jest.fn() };
  const history = { push: jest.fn() };

  const wrapper = mount(
    <MemoryRouter>
      <SignUp actions={actions} history={history} />
    </MemoryRouter>
  );

  const emailInput = wrapper.find('input[name="octopus-email"]');
  const userNameInput = wrapper.find('input[name="octopus-username"]');
  const passwdInput = wrapper.find('input[name="octopus-password"]');
  const cotopusConfirmPasswordInput = wrapper.find(
    'input[name="octopus-confirm-password"]'
  );

  emailInput.simulate("focus");
  emailInput.node.value = "octopus@octopus.com";
  emailInput.simulate("change");

  userNameInput.simulate("focus");
  userNameInput.node.value = "octos";
  userNameInput.simulate("change");

  passwdInput.simulate("focus");
  passwdInput.node.value = "octopus";
  passwdInput.simulate("change");

  cotopusConfirmPasswordInput.simulate("focus");
  cotopusConfirmPasswordInput.node.value = "octopus";
  cotopusConfirmPasswordInput.simulate("change");

  wrapper
    .find(".signup-form")
    .simulate("focus")
    .simulate("submit");

  expect(actions.SIGNUP_REQUEST.mock.calls.length).toBe(1);
  expect(actions.SIGNUP_REQUEST).toBeCalledWith({
    name: "octos",
    email: "octopus@octopus.com",
    password: "octopus",
    confirmPassword: "octopus"
  });
});
