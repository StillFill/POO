import React, { Component } from "react";
import Meteor from "meteor/meteor";

class Consulta extends Component {
  componentWillMount() {
    if (Meteor.isLogingIn) {
      if (Meteor.user().type === "caixa") {
        window.location.pathname = "/vendas";
      } else if (Meteor.user().type === "dono") {
        window.location.pathname = "/produtos";
      } else if (Meteor.user().type === "admin") {
        window.location.pathname = "/cadastro-dono";
      }
    } else {
      window.location.pathname = "/login";
    }
  }
  render() {
    return <div />;
  }
}

export default Consulta;
