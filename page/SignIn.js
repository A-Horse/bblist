import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signin} from '../actions/login';
import {browserHistory} from 'react-router';
import {validateFormValue} from '../services/validate-strategy';
import {Button} from '../components/widget/Button';
import {Input} from '../components/widget/Input';
import {PageContainer} from '../components/widget/PageContainer';
import {Link} from 'react-router';

const styles = {
  
};

class SignIn extends Component {  
  componentWillMount() {
    this.state = {
      errorMessage: {}
    };
  }

  componentDidMount() {
    this.refs.email.value = '';
    this.refs.password.value = '';
  }
  
  render() {
    const errorMessage = this.state.errorMessage;
    
    return (
      <PageContainer>
        <div>
          <form autocomplete="off">
            <div>
              <Input type='text' ref='email' name='bblist-email' required placeholder="Email" autoComplete='off'/>
              <p>{errorMessage.email}</p>
            </div>
            
            <div>
              <Input type='password' ref='password' name='bblist-password' required placeholder="Password" autoComplete='off'/>
              <p>{errorMessage.password}</p>
            </div>

            <div>
              <Button type='submit' onClick={this.login.bind(this)}>Login</Button>
            </div>
          </form>
        </div>
        <Link to="/signup" style={styles.linkStyle}>Sign up</Link>
      </PageContainer>
    );
  }

  onInputKeyDown() {
    
  }

  login() {
    const {dispatch} = this.props;
    
    const email = this.refs.email;
    const password = this.refs.password;
    
    const loginInfo = {
      email: email.instance.value.trim(),
      password: password.instance.value.trim()
    };

    const errorMessage = validateFormValue(loginInfo, {
      email: ['required#required'],
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
