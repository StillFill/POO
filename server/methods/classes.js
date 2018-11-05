import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Companies } from '../../server/companies';
import { Products } from '../../server/products';
import { Sales } from '../../server/sales';
import { Classes } from '../../imports/api/classes/classes';
import { Carts } from '../../imports/api/carts/carts';

if (Meteor.isServer) {
	Meteor.methods({
		insertClass(newClass) {
			return Classes.insert({
				...newClass,
				created_at: new Date(),
				is_active: true
			});
		},
		removeClass({ _id }) {
			Classes.update({ _id }, { $set: { is_active: false } });
		},
		removeClassFromCart({ classId, cartId }) {
			Carts.update({ _id: cartId }, { $pull: { classes: classId } });
		},
		getClassesFromCart(classesIds) {
			return Classes.find({
				_id: { $in: classesIds },
				is_active: true
			}).fetch();
		},
		getAllClasses() {
			return Classes.find({ is_active: true }).fetch();
		},
		getClassesByName(searchParam) {
			return Classes.find({
				name: { $regex: searchParam, $options: 'i' },
				is_active: true
			}).fetch();
		},
		getUserClassesIds(_id) {
			const user = Meteor.user();
			console.log(user.classes);
			if (user && user.classes) {
				return Classes.find({
					_id: { $in: user.classes },
					is_active: true
				}).fetch();
			}
			return [];
		},
		updateClass(newClass) {
			return Classes.update(
				{ _id: newClass._id },
				{
					$set: {
						...newClass
					}
				}
			);
		}
	});
}
