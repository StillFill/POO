import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Home';
import '../Styles/Class';
import Table from '../Components/Common/Table';
import CartSummary from '../Components/CartSummary';
import { Grid, Row, Col, FormControl } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Modal from '../Components/Common/Modal';
import SelectedClassPage from '../Components/Common/SelectedClassPage';
import Cards from 'react-credit-cards';
import $ from 'jquery';
import { card, expiration } from 'creditcards';

class Cart extends Component {
	constructor(props) {
		super(props);
		const user = Meteor.user();
		let currentCart = props.currentCart;
		console.log(props.currentCart);
		let classes = props.currentCart ? props.classes.filter(a => props.currentCart.classes.includes(a._id)) : [];
		const rootClasses = props.classes;
		if (!user && localStorage.getItem('userCart')) {
			const userCart = JSON.parse(localStorage.getItem('userCart'));
			currentCart = userCart;
			classes = rootClasses;
		}
		this.state = {
			cardData: {},
			currentCart,
			classes
		};
		this.payCart = this.payCart.bind(this);
		this.validateCard = this.validateCard.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
	}

	componentDidMount() {
		// console.log($("number"));
		// $("number").mask("0000 0000 0000 0000");
		// $("expiry").mask("00/00");
	}

	reloadCart() {
		const { currentCart } = this.state;
		const { classes: rootClasses } = this.props;
		this.setState({
			currentCart,
			classes: rootClasses.filter(a => currentCart.classes.includes(a._id))
		});
	}

	removeClassFromCart(c) {
		const user = Meteor.user();
		const { currentCart } = this.state;
		if (!user) {
			const newCart = currentCart;
			const index = currentCart.classes.indexOf(c._id);
			newCart.classes.splice(index, 1);
			localStorage.setItem('userCart', JSON.stringify(newCart));
			this.reloadCart();
		} else {
			Meteor.call(
				'removeClassFromCart',
				{
					cartId: currentCart._id,
					classId: c._id
				},
				err => {
					console.log(err);
				}
			);
		}
	}

	getTotal() {
		const { classes } = this.state;
		return classes.reduce((a, b) => a + Number(b.price), 0);
	}

	payCart() {
		const { currentCart } = this.state;
		const total = this.getTotal();
		Meteor.call('payCart', { cartId: currentCart._id, total }, err => {
			if (err) console.log(err);
		});
	}

	handleInputFocus({ target: { name } }) {
		this.setState({
			focused: name
		});
	}

	validateCard() {
		const isValid = card.isValid(this.state.cardNumber);
		const isExpiry = expiration.isPast(10, 2010);
		console.log(isExpiry);
	}

	render() {
		const { currentCart, classes } = this.state;
		if (classes.length === 0 || !currentCart) {
			return (
				<div className="no-data-message">
					<h1>Você não tem nenhum curso no carrinho</h1>
				</div>
			);
		}
		const total = this.getTotal();
		const { cardNumber, ownerName, cardExpiry, cardCvc, focused } = this.state;
		return (
			<Grid fluid>
				<Row>
					<h2>CARRINHO</h2>
				</Row>
				<Row style={{ marginTop: '30px' }}>
					<a
						style={{ cursor: 'pointer' }}
						onClick={() => {
							window.location.pathname = '/cursos';
						}}
					>
						<i className="fa fa-arrow-left" /> Continuar comprando
					</a>
				</Row>
				<Row>
					{classes.map(cl => (
						<div className="cart-table-row">
							<div className="cart-item-image">
								<img src="https://www.northeastern.edu/graduate/blog/wp-content/uploads/2016/08/Online-Learning-Hero-1.jpg" />
							</div>
							<div className="cart-item-name">
								<div className="cart-item-name-description">
									<h4>{cl.name}</h4>
									<p className="opacity">{cl.description}</p>
									<p>Criado por {cl.created_by}</p>
									<a className="remove-class" onClick={() => this.removeClassFromCart(cl)}>
										REMOVER
									</a>
								</div>
							</div>
							<p className="cart-item-price">R$ {cl.price}</p>
						</div>
					))}
				</Row>
				<Row>
					<div className="discount-group">
						<span>Cupom de desconto</span>
						<FormControl onChange={this.handleChangeDiscountKey} value={this.state.discountKey} />
					</div>
				</Row>
				<Row>
					<h3 className="final-cart-total">TOTAL: R$ {this.getTotal()}</h3>
				</Row>
				<Row>
					<div className="pay-cart">
						<button className="pay-cart-button" onClick={() => this.setState({ isPayingCart: true })}>
							Finalizar compra
						</button>
					</div>
				</Row>
				<Modal
					confirmationCallback={this.validateCard}
					showModal={this.state.isPayingCart}
					closeModal={() => this.setState({ isPayingCart: false })}
				>
					<div>
						<Row md={6}>
							<Cards
								number={cardNumber || ''}
								name={ownerName || ''}
								expiry={cardExpiry || ''}
								cvc={cardCvc || ''}
								focused={focused || ''}
							/>
						</Row>
						<Row>
							<Col md={6}>
								<div className="form-label">Nome no cartão</div>
								<FormControl
									id="name"
									name="name"
									onFocus={this.handleInputFocus}
									onChange={e => this.setState({ ownerName: e.target.value })}
								/>
								<div className="form-label">Número do cartão</div>
								<FormControl
									id="number"
									name="number"
									onFocus={this.handleInputFocus}
									onChange={e => this.setState({ cardNumber: e.target.value })}
								/>
							</Col>
							<Col md={6}>
								<div className="form-label">Expira em</div>
								<FormControl
									id="expiry"
									name="expiry"
									onFocus={this.handleInputFocus}
									onChange={e => this.setState({ expiry: e.target.value })}
								/>
								<div className="form-label">Código de segurança</div>
								<FormControl
									id="cvc"
									name="cvc"
									onFocus={this.handleInputFocus}
									onChange={e => this.setState({ cardCvc: e.target.value })}
								/>
							</Col>
						</Row>
					</div>
				</Modal>
			</Grid>
		);
	}
}

Cart.propTypes = {
	currentCart: PropTypes.array
};

export default Cart;
