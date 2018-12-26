import React from "react";
import CardCreater from "./CardCreater";
import renderer from "react-test-renderer";

test("Task CardCreater", () => {
  const tree = renderer.create(<CardCreater />);
  expect(tree).toMatchSnapshot();
});
