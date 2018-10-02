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
    insertCompany(company) {
      console.log(company);
      return Companies.insert(company);
    },
    insertClass(newClass) {
      return Classes.insert(newClass);
    },
    updateClass(newClass) {
      return Classes.update(
        { _id: newClass._id },
        {
          $set: {
            name: newClass.name,
            description: newClass.description,
            created_by: newClass.created_by,
            detailed_description: newClass.detailed_description,
            price: newClass.price,
            include_list: newClass.include_list
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
        return Classes.find({ _id: { $in: user.classesIds } }).fetch();
      }
      return [];
    },
    getAllClasses() {
      return Classes.find().fetch();
    },
    getClassesByName(searchParam) {
      return Classes.find({
        name: { $regex: searchParam, $options: "i" }
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
      console.log(classesIds);
      return Classes.find({ _id: { $in: classesIds } }).fetch();
    },
    addToCart({ user_id, classId }) {
      const existantCart = Carts.findOne({ user_id, status: "open" });
      if (existantCart)
        Carts.update({ _id: existantCart }, { $push: { classes: classId } });
      else Carts.insert({ user_id, classes: [classId], status: "open" });
    },
    removeClassFromCart({ classId, cartId }) {
      console.log(classId);
      console.log(cartId);
      Carts.update({ _id: cartId }, { $pull: { classes: classId } });
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
