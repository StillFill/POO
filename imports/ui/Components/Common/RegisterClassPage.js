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
    console.log(props.selectedClass);
    this.state = {
      selectedToEdit: null,
      selectedClass: props.selectedClass,
      changedValue: null,
      showLeftBar: false,
      classes: props.classes
    };
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.submitSelectedForm = this.submitSelectedForm.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  componentDidMount() {
    const { selectedClass } = this.props;
    this.setState({ selectedClass });
  }

  handleChangeForm({ target: { value, name, id } }) {
    this.setState({ changedValue: value });
  }

  focus(id) {
    document.getElementById(id).focus();
  }

  submitSelectedForm({ key, keyCode }) {
    if (keyCode === 13) {
      console.log("UE");
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

  renderForm(identifier, fontSize, isTextpriceArea = false) {
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

  handleChangeImage(e) {
    const image = e.target.value;
    const newClass = this.state.selectedClass;
    newClass.image = image;
    this.setState({ selectedClass: newClass }, () => {
      this.props.handleEditClass(this.state.selectedClass);
    });
  }

  renderCondition(identifier, fontSize) {
    const { isRegister } = this.props;
    if (!isRegister) return;
    if (this.state.selectedToEdit === identifier) {
      return this.renderForm(identifier, fontSize);
    } else {
      return (
        <div
          style={{ fontSize, wordWrap: "break-word" }}
          onDoubleClick={() => this.showForm(identifier)}
        >
          {identifier === "price" && "R$"}
          {this.state.selectedClass[identifier]}
        </div>
      );
    }
  }
  render() {
    const { isEditing, backCallback, isRegister } = this.props;
    return (
      <div className="selected-class-container">
        <div className="header-buttons">
          {isRegister && (
            <button onClick={backCallback}>
              <i className="fa fa-arrow-left" />
            </button>
          )}
          <button
            onClick={() => this.setState({ showImageModal: true })}
            className="success-button"
            style={{ width: "100%" }}
          >
            Adicionar imagem
          </button>
        </div>
        <div
          className="product-principal-header"
          style={{ backgroundImage: `url(${this.state.selectedClass.image})` }}
        >
          <div>
            <div>
              <h2>{this.renderCondition("name", "1em")}</h2>
              <h3>{this.renderCondition("description", "1em")}</h3>
            </div>
            <h4 style={{ opacity: 0.6 }}>
              Criado por {this.renderCondition("created_by", "1em")}
            </h4>
          </div>
          <div>
            <span>{this.renderCondition("price", "2em")}</span>
          </div>
        </div>
        <div className="middle-part">
          <div className="description-card">
            <div className="description">
              {this.renderCondition("detailed_description", "1em")}
            </div>
          </div>
        </div>
        {isRegister && (
          <div className="submit-class-button">
            <button
              className="success-button"
              onClick={this.props.handleAddLessons}
            >
              Adicionar aulas
            </button>
            <button className="success-button" onClick={this.props.submitClass}>
              {isEditing ? "Atualizar" : "Cadastrar"}
            </button>
          </div>
        )}
        <Modal
          showModal={this.state.showImageModal}
          closeModal={() => this.setState({ showImageModal: false })}
          confirmationCallback={() => this.setState({ showImageModal: false })}
        >
          <FormControl
            onChange={this.handleChangeImage}
            value={this.state.selectedClass.image}
          />
        </Modal>
      </div>
    );
  }
}

RegisterClass.propTypes = {
  classes: PropTypes.array
};

export default RegisterClass;
