import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { FormControl, ControlLabel, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import "../Styles/Products";

class CadastroDono extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleInsertProduct = this.handleInsertProduct.bind(this);
  }

  handleInsertProduct() {
    const product = {
      name: this.state.name,
      price: Number(this.state.price),
      description: this.state.description,
      companyId: Meteor.user().companyId
    };
    Meteor.call("insertProduct", product, (err, productId) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(productId);
      this.setState({ showModal: false });
    });
  }

  render() {
    return (
      <div className="products-container">
        <div className="products-header">
          <div>Nome</div>
          <div>Preço</div>
          <div>Descrição</div>
        </div>
        {this.props.products.map(prod => (
          <div className="product-row">
            <div>{prod.name}</div>
            <div>R${prod.price}</div>
            <div>{prod.description}</div>
          </div>
        ))}
        <button
          onClick={() => this.setState({ showModal: true })}
          className="new-product-button"
        >
          <strong>Cadastrar novo produto</strong>
          <i className="fa fa-plus" />
        </button>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="sale-block">
              <ControlLabel>Nome</ControlLabel>
              <FormControl
                onChange={e => this.setState({ name: e.target.value })}
                value={this.state.name}
              />
            </div>
            <div className="sale-block">
              <ControlLabel>Preço</ControlLabel>
              <FormControl
                onChange={e => this.setState({ price: e.target.value })}
                value={this.state.price}
              />
            </div>
            <div className="description-text-area">
              <ControlLabel>Descrição</ControlLabel>
              <textarea
                onChange={e => this.setState({ description: e.target.value })}
              />
            </div>
            <button
              onClick={this.handleInsertProduct}
              className="register-product"
            >
              Cadastrar
            </button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CadastroDono;

CadastroDono.propTypes = {
  products: PropTypes.array
};
