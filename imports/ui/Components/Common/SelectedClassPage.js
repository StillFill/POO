import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { selectedClass } = this.props;
    const {
      name,
      description,
      created_by,
      detailed_description,
      price,
      _id,
      include_list
    } = selectedClass;
    const user = Meteor.user();
    return (
      <div class="selected-class-container">
        <div class="product-principal-header">
          <div>
            <h2>{name}</h2>
            <h3>{description}</h3>
          </div>
          <h4 style={{ opacity: 0.6 }}>Criado por {created_by}</h4>
        </div>
        <div class="middle-part">
          {!user && (
            <div className="login-warning">
              <p>Efetue o login para comprar este curso!</p>
            </div>
          )}
          <div class="description-card">
            <div class="description">
              {detailed_description || "Sem descrição"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  selectedClass: PropTypes.object
};

NavBar.defaultProps = {
  selectedClass: {}
};

export default NavBar;
