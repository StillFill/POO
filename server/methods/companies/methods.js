import { Companies } from "../../companies";
import { Template } from "meteor/templating";

if (Meteor.isServer) {
  export const insertCompany = {
    name: "Companies.insertCompany",

    // Factor out validation so that it can be run independently (1)
    validate(args) {
      new SimpleSchema({
        company: { type: Object }
      }).validate(args);
    },

    // Factor out Method body so that it can be called independently (3)
    run(company) {
      return Companies.insert(company);
    }
  };
}

// Actually register the method with Meteor's DDP system
Meteor.methods({
  [insertCompany.name]: function(args) {
    insertCompany.validate.call(this, args);
    insertCompany.run.call(this, args);
  }
});
