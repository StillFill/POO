import { Meteor } from "meteor/meteor";
import { Carts } from "../../carts/carts";

if (Meteor.isServer) {
  Meteor.publish(null, () => {
    return Meteor.users.find();
  });
}
