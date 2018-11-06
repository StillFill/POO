import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Common/Modal';
import { FormControl, ControlLabel } from 'react-bootstrap';
import { doLogin } from '../../modules/student-helpers';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit() {
		const { password, login } = this.state;
		doLogin({ login, password }, err => {
			if (!err) {
				this.props.closeModal();
				this.props.callback();
			}
		});
	}

	handleInputChange({ target: { value, name } }) {
		this.setState({ [name]: value });
	}

	render() {
		return (
			<Modal
				confirmationCallback={this.handleSubmit}
				title="Login"
				showModal={this.props.showLoginModal}
				confirmationButtonTitle="Logar"
				closeModal={this.props.closeModal}
				small
			>
				<div style={{ marginTop: '1rem' }}>
					<ControlLabel>Login</ControlLabel>
					<FormControl value={this.state.login} onChange={this.handleInputChange} name="login" />
				</div>
				<div style={{ marginTop: '1rem' }}>
					<ControlLabel>Senha</ControlLabel>
					<FormControl
						value={this.state.password}
						type="password"
						onChange={this.handleInputChange}
						name="password"
					/>
				</div>
			</Modal>
		);
	}
}

export default Login;

Login.propTypes = {
	showLoginModal: PropTypes.bool,
	closeModal: PropTypes.func,
	callback: PropTypes.func
};

Login.defaultProps = {
	callback: () => {}
};
