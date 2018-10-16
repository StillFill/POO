import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  Meteor.publish(null, () => {
    return Meteor.users.find();
  });
}
