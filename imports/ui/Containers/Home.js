import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Home from "../Pages/Home";
import Search from "../Components/Search";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  Meteor.call("getAllClasses", (err, classes) => {
    if (!user) return onData(null, { cart: {}, classes });
    Meteor.call("getUserCart", user._id, (err, cart) => {
      onData(null, {
        ...props,
        cart,
        classes
      });
    });
  });
};

export const SearchContainer = compose(dataLoader)(Search);

const HomeContainer = compose(dataLoader)(Home);

export default HomeContainer;
