import React from "react";
import TodoBoxs from "./TodoBoxs";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";
import { fromJS } from "immutable";

test("TodoBoxs", () => {
  const actions = {
    GET_TODOBOXS_REQUEST: jest.fn()
  };

  const todoBoxs = fromJS([
    { name: "Work Todo", id: 1 },
    { name: "Home Todo", id: 2 }
  ]);

  const tree = renderer.create(
    <MemoryRouter>
      <TodoBoxs actions={actions} todoBoxs={todoBoxs} />
    </MemoryRouter>
  );
  expect(tree).toMatchSnapshot();
});
