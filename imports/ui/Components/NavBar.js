import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../Styles/NavBar";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout(() => (window.location.pathname = "/login"));
  }

  sendTo(route) {
    window.location.pathname = route;
  }

  render() {
    console.log(Meteor.user());
    if (window.location.pathname === "/login" || !Meteor.user()) {
      return <div />;
    }
    return (
      <div className="navbar-container">
        {Meteor.user().type !== "admin" ? (
          <div className="system-logo">Sistema Astec</div>
        ) : (
          ""
        )}
        {Meteor.user().type !== "caixa" && Meteor.user().type !== "admin" ? (
          <div onClick={() => this.sendTo("/relatorio")}>Relatório</div>
        ) : (
          ""
        )}
        {Meteor.user().type !== "caixa" && Meteor.user().type !== "admin" ? (
          <div onClick={() => this.sendTo("/produtos")}>Produtos</div>
        ) : (
          ""
        )}
        {Meteor.user().type !== "admin" ? (
          <div onClick={() => this.sendTo("/vendas")}>Vendas</div>
        ) : (
          ""
        )}
        <button onClick={this.logout} className="logout-button">
          Sair <i className="fa fa-caret-right" />
        </button>
      </div>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object
};

export default NavBar;
