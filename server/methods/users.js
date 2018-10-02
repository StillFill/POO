import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Companies } from "../../server/companies";
import { Products } from "../../server/products";
import { Sales } from "../../server/sales";
import { Classes } from "../../imports/api/classes/classes";
import { Carts } from "../../imports/api/carts/carts";

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
    insertClass(newClass) {
      return Classes.insert({
        ...newClass,
        created_at: new Date(),
        is_active: true
      });
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
    },
    insertSale(sale) {
      console.log(sale);
      return Sales.insert(sale);
    },
    getUserClassesIds(_id) {
      console.log(_id);
      const user = Meteor.users.findOne({ _id });
      console.log(user);
      if (user && user.classesIds) {
        return Classes.find({
          _id: { $in: user.classesIds },
          is_active: true
        }).fetch();
      }
      return [];
    },
    getAllClasses() {
      return Classes.find({ is_active: true }).fetch();
    },
    getClassesByName(searchParam) {
      return Classes.find({
        name: { $regex: searchParam, $options: "i" },
        is_active: true
      }).fetch();
    },
    getAllSales() {
      return Sales.find().fetch();
    },
    getAllCompanies() {
      return Companies.find().fetch();
    },
    buyClass({ user_id, classId }) {
      const user = Meteor.users.findOne({ _id: this.userId });
      if (user && user.classesIds && user.classesIds.includes(classId)) {
        return;
      }
      Meteor.users.update({ _id: user_id }, { $push: { classesIds: classId } });
    },
    getClassesFromCart(classesIds) {
      return Classes.find({
        _id: { $in: classesIds },
        is_active: true
      }).fetch();
    },
    addToCart({ user_id, classId }) {
      const existantCart = Carts.findOne({ user_id, status: "open" });
      if (existantCart)
        Carts.update(
          { _id: existantCart._id },
          { $push: { classes: classId } }
        );
      else
        Carts.insert({
          created_at: new Date(),
          user_id,
          classes: [classId],
          status: "open"
        });
    },
    removeClassFromCart({ classId, cartId }) {
      Carts.update({ _id: cartId }, { $pull: { classes: classId } });
    },

    payCart({ cartId, total }) {
      Carts.update(
        { _id: cartId },
        { $set: { status: "paid", paid_at: new Date(), total_price: total } }
      );
    },

    getUsers({ usersIds }) {
      return Meteor.users.find({ _id: { $in: usersIds } }).fetch();
    },

    removeClass({ _id }) {
      Classes.update({ _id }, { $set: { is_active: false } });
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
