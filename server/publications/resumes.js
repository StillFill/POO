import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Companies } from "../../server/companies";
import { Carts } from "../../imports/api/carts/carts";
import { Classes } from "../../imports/api/classes/classes";

if (Meteor.isServer) {
  Meteor.publish(null, function() {
    return Meteor.users.find();
  });

  Meteor.publish("getUserCurrentCart", function(user_id) {
    check(user_id, String);
    return Carts.find({ user_id, status: "open" });
  });

  Meteor.publish("getAllClasses", function() {
    return Classes.find({ is_active: true });
  });

  Meteor.publish("getAllPaidCarts", function(user_id) {
    return Carts.find({ status: "paid" });
  });

  Meteor.publish(null, function() {
    return Companies.find();
  });

  Meteor.publish(null, () => {
    return Carts.find({ user_id: this.userId, status: 'open' });
  });
}
