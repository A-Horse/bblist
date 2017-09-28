import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/widget/Button/Button';
import { isEnterKey } from 'utils/keyboard';

import './TrackCreater.scss';

class TrackCreater extends Component {
  static propTypes = {
    addTrack: PropTypes.func.isRequired
  };

  state = {
    name: null,
    toggle: false
  };

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addTrack() {
    console.log(this.state);

    this.props.addTrack({ name: this.state.name.trim() });
  }

  toggle() {
    this.setState({ toggle: true });
  }

  close() {
    this.setState({ toggle: false });
  }

  onKeyDown(event) {
    if (isEnterKey(event)) {
      this.addTrack();
      this.close();
    }
  }

  render() {
    return (
      <div className="tasklist-creater">
        {this.state.toggle ? (
          <div className="task-track-input">
            <input
              type="text"
              placeholder="write track name"
              onChange={event => this.setState({ name: event.target.value })}
              onKeyDown={this.onKeyDown}
            />
            <Button className="creater-button" styleType="primary" onClick={this.addTrack}>
              OK
            </Button>
            <Button onClick={this.close}>Cancel</Button>
          </div>
        ) : (
          <div onClick={this.toggle} className="task-track--toggle">
            <i className="fa fa-plus" aria-hidden="true" />
            <span>Add a Track...</span>
          </div>
        )}
      </div>
    );
  }
}

export default TrackCreater;
