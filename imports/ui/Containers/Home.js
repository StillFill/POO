import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Home from "../Pages/Home";
import Search from "../Components/Search";

const dataLoader = (props, onData) => {
  Meteor.call("getAllClasses", (err, classes) => {
    onData(null, {
      ...props,
      classes
    });
  });
};

export const SearchContainer = compose(dataLoader)(Search);

const HomeContainer = compose(dataLoader)(Home);

export default HomeContainer;
