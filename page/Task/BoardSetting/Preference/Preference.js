import React, { Component } from 'react';
import RadioGroup from 'components/widget/RadioGroup';

import './Preference.scss';

class Preference extends Component {
  render() {
    return (
      <div className="board-setting-preference">
        <h3>Preference</h3>

        <div className="board-notification">
          <div className="board-notification--heading">Notification:</div>

          <RadioGroup
            name="board-preference-notification"
            onChange={this.onNotificationSettingChange.bind(this)}
            radioArray={[
              { value: true, text: 'Receive notification' },
              { value: false, text: 'Notifications are not received' }
            ]}
          />
        </div>
      </div>
    );
  }

  onNotificationSettingChange() {}
}

export default Preference;
