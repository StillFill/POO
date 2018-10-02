import React, { Component } from "react";
import PropTypes from "prop-types";
import "../Styles/Home";
import "../Styles/Class";
import ClassCard from "../Components/Common/ClassCard";
import { Grid, Row, Col } from "react-bootstrap";
import { Meteor } from "meteor/meteor";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { currentCart, classes } = this.props;
    console.log(classes);
    if (!currentCart) return <h1>VOCÊ NÃO TEM NENHUM CURSO NO CARRINHO</h1>;
    return (
      <Grid fluid>
        <Row>
          {classes.map(c => (
            <Col style={{ margin: "1em 0" }} md={4} xs={8} xs={12}>
              <ClassCard
                removeIcon
                cardClass={c}
                onRemove={() => this.removeFromCart(c._id)}
              />
            </Col>
          ))}
        </Row>
      </Grid>
    );
  }
}

Cart.propTypes = {
  currentCart: PropTypes.array
};

export default Cart;
