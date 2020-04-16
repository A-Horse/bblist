import React from 'react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { AppIcon } from '../../../../../widget/Icon';
import { AppButton } from '../../../../../widget/Button';

export function NoColumnGuide(props: { openSetting: Function }) {
  return (
    <div className="NoColumnGuide">
      <div className="NoColumnGuide--box">
        <AppIcon size="3x" color="#999" icon={faBoxOpen} />
        <div className="NoColumnGuide--text">这个看板还没有价值列</div>

        <div>
          <AppButton type="primary" onClick={props.openSetting}>
            配置看板
          </AppButton>
        </div>
      </div>
    </div>
  );
}
