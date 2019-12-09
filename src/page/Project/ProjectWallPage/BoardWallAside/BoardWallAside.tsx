import React, { Component } from 'react';

import { Side } from '../../../../components/widget/Side/Side';
import { SideGroup } from '../../../../components/widget/Side/SideGroup';
import { SideItemLink } from '../../../../components/widget/Side/SideItemLink';

interface Props {}

export class BoardWallAside extends Component<Props> {
  componentWillMount() {}

  render() {
    return (
      <Side className="ProjectSideBar">
        <SideGroup>
          <SideItemLink icon="list-alt" to={``} name="Kanban" />
        </SideGroup>
      </Side>
    );
  }
}
