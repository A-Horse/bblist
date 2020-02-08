import React, { Component } from 'react';

import { Side } from '../../../../widget/Side/Side';
import { SideGroup } from '../../../../widget/Side/SideGroup';
import { SideItemLink } from '../../../../widget/Side/SideItemLink';
import { SideItem } from '../../../../widget/Side/SideItem';

import './ProjectWallAside.scss';
import { match } from 'react-router';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  match: match<any>;
}

export class BoardWallAside extends Component<Props> {
  componentWillMount() {}

  render() {
    return (
      <Side className="ProjectWallAside">
        <SideGroup>
          <SideItemLink icon="list-alt" to={``} name="主页" />
          <SideItemLink icon="list-alt" to={`/p`} name="项目" />
          <SideItemLink icon="list-alt" to={`/k`} name="看板" />
        </SideGroup>

        <SideGroup>
          <SideItem icon={faPlusCircle}>新建项目</SideItem>
        </SideGroup>
      </Side>
    );
  }
}
