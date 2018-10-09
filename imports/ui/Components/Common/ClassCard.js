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
    const { name, description, created_by, price } = cardClass;
    console.log(cardClass);
    return (
      <div
        className="class-card"
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
        <div className="fake-image">
          <img src="https://www.northeastern.edu/graduate/blog/wp-content/uploads/2016/08/Online-Learning-Hero-1.jpg" />
        </div>
        <div className="class-card-body">
          <div className="product-label">{name}</div>
          <div className="product-description">{description}</div>
          <div className="product-created-by">{created_by}</div>
          <div className="product-price">
            R$
            {price}
          </div>
        </div>
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
