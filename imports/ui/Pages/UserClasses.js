import React, { Component } from "react";
import "../Styles/Home";
import NavBar from "../Components/NavBar";
import { Bert } from "meteor/themeteorchef:bert";

class userClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  selectClass(classId) {
    const { userClasses } = this.props;
    const selectClass = userClasses.filter(a => a._id === classId)[0];
    if (selectedClass) this.setState({ selectedClass });
    else Bert.alert("Não foi possivel seleciona a classe", "danger");
  }

  render() {
    const { userClasses } = this.props;
    if (userClasses.length === 0) {
      return (
        <div className="grid-container">
          <h1>NENHUM CURSO ENCONTRADO!</h1>
        </div>
      );
    }
    return (
      <div id="product-list">
        <div className="product-row">
          {userClasses.map(clas => (
            <div
              className="fake-image"
              onClick={() => this.selectClass(clas._id)}
            >
              <div className="product-label">{clas.name}</div>
              <div className="product-description">{clas.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default userClasses;
