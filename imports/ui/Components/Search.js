import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassCard from '../Components/Common/ClassCard';
import { Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Modal from '../Components/Common/Modal';
import SelectedClassPage from '../Components/Common/SelectedClassPage';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredClasses: [],
			searchParam: props.searchParam
		};
		this.handleChangeSearchParam = this.handleChangeSearchParam.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}

	componentWillMount() {
		const { classes, searchParam, cart } = this.props;
		let filteredClasses = classes.filter(a => a.name.includes(searchParam));
		if (!searchParam || searchParam === '') filteredClasses = classes;
		this.setState({ filteredClasses });
	}

	addToCart() {
		const user = Meteor.user();
		const classId = this.state.selectedClass._id;
		if (user) {
			Meteor.call('addToCart', { user_id: user._id, classId }, err => {
				if (err) console.log(err);
				else window.location.pathname = '/carrinho';
			});
		} else {
			const cart = JSON.parse(localStorage.getItem('userCart'));
			if (!!cart) {
				const newCart = cart;
				cart.classes.push(classId);
				localStorage.setItem('userCart', JSON.stringify(newCart));
			} else {
				localStorage.setItem(
					'userCart',
					JSON.stringify({
						created_at: new Date(),
						status: 'open',
						classes: [classId]
					})
				);
			}
			window.location.pathname = '/carrinho';
		}
	}

	handleChangeSearchParam({ target: { value } }) {
		const { filteredClasses } = this.state;
		if (!value || value === '') {
			this.setState({
				filteredClasses: this.props.classes,
				searchParam: value
			});
			return;
		}
		const newClasses = filteredClasses.filter(a => a.name.toUpperCase().includes(value.toUpperCase()));
		this.setState({ filteredClasses: newClasses, searchParam: value });
	}

	render() {
		const { filteredClasses, searchParam } = this.state;
		return (
			<div>
				<Row style={{ marginTop: '30px' }}>
					<Col md={6} sm={12} xs={12}>
						<ControlLabel>Filtrar cursos</ControlLabel>
						<FormControl
							placeholder="digite o nome do curso..."
							onChange={this.handleChangeSearchParam}
							value={searchParam}
						/>
					</Col>
				</Row>
				<Row>
					{filteredClasses.map(a => (
						<Col style={{ marginTop: '30px' }} md={3} sm={4} xs={12}>
							<ClassCard cardClass={a} onClick={() => this.setState({ selectedClass: a })} />
						</Col>
					))}
					<Modal
						full
						showModal={this.state.selectedClass}
						closeModal={() => this.setState({ selectedClass: null })}
						confirmationCallback={this.addToCart}
						confirmationButtonTitle="Adicionar ao carrinho"
					>
						<SelectedClassPage selectedClass={this.state.selectedClass || {}} />
					</Modal>
				</Row>
			</div>
		);
	}
}

Search.propTypes = {
	classes: PropTypes.array,
	params: PropTypes.object
};

export default Search;
