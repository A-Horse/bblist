import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signin} from '../actions/login';
import {browserHistory} from 'react-router';
import {validateFormValue} from '../services/validate-strategy';
import {Button} from '../components/widget/Button';
import {Input} from '../components/widget/Input';
import {PageContainer} from '../components/widget/PageContainer';
import {Link} from 'react-router';

import 'style/page/signin.scss';

class SignIn extends Component {  
  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }

  componentDidMount() {
    document.title = 'Octopus Login';
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    // TODO experience HTML5页面才会接受 autoComplete
    // TODO experience button event.preventDefault 会组织 html5 的校验
    return (
      <PageContainer className='signin-page'>

        <div className='signin-main'>
          <form className='signin-form' onSubmit={this.login.bind(this)}>
            <div>
              <Input type='text' ref='email' name='bblist-email' required placeholder="Email"/>
              <p>{errorMessage.email}</p>
            </div>

            <div>
              <Input type='password' ref='password' name='bblist-password' required placeholder="Password"/>
              <p>{errorMessage.password}</p>
            </div>

            <Button className='signin-button' size='large' type='submit' styleType='primary'>Login</Button>

          </form>
          <Link className='signup-link' to="/signup">Sign up</Link>
        </div>
        
      </PageContainer>
    );
  }

  onInputKeyDown() {
    
  }

  login(event) {
    event.preventDefault();
    const {dispatch} = this.props;

    const email = this.refs.email;
    const password = this.refs.password;
    
    const loginInfo = {
      email: email.instance.value.trim(),
      password: password.instance.value.trim()
    };

    const errorMessage = validateFormValue(loginInfo, {
      email: ['email'],
      password: ['required#required']
    });

    this.setState({errorMessage: errorMessage});    
    if( !Object.keys(errorMessage).length ){
      dispatch(signin(loginInfo)).then(() => {
        browserHistory.push('/');
      });
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(SignIn);
