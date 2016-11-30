import React, {Component, PropTypes} from 'react';
import 'style/component/widget/page-container.scss';

export class PageContainer extends Component {
  propTypes: {
    children: PropTypes.isRequired
  }

  buildClassName() {
    let className = 'page-container';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return className;
  }
  
  render() {
    return (
      <div className={this.buildClassName()}>
        {this.props.children}
      </div>
    );
  }
}

