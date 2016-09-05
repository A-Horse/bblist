import React, {Component} from 'react';
import {PageContainer} from '../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../services/gravatar';
import Loading from '../components/widget/loading';

class Profile extends Component {
  componentWillMount() {
    this.state = {
      showChangePassword: false
    };
  }

  render() {
    const {user} = this.props;
    let changePasswordArea;
    if( this.state.showChangePassword ){
      changePasswordArea = (
        <div>
          <div>
            <span>password</span>
            <input type='text' ref='password'/>
          </div>

          <div>
            <span>password</span>
            <input type='text' ref='newPassword'/>
          </div>

          <div>
            <span>repeat password</span>
            <input type='text' ref='repeat'/>
          </div>
        </div>
      )
    }

    if( user ){
      return (
        <PageContainer>
          <h2>Profile</h2>
          <div>
            <img src={makeGravatarUrl(user.email)}/>
          </div>
          <div>
            <button onClick={() => this.setState({showChangePassword: true})}>Change Password</button>
          </div>
          {changePasswordArea}
        </PageContainer>
      )
    }
    return (
      <Loading/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.state.loginUser
  };
};

export default connect(mapStateToProps)(Profile);
