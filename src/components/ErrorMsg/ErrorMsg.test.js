import React from "react";
import ErrorMsg from "./ErrorMsg";
import renderer from "react-test-renderer";

test("ErrorMsg", () => {
  let messages = ["first error", "second error"];
  const tree = renderer.create(<ErrorMsg messages={messages} />);
  expect(tree).toMatchSnapshot();

  messages = [];
  const tree2 = renderer.create(<ErrorMsg messages={messages} />);
  expect(tree2).toMatchSnapshot();

  messages = [null];
  const tree3 = renderer.create(<ErrorMsg messages={messages} />);
  expect(tree3).toMatchSnapshot();
});
