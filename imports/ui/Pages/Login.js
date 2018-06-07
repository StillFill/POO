import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { FormControl, ControlLabel } from "react-bootstrap";
import { Bert } from "meteor/themeteorchef:bert";
import { Accounts } from "meteor/accounts-base";
import "../Styles/Login";
import { Mongo } from "meteor/mongo";

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
    Meteor.loginWithPassword(
      this.state.login,
      this.state.password,
      (error, result) => {
        if (error) {
          Bert.alert("Login ou senha invalidos", "warning");
        } else {
          const user = Meteor.user();
          Bert.alert(`Bem vindo ${user.username}`, "success");
          if (user.type === "admin") {
            window.location.pathname = "/cadastro-dono";
          } else if (user.type === "caixa") {
            window.location.pathname = "/vendas";
          } else if (user.type === "dono") {
            window.location.pathname = "/relatorio";
          }
        }
      }
    );
  }

  render() {
    console.log(Meteor.user());
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
