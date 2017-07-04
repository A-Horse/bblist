import React from 'react';
import { Button } from '../../../components/widget/Button';
import { shallow } from 'enzyme';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const button = shallow(
    <Button styleType="primary" size="middle">
      Button
    </Button>
  );

  expect(button.text()).toEqual('Button');
});
