import React, { useState } from 'react';
import { AppModal } from '../../../../../widget/Modal/AppModal';
import { ModalHeader } from '../../../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';
import { ModalContent } from '../../../../../widget/Modal/ModalContent';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';
import './MoveIssueModal.scss';

export function MoveIssueModal(props: {
  visible: boolean;
  onClose: Function;
  kanbanID?: string;
  projectID: string;
  issue: ProjectIssueRecord;
}) {
  const [selectedColumnID, setSelectedColumnID] = useState(
    props.issue.get('columnID')
  );
  const onConfirm = () => {};
  return (
    <AppModal
      className="MoveIssueModal"
      isOpen={props.visible}
      onRequestClose={() => props.onClose()}
    >
      <ModalHeader title="移动卡片" onClose={props.onClose} />

      {props.kanbanID && (
        <ModalContent>
          <div>
            列表
            <ColumnSelect
              selectedColumnID={selectedColumnID}
              kanbanID={props.kanbanID}
              onChange={(option) => {
                setSelectedColumnID(option.value);
              }}
            />
          </div>
        </ModalContent>
      )}
      <ModalFooter>
        <ConfirmButtonGroup
          onConfirm={onConfirm}
          onCancel={props.onClose}
          confirmText="确定"
        />
      </ModalFooter>
    </AppModal>
  );
}
