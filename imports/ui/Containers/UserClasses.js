import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Produtos from "../Pages/UserClasses";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  console.log(user);
  if (!user) {
    return onData(null, { userClasses: [] });
  }
  Meteor.call("getUserClassesIds", user._id, (err, userClasses) => {
    return onData(null, {
      ...props,
      userClasses
    });
  });
};
const ProdutosContainer = compose(dataLoader)(Produtos);
export default ProdutosContainer;
