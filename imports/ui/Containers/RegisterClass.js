import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import RegisterClass from "../Pages/RegisterClass";
import { Classes } from "../../api/classes/classes";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  if (user && Meteor.subscribe("getAllClasses").ready()) {
    const classes = Classes.find().fetch();
    onData(null, { classes });
  }
};
const RegisterClassContainer = compose(dataLoader)(RegisterClass);

export default RegisterClassContainer;
