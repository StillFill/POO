import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "./Common/Modal";
import { FormControl, ControlLabel } from "react-bootstrap";
import { doLogin } from "../../modules/student-helpers";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    const { name, email, password, showRegisterModal } = this.state;
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
          doLogin({ login: email, password }, err => {
            if (!err) {
              this.props.closeModal();
              this.props.callback();
            }
          });
        }
      }
    );
  }

  handleInputChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }
  render() {
    return (
      <Modal
        confirmationCallback={this.handleSubmit}
        title={"Cadastrar-se"}
        showModal={this.props.showRegisterModal}
        closeModal={this.props.closeModal}
        small
      >
        <div style={{ marginTop: "1rem" }}>
          <ControlLabel>Nome</ControlLabel>
          <FormControl
            value={this.state.name}
            onChange={this.handleInputChange}
            name="name"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <ControlLabel>Senha</ControlLabel>
          <FormControl
            value={this.state.password}
            type="password"
            onChange={this.handleInputChange}
            name="password"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <ControlLabel>Confirmar Senha</ControlLabel>
          <FormControl
            value={this.state.password_confirmation}
            type="password"
            onChange={this.handleInputChange}
            name="password_confirmation"
          />
        </div>
      </Modal>
    );
  }
}

export default Register;

Register.propTypes = {
  callback: PropTypes.func,
  showRegisterModal: PropTypes.bool,
  closeModal: PropTypes.func
};

Register.defaultProps = {
  callback: () => {}
};
