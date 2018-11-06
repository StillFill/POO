import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Components/CartSummary';
import { Grid, Row, FormControl, Radio, FormGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Modal from '../Components/Common/Modal';
import PaymentMethods from '../Components/PaymentMethods';
import LoginModal from '../Components/Login';
import RegisterModal from '../Components/Register';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardData: {},
			selectedPaymentMethod: 'waiting'
		};
		this.payCart = this.payCart.bind(this);
		this.handleWantToPay = this.handleWantToPay.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
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
		Meteor.call('payCart', { cartId: currentCart._id, total }, (err, protocolo) => {
			if (!err) this.setState({ showSuccessPage: true, protocolo });
		});
	}

	componentWillMount() {
		const user = Meteor.user();
		const { classes } = this.props;
		let currentCart = this.props.currentCart;
		console.log(currentCart, classes);
		this.setState({ currentCart, classes });
	}

	handleLogin() {
		const { classes } = this.props;
		const user = Meteor.user();
		classes.map(async cl => {
			await Meteor.call('addToCart', { user_id: user._id, classId: cl._id });
		});
		Meteor.call('getUserCart', user._id, (err, cart) => {
			this.setState({ isPayingCart: true, currentCart: cart }, () => {
				localStorage.setItem('userCart', null);
			});
		});
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
		const user = Meteor.user();
		if (!user) {
			this.setState({ showLoginForm: true });
		} else {
			this.setState({ isPayingCart: true });
		}
	}

	render() {
		const user = Meteor.user();
		const { currentCart, classes, selectedPaymentMethod } = this.state;
		console.log(currentCart);
		if (classes.length === 0 || !currentCart) {
			console.log('não tem nad');
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
								<img src={cl.image} />
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
					title={this.state.showSuccessPage ? 'Pagamento realizado com sucesso' : 'Forma de pagamento'}
					showFooter={false}
					showModal={this.state.isPayingCart || this.state.showSuccessPage}
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
					{selectedPaymentMethod === 'credit_card' && (
						<PaymentMethods
							payCart={this.payCart}
							classes={classes}
							closeModal={() =>
								this.setState({
									selectedPaymentMethod: null,
									showLoginForm: false,
									isPayingCart: false
								})}
						/>
					)}
					{this.state.showSuccessPage && (
						<div>
							<h3>Obrigado por comprar conosco!</h3>
							<p>
								<strong>Numero de protocolo: </strong>
								{this.state.protocolo.toUpperCase()}
							</p>
						</div>
					)}
				</Modal>
				<Modal
					title="Efetuar login"
					showFooter={false}
					showModal={this.state.showLoginForm}
					closeModal={() => this.setState({ showLoginForm: false })}
				>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<button
							className="login-button"
							onClick={() => this.setState({ loginState: 'login', showLoginForm: false })}
						>
							Login
						</button>
						<button
							style={{ margin: '1em 0 0 0' }}
							className="register-button"
							onClick={() => this.setState({ loginState: 'register', showLoginForm: false })}
						>
							Cadastre-se
						</button>
					</div>
				</Modal>
				<LoginModal
					showLoginModal={this.state.loginState === 'login'}
					closeModal={() => this.setState({ loginState: null })}
					callback={this.handleLogin}
				/>
				<RegisterModal
					showRegisterModal={this.state.loginState === 'register'}
					closeModal={() => this.setState({ loginState: null })}
					callback={this.handleLogin}
				/>
			</Grid>
		);
	}
}

Cart.propTypes = {
	currentCart: PropTypes.array
};

export default Cart;
