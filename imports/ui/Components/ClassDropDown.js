import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, FormControl } from "react-bootstrap";
import "react-select/dist/react-select.css";
import "../Styles/Home";
import "../Styles/Class";
import "../Styles/RegisterClass";
import ClickOutHandler from "react-onclickout";

class RegisterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContent: false
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key !== "Enter") return;
    const { changedTitle } = this.state;
    const { submitLessonName, index } = this.props;
    this.setState({ showForm: false }, () => {
      submitLessonName(changedTitle, index);
    });
  }

  render() {
    const { title, children } = this.props;
    const { showContent } = this.state;
    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              className="drop-down-title"
              onClick={() => this.setState({ showContent: !showContent })}
            >
              {this.state.showForm ? (
                <ClickOutHandler
                  onClickOut={() =>
                    this.setState({ showForm: false, changedTitle: title })
                  }
                >
                  <FormControl
                    onClick={e => e.stopPropagation()}
                    onKeyPress={this.handleKeyPress}
                    style={{ width: "30%" }}
                    onChange={({ target: { value: changedTitle } }) =>
                      this.setState({ changedTitle })
                    }
                    value={this.state.changedTitle}
                  />
                </ClickOutHandler>
              ) : (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    this.setState({ showForm: true });
                  }}
                  style={{ cursor: "text", width: '30%' }}
                >
                  {title}
                  <i
                    className="fa fa-pencil-alt"
                    style={{ marginLeft: "15px" }}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
        {showContent && (
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        )}
      </div>
    );
  }
}

RegisterClass.propTypes = {
  classes: PropTypes.array,
  submitLessonName: PropTypes.func,
  index: PropTypes.number
};

export default RegisterClass;
