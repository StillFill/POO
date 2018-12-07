import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';
import PropTypes from "prop-types";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Row
} from "react-bootstrap";
import "react-select/dist/react-select.css";
import "../Styles/Home";
import "../Styles/Class";
import "../Styles/RegisterClass";
import Modal from "../Components/Common/Modal";
import RegisterLessons from "./RegisterLessons";
import RegisterClassPage from "../Components/Common/RegisterClassPage";

class RegisterClass extends Component {
  constructor(props) {
    super(props);
    const user = Meteor.user();
    this.defaultClass = {
      name: null,
      description: null,
      detailed_description: null,
      lessons: [{ name: "Aula 1", videoId: null }],
      price: null,
      created_by: user.name,
    };
    this.state = {
      isEditing: false,
      classes: props.classes,
      editingClass: null,
      showLessons: false,
      selectedClass: this.defaultClass
    };
    this.saveOrInsertClass = this.saveOrInsertClass.bind(this);
    this.handleEditClass = this.handleEditClass.bind(this);
    this.handleFilterClass = this.handleFilterClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { classes: propsClasses } = this.props;
    const { classes: nextClasses } = nextProps;
    if (!_.isEqual(propsClasses, nextClasses))
      this.setState({ classes: nextClasses });
  }

  saveOrInsertClass(submittedClass) {
    const method = this.state.isEditing ? "updateClass" : "insertClass";
    Meteor.call(method, submittedClass, err => {
      if (err) console.log(err);
      else
        this.setState({
          selectedClass: null,
          isEditing: false,
          isCreating: false
        });
    });
  }

  removeClass() {
    Meteor.call("removeClass", { _id: this.state.classToRemove }, err => {
      if (err) console.log(err);
      else this.setState({ showConfirmationRemoveModal: false });
    });
  }

  handleFilterClass({ target: { value } }) {
    this.setState({ filterParam: value });
    const { classes } = this.state;
    const { classes: allClasses } = this.props;
    if (value === "" || !value) this.setState({ classes: allClasses });
    else {
      const newClasses = classes.filter(a =>
        a.name.toUpperCase().includes(value.toUpperCase())
      );
      this.setState({ classes: newClasses });
    }
  }

  handleEditClass(selectedClass) {
    this.setState({ selectedClass });
  }

  render() {
    const {
      isEditing,
      filterParam,
      classes,
      selectedClass,
      isCreating,
      showLessons
    } = this.state;
    if ((isEditing && selectedClass) || isCreating) {
      return (
        <div>
          {showLessons ? (
            <RegisterLessons
              isRegister
              selectedClass={selectedClass}
              submitLessons={() => this.setState({ showLessons: false })}
              handleEditClass={this.handleEditClass}
            />
          ) : (
            <RegisterClassPage
              isRegister
              isEditing={isEditing}
              backCallback={() =>
                this.setState({
                  isEditing: false,
                  isCreating: false,
                  selectedClass: this.defaultClass
                })
              }
              submitClass={() =>
                this.saveOrInsertClass(this.state.selectedClass)
              }
              selectedClass={selectedClass}
              handleEditClass={this.handleEditClass}
              handleAddLessons={() => this.setState({ showLessons: true })}
            />
          )}
        </div>
      );
    }
    return (
      <Row>
        <FormGroup style={{ width: "30%", padding: "15px" }}>
          <ControlLabel>Filtrar cursos</ControlLabel>
          <FormControl
            onChange={this.handleFilterClass}
            value={filterParam}
            placeholder="filtrar cursos..."
          />
        </FormGroup>
        <div className="classes-table-header">
          <span>Nome</span>
          <span>Descrição</span>
          <span>Criado por</span>
          <span>Preço</span>
          <span style={{ flex: 0.5 }} />
        </div>
        {classes.map(cl => (
          <div
            onClick={() =>
              this.setState({
                isEditing: true,
                selectedClass: cl
              })
            }
            className="classes-table-row"
          >
            <span>{cl.name}</span>
            <span>{cl.description}</span>
            <span>{cl.created_by}</span>
            <span>R$ {cl.price}</span>
            <span style={{ flex: 0.5 }}>
              <button
                onClick={e => {
                  e.stopPropagation();
                  this.setState({
                    showConfirmationRemoveModal: true,
                    classToRemove: cl._id
                  });
                }}
                className="remove-button"
              >
                <i className="fa fa-times" />
              </button>
            </span>
          </div>
        ))}
        <Modal
          title="Remover curso"
          showModal={this.state.showConfirmationRemoveModal}
          confirmationCallback={this.removeClass}
          confirmationButtonTitle="Remover"
          closeModal={() =>
            this.setState({
              showConfirmationRemoveModal: false
            })
          }
        >
          Tem certeza que deseja remover este curso?
        </Modal>
        <button
          onClick={() =>
            this.setState({
              isEditing: false,
              isCreating: true,
              selectedClass: this.defaultClass
            })
          }
          className="new-class-button"
        >
          <i className="fa fa-plus" />
        </button>
      </Row>
    );
  }
}

RegisterClass.propTypes = {
  classes: PropTypes.array
};

export default RegisterClass;
