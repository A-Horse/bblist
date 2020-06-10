import React, { useState } from 'react';
import { AppModal } from '../../../../../widget/Modal/AppModal';
import { ModalHeader } from '../../../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { ColumnSelect } from '../../../ColumnSelect/ColumnSelect';
import { ModalContent } from '../../../../../widget/Modal/ModalContent';
import './MoveIssueModal.scss';
import { IProjectIssue } from '../../../../../typings/project-issue.typing';

export function MoveIssueModal(props: {
  visible: boolean;
  onClose: Function;
  onFieldChange: Function;
  kanbanId?: string;
  projectId: string;
  issue: IProjectIssue;
}) {
  const [selectedColumnId, setSelectedColumnID] = useState(
    props.issue.columnId
  );
  const onConfirm = () => {
    props.onFieldChange('columnId', selectedColumnId);
    props.onClose();
  };

  return (
    <AppModal
      className="MoveIssueModal"
      isOpen={props.visible}
      onRequestClose={() => props.onClose()}
    >
      <ModalHeader title="移动卡片" onClose={props.onClose} />

      {props.kanbanId && (
        <ModalContent>
          <div>
            列表
            <ColumnSelect
              selectedColumnId={selectedColumnId}
              kanbanId={props.kanbanId}
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
