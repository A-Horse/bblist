import React, { useState } from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { AppIcon } from '../../../../../widget/Icon';
import { AppButton } from '../../../../../widget/Button';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';

export function NoColumnGuide(props: { kanbanID: string }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="NoColumnGuide">
      <div className="NoColumnGuide--box">
        <AppIcon size="3x" color="#999" icon={faBoxOpen} />
        <div className="NoColumnGuide--text">这个看板还没有价值列</div>

        <div>
          <AppButton type="primary" onClick={() => setModalVisible(true)}>
            配置看板
          </AppButton>
        </div>
      </div>

      <KanbanSettingModal
        kanbanId={props.kanbanID}
        toggle={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
