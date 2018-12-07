import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormControl, Row } from "react-bootstrap";
import "react-select/dist/react-select.css";
import "../Styles/Home";
import "../Styles/Class";
import "../Styles/RegisterClass";
import ClassDropDown from "../Components/ClassDropDown";
import Modal from "../Components/Common/Modal";

class RegisterLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClass: { lessons: [] }
    };
    this.handleAddLesson = this.handleAddLesson.bind(this);
    this.submitVideoUrl = this.submitVideoUrl.bind(this);
    this.submitLessonName = this.submitLessonName.bind(this);
  }

  componentWillMount() {
    const { selectedClass } = this.props;
    this.setState({ selectedClass });
  }

  submitVideoUrl() {
    const {
      selectedClass,
      selectedClass: { lessons },
      selectedClassVideo,
      addedVideo
    } = this.state;
    const { handleEditClass } = this.props;
    const newLessons = lessons;
    newLessons[selectedClassVideo] = {
      ...lessons[selectedClassVideo],
      videoId: addedVideo
    };
    const newClass = { ...selectedClass, lessons: newLessons };
    this.setState(
      {
        selectedClass: newClass,
        selectedClassVideo: null
      },
      () => handleEditClass(newClass)
    );
  }

  handleAddLesson() {
    const {
      selectedClass,
      selectedClass: { lessons }
    } = this.state;
    const { handleEditClass } = this.props;
    const newClass = {
      ...selectedClass,
      lessons: [...lessons, { name: "Nova Aula", videoId: null }]
    };
    this.setState(
      {
        selectedClass: newClass
      },
      () => handleEditClass(newClass)
    );
  }

  submitLessonName(name, index) {
    const {
      selectedClass,
      selectedClass: { lessons }
    } = this.state;
    const { handleEditClass } = this.props;
    const newLessons = lessons;
    newLessons[index] = { ...newLessons[index], name };
    const newClass = { ...selectedClass, lessons: newLessons };
    this.setState({ selectedClass: newClass }, () => handleEditClass(newClass));
  }

  render() {
    const {
      selectedClassVideo,
      selectedClass,
      selectedClass: { lessons, name }
    } = this.state;
    const { isRegister, submitLessons } = this.props;
    const videoHeight = window.screen.height;
    return (
      <div style={{ padding: "30px" }}>
        <Row>
          <h1>{name}</h1>
        </Row>
        {lessons.map(({ name, videoId }, index) => (
          <Row>
            <ClassDropDown
              index={index}
              submitLessonName={this.submitLessonName}
              isRegister={isRegister}
              title={name}
            >
              <div className="video-container">
                {videoId ? (
                  <iframe
                    style={{ width: "100%" }}
                    height={videoHeight / 1.5}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />
                ) : (
                  <div className="no-video-label">
                    <h2>Nenhum video adicionado</h2>
                    {isRegister && (
                      <button
                        onClick={() =>
                          this.setState({ selectedClassVideo: index })
                        }
                        className="success-button"
                      >
                        Adicionar video
                      </button>
                    )}
                  </div>
                )}
              </div>
            </ClassDropDown>
          </Row>
        ))}

        {isRegister && (
          <Row>
            <div className="add-lesson-button">
              <button onClick={this.handleAddLesson}>
                Adicionar aula <i className="fa fa-plus" />
              </button>
            </div>
          </Row>
        )}
        <button onClick={submitLessons} className="back-button rounded">
          Voltar
        </button>
        {isRegister && (
          <button onClick={submitLessons} className="success-button rounded">
            Salvar
          </button>
        )}
        <Modal
          confirmationCallback={this.submitVideoUrl}
          confirmationButtonTitle="Adicionar"
          showModal={
            selectedClassVideo !== null && selectedClassVideo !== undefined
          }
          closeModal={() => this.setState({ selectedClassVideo: null })}
        >
          <FormControl
            onChange={({ target: { value: addedVideo } }) =>
              this.setState({ addedVideo })
            }
            value={this.state.addedVideo}
            placeholder="Adicione o id do video"
          />
        </Modal>
      </div>
    );
  }
}

RegisterLessons.propTypes = {
  classes: PropTypes.array
};

export default RegisterLessons;
