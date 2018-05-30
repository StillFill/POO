import { Meteor } from "meteor/meteor";
import { compose } from "react-komposer";
import Vendas from "../Pages/Vendas";

const dataLoader = (props, onData) => {
  const user = Meteor.user();
  console.log(Meteor);
  Meteor.call("getAllProducts", (err, products) => {
    console.log(err);
    console.log(products);
    onData(null, {
      products
    });
  });
};
const VendasContainer = compose(dataLoader)(Vendas);
export default VendasContainer;
