import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Styles/Home";
import "../Styles/Class";
import Table from "../Components/Common/Table";
import CartSummary from "../Components/CartSummary";
import { Grid, Row, Col } from "react-bootstrap";
import { Meteor } from "meteor/meteor";
import Modal from "../Components/Common/Modal";
import SelectedClassPage from "../Components/Common/SelectedClassPage";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.payCart = this.payCart.bind(this);
  }

  removeFromCart(classId) {
    console.log(classId);
    const { currentCart } = this.props;
    Meteor.call(
      "removeClassFromCart",
      { classId, cartId: currentCart._id },
      err => {
        if (err) console.log(err);
      }
    );
  }

  formatHeaderData() {
    return [
      { label: "Curso", value: "name" },
      { label: "Descrição", value: "description" },
      { label: "Criado por", value: "created_by" },
      { label: "Preço(R$)", value: "price" },
      { label: "", value: "removeButton", style: { textAlign: "center" } }
    ];
  }

  removeClassFromCart(c) {
    const { currentCart } = this.props;
    Meteor.call(
      "removeClassFromCart",
      {
        cartId: currentCart._id,
        classId: c._id
      },
      err => {
        console.log(err);
      }
    );
  }

  formatClasses() {
    const { classes } = this.props;
    const formattedClasses = classes;
    return formattedClasses.map(cl => ({
      ...cl,
      removeButton: (
        <button
          onClick={() => this.removeClassFromCart(cl)}
          className="remove-button"
        >
          <i className="fa fa-times" />
        </button>
      )
    }));
  }

  getTotal() {
    const { classes } = this.props;
    return classes.reduce((a, b) => a + Number(b.price), 0);
  }

  payCart() {
    const { currentCart } = this.props;
    const total = this.getTotal();
    Meteor.call("payCart", { cartId: currentCart._id, total }, err => {
      if (err) console.log(err);
    });
  }

  render() {
    const { currentCart, classes } = this.props;
    if (classes.length === 0 || !currentCart) {
      return (
        <div className="no-data-message">
          <h1>Você não tem nenhum curso no carrinho</h1>
        </div>
      );
    }
    const total = this.getTotal();
    return (
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Table
              tableHeaders={this.formatHeaderData()}
              tableData={this.formatClasses()}
              onRowClick={cl => this.setState({ selectedClass: cl })}
            />
          </Col>
          <Col md={4}>
            <div className="cart-right-side">
              <CartSummary classes={classes} total={total} />
              <button
                className="pay-button"
                onClick={() => this.setState({ showPaymentConfirmation: true })}
              >
                Pagar
              </button>
            </div>
          </Col>
        </Row>
        <Modal
          full
          showModal={this.state.selectedClass}
          closeModal={() => this.setState({ selectedClass: null })}
        >
          <SelectedClassPage selectedClass={this.state.selectedClass || {}} />
        </Modal>
        <Modal
          showModal={this.state.showPaymentConfirmation}
          closeModal={() => this.setState({ showPaymentConfirmation: false })}
          confirmationCallback={this.payCart}
          confirmationButtonTitle="Sim"
        >
          Tem certeza que deseja pagar?
        </Modal>
      </Grid>
    );
  }
}

Cart.propTypes = {
  currentCart: PropTypes.array
};

export default Cart;
