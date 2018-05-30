import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Companies } from "../../server/companies";
import SimpleSchema from "simpl-schema";

export const getAll = {
  name: "Companies.getAll",
  validate(args) {
    new SimpleSchema({
      CompanyId: String
    }).validate(args);
  },

  // Factor out Method body so that it can be called independently (3)
  run({ companyId }) {
    return Companies.find().fetch();
  }
};
