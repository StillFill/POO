import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl, Col, Row } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../../Styles/Home";
import "../../Styles/Class";
import "../../Styles/RegisterClass";
import ClassCard from "../../Components/Common/ClassCard";
import Modal from "../../Components/Common/Modal";
import RegisterClassPage from "../../Components/Common/RegisterClassPage";
import { iconOptions } from "../../../modules/register-helpers";

class RegisterClass extends Component {
  constructor(props) {
    super(props);

    this.defaultClass = {
      name: "Nome do curso...",
      description: "Descrição...",
      created_by: "Mauricio Gregorio",
      detailed_description: "Descrição mais detalhada",
      price: 300,
      include_list: [{ icon: "fa fa-user", label: "Insira o texto" }]
    };

    this.state = {
      selectedToEdit: null,
      selectedClass: this.defaultClass,
      changedValue: null,
      showLeftBar: false,
      classes: props.classes
    };
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.submitSelectedForm = this.submitSelectedForm.bind(this);
  }

  componentDidMount() {
    const { isEditing, selectedClass } = this.props;
    if (isEditing) this.setState({ selectedClass });
  }

  handleChangeForm({ target: { value, name, id } }) {
    this.setState({ changedValue: value });
  }

  focus(id) {
    document.getElementById(id).focus();
  }

  submitSelectedForm({ key, keyCode }) {
    if (keyCode === 13) {
      const newClass = {
        ...this.state.selectedClass,
        [this.state.selectedToEdit]: this.state.changedValue
      };
      return this.setState(
        {
          selectedClass: newClass,
          selectedToEdit: null
        },
        () => this.props.handleEditClass(this.state.selectedClass)
      );
    } else if (keyCode === 27) {
      // esc
      return this.setState({ selectedToEdit: null, changedValue: null });
    }
  }

  renderForm(identifier, fontSize, isTextArea = false) {
    return (
      <FormControl
        style={{ width: "80%", fontSize }}
        onChange={this.handleChangeForm}
        value={this.state[identifier]}
        onKeyDown={this.submitSelectedForm}
        name={identifier}
        id={identifier}
      />
    );
  }

  showForm(identifier) {
    this.setState({ selectedToEdit: identifier });
    setTimeout(() => {
      this.focus(identifier);
    }, 100);
  }

  renderCondition(identifier, fontSize) {
    if (this.state.selectedToEdit === identifier) {
      return this.renderForm(identifier, fontSize);
    } else {
      return (
        <div
          style={{ fontSize, wordWrap: "break-word" }}
          onDoubleClick={() => this.showForm(identifier)}
        >
          {this.state.selectedClass[identifier]}
        </div>
      );
    }
  }
  render() {
    const { selectedClass } = this.state;
    const {
      name,
      description,
      created_by,
      detailed_description,
      price,
      _id,
      include_list
    } = selectedClass;
    const user = Meteor.user();
    return (
      <div className="selected-class-container">
        <div className="product-principal-header">
          <div>
            <h2>{this.renderCondition("name", "1em")}</h2>
            <h3>{this.renderCondition("description", "1em")}</h3>
          </div>
          <h4 style={{ opacity: 0.6 }}>
            Criado por {this.renderCondition("created_by", "1em")}
          </h4>
        </div>
        <div className="middle-part">
          {!user && (
            <div className="login-warning">
              <p>Efetue o login para comprar este curso!</p>
            </div>
          )}
          <div className="description-card">
            <div className="description">
              {this.renderCondition("detailed_description", "1em")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterClass.propTypes = {
  classes: PropTypes.array
};

export default RegisterClass;
