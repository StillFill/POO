import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Home from "../Pages/Home";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  let methodToCall = "getAllClasses";
  let params = {};
  if (props.searchParam) {
    methodToCall = "getClassesByName";
    params = props.searchParam.replace("-", " ");
  }
  Meteor.call(methodToCall, params, (err, classes) => {
    onData(null, {
      classes
    });
  });
};
const HomeContainer = compose(dataLoader)(Home);

export default HomeContainer;
