import React from "react";
import TodoBoxCreater from "./TodoBoxCreater";
import renderer from "react-test-renderer";

test("TodoBoxCreater", () => {
  const actions = {};
  const tree = renderer.create(<TodoBoxCreater actions={actions} />);
  expect(tree).toMatchSnapshot();
});
