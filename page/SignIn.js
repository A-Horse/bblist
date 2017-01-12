import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signin} from '../actions/login';
import {browserHistory} from 'react-router';
import {validateFormValue, validateFormValue2} from '../services/validate-strategy';
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
    setTimeout(function(){
      this.refs.email.value = '';
      this.refs.password.value = '';
    });
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    // TODO experience HTML5页面才会接受 autoComplete
    // TODO experience button event.preventDefault 会组织 html5 的校验
    return (
      <PageContainer className='signin-page'>
        <div>
          <form className='signin-form' onSubmit={this.login.bind(this)}>
            <div>
              <Input type='text' ref='email' name='bblist-email' required placeholder="Email"/>
              <p>{errorMessage.email}</p>
            </div>

            <div>
              <Input type='password' ref='password' name='bblist-password' required placeholder="Password"/>
              <p>{errorMessage.password}</p>
            </div>

            <div>
              <Button type='submit'>Login</Button>
            </div>
          </form>
        </div>
        <Link to="/signup">Sign up</Link>
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

    const errorMessage2 = validateFormValue2(loginInfo, {
      email: ['email'],
      password: ['required#required']
    });

    console.log(errorMessage2);

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
