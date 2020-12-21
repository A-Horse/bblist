import React, { useState } from 'react';
import { ModalHeader } from '../../widget/Modal/ModalHeader/ModalHeader';
import { AppModal } from '../../widget/Modal/AppModal';
import { AppDateTimePicker } from '../../widget/Datepicker/Datepicker';

import './DateTimeSeletModal.scss';
import { ConfirmButtonGroup } from '../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import moment from 'moment';

interface InputProps {
  onConfirm: Function;
  onCancel: Function;
  isOpen: boolean;
  initialStartTime?: string;
  initialDeadline?: string;
}

export function DateTimeSelectModal({
  initialStartTime,
  initialDeadline,
  isOpen,
  onCancel,
  onConfirm,
}: InputProps) {
  const [startTime, setStartTime] = useState(
    initialStartTime ? moment(initialStartTime).toDate() : null
  );
  const [deadline, setDeadline] = useState(
    initialDeadline ? moment(initialDeadline).toDate() : null
  );

  const closeModal = () => {
    onCancel();
  };

  const onConfirmClick = () => {
    onConfirm({
      startTime,
      deadline,
    });
  };

  return (
    <AppModal
      overlayClassName="DateTimeSelectDialog--overlay"
      className="DateTimeSelectDialog"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <ModalHeader title="开始/到期时间" onClose={closeModal} />

      <div className="DateTimeSelectDialog--main">
        <div>
          <AppDateTimePicker
            placeholder="选择开始时间"
            value={startTime}
            onChange={(value) => setStartTime(value)}
          />
        </div>

        <div>
          <AppDateTimePicker
            placeholder="选择到期时间"
            value={deadline}
            onChange={(value) => setDeadline(value)}
          />
        </div>

        <ConfirmButtonGroup onConfirm={onConfirmClick} onCancel={closeModal} />
      </div>
    </AppModal>
  );
}
