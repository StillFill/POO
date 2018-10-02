import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

class ClassCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cardClass, onClick, onRemove, removeIcon, key } = this.props;
    const { name, description } = cardClass;
    return (
      <div
        className="fake-image"
        style={onClick ? { cursor: "pointer" } : { cursor: "default" }}
        onClick={onClick}
        key={key}
      >
        {removeIcon && (
          <i
            className="fa fa-times"
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
        <div className="product-label">{name}</div>
        <div className="product-description">{description}</div>
      </div>
    );
  }
}

ClassCard.propTypes = {
  cardClass: PropTypes.object,
  key: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  removeIcon: PropTypes.bool
};

ClassCard.defaultProps = {
  removeIcon: false
};

export default ClassCard;