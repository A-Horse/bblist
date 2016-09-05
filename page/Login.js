import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions/login';
import {browserHistory} from 'react-router';
import {validateFormValue} from '../services/validate-strategy';
import {Button} from '../components/widget/Button';
import {PageContainer} from '../components/widget/PageContainer';
import {LOGIN_SUCCESS} from '../actions/login';

const styles = {
  
};

class Login extends Component {  
  componentWillMount() {
    this.state = {
      errorMessage: {}
    }
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    
    return (
      <PageContainer>
        <div>
          <div>
            <input type='text' ref='email' name='light_email'/>
            <p>{errorMessage.email}</p>
          </div>
          
          <div>
            <input type='password' ref='password'/>
            <p>{errorMessage.password}</p>
          </div>

          <div>
            <Button onClick={this.login.bind(this)}>Login</Button>
          </div>  
        </div>
        
        <a href="/signup">sign up</a>
      </PageContainer>
    )
  }

  login() {
    console.log(this);
    const {dispatch} = this.props;
    
    const email = this.refs.email;
    const password = this.refs.password;
    
    const loginInfo = {
      email: email.value.trim(),
      password: password.value.trim()
    };

    const errorMessage = validateFormValue(loginInfo, {
      email: ['required#required'],
      password: ['required#required']
    });
    

    this.setState({errorMessage: errorMessage});
    
    if( !Object.keys(errorMessage).length ){
      dispatch(loginUser(loginInfo)).then(function(action){
        if( action.type === LOGIN_SUCCESS ){
          browserHistory.push('/');
        } else {
          
        }
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(Login);
