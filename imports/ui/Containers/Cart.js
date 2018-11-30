import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Cart from "../Pages/Cart";
import { Carts } from "../../api/carts/carts";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  const rootCart = JSON.parse(localStorage.getItem("userCart"));
  if (user) {
    if (Meteor.subscribe("getUserCurrentCart", user._id).ready()) {
      const currentCart = Carts.findOne();
      if (currentCart) {
        Meteor.call(
          "getClassesFromCart",
          currentCart.classes,
          (err, classes) => {
            onData(null, { currentCart, classes });
          }
        );
      } else {
        onData(null, { currentCart: null, classes: [] });
      }
    }
  } else if (rootCart !== "null" && rootCart !== null) {
    Meteor.call("getClassesFromCart", rootCart.classes, (err, classes) => {
      onData(null, { currentCart: rootCart, classes: classes || [] });
    });
  }
};
const CartContainer = compose(dataLoader)(Cart);
export default CartContainer;
