import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Bert } from "meteor/themeteorchef:bert";
import { FormControl, ControlLabel, Row, Col } from "react-bootstrap";
import Select from "react-select";
import "../Styles/Sales";
import "react-select/dist/react-select.css";

class Vendas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: "",
      products: [{ productId: null }]
    };
    this.handleSell = this.handleSell.bind(this);
  }

  formatPaymentOptions() {
    return [
      { label: "Dinheiro", value: "Dinheiro" },
      { label: "Crédito", value: "Credito" },
      { label: "Débito", value: "Debito" },
      { label: "Outros", value: "Outros" }
    ];
  }

  formatProducts() {
    return this.props.products.map(prod => {
      return { label: prod.name, value: prod._id };
    });
  }

  handleSell() {
    const sale = {
      client_name: this.state.clientName,
      payment_method: this.state.paymentMethod,
      companyId: Meteor.user().companyId,
      total: this.getTotal(),
      created_at: new Date()
    };
    if (
      !sale.client_name ||
      sale.client_name === "" ||
      !sale.payment_method ||
      !sale.total
    ) {
      Bert.alert("Campos invalidos encontrados, verifique os dados!", "danger");
      return;
    }
    Meteor.call("insertSale", sale, (err, saleId) => {
      if (err) {
        Bert.alert("Erro ao tentar efetuar a venda", "danger");
        return;
      }
      Bert.alert("Venda efetuada com sucesso!", "success");
      this.setState({
        clientName: "",
        paymentMethod: null,
        products: [{ productId: null }]
      });
    });
  }

  getTotal() {
    const products = this.state.products;
    const allProducts = this.props.products;
    let total = 0;
    products.map(prod => {
      const currentProduct = allProducts.filter(
        a => a._id === prod.productId
      )[0];
      if (currentProduct) {
        total += currentProduct.price;
      }
    });
    return total;
  }

  componentDidMount() {
    if (!Meteor.user()) {
      window.location.pathname = "/login";
    }
  }
  render() {
    console.log(this.state);
    return (
      <div className="sales-container">
        <div className="sale-form">
          <div className="sale-block">
            <ControlLabel>Cliente</ControlLabel>
            <FormControl
              onChange={e => this.setState({ clientName: e.target.value })}
              value={this.state.clientName}
            />
          </div>
          <div>
            <ControlLabel>Produto</ControlLabel>
            {this.state.products.map((prod, index) => (
              <div className="sale-block product">
                <Select
                  name="product-select"
                  onChange={e => {
                    const products = this.state.products;
                    products[index].productId = e.value;
                    this.setState({ products });
                  }}
                  value={prod.productId}
                  options={this.formatProducts()}
                />
                {index !== 0 ? (
                  <button
                    onClick={() => {
                      const products = this.state.products;
                      products.splice(index, 1);
                      this.setState({ products });
                    }}
                  >
                    <i className="fa fa-minus" />
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <button
              onClick={() => {
                const products = this.state.products;
                products.push({ productId: null });
                this.setState({ products });
              }}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
          <div className="sale-block">
            <ControlLabel>Método de pagamento</ControlLabel>
            <Select
              name="product-select"
              onChange={e => this.setState({ paymentMethod: e.value })}
              value={this.state.paymentMethod}
              options={this.formatPaymentOptions()}
            />
          </div>
          <h4>
            <strong>TOTAL R${this.getTotal()}</strong>
          </h4>
          <button onClick={this.handleSell} className="sell-button">
            VENDER
          </button>
        </div>
      </div>
    );
  }
}

export default Vendas;
