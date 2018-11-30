import React, { Component } from "react";
import { FormControl, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { card, expiration } from "creditcards";
import Cards from "react-credit-cards";

class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.validateCard = this.validateCard.bind(this);
  }
  handleInputFocus({ target: { name } }) {
    this.setState({
      focused: name
    });
  }

  setClassesToUser() {
    const user = Meteor.user();
    const { classes } = this.props;
    const ids = classes.map(a => a._id);
    let classesIds = ids;
    if (user.classes) {
      classesIds = [...classesIds, ...user.classes];
    }
    Meteor.call(
      "addClassToUser",
      { _id: user._id, classes: classesIds },
      err => {
        if (!err) {
          this.props.payCart();
        }
      }
    );
  }

  validateCard() {
    this.setClassesToUser();
  }

  pushRoute(route) {
    window.location.pathname = route;
  }

  render() {
    const {
      cardNumber,
      ownerName,
      cardExpiry,
      cardCvc,
      focused,
      paymentSuccess,
      errorReason
    } = this.state;
    if (paymentSuccess) {
      return (
        <div>
          <h1>Pagamento efetuado com sucesso!</h1>
          <h2>
            Verifique a tela de{" "}
            <a onClick={() => this.pushRoute("/meus-cursos")}>meus cursos</a>{" "}
            para visualizar seus cursos!
          </h2>
        </div>
      );
    }
    return (
      <div>
        <Row md={6}>
          <Cards
            number={cardNumber || ""}
            name={ownerName || ""}
            expiry={cardExpiry || ""}
            cvc={cardCvc || ""}
            focused={focused || ""}
          />
        </Row>
        <Row>
          <Col md={6}>
            <div className="form-label">Nome no cartão</div>
            <FormControl
              maxLength={40}
              id="name"
              name="name"
              onFocus={this.handleInputFocus}
              onChange={e => this.setState({ ownerName: e.target.value })}
            />
            <div className="form-label">Número do cartão</div>
            <FormControl
              maxLength={16}
              id="number"
              name="number"
              onFocus={this.handleInputFocus}
              onChange={e => this.setState({ cardNumber: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <div className="form-label">Expira em</div>
            <FormControl
              type="month"
              id="expiry"
              name="expiry"
              onFocus={this.handleInputFocus}
              onChange={e => this.setState({ expiry: e.target.value })}
            />
            <div className="form-label">Código de segurança</div>
            <FormControl
              maxLength={3}
              id="cvc"
              name="cvc"
              onFocus={this.handleInputFocus}
              onChange={e => this.setState({ cardCvc: e.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              margin: "1rem 0",
              color: "red"
            }}
          >
            {!paymentSuccess && errorReason}
          </p>
        </Row>
        <Row>
          <Col md={12}>
            <button
              onClick={this.validateCard}
              style={{ width: "100%", marginTop: "15px" }}
              className="success-button"
            >
              Pagar
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PaymentMethods;

PaymentMethods.propTypes = {
  classes: PropTypes.array
};
