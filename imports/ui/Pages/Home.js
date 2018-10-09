import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";
import "../Styles/Home";
import { Row, Col, Image, FormControl } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchClass = this.searchClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatClassesToOptions() {
    const { classes } = this.props;
    return classes.map(cl => ({ label: cl.name, value: cl._id }));
  }

  searchClass() {
    window.location.pathname = `/cursos/${this.state.className}`;
  }

  handleChange(e) {
    this.setState({ className: e.target.value });
  }

  render() {
    return (
      <Row>
        <Col style={{ padding: 0 }} md={12} xs={12} sm={12} responsive>
          <div className="header-banner-title">
            <h1>Encontre os melhores cursos aqui!</h1>
            <div className="banner-form-button-shadow">
              <div className="banner-form-button">
                <FormControl
                  searchable
                  style={{
                    borderRadius: "5px 0 0 5px",
                    height: "40px"
                  }}
                  onChange={this.handleChange}
                  placeholder="Ache o curso que deseja"
                />
                <button onClick={this.searchClass} className="search-button">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
          <img
            className="principal-banner"
            style={{ width: "100%" }}
            src="https://sindiconet-files.s3.amazonaws.com/Cursos/Curso/estrategias-de-vendas-para-sindicos-profissionais/HeroBanner/heroBanner.jpg?rn=320930"
          />
        </Col>
      </Row>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.array
};

export default Home;
