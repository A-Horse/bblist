import React, {Component} from 'react';
import {connect} from 'react-redux';

import {validateFormValue} from '../services/validate-strategy';
import { browserHistory } from 'react-router';
import {PageContainer} from 'components/widget/PageContainer';
import {Input} from '../components/widget/Input';
import {updateTitle} from 'services/title';
import {Button} from '../components/widget/Button';
import {LogoBan} from 'components/commons/LogoBan';
import {isEnterKey} from 'utils/keyboard';
import {ErrorMsg} from 'components/ErrorMsg';
import {Link} from 'react-router';
import R from 'ramda';

import 'style/page/building.scss';

class Building extends Component {
  componentDidMount() {
    updateTitle('Sign Up');
  }

  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }
  
  render() {
    return (
        <div className='building'>
          <img className='building--illustration' src='/static/image/building-illustration.png'/>
        </div>
    );
  }

}

export default Building;
