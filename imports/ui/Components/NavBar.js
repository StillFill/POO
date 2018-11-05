import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import '../Styles/NavBar.css';
import UserOptions from '../Components/UserOptions';
import LoginModal from './Login';
import RegisterModal from './Register';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.logout = this.logout.bind(this);
	}

	logout() {
		Meteor.logout();
	}

	sendTo(route) {
		window.location.pathname = route;
	}

	componentWillMount() {
		const user = Meteor.user();
		if (user) localStorage.clear();
	}

	render() {
		const user = Meteor.user();
		const isMobile = screen.width <= 768;
		return (
			<div className="navbar-container">
				<h2 style={{ cursor: 'pointer' }} onClick={() => this.sendTo('/home')}>
					Aquamarine
				</h2>
				{user || isMobile ? (
					<UserOptions
						loginOptions={[
							{
								label: 'Login',
								icon: 'fa fa-cog',
								action: () => this.setState({ showLoginModal: true })
							},
							{
								label: 'Cadastrar',
								icon: 'fa fa-sign-out-alt',
								action: () => this.setState({ showRegisterModal: true })
							}
						]}
					/>
				) : (
					<div className="user-buttons">
						<button className="login-button" onClick={() => this.setState({ showLoginModal: true })}>
							Login
						</button>
						<button className="register-button" onClick={() => this.setState({ showRegisterModal: true })}>
							Cadastrar-se
						</button>
					</div>
				)}

				<LoginModal
					showLoginModal={this.state.showLoginModal}
					closeModal={() => this.setState({ showLoginModal: false })}
				/>
				<RegisterModal
					showRegisterModal={this.state.showRegisterModal}
					closeModal={() => this.setState({ showRegisterModal: false })}
				/>
			</div>
		);
	}
}

NavBar.propTypes = {
	history: PropTypes.object
};

export default NavBar;
