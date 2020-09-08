import React, { useState } from 'react';
import { AttachmentPrevious } from './AttachmentPrevious';
import axios from 'axios';
import { useHover } from '../../../../../hook/useHover';
import { AppButton } from '../../../../../widget/Button';
import { useDispatch } from 'react-redux';
import { removeIssueAttachmentRequest } from '../../../../../redux/actions/attachment.action';
import { AxiosDispatch } from '../../../../../typings/util.typing';
import { queryProjectIssueDetailRequest } from '../../../../../redux/actions/project-issue-detail.action';
import { ConfirmModal } from '../../../../Modal/ConfirmModal';

export function Attachment({ attachment, issue }) {
  const dispatch = useDispatch<AxiosDispatch>();
  const [hoverRef, isHover] = useHover();
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);

  const onDownload = (attachment) => {
    axios
      .get(`/api/issue/${issue.id}/attachment/${attachment.id}`, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const blob = new Blob([res.data], { type: attachment.contentType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = attachment.fileName;
        link.click();
      });
  };

  const removeAttachment = () => {
    dispatch(
      removeIssueAttachmentRequest({
        issueId: issue.id,
        attachmentId: attachment.id,
      })
    ).then(() => {
      dispatch(queryProjectIssueDetailRequest({ issueId: issue.id }));
      setShowRemoveConfirmModal(false);
    });
  };

  return (
    <div
      ref={hoverRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginBottom: 6,
          borderRadius: 3,
        ...(isHover ? { backgroundColor: 'rgba(9,30,66,.04)' } : {}),
      }}
    >
      <AttachmentPrevious attachment={attachment} />

      <div
        style={{
          marginLeft: 12,
        }}
      >
        <div
          style={{
            color: '#172b4d',
            fontWeight: 700,
          }}
        >
          {attachment.fileName}
        </div>

        <div>
          <AppButton
            type="link"
            size="sm"
            style={{ marginRight: 8 }}
            onClick={() => setShowRemoveConfirmModal(true)}
          >
            删除
          </AppButton>
          <AppButton
            type="link"
            size="sm"
            onClick={() => onDownload(attachment)}
          >
            下载
          </AppButton>
        </div>
      </div>

      <ConfirmModal
        visible={showRemoveConfirmModal}
        onConfirm={removeAttachment}
        onCancel={() => setShowRemoveConfirmModal(false)}
        confirmTextTip={'确定要删除附件吗？(' + attachment.fileName + ')'}
        confirmButtonText="删除"
      />
    </div>
  );
}
