import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import Cart from '../Pages/Cart';
import { Carts } from '../../api/carts/carts';

const dataLoader = (props, onData) => {
	const user = Meteor.user();
	const rootCart = localStorage.getItem('userCart');
	if (user) {
		console.log(user);
		if (Meteor.subscribe('getUserCurrentCart', user._id).ready()) {
			const currentCart = Carts.findOne();
			console.log(currentCart);
			if (currentCart) {
				Meteor.call('getClassesFromCart', currentCart.classes, (err, classes) => {
					console.log(classes);
					onData(null, { currentCart, classes });
				});
			} else {
				onData(null, { currentCart: null, classes: [] });
			}
		}
	} else if (rootCart) {
		const userCart = JSON.parse(localStorage.getItem('userCart'));
		Meteor.call('getClassesFromCart', userCart.classes, (err, classes) => {
			onData(null, { currentCart: userCart, classes: classes || [] });
		});
	}
};
const CartContainer = compose(dataLoader)(Cart);
export default CartContainer;
