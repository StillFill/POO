import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassCard from '../Components/Common/ClassCard';
import { Row, Col, FormControl, ControlLabel } from 'react-bootstrap';
import Modal from '../Components/Common/Modal';
import SelectedClassPage from '../Components/Common/SelectedClassPage';

class UserClasses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredClasses: props.classes,
			searchParam: props.searchParam
		};
		this.handleChangeSearchParam = this.handleChangeSearchParam.bind(this);
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
				<h1>Meus cursos</h1>
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
							<ClassCard
								cardClass={a}
								showPrice={false}
								onClick={() => this.setState({ selectedClass: a })}
							/>
						</Col>
					))}
					<Modal
						full
						showModal={this.state.selectedClass}
						closeModal={() => this.setState({ selectedClass: null })}
					>
						<SelectedClassPage selectedClass={this.state.selectedClass || {}} />
					</Modal>
				</Row>
			</div>
		);
	}
}

UserClasses.propTypes = {
	classes: PropTypes.array,
	params: PropTypes.object
};

export default UserClasses;
