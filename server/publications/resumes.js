import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Companies } from "../../server/companies";

Meteor.publish(null, function() {
  return Meteor.users.find();
});

Meteor.publish(null, function() {
  return Companies.find();
});
