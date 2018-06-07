import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../Actions/action';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.register = this.register.bind(this);
  }

  render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div style={{textAlign:"center"}}>
          <h1>Login Form</h1>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => this.setState({email: e.target.value})} value={email}/>
          </div>

          <div >
            <label>Password:</label>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})} value={password}/>
          </div>
      
        <input type="submit" value="Login" />
        <input type="button" value="register" onClick={()=>this.register()} />
        <div className="message">
      
      { isLoginPending && <div>please insert valid username and password</div> }
      { isLoginSuccess && <div>user exist{this.props.history.push({pathname:'/userlist'})}</div> }
      { loginError && <div>{loginError.message}</div> }
     
    </div>
        </div>
       
      </form>
  
    )
  }

  register(){
    this.props.history.push({pathname:'/register'});
  }

  onSubmit(e) {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    loginError: state.loginReducer.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);