import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';
import RadioGroup from 'components/widget/RadioGroup';
import Button from 'components/widget/Button';

import 'style/page/task/setting/preference.scss';

class Preference extends Component {
  render() {
    return (
      <div className='board-setting-preference'>
        <h3>Preference</h3>

        <div className='board-notification'>
          <div className='board-notification--heading'>Notification:</div>

          <RadioGroup name='board-preference-notification'
                      onChange={this.onNotificationSettingChange.bind(this)}
                      radioArray={[
                        {value: true, text: 'Receive notification'},
                        {value: false, text: 'Notifications are not received'}
                      ]}/>
        </div>
      </div>
    );
  }

  onNotificationSettingChange() {
  }
}

export default Preference;
