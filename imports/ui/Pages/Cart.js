import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Components/CartSummary';
import { Grid, Row, FormControl, Radio, FormGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Modal from '../Components/Common/Modal';
import PaymentMethods from '../Components/PaymentMethods';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardData: {},
			selectedPaymentMethod: 'waiting'
		};
		this.payCart = this.payCart.bind(this);
		this.handleWantToPay = this.handleWantToPay.bind(this);
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
		console.log(currentCart);
		const total = this.getTotal();
		Meteor.call('payCart', { cartId: currentCart._id, total }, err => {
			if (err) console.log(err);
		});
	}

	componentWillMount() {
		const user = Meteor.user();
		const { classes } = this.props;
		let currentCart = this.props.currentCart;
		console.log(currentCart, classes);
		this.setState({ currentCart, classes });
	}

	gerarBoleto() {
		const value = this.props.classes.reduce((a, b) => a + b.price, 0) * 100;
		Meteor.call('createBoleto', { value }, (err, result) => {
			if (err) console.log(err);
			else {
				const a = window.open();
				a.document.write(result);
			}
		});
	}

	handleWantToPay() {
		this.setState({ isPayingCart: true });
		const user = Meteor.user();
		if (!user) {
		} else {
		}
	}

	render() {
		const user = Meteor.user();
		const { currentCart, classes, selectedPaymentMethod } = this.state;
		if (classes.length === 0 || !currentCart) {
			return (
				<div className="no-data-message">
					<h1>Você não tem nenhum curso no carrinho</h1>
				</div>
			);
		}
		const isBoletoSelected = this.state.checkBoxSelected === 'boleto';
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
								<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvrFj4zx_q7kqXBuo7d6kF3knIb_W4nXWIP7TdgESPWAPoB9R" />
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
						<button className="pay-cart-button" onClick={this.handleWantToPay}>
							Finalizar compra
						</button>
					</div>
				</Row>
				<Modal
					title="Forma de pagamento"
					showFooter={false}
					showModal={this.state.isPayingCart}
					closeModal={() => this.setState({ isPayingCart: false, selectedPaymentMethod: 'waiting' })}
				>
					{' '}
					{selectedPaymentMethod === 'waiting' && (
						<div>
							<FormGroup>
								<Radio
									name="radioGroup"
									onChange={() => this.setState({ checkBoxSelected: 'credit_card' })}
								>
									Cartão de crédito
								</Radio>
								<Radio name="radioGroup" onChange={() => this.setState({ checkBoxSelected: 'boleto' })}>
									Boleto
								</Radio>
							</FormGroup>
							<div className="flex-end">
								<button
									onClick={() => {
										if (isBoletoSelected) {
											this.gerarBoleto();
										} else {
											this.setState({ selectedPaymentMethod: this.state.checkBoxSelected });
										}
									}}
									className="success-button"
								>
									{isBoletoSelected ? 'Gerar boleto' : 'Avançar'}
								</button>
							</div>
						</div>
					)}
					{selectedPaymentMethod === 'credit_card' && <PaymentMethods classes={classes} />}
				</Modal>
			</Grid>
		);
	}
}

Cart.propTypes = {
	currentCart: PropTypes.array
};

export default Cart;
