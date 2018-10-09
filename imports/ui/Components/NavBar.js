import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import "../Styles/NavBar.css";
import Modal from "./Common/Modal";
import { FormControl, ControlLabel } from "react-bootstrap";
import { doLogin } from "../../modules/student-helpers";
import UserOptions from "../Components/UserOptions";
import { browserHistory } from "react-router";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logout() {
    Meteor.logout();
  }

  sendTo(route) {
    window.location.pathname = route;
  }

  async handleSubmit() {
    const { name, email, password, showRegisterModal, login } = this.state;
    if (showRegisterModal) {
      Meteor.call(
        "createNewUser",
        {
          name,
          email,
          password,
          type: "student"
        },
        err => {
          if (err) console.log(err);
          else {
            doLogin({ login: email, password });
            this.setState({ showRegisterModal: false });
          }
        }
      );
    } else {
      doLogin({ login, password }, err => {
        if (!err) this.setState({ showLoginModal: false });
        else window.location.pathname = "/home";
      });
    }
  }

  handleInputChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  render() {
    const user = Meteor.user();
    const isMobile = screen.width <= 768;
    return (
      <div className="navbar-container">
        {!isMobile && (
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => this.sendTo("/home")}
          >
            Aquamarine
          </h2>
        )}
        {user || isMobile ? (
          <UserOptions
            loginOptions={[
              {
                label: "Login",
                icon: "fa fa-cog",
                action: () => this.setState({ showLoginModal: true })
              },
              {
                label: "Cadastrar",
                icon: "fa fa-sign-out-alt",
                action: () => this.setState({ showRegisterModal: true })
              }
            ]}
          />
        ) : (
          <div className="user-buttons">
            <button
              className="login-button"
              onClick={() => this.setState({ showLoginModal: true })}
            >
              Login
            </button>
            <button
              className="register-button"
              onClick={() => this.setState({ showRegisterModal: true })}
            >
              Cadastrar-se
            </button>
          </div>
        )}
        <Modal
          confirmationCallback={this.handleSubmit}
          title="Login"
          showModal={this.state.showLoginModal}
          confirmationButtonTitle="Logar"
          closeModal={() => this.setState({ showLoginModal: false })}
        >
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Login</ControlLabel>
            <FormControl
              value={this.state.login}
              onChange={this.handleInputChange}
              name="login"
            />
          </div>
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl
              value={this.state.password}
              type="password"
              onChange={this.handleInputChange}
              name="password"
            />
          </div>
        </Modal>
        <Modal
          confirmationCallback={this.handleSubmit}
          title={"Cadastrar-se"}
          showModal={this.state.showRegisterModal}
          closeModal={() => this.setState({ showRegisterModal: false })}
        >
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Nome</ControlLabel>
            <FormControl
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
            />
          </div>
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
            />
          </div>
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Senha</ControlLabel>
            <FormControl
              value={this.state.password}
              type="password"
              onChange={this.handleInputChange}
              name="password"
            />
          </div>
          <div style={{ marginTop: "0.5em" }}>
            <ControlLabel>Confirmar Senha</ControlLabel>
            <FormControl
              value={this.state.password_confirmation}
              type="password"
              onChange={this.handleInputChange}
              name="password_confirmation"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object
};

export default NavBar;
