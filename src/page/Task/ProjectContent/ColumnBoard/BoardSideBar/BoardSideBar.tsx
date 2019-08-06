import React, { Component } from 'react';

import './BoardSideBar.scss';
import { Side } from '../../../../../components/widget/Side/Side';
import { SideItem } from '../../../../../components/widget/Side/SideItem';

export class BoardSideBar extends Component<{}> {
  render() {
    return (
        <div>
            <Side>
                <SideItem name="kanban" />
                <SideItem name="trackers" />
                <SideItem name="setting" />
            </Side>
        </div>
    );
  }
}
