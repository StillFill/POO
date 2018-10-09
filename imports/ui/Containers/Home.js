import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Home from "../Pages/Home";
import Search from "../Components/Search";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  let methodToCall = "getAllClasses";
  let params = {};
  if (props.searchParam) {
    methodToCall = "getClassesByName";
    params = props.searchParam.replace("-", " ");
  }
  console.log(props);
  Meteor.call(methodToCall, params, (err, classes) => {
    onData(null, {
      classes
    });
  });
};

export const SearchContainer = compose(dataLoader)(Search);

const HomeContainer = compose(dataLoader)(Home);

export default HomeContainer;
