import React, { Component } from 'react';

import { Side } from '../../../../widget/Side/Side';
import { SideGroup } from '../../../../widget/Side/SideGroup';
import { SideItemLink } from '../../../../widget/Side/SideItemLink';

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
