import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Companies } from "../../server/companies";
import { Products } from "../../server/products";
import { Sales } from "../../server/sales";
import { Classes } from "../../imports/api/classes/classes";
import { Carts } from "../../imports/api/carts/carts";

if (Meteor.isServer) {
  Meteor.methods({
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

    getUserCart(user_id) {
      return Carts.find({ user_id, status: "open" }).fetch()[0];
    },

    payCart({ cartId, total }) {
      Carts.update(
        { _id: cartId },
        { $set: { status: "paid", paid_at: new Date(), total_price: total } }
      );
    }
  });
}
