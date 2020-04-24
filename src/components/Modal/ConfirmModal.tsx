import React, { CSSProperties } from 'react';
import { AppModal } from '../../widget/Modal/AppModal';
import { ConfirmButtonGroup } from '../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { ModalHeader } from '../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../widget/Modal/ModalFooter/ModalFooter';
import { ModalContent } from '../../widget/Modal/ModalContent';

import './ConfirmModal.scss';

export function ConfirmModal(props: {
  modalContainerStyle?: CSSProperties;
  visible: boolean;
  onConfirm: Function;
  onCancel: Function;
  confirmTextTip: string;
  confirmButtonText: string;
}) {
  return (
    <AppModal className="ConfirmModal" isOpen={props.visible}>
      <ModalHeader title="删除价值列" onClose={props.onCancel} />
      <ModalContent>{props.confirmTextTip}</ModalContent>

      <ModalFooter
        style={{
          justifyContent: 'center',
        }}
      >
        <ConfirmButtonGroup
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
          confirmText="删除"
          confirmButtonType="danger"
        ></ConfirmButtonGroup>
      </ModalFooter>
    </AppModal>
  );
}
