import React, { Component } from "react";
import moment from "moment";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Table from "../Components/Common/Table";

class CadastroDono extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatClosedCarts() {
    const { closedCarts, users } = this.props;
    return closedCarts.map(cart => {
      const cartUser = users.filter(a => a._id === cart.user_id)[0];
      return {
        ...cart,
        user: cartUser.name,
        total_price: `R$ ${cart.total_price}`,
        created_at: moment(cart.created_at).format("DD/MM [ás] HH:mm"),
        paid_at: moment(cart.paid_at).format("DD/MM [ás] HH:mm")
      };
    });
  }

  render() {
    const { headers } = this.props;
    return (
      <Table tableHeaders={headers} tableData={this.formatClosedCarts()} />
    );
  }
}

export default CadastroDono;

CadastroDono.propTypes = {
  products: PropTypes.array,
  sales: PropTypes.array
};
