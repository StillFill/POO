import React, { Component } from "react";
import moment from "moment";
import { FormControl } from "react-bootstrap";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Table from "../Components/Common/Table";

class CadastroDono extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatClosedCarts() {
    const { closedCarts, users, classes } = this.props;
    return closedCarts.map(cart => {
      const cartUser = users.filter(a => a._id === cart.user_id)[0];
      const items = (
        <div>
          {cartUser.classes.map(a => <p>{classes.find(b => b._id === a).name}</p>)}
        </div>
      );
      return {
        ...cart,
        user: cartUser.name,
        total_price: `R$ ${cart.total_price}`,
        created_at: moment(cart.created_at).format("DD/MM [ás] HH:mm"),
        items,
        paid_at: moment(cart.paid_at).format("DD/MM [ás] HH:mm")
      };
    });
  }

  render() {
    const { headers } = this.props;
    let tableData = this.formatClosedCarts();
    if (this.state.filterProtocolo) {
      tableData = tableData.filter(
        a =>
          a.protocolo &&
          a.protocolo.includes(this.state.filterProtocolo.toUpperCase())
      );
    }
    return (
      <div>
        <p style={{ margin: "15px 0 5px 15px" }}>Filtrar por protocolo</p>
        <FormControl
          style={{ margin: "0 0 0 15px", width: "30%" }}
          onChange={e => this.setState({ filterProtocolo: e.target.value })}
          value={this.state.filterProtocolo}
        />
        <Table tableHeaders={headers} tableData={tableData} />
      </div>
    );
  }
}

export default CadastroDono;

CadastroDono.propTypes = {
  products: PropTypes.array,
  sales: PropTypes.array
};
