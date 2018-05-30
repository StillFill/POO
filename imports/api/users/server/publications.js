import { Meteor } from "meteor/meteor";

console.log(Meteor.isServer);

if (Meteor.isServer) {
  Meteor.publish(null, () => {
    return Meteor.users.find();
  });
}
