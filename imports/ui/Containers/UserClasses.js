import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import Produtos from '../Pages/UserClasses';

const dataLoader = (props, onData) => {
	const user = Meteor.user();
	console.log(user);
	if (user) {
		Meteor.call('getUserClassesIds', user._id, (err, classes) => {
			console.log(classes);
			return onData(null, {
				...props,
				classes
			});
		});
	}
};
const ProdutosContainer = compose(dataLoader)(Produtos);
export default ProdutosContainer;
