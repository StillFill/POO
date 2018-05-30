import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Companies } from "../../server/companies";
import { Products } from "../../server/products";
import { Sales } from "../../server/sales";

if (Meteor.isServer) {
  Meteor.methods({
    createNewUser({ email, password, type, companyId }) {
      const user = {
        username: email,
        email,
        password
      };
      user.type = type;
      user.companyId = companyId;
      console.log(user);
      Accounts.createUser(user);
    },
    insertCompany(company) {
      console.log(company);
      return Companies.insert(company);
    },
    insertProduct(product) {
      console.log(product);
      return Products.insert(product);
    },
    insertSale(sale) {
      console.log(sale);
      return Sales.insert(sale);
    },
    getAllProducts() {
      return Products.find().fetch();
    },
    getAllSales() {
      return Sales.find().fetch();
    },
    getAllCompanies() {
      return Companies.find().fetch();
    }
  });
  Accounts.onCreateUser((options, user) => {
    const customizedUser = user;
    customizedUser.type = options.type;
    customizedUser.companyId = options.companyId;
    console.log(options);
    return customizedUser;
  });
}
