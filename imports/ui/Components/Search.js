import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassCard from "../Components/Common/ClassCard";
import { Row, Col } from "react-bootstrap";
import Modal from "../Components/Common/Modal";
import SelectedClassPage from "../Components/Common/SelectedClassPage";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <Row>
        {classes.map(a => (
          <Col style={{ marginTop: "30px" }} md={4} sm={6} xs={12}>
            <ClassCard
              cardClass={a}
              onClick={() => this.setState({ selectedClass: a })}
            />
          </Col>
        ))}
        <Modal
          full
          showModal={this.state.selectedClass}
          closeModal={() => this.setState({ selectedClass: null })}
        >
          <SelectedClassPage selectedClass={this.state.selectedClass || {}} />
        </Modal>
      </Row>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.array,
  params: PropTypes.object
};

export default Search;
