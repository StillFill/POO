import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bert } from "meteor/themeteorchef:bert";
import { FormControl, ControlLabel, FormGroup } from "react-bootstrap";
import "react-select/dist/react-select.css";
import "../../Styles/Home";
import "../../Styles/Class";
import "../../Styles/RegisterClass";
import Modal from "../../Components/Common/Modal";
import { invalid } from "moment";

class RegisterClass extends Component {
  constructor(props) {
    super(props);
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
    this.getLabelByIdentifier = this.getLabelByIdentifier.bind(this);
    this.validate = this.validate.bind(this);
  }

  getLabelByIdentifier(identifier) {
    if (identifier === "name") return "Nome";
    if (identifier === "description") return "Descrição";
    if (identifier === "detailed_description") return "Detalhes";
    if (identifier === "price") return "Preço";
  }

  componentDidMount() {
    const { selectedClass } = this.props;
    this.setState({ selectedClass });
  }

  handleChangeForm({ target: { value, name, id } }) {
    const { selectedClass } = this.state;
    selectedClass[name] = value;
    this.setState({ isEditingIdentifier: name }, () =>
      this.setState({ selectedClass })
    );
  }

  focus(id) {
    document.getElementById(id).focus();
  }

  submitSelectedForm({ target: { name }, keyCode }) {
    if (keyCode !== 13) return; // if is not enter
    const newClass = {
      ...this.state.selectedClass,
      [name]: this.state.selectedClass[name]
    };
    this.setState(
      {
        selectedClass: newClass,
        isEditingIdentifier: null
      },
      () => this.props.handleEditClass(newClass)
    );
  }

  renderForm(identifier, fontSize, isTextpriceArea = false) {
    return (
      <FormGroup>
        <ControlLabel>{this.getLabelByIdentifier(identifier)}</ControlLabel>
        <FormControl
          style={{ width: "80%", fontSize }}
          onChange={this.handleChangeForm}
          value={this.state.selectedClass[identifier]}
          onKeyDown={this.submitSelectedForm}
          onBlur={() =>
            this.submitSelectedForm({
              target: { name: identifier },
              keyCode: 13
            })
          }
          type={identifier === "price" ? "number" : "text"}
          name={identifier}
          id={identifier}
        />
      </FormGroup>
    );
  }

  handleChangeImage(e) {
    const image = e.target.value;
    const newClass = this.state.selectedClass;
    newClass.image = image;
    this.setState({ selectedClass: newClass }, () => {
      this.props.handleEditClass(this.state.selectedClass);
    });
  }

  showForm(identifier) {
    this.setState({ isEditingIdentifier: identifier }, () => {
      setTimeout(() => {
        this.focus(identifier);
      }, 100);
    });
  }

  renderCondition(identifier, fontSize) {
    const { isRegister } = this.props;
    const {
      isEditingIdentifier,
      selectedClass: { [identifier]: currentIdentifier }
    } = this.state;
    if (!isRegister) return;
    if (
      !currentIdentifier ||
      currentIdentifier === "" ||
      isEditingIdentifier === identifier
    ) {
      return this.renderForm(identifier, fontSize);
    } else {
      return (
        <div style={{ fontSize, wordWrap: "break-word" }}>
          {identifier === "price" && "R$"}
          {this.state.selectedClass[identifier]}
          <button className="edit-pencil-button" onCli>
            <i
              className="fa fa-pencil-alt"
              onClick={() => this.showForm(identifier)}
            />
          </button>
        </div>
      );
    }
  }

  validate() {
    const { selectedClass } = this.state;
    let invalidFields = [];
    Object.keys(selectedClass).map(key => {
      if (!selectedClass[key] || selectedClass[key] === "") {
        invalidFields.push(key);
      }
    });
    if (invalidFields.length > 0) {
      Bert.alert(
        `Campos que faltam serem preenchidos: ${invalidFields.map(a =>
          this.getLabelByIdentifier(a)
        )}`,
        "danger"
      );
    } else {
      this.props.submitClass();
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
            <button className="success-button" onClick={this.validate}>
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
