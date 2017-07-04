import React, { Component } from 'react';
import { PageContainer } from 'components/widget/PageContainer';
import { updateTitle } from 'services/title';

import 'style/page/wiki/wiki-page.scss';

export default class WikiPage extends Component {
  state = {};

  componentDidUpdate() {
    updateTitle('Wiki');
  }

  render() {
    return <PageContainer className="wiki-page" />;
  }
}
