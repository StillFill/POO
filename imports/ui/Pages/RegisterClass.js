import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../Styles/Home';
import '../Styles/Class';
import '../Styles/RegisterClass';
import ClassCard from '../Components/Common/ClassCard';
import Modal from '../Components/Common/Modal';
import RegisterClassPage from '../Components/Common/RegisterClassPage';
import { iconOptions } from '../../modules/register-helpers';
import { _ } from 'meteor/underscore';

class RegisterClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			classes: props.classes,
			editingClass: null
		};
		this.saveOrInsertClass = this.saveOrInsertClass.bind(this);
		this.handleEditClass = this.handleEditClass.bind(this);
		this.handleFilterClass = this.handleFilterClass.bind(this);
		this.removeClass = this.removeClass.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { classes: propsClasses } = this.props;
		const { classes: nextClasses } = nextProps;
		if (!_.isEqual(propsClasses, nextClasses)) this.setState({ classes: nextClasses });
	}

	saveOrInsertClass() {
		const method = this.state.isEditing ? 'updateClass' : 'insertClass';
		Meteor.call(method, this.state.editingClass, err => {
			if (err) console.log(err);
			else this.setState({ showSelectedClass: false, isEditing: false });
		});
	}

	removeClass() {
		Meteor.call('removeClass', { _id: this.state.classToRemove }, err => {
			if (err) console.log(err);
			else this.setState({ showConfirmationRemoveModal: false });
		});
	}

	handleFilterClass({ target: { value } }) {
		this.setState({ filterParam: value });
		const { classes } = this.state;
		const { classes: allClasses } = this.props;
		if (value === '' || !value) this.setState({ classes: allClasses });
		else {
			const newClasses = classes.filter(a => a.name.toUpperCase().includes(value.toUpperCase()));
			this.setState({ classes: newClasses });
		}
	}

	handleEditClass(editingClass) {
		this.setState({ editingClass });
	}

	render() {
		const { isEditing, filterParam, classes } = this.state;
		return (
			<Row>
				<FormGroup style={{ width: '30%', padding: '15px' }}>
					<ControlLabel>Filtrar cursos</ControlLabel>
					<FormControl
						onChange={this.handleFilterClass}
						value={filterParam}
						placeholder="filtrar cursos..."
					/>
				</FormGroup>
				<div className="classes-table-header">
					<span>Nome</span>
					<span>Descrição</span>
					<span>Criado por</span>
					<span>Preço</span>
					<span style={{ flex: 0.5 }} />
				</div>
				{classes.map(cl => (
					<div
						onClick={() =>
							this.setState({
								isEditing: true,
								selectedClass: cl,
								showSelectedClass: true
							})}
						className="classes-table-row"
					>
						<span>{cl.name}</span>
						<span>{cl.description}</span>
						<span>{cl.created_by}</span>
						<span>R$ {cl.price}</span>
						<span style={{ flex: 0.5 }}>
							<button
								onClick={e => {
									e.stopPropagation();
									this.setState({
										showConfirmationRemoveModal: true,
										classToRemove: cl._id
									});
								}}
								className="remove-button"
							>
								<i className="fa fa-times" />
							</button>
						</span>
					</div>
				))}
				<Modal
					full
					showModal={this.state.showSelectedClass}
					confirmationCallback={this.saveOrInsertClass}
					confirmationButtonTitle={this.state.isEditing ? 'Salvar' : 'Cadastrar'}
					closeModal={() => this.setState({ showSelectedClass: false, isEditing: false })}
				>
					<RegisterClassPage
						handleEditClass={this.handleEditClass}
						isEditing={isEditing}
						selectedClass={this.state.selectedClass || {}}
					/>
				</Modal>
				<Modal
					title="Remover curso"
					showModal={this.state.showConfirmationRemoveModal}
					confirmationCallback={this.removeClass}
					confirmationButtonTitle="Remover"
					closeModal={() =>
						this.setState({
							showConfirmationRemoveModal: false
						})}
				>
					Tem certeza que deseja remover este curso?
				</Modal>
				<button
					onClick={() =>
						this.setState({
							isEditing: false,
							selectedClass: null,
							showSelectedClass: true
						})}
					className="new-class-button"
				>
					<i className="fa fa-plus" />
				</button>
			</Row>
		);
	}
}

RegisterClass.propTypes = {
	classes: PropTypes.array
};

export default RegisterClass;
