import React, { Component } from "react";
import { FormControl, ControlLabel } from "react-bootstrap";
import "../Styles/Login";
import { doLogin } from "../../modules/student-helpers";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: ""
    };
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
  }
  onLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  login() {
    const { password, login } = this.state;
    doLogin({ login, password }, err => {
      if (!err) {
        this.props.closeModal();
        this.props.callback();
      }
    });
  }

  render() {
    return (
      <div className="login-container">
        <div className="inputs-container">
          <div className="input-row">
            <ControlLabel>Login</ControlLabel>
            <FormControl
              onChange={this.onLoginChange}
              value={this.state.login}
            />
          </div>
          <div className="input-row">
            <ControlLabel>Senha</ControlLabel>
            <FormControl
              type="password"
              onChange={this.onPasswordChange}
              value={this.state.password}
            />
          </div>
          <div className="login-button-container">
            <button className="login-button" onClick={this.login}>
              LOGAR
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
