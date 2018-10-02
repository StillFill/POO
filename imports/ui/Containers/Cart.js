import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Cart from "../Pages/Cart";
import { Carts } from "../../api/carts/carts";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  if (user) {
    if (Meteor.subscribe("getUserCurrentCart", user._id).ready()) {
      const currentCart = Carts.findOne();
      Meteor.call("getClassesFromCart", currentCart.classes, (err, classes) => {
        onData(null, { currentCart, classes });
      });
    }
  }
};
const CartContainer = compose(dataLoader)(Cart);
export default CartContainer;
