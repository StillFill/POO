import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { FormControl, ControlLabel, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../Styles/Products";

class Table extends Component {
  render() {
    return (
      <div>
        {this.props.data.map(d => (
          <div className="product-row">
            {Object.keys(d).map(key => (
              <div>
                {typeof d[key] !== "object" ? d[key] : d[key].getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Table;

Table.propTypes = {
  products: PropTypes.array,
  sales: PropTypes.array
};
