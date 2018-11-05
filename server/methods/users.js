import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Companies } from '../../server/companies';
import { Products } from '../../server/products';
import { Sales } from '../../server/sales';
import { Classes } from '../../imports/api/classes/classes';
import { Carts } from '../../imports/api/carts/carts';

if (Meteor.isServer) {
	Meteor.methods({
		createNewUser({ name, email, password, type }) {
			const user = {
				username: email,
				email,
				password,
				type,
				name
			};
			Accounts.createUser(user);
		},

		getUsers({ usersIds }) {
			return Meteor.users.find({ _id: { $in: usersIds } }).fetch();
		},

		addClassToUser({ _id, classes }) {
			return Meteor.users.update({ _id }, { $set: { classes } });
		}
	});
	Accounts.onCreateUser((options, user) => {
		const customizedUser = {
			...user,
			...options
		};
		return customizedUser;
	});
}
