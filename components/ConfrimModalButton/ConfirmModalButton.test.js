import React from 'react';
import ConfirmModalButton from './ConfirmModalButton';
import renderer from 'react-test-renderer';

test('ConfirmModalButton', () => {
  const onConfirm = jest.fn();
  const tree = renderer.create(
    <ConfirmModalButton className="confirm-modal-button" onConfirm={onConfirm}>
      ConfirmModalButton
    </ConfirmModalButton>
  );
  expect(tree).toMatchSnapshot();
});
