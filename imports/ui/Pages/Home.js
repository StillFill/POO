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
      <div className="home-container">
        <div
          className="product-list"
          style={this.state.selectedClass ? { width: "30vw" } : {}}
        >
          <div className="product-row">
            {this.props.classes.map(clas => (
              <ClassCard
                key={clas._id}
                cardClass={clas}
                onClick={() => this.setState({ selectedClass: clas })}
              />
            ))}
          </div>
        </div>
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
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.array
};

export default Home;
