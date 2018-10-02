import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import RegisterClass from "../Pages/RegisterClass";
import { Classes } from "../../api/classes/classes";

const dataLoader = (props, onData) => {
  if (Meteor.subscribe("getAllClasses").ready()) {
    const classes = Classes.find().fetch();
    onData(null, { classes });
  }
};
const RegisterClassContainer = compose(dataLoader)(RegisterClass);

export default RegisterClassContainer;
