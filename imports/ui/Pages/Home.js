import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bert } from "meteor/themeteorchef:bert";
import { Meteor } from "meteor/meteor";
import "../Styles/Home";
import "../Styles/Class";
import NavBar from "../Components/NavBar";
import Modal from "../Components/Common/Modal";
import SelectedClassPage from "../Components/Common/SelectedClassPage";
import ClassCard from "../Components/Common/ClassCard";
import { Grid, Row, Col } from "react-bootstrap";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buyClass(classId) {
    const user = Meteor.user();
    Meteor.call("addToCart", { user_id: user._id, classId }, err => {
      if (err) {
        Bert.alert(
          "Não foi possivel adicionar ao carrinho, tente novamente mais tarde!",
          "warning"
        );
      } else {
        Bert.alert("Curso adicionado com sucesso ao carrinho", "success");
        setTimeout(() => {
          window.location.pathname = "carrinho";
        }, 1000);
      }
    });
  }

  render() {
    if (this.props.classes.length === 0) {
      return (
        <div className="grid-container">
          <h1>NENHUM CURSO ENCONTRADO!</h1>
        </div>
      );
    }
    const user = Meteor.user();
    const { selectedClass } = this.state;
    return (
      <Grid fluid style={{ margin: "1%" }}>
        <Row style={{ width: "100%" }}>
          <Col md={4} sm={6} xs={12}>
            {this.props.classes.map(clas => (
              <ClassCard
                key={clas._id}
                cardClass={clas}
                onClick={() => this.setState({ selectedClass: clas })}
              />
            ))}
          </Col>
        </Row>
        <Modal
          showModal={selectedClass}
          closeModal={() => this.setState({ selectedClass: null })}
          confirmationCallback={() => this.buyClass(selectedClass._id)}
          confirmationButtonTitle="Adicionar ao carrinho"
          disabledButton={!user}
          disabledReason="Efetue login para adicionar ao carrinho!"
          full
        >
          <SelectedClassPage selectedClass={selectedClass || {}} />
        </Modal>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.array
};

export default Home;
