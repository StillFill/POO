import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import Select from "react-select";
import "react-select/dist/react-select.css";
import "../Styles/Home";
import "../Styles/Class";
import "../Styles/RegisterClass";
import { iconOptions } from "../../modules/register-helpers";

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
      class: this.defaultClass,
      changedValue: null,
      showLeftBar: false,
      classes: props.classes
    };
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.submitSelectedForm = this.submitSelectedForm.bind(this);
    this.addNewInclude = this.addNewInclude.bind(this);
    this.submitClass = this.submitClass.bind(this);
    this.showBar = this.showBar.bind(this);
    this.filterClasses = this.filterClasses.bind(this);
    this.removeClass = this.removeClass.bind(this);
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
        ...this.state.class,
        [this.state.selectedToEdit]: this.state.changedValue
      };
      return this.setState({
        class: newClass,
        selectedToEdit: null
      });
    } else if (keyCode === 27) {
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
    });
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
          {this.state.class[identifier]}
        </div>
      );
    }
  }

  setLabel({ keyCode }, label, index) {
    if (keyCode !== 13) {
      return;
    }
    const include_list = this.state.class.include_list;
    include_list[index].label = label;
    this.setState({
      class: { ...this.state.class, include_list },
      selectedLabel: null
    });
  }

  resetLabel(index) {
    const include_list = this.state.class.include_list;
    include_list[index].label = null;
    this.setState({ class: { ...this.state.class, include_list } });
  }

  setIcon(icon, index) {
    const include_list = this.state.class.include_list;
    include_list[index].icon = icon;
    this.setState({ class: { ...this.state.class, include_list } });
  }

  resetIcon(index) {
    const include_list = this.state.class.include_list;
    include_list[index].icon = null;
    this.setState({ class: { ...this.state.class, include_list } });
  }

  addNewInclude() {
    const newClass = this.state.class;
    const include_list = this.state.class.include_list;
    this.setState({
      class: {
        ...newClass,
        include_list: [
          ...include_list,
          { icon: "fa fa-user", label: "Insira o texto..." }
        ]
      }
    });
  }

  submitClass() {
    const newClass = this.state.class;
    let method = "insertClass";
    if (this.state.isEditing) method = "updateClass";
    Meteor.call(method, newClass, (err, classId) => {
      if (err) console.log(err);
      else
        this.setState({ class: this.defaultClass, isEditing: false }, () => {
          const message = this.state.isEditing ? "atualizado" : "cadastrado";
          Bert.alert(`Curso ${message} com sucesso!`, "success");
        });
    });
  }

  showBar() {
    this.setState({ showLeftBar: !this.state.showLeftBar });
  }

  filterClasses({ target: { value } }) {
    let classes = this.props.classes;
    if (!value || value === "") {
      this.setState({ classes });
      return;
    }
    classes = classes.filter(a =>
      a.name.toUpperCase().includes(value.toUpperCase())
    );
    this.setState({ filterClasses: value, classes });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ classes: newProps.classes });
  }

  removeClass(_id) {
    Meteor.call("removeClass", { _id }, err => {
      if (err) console.log(err);
      else this.setState({ class: null, isEditing: false });
    });
  }

  removeInclude(index) {
    const newClass = this.state.class;
    const include_list = this.state.class.include_list;
    include_list.splice(index, 1);
    this.setState({
      class: {
        ...newClass,
        include_list
      }
    });
  }

  render() {
    const classes = this.state.classes;
    return (
      <div className="home-container">
        <div
          className="left-bar"
          style={
            this.state.showLeftBar
              ? { width: "350px", alignItems: "flex-start" }
              : {}
          }
        >
          {this.state.showLeftBar && (
            <div style={{ paddingTop: "1em" }}>
              <div style={{ marginLeft: "0.7em" }}>
                <FormControl
                  onChange={this.filterClasses}
                  value={this.state.filteredClasses}
                />
              </div>
              {classes.map(clas => (
                <div
                  className="fake-image"
                  onClick={() =>
                    this.setState({ class: clas, isEditing: true })
                  }
                >
                  <div className="product-label">{clas.name}</div>
                  <div className="product-description">{clas.description}</div>
                </div>
              ))}
            </div>
          )}
          <div className="right-side-left-bar">
            <i
              onClick={this.showBar}
              className={`fa fa-chevron-${
                this.state.showLeftBar ? "left" : "right"
              }`}
            />
          </div>
        </div>
        <div className="selected-class-container">
          {this.state.isEditing && (
            <div className="editing-header">
              <i
                className="fa fa-chevron-left"
                style={{ fontSize: "1.5em", cursor: "pointer" }}
                onClick={() =>
                  this.setState({ isEditing: false, class: this.defaultClass })
                }
              />
              <i
                className="fa fa-times"
                style={{ fontSize: "1.5em", cursor: "pointer" }}
                onClick={() => this.removeClass(this.state.class._id)}
              />
            </div>
          )}
          <div className="product-principal-header">
            <div>
              {this.renderCondition("name", "2.5em")}
              <br />
              {this.renderCondition("description", "1.5em")}
            </div>
            <div
              style={{
                opacity: 0.6,
                display: "flex",
                justifyContent: "space-between",
                width: "28%"
              }}
            >
              <span>Criado por</span>
              <span>{this.renderCondition("created_by", "1em")}</span>
            </div>
            <div className="price-container">
              R$ {this.renderCondition("price", "1em")}
            </div>
          </div>
          <div className="middle-part">
            <div className="description-card">
              <div className="description">
                {this.renderCondition("detailed_description", "1em")}
              </div>
            </div>
          </div>
          <button className="register-class-button" onClick={this.submitClass}>
            {this.state.isEditing ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </div>
    );
  }
}

RegisterClass.propTypes = {
  classes: PropTypes.array
};

export default RegisterClass;
